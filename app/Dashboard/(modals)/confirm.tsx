"use client";

import { Button } from "@/components/ui/button"; // فرض بر اینکه Input از ui دارید، اگر نه باید از shadcn/ui یا هر کتابخانه‌ای بگیرید
import { Printer, Car, User, Scale, ChevronLeft, Upload } from "lucide-react";
import { ModalStep } from "@/store/core/modals";
import type { ExprotTypes, UploadTypes } from "@/store/slices/Action";
import { useState } from "react";
import { useModals } from "@/hooks/useModal";

export default function Confirm() {
  const {
    actionType,
    goNext,
    goPervious,
    selectedCar,
    empltyWeghting,
    fullWeghting,
    selectedWork,
  } = useModals();
  const exports = actionType?.exports || [];
  const uploads: UploadTypes[] = actionType?.uploads || []; // اضافه کردن آپلودها

  const [address, setAddress] = useState("");
  const [uploadedFiles, setUploadedFiles] = useState<
    Record<number, File | null>
  >({});

  const closeModal = () => {
    // const data = { ...modal?.activity, address } as unknown as ActivityType;
    // dispatch(Activity_add(data));

    // const missingRequired = uploads.filter(
    //   (u) => u.required && !uploadedFiles[u.id]
    // );

    // if (missingRequired.length > 0) {
    //   setError("لطفاً تمام مدارک اجباری را بارگذاری کنید.");
    //   return;
    // }

    goNext(ModalStep.CONFIRM);
  };

  const goBack = () => {
    goPervious(ModalStep.CONFIRM);
  };

  const net_weight =
    fullWeghting && empltyWeghting ? fullWeghting - empltyWeghting : -1;

  const printReplaces = {
    id: modal?.activity?.pk,
    full: fullWeghting || "وزن نشده",
    empty: empltyWeghting || "وزن نشده",
    car_plaque: selectedCar?.license_plate,
    car_type: selectedCar?.type__name,
    driver_name: selectedCar?.driver.name,
    // baskol_number_empty: modal?.activity?.baskol_number_empty,
    empty_date: new Date().toLocaleString("fa"),
    full_date: new Date().toLocaleString("fa"),
    net_weight: net_weight > 0 ? net_weight : "ناتمام",
    work_name: selectedWork?.name,
    address: address || "ثبت نشده",
  };

  const handlePrint = async (exportType: ExprotTypes) => {
    const printWindow = window.open("", "_blank");
    if (!printWindow) return;

    const finalPrint = Object.entries(printReplaces).reduce((print, [k, v]) => {
      if (!v) return print;
      return print.replaceAll(`{{${k}}}`, v as string);
    }, exportType.shema);

  printWindow.document.write(`
    <html dir="rtl">
      <head>
        <style>
          @font-face {
            font-family: 'BYekan';
            src: url('/fonts/Yekan.ttf') format('truetype');
            font-weight: normal;
            font-style: normal;
          }
          body {
            font-family: 'BYekan', sans-serif;
          }
        </style>
      </head>
      <body>
        ${finalPrint}
      </body>
    </html>
  `);

  printWindow.document.close();
  printWindow.focus();
  printWindow.print();
  printWindow.close();

  };

  const handleFileChange = (id: number, file: File | null) => {
    setUploadedFiles((prev) => ({ ...prev, [id]: file }));
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
        <div className="p-6 space-y-6">
          {/* اطلاعات خودرو / راننده / وزن */}
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
                    {empltyWeghting} کیلوگرم
                  </p>
                </div>
                <div className="bg-white p-3 rounded-md">
                  <p className="text-sm text-gray-500">وزن پر</p>
                  <p className="font-medium text-lg">{fullWeghting} کیلوگرم</p>
                </div>
              </div>
            </div>
          </div>

          {/* Address Input */}
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">
              آدرس
            </label>
            <input
              type="text"
              required={true}
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="آدرس را وارد کنید"
              className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* Upload Section */}
          {uploads.length > 0 && (
            <div>
              <h3 className="font-medium text-gray-700 mb-4">آپلود مدارک</h3>
              <div className="space-y-4">
                {uploads.map((u) => (
                  <div
                    key={u.id}
                    className="flex flex-col sm:flex-row items-start sm:items-center gap-4 border p-3 rounded-lg"
                  >
                    <div className="flex-1">
                      <p className="font-medium">{u.name}</p>
                      <p className="text-sm text-gray-500">{u.description}</p>
                      {u.required && (
                        <p className="text-xs text-red-500">* اجباری</p>
                      )}
                    </div>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <Upload className="w-4 h-4 text-blue-600" />
                      <input
                        type="file"
                        className="hidden"
                        onChange={(e) =>
                          handleFileChange(
                            u.id,
                            e.target.files ? e.target.files[0] : null
                          )
                        }
                      />
                      <span className="text-sm text-blue-600">
                        {uploadedFiles[u.id]?.name || "انتخاب فایل"}
                      </span>
                    </label>
                  </div>
                ))}
              </div>
            </div>
          )}
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
                key={a.name}
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
