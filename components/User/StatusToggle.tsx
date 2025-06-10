"use client";

import { useState } from "react";

interface StatusToggleProps {
  initialStatus?: boolean;
  onStatusChange?: (status: boolean) => void;
}

export default function StatusToggle({
  initialStatus = true,
  onStatusChange,
}: StatusToggleProps) {
  const [isOnline, setIsOnline] = useState(initialStatus);

  const toggleStatus = () => {
    const newStatus = !isOnline;
    setIsOnline(newStatus);
    onStatusChange?.(newStatus);
  };

  return (
    <div className="flex items-center gap-2" dir="ltr">
      <span
        className={`text-sm font-medium ${
          isOnline ? "text-green-600" : "text-gray-600"
        }`}
      >
        {isOnline ? "آنلاین" : "آفلاین"}
      </span>
      <button
        onClick={toggleStatus}
        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 ${
          isOnline
            ? "bg-green-600 focus:ring-green-500"
            : "bg-gray-200 focus:ring-gray-500"
        }`}
      >
        <span
          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
            isOnline ? "translate-x-6" : "translate-x-1"
          }`}
        />
      </button>
    </div>
  );
}
