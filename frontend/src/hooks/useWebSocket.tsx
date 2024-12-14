import { useEffect } from "react";
import { io } from "socket.io-client";

const useWebSocket = (
  onTelemetryUpdate: (data: any) => void,
  onLaunchUpdate: (data: any) => void
) => {
  useEffect(() => {
    const socket = io("http://localhost:3000", {
      transports: ["websocket"],
      reconnection: true, // Automatically try to reconnect
      reconnectionAttempts: 10, // Retry up to 10 times
      timeout: 5000, // Wait 5 seconds for the connection to establish
    });

    socket.on("connect", () => {
      console.log("WebSocket connected!");
    });

    socket.on("disconnect", (reason) => {
      console.warn("WebSocket disconnected:", reason);
    });

    socket.on("connect_error", (error) => {
      console.error("WebSocket connection error:", error);
    });

    socket.on("telemetry-update", (data) => {
      console.log("Real-time Telemetry Update:", data);
      onTelemetryUpdate(data);
    });

    socket.on("launch-update", (data) => {
      console.log("Real-time Launch Update:", data);
      onLaunchUpdate(data);
    });

    return () => {
      socket.disconnect();
    };
  }, [onTelemetryUpdate, onLaunchUpdate]);
};

export default useWebSocket;
