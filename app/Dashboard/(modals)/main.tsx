import { Modal } from "@/components/ui/modal";
import { useEffect, useState } from "react";
import { FileText } from "lucide-react";
import { Stepper } from "@/components/ui/stepper";
import PlaqueSection from "./plaque";
import WeightSection from "./weight";
import Confirm from "./confirm";
import { useAppSelector } from "@/store/hooks";
import { useActivity } from "@/hooks/useActivity";
import { midFetcher } from "@/lib/axios";

export default function MainModal() {
  const [currentStep, setCurrentStep] = useState(0);
  const [baskolData, setBaskolData] = useState<
    | {
        plaque_number: string;
        baskol_number: 1 | 2 | 3;
        baskol_value: number;
        image_link: string;
      }
    | undefined
  >();

  const modal = useAppSelector((state) => state.modals.modals.mainModal);
  const { createWithPlaque, Activity_data } = useActivity("silent");

  useEffect(() => {
    const fetchData = async () => {
      const response = await midFetcher.get("");
      setBaskolData(response.data);
    };

    fetchData();
  }, [modal, currentStep]);

  useEffect(() => {
    if (!modal) {
      return;
    }

    // if not have plaque, go to plaque step
    if (!modal.activity) {
      setCurrentStep(0);
      return;
    }

    // if have plaque, go to weight step
    if (modal?.actionType?.type === "empty") {
      if (modal.activity.Empty === null) {
        setCurrentStep(1);
        return;
      }
      if (modal.activity.Full === null) {
        setCurrentStep(2);
        return;
      }
    } else {
      if (modal.activity.Full === null) {
        setCurrentStep(1);
        return;
      }
      if (modal.activity.Empty === null) {
        setCurrentStep(2);
        return;
      }
    }
  }, [modal]);

  if (!modal?.isOpen || !modal?.actionType) return null;

  const steps = [
    {
      title: "جستجوی پلاک",
      section: (
        <PlaqueSection
          baskolData={baskolData}
          goNext={(car, selectedWork) => {
            createWithPlaque({
              Car: car,
              Action: modal.actionType as any,
              work: selectedWork,
              ...(baskolData &&
                (modal?.actionType?.type === "empty"
                  ? {
                      baskol_number_empty: baskolData?.baskol_number,
                    }
                  : {
                      baskol_number_empty: baskolData?.baskol_number,
                    })),
            });
            setCurrentStep(currentStep + 1);
          }}
        />
      ),
    },
    ...(modal?.actionType?.type === "empty"
      ? [
          {
            title: "وزن خالی",
            section: (
              <WeightSection
                baskolData={baskolData}
                goNext={() => setCurrentStep(currentStep + 1)}
                goBack={() => setCurrentStep(currentStep - 1)}
                isEmptyWeightCalc={true}
              />
            ),
          },
          {
            title: "وزن پر",
            section: (
              <WeightSection
                baskolData={baskolData}
                goNext={() => setCurrentStep(currentStep + 1)}
                goBack={() => setCurrentStep(currentStep - 1)}
                isEmptyWeightCalc={false}
              />
            ),
          },
        ]
      : [
          {
            title: "وزن پر",
            section: (
              <WeightSection
                baskolData={baskolData}
                goNext={() => setCurrentStep(currentStep + 1)}
                goBack={() => setCurrentStep(currentStep - 1)}
                isEmptyWeightCalc={false}
              />
            ),
          },
          {
            title: "وزن خالی",
            section: (
              <WeightSection
                baskolData={baskolData}
                goNext={() => setCurrentStep(currentStep + 1)}
                goBack={() => setCurrentStep(currentStep - 1)}
                isEmptyWeightCalc={true}
              />
            ),
          },
        ]),
    {
      title: "تایید",
      section: (
        <Confirm
          goNext={() => {}}
          goBack={() => setCurrentStep(currentStep - 1)}
        />
      ),
    },
  ];

  return (
    <Modal __name__="mainModal">
      <div className="w-screen max-w-5xl mx-auto bg-gray-50 h-full" dir="rtl">
        {/* Header */}
        <div className="bg-white border-b border-gray-200 px-6 py-4 gap-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                <FileText className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">
                  سامانه جستجوی پلاک
                </h1>
                <p className="text-sm text-gray-500">
                  سازمان حمل و نقل شهرداری
                </p>
              </div>
            </div>
          </div>
          {/* Step Indicator */}
          <div className="mt-5">
            <Stepper steps={steps} currentStep={currentStep} />
          </div>
        </div>

        {/* Content */}
        <div className="bg-white px-6 py-4 gap-5">
          {steps[currentStep].section}
        </div>
      </div>
    </Modal>
  );
}
