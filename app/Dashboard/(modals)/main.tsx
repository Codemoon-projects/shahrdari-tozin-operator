import { FileText } from "lucide-react";
import { Stepper } from "@/components/ui/stepper";
import PlaqueSection from "./plaque";
import WeightSection from "./weight";
import ConfirmSection from "./confirm";
import { useModals } from "@/hooks/useModal";
import { ModalStep } from "@/store/core/modals";

type ConvertorType = {
  [key: number]: {
    component: any;
    params?: { [key: string]: any };
  };
};

export default function MainModal() {
  const Step2Component: ConvertorType = {
    [ModalStep.PLAQUE]: { component: PlaqueSection },
    [ModalStep.WEIGHTING_FULL]: {
      component: WeightSection,
      params: { isEmptyWeightCalc: false },
    },
    [ModalStep.WEIGHTING_EMPTY]: {
      component: WeightSection,
      params: { isEmptyWeightCalc: true },
    },

    [ModalStep.CONFIRM]: {
      component: ConfirmSection,
    },
  };

  const { isOpen, step, closeModal } = useModals();

  if (!isOpen || step === undefined) return null;

  const Section = Step2Component[step].component;
  const params = Step2Component[step].params || {};

  return (
    <div
      id="modal"
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
    >
      <button className="fixed inset-0 bg-black/50" onClick={closeModal} />
      <div className="relative  bg-base-100 rounded-lg shadow-xl max-w-full max-h-full overflow-auto">
        <button
          onClick={closeModal}
          className="absolute right-2 top-2 text-gray-400 hover:text-gray-600"
        >
          ✕
        </button>
        <div className="p-4">
          <div
            className="w-screen max-w-5xl mx-auto bg-gray-50 h-full"
            dir="rtl"
          >
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
                      سازمان عمران و بازآفرینی فضا های شهری
                    </p>
                  </div>
                </div>
              </div>
              {/* Step Indicator */}
              <div className="mt-5">
                <Stepper />
              </div>
            </div>

            {/* Content */}
            <div className="bg-white px-6 py-4 gap-5">
              <Section {...params} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
