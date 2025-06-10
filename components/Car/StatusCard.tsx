import React from "react";

type CarStatus = "not-found" | "new" | "on-list";

type StatusCardProps = {
  status: CarStatus;
  onClick: () => void;
};

const StatusCard: React.FC<StatusCardProps> = ({ status, onClick }) => {
  const getStatusInfo = () => {
    switch (status) {
      case "not-found":
        return {
          title: "خودرو یافت نشد",
          description: "خودرویی با این مشخصات در سیستم ثبت نشده است",
          icon: (
            <svg
              className="w-6 h-6 text-red-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              ></path>
            </svg>
          ),
          bgColor: "bg-red-50",
          borderColor: "border-red-200",
        };
      case "new":
        return {
          title: "خودروی جدید",
          description: "این خودرو جدید است و نیاز به ثبت در سیستم دارد",
          icon: (
            <svg
              className="w-6 h-6 text-blue-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 6v6m0 0v6m0-6h6m-6 0H6"
              ></path>
            </svg>
          ),
          bgColor: "bg-blue-50",
          borderColor: "border-blue-200",
        };
      case "on-list":
        return {
          title: "خودرو در لیست",
          description: "این خودرو در سیستم ثبت شده و در لیست موجود است",
          icon: (
            <svg
              className="w-6 h-6 text-green-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 13l4 4L19 7"
              ></path>
            </svg>
          ),
          bgColor: "bg-green-50",
          borderColor: "border-green-200",
        };
    }
  };

  const statusInfo = getStatusInfo();

  return (
    <button
      onClick={onClick}
      className={`w-full ${statusInfo.bgColor} ${statusInfo.borderColor} border rounded-lg p-3 text-right flex items-center justify-between hover:shadow-sm transition-all duration-200 group`}
    >
      <div>
        <h3 className="font-medium text-gray-800">{statusInfo.title}</h3>
        <p className="text-sm text-gray-600 mt-1">{statusInfo.description}</p>
      </div>
      <div className="mr-2">{statusInfo.icon}</div>
    </button>
  );
};

export default StatusCard;
