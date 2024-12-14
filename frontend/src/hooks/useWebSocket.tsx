import { useEffect } from "react";
import { io } from "socket.io-client";

const useWebSocket = (
  onTelemetryUpdate: (data: any) => void,
  onLaunchUpdate: (data: any) => void
) => {
  useEffect(() => {
    const socket = io("http://localhost:3000", { transports: ["websocket"] });

    socket.on("telemetry-update", (data) => {
      console.log("Real-time Telemetry Update:", data);
      onTelemetryUpdate(data);
    });

    socket.on("launch-update", (data) => {
      console.log("Real-time Launch Update:", data);
      onLaunchUpdate(data);
    });

    socket.on("disconnect", (reason) => {
      console.warn(`WebSocket disconnected: ${reason}`);
    });

    return () => {
      socket.disconnect();
      console.log("WebSocket connection closed.");
    };
  }, [onTelemetryUpdate, onLaunchUpdate]);
};

export default useWebSocket;
