import { useState, useEffect } from "react";

type CarStatus = "not-found" | "new" | "on-list";

export const useCarStatus = () => {
  const [carStatus, setCarStatus] = useState<CarStatus>("not-found");
  const [carDetails, setCarDetails] = useState<string>("");
  const [isConnected, setIsConnected] = useState<boolean>(false);
  const [connectionError, setConnectionError] = useState<string | null>(null);

  return {
    carStatus,
    carDetails,
    isConnected,
    connectionError,
  };
};

export default useCarStatus;
