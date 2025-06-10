import React from "react";
import StatusCard from "./StatusCard";
import useCarStatus from "@/hooks/useCarStatus";

const StatusPanel: React.FC = () => {
  const { carStatus, carDetails, isConnected, connectionError } =
    useCarStatus();

  const handleCardClick = () => {
    // Handle what happens when the status card is clicked
    // For example, open a modal or navigate to a different page
    console.log("Status card clicked:", carStatus);
    // You can add your own implementation here
  };

  return (
    <div className="p-4 flex flex-col gap-4">
      {/* Connection Status */}
      <div className="flex items-center justify-between px-1">
        <span className="text-sm text-gray-600">وضعیت اتصال دوربین:</span>
        <div className="flex items-center">
          <span
            className={`h-2.5 w-2.5 rounded-full ${
              isConnected ? "bg-green-500" : "bg-red-500"
            } mr-2`}
          ></span>
          <span className="text-sm font-medium">
            {isConnected ? "متصل" : "قطع شده"}
          </span>
        </div>
      </div>

      {/* Connection Error Display */}
      {connectionError && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-2 rounded-md text-sm">
          {connectionError}
        </div>
      )}

      {/* Real-time Detection Info */}
      <div className="bg-gray-50 border border-gray-200 rounded-md p-3">
        <div className="text-sm font-medium text-gray-700 mb-2">
          تشخیص خودکار خودرو
        </div>
        <p className="text-sm text-gray-600">
          سیستم به صورت خودکار خودروهای تشخیص داده شده توسط دوربین را نمایش
          می‌دهد.
        </p>

        {carDetails && (
          <div className="mt-2 bg-white p-2 rounded border border-gray-200">
            <span className="text-xs text-gray-500">
              شماره پلاک شناسایی شده:
            </span>
            <div
              className="font-mono text-sm font-medium mt-1 bg-gray-100 p-1 rounded text-center"
              dir="ltr"
            >
              {carDetails}
            </div>
          </div>
        )}
      </div>

      {/* Car Status Card */}
      <div className="mt-1">
        <StatusCard status={carStatus} onClick={handleCardClick} />
      </div>

      <div className="text-xs text-gray-500 mt-2">
        <p>سیستم به صورت خودکار پلاک‌های شناسایی شده را بررسی می‌کند.</p>
        <p className="mt-1">
          هر 10 ثانیه یک خودرو برای نمایش شبیه‌سازی می‌شود.
        </p>
      </div>
    </div>
  );
};

export default StatusPanel;
