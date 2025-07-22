import { Button } from "@/components/ui/button";
import { Printer, Car, User, Scale, ChevronLeft } from "lucide-react";
import usePlaque from "@/hooks/usePlaque";
import { closeModal as closeModalAction } from "@/store/core/modals";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import type { ExprotTypes } from "@/store/slices/Action";
interface SectionProps {
  goNext: () => void;
  goBack: () => void;
}

export default function Confirm({ goNext, goBack }: SectionProps) {
  const { selectedCar } = usePlaque();
  const modal = useAppSelector((state) => state.modals.modals.mainModal);
  const exports = modal?.actionType?.exports || [];
  const dispatch = useAppDispatch();

  const closeModal = () => {
    dispatch(closeModalAction("mainModal"));
  };

  const net_weight =
    modal?.activity?.Full && modal?.activity?.Empty
      ? modal?.activity?.Full - modal?.activity?.Empty
      : -1;

  const printReplaces = {
    id: modal?.activity?.pk,
    full: modal?.activity?.Full || "وزن نشده",
    empty: modal?.activity?.Empty || "وزن نشده",
    car_plaque: selectedCar?.license_plate,
    car_type: selectedCar?.type__name,
    driver_name: selectedCar?.driver.name,
    baskol_number_empty: modal?.activity?.baskol_number_empty,
    empty_date: modal?.activity?.baskol_number_empty || "ثبت نشده",
    full_date: modal?.activity?.baskol_number_full || "ثبت نشده",
    net_weight: net_weight > 0 ? net_weight : "ناتمام",
  };

  const handlePrint = async (exportType: ExprotTypes) => {
    const printWindow = window.open("", "_blank");

    if (!printWindow) {
      return;
    }

    const finalPrint = Object.entries(printReplaces).reduce((print, [k, v]) => {
      // if value is undefined go next
      if (!v) return print;

      // check value exists and replace in text
      return print.replaceAll(`{{${k}}}`, v);
    }, exportType.shema);

    printWindow.document.write(
      `<html dir="rtl"><body>${finalPrint}</body></html>`
    );
    printWindow.print();
    printWindow.close();
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
      <div className="bg-white rounded-lg">
        {/* Main Content */}
        <div className="p-6">
          <div className="grid grid-cols-3 gap-6">
            {/* Car Information */}
            <div className="bg-gray-50 rounded-lg p-4 hover:shadow-md transition-shadow">
              <div className="flex items-center gap-2 text-gray-700 mb-4">
                <Car className="w-5 h-5 text-blue-600" />
                <h3 className="font-medium">اطلاعات خودرو</h3>
              </div>
              <div className="space-y-3">
                <div className="bg-white p-3 rounded-md">
                  <p className="text-sm text-gray-500">شماره پلاک</p>
                  <p className="font-medium text-lg">
                    {selectedCar.license_plate}
                  </p>
                </div>
                <div className="bg-white p-3 rounded-md">
                  <p className="text-sm text-gray-500">نوع خودرو</p>
                  <p className="font-medium text-lg">
                    {selectedCar.type__name}
                  </p>
                </div>
              </div>
            </div>

            {/* Driver Information */}
            <div className="bg-gray-50 rounded-lg p-4 hover:shadow-md transition-shadow">
              <div className="flex items-center gap-2 text-gray-700 mb-4">
                <User className="w-5 h-5 text-green-600" />
                <h3 className="font-medium">اطلاعات راننده</h3>
              </div>
              <div className="space-y-3">
                <div className="bg-white p-3 rounded-md">
                  <p className="text-sm text-gray-500">نام راننده</p>
                  <p className="font-medium text-lg">
                    {selectedCar.driver?.name || "نامشخص"}
                  </p>
                </div>
                <div className="bg-white p-3 rounded-md">
                  <p className="text-sm text-gray-500">شماره تماس</p>
                  <p className="font-medium text-lg">
                    {selectedCar.driver?.phone_number || "نامشخص"}
                  </p>
                </div>
              </div>
            </div>

            {/* Weight Information */}
            <div className="bg-gray-50 rounded-lg p-4 hover:shadow-md transition-shadow">
              <div className="flex items-center gap-2 text-gray-700 mb-4">
                <Scale className="w-5 h-5 text-purple-600" />
                <h3 className="font-medium">اطلاعات وزن</h3>
              </div>
              <div className="space-y-3">
                <div className="bg-white p-3 rounded-md">
                  <p className="text-sm text-gray-500">وزن خالی</p>
                  <p className="font-medium text-lg">
                    {selectedCar.last_empty_weight} کیلوگرم
                  </p>
                </div>
                <div className="bg-white p-3 rounded-md">
                  <p className="text-sm text-gray-500">وزن پر</p>
                  <p className="font-medium text-lg">-</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex justify-between gap-4 p-6 border-t border-gray-100">
          <div className="flex flex-row gap-3">
            <Button
              onClick={closeModal}
              className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg transition-colors"
            >
              تایید و ادامه
            </Button>
            {exports.map((a) => (
              <Button
                onClick={() => handlePrint(a)}
                className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors"
              >
                <Printer className="w-4 h-4" />
                {a.name}
              </Button>
            ))}
          </div>

          <Button
            onClick={goBack}
            className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-700 px-6 py-2 rounded-lg transition-colors"
          >
            مرحله قبل
            <ChevronLeft className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </div>
    </div>
  );
}
