import usePlaque from "@/hooks/usePlaque";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { Scale, Loader2, User, Car, Truck, ChevronLeft } from "lucide-react";
import { useActivity } from "@/hooks/useActivity";
import { useAppSelector } from "@/store/hooks";
import { cn } from "@/lib/utils";

interface SectionInterface {
  goNext: () => void;
  goBack: () => void;
  isEmptyWeightCalc: boolean;
  baskolData?: {
    plaque_number: string;
    baskol_number: 1 | 2 | 3;
    baskol_value: number;
  };
}

export default function WeightSection({
  goNext,
  goBack,
  isEmptyWeightCalc,
  baskolData,
}: SectionInterface) {
  const { selectedCar } = usePlaque();
  const { updateWeight } = useActivity("silent");
  const modal = useAppSelector((state) => state.modals.modals.mainModal);
  const [isCalculating, setIsCalculating] = useState(true);
  const [calculatedWeight, setCalculatedWeight] = useState<number | null>(null);

  useEffect(() => {
    if (baskolData) {
      setCalculatedWeight(baskolData?.baskol_value);
      setIsCalculating(false);
    }
  }, [baskolData]);

  console.log(calculatedWeight);

  const handleSubmit = () => {
    if (calculatedWeight) {
      if (!modal?.activity) {
        return;
      }

      updateWeight({
        ...modal.activity,
        Empty: isEmptyWeightCalc ? calculatedWeight : modal.activity.Empty,
        Full: isEmptyWeightCalc ? modal.activity.Full : calculatedWeight,
      });
      goNext();
    }
  };

  if (!selectedCar) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <div className="bg-white rounded-lg shadow-sm p-8 text-center border border-gray-100">
          <p className="text-gray-600 font-medium">
            لطفاً ابتدا خودرو را انتخاب کنید
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white rounded-lg ">
        <div className="flex flex-col md:flex-row">
          {/* Right Section - Car Info & Actions */}
          <div className="flex-1">
            {/* Car Information */}
            <div className="p-8 border-b border-gray-100 flex flex-col gap-6">
              <div className="space-y-6">
                <div className="flex items-center gap-3">
                  <User className="w-5 h-5 text-gray-500" />
                  <h3 className="text-base font-semibold text-gray-900">
                    اطلاعات خودرو
                  </h3>
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-1">
                    <p className="text-sm text-gray-500 font-medium">
                      نام راننده
                    </p>
                    <p className="text-base text-gray-900 font-semibold">
                      {selectedCar.driver?.name || "نامشخص"}
                    </p>
                  </div>

                  <div className="space-y-1">
                    <p className="text-sm text-gray-500 font-medium">
                      شماره پلاک
                    </p>
                    <p className="text-base text-gray-900 font-semibold">
                      {selectedCar.license_plate}
                    </p>
                  </div>

                  <div className="space-y-1">
                    <p className="text-sm text-gray-500 font-medium">
                      نوع خودرو
                    </p>
                    <p className="text-base text-gray-900 font-semibold">
                      {selectedCar.type__name}
                    </p>
                  </div>

                  {!isEmptyWeightCalc && selectedCar.last_empty_weight && (
                    <div className="space-y-1">
                      <p className="text-sm text-gray-500 font-medium">
                        وزن خالی قبلی
                      </p>
                      <p className="text-base text-gray-900 font-semibold">
                        {selectedCar.last_empty_weight} کیلوگرم
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Left Section - Weight Display */}
          <div className="flex-1 p-8 border-b md:border-b-0 md:border-r border-gray-100">
            <div className="text-center">
              <h2 className="text-sm font-medium text-gray-600 mb-6">
                {isEmptyWeightCalc ? "وزن خالی خودرو" : "وزن پر خودرو"}
              </h2>
              {!!isCalculating ? (
                <div className="flex items-center justify-center gap-3">
                  <Loader2 className="w-6 h-6 text-blue-600 animate-spin" />
                  <span className="text-base text-blue-600 font-medium">
                    در حال محاسبه وزن...
                  </span>
                </div>
              ) : (
                <div className="space-y-2">
                  <p className="text-7xl font-bold text-gray-900 tracking-tight">
                    {calculatedWeight}
                  </p>
                  <p className="text-sm text-gray-500 font-medium">کیلوگرم</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="p-6 w-full flex flex-row justify-between">
          <div className="flex flex-row gap-3">
            {isEmptyWeightCalc && selectedCar.last_empty_weight && (
              <Button
                type="button"
                onClick={() => {
                  setCalculatedWeight(selectedCar.last_empty_weight);
                  handleSubmit();
                  setIsCalculating(false);
                }}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 
                    rounded-lg font-medium transition-colors flex-1 sm:flex-none"
                disabled={isCalculating}
              >
                ادامه با وزن ثبت شده قبلی
              </Button>
            )}
            <Button
              type="submit"
              onClick={handleSubmit}
              className={cn(
                "px-8 py-2.5 rounded-lg font-medium transition-colors flex-1 sm:flex-none",
                {
                  "bg-gray-100 hover:bg-gray-200 text-gray-700":
                    isEmptyWeightCalc,
                  "bg-blue-600 hover:bg-blue-700 text-white":
                    !isEmptyWeightCalc,
                }
              )}
              disabled={isCalculating || !calculatedWeight}
            >
              {isCalculating ? (
                <div className="flex items-center justify-center gap-2">
                  <Loader2 className="w-4 h-4 animate-spin" />
                  در حال محاسبه...
                </div>
              ) : (
                "ثبت وزن"
              )}
            </Button>
          </div>
          <div className="flex flex-col sm:flex-row justify-center sm:justify-start gap-3">
            <Button
              type="button"
              onClick={goBack}
              className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-6 py-2.5 border border-gray-300
                  rounded-lg font-medium transition-colors flex-1 sm:flex-none"
            >
              مرحله قبل
              <ChevronLeft className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
