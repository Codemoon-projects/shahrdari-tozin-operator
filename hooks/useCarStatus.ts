import { useState, useEffect } from "react";

type CarStatus = "not-found" | "new" | "on-list";

export const useCarStatus = () => {
  const [carStatus, setCarStatus] = useState<CarStatus>("not-found");
  const [carDetails, setCarDetails] = useState<string>("");
  const [isConnected, setIsConnected] = useState<boolean>(false);
  const [connectionError, setConnectionError] = useState<string | null>(null);

  useEffect(() => {
    let eventSource: EventSource | undefined;

    const connectSSE = () => {
      // In a real implementation, this would connect to your backend SSE endpoint
      // For demo purposes, we'll simulate events
      setIsConnected(true);
      setConnectionError(null);

      // Simulate SSE with periodic events
      // In production, replace this with actual EventSource connection
      const simulateSSE = () => {
        const statuses: CarStatus[] = ["not-found", "new", "on-list"];
        const randomStatus =
          statuses[Math.floor(Math.random() * statuses.length)];
        const mockPlateNumber = `${Math.floor(
          Math.random() * 99
        )}${String.fromCharCode(
          65 + Math.floor(Math.random() * 26)
        )}${Math.floor(Math.random() * 999)}`;

        setCarStatus(randomStatus);
        setCarDetails(mockPlateNumber);

        // Log the simulated event
        console.log(
          `Car detection event: ${randomStatus} - Plate: ${mockPlateNumber}`
        );
      };

      // Simulate initial event after 2 seconds
      const initialTimeout = setTimeout(() => {
        simulateSSE();
      }, 2000);

      // Simulate new events every 8-15 seconds
      const interval = setInterval(() => {
        simulateSSE();
      }, 8000 + Math.random() * 7000);

      return () => {
        clearTimeout(initialTimeout);
        clearInterval(interval);
      };

      /* Real implementation would look like:
      
      try {
        eventSource = new EventSource('/api/car-detection-stream');
        
        eventSource.onopen = () => {
          setIsConnected(true);
          setConnectionError(null);
        };
        
        eventSource.onmessage = (event) => {
          const data = JSON.parse(event.data);
          setCarStatus(data.status);
          setCarDetails(data.plateNumber);
        };
        
        eventSource.onerror = (error) => {
          setConnectionError('Connection error. Reconnecting...');
          setIsConnected(false);
          eventSource?.close();
          // Attempt to reconnect after a delay
          setTimeout(connectSSE, 5000);
        };
        
      } catch (error) {
        setConnectionError(`Failed to connect: ${error.message}`);
        setIsConnected(false);
      }
      
      return () => {
        eventSource?.close();
      };
      */
    };

    const cleanup = connectSSE();

    return () => {
      if (cleanup) cleanup();
      if (eventSource) {
        eventSource.close();
      }
    };
  }, []);

  return {
    carStatus,
    carDetails,
    isConnected,
    connectionError,
  };
};

export default useCarStatus;
