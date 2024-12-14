import React, { createContext, useContext, useState, useEffect } from "react";
import api from "../api/api";

interface Launch {
  id: number;
  name: string;
  startTime: string;
  status: string;
  abortReason?: string | null;
}

interface Telemetry {
  id: number;
  altitude: number;
  velocity: number;
  fuelLevel: number;
  latitude: number;
  longitude: number;
  timestamp: string;
}

interface LaunchContextType {
  launchId: number | null;
  setLaunchId: (id: number) => void;
  launchData: Launch | null;
  setLaunchData: (data: Launch | null) => void;
  telemetryData: Telemetry[];
  setTelemetryData: React.Dispatch<React.SetStateAction<Telemetry[]>>;
  refreshLaunchData: () => void;
}

const LaunchContext = createContext<LaunchContextType | undefined>(undefined);

export const LaunchProvider = ({ children }: { children: React.ReactNode }) => {
  const [launchId, setLaunchId] = useState<number | null>(null);
  const [launchData, setLaunchData] = useState<Launch | null>(null);
  const [telemetryData, setTelemetryData] = useState<Telemetry[]>([]);

  const refreshLaunchData = async () => {
    if (!launchId) return;
    try {
      const response = await api.get(`/launches/${launchId}`);
      setLaunchData(response.data);
    } catch (error) {
      console.error("Error fetching launch data:", error);
      alert("Failed to fetch launch data. Please try again later.");
    }
  };

  useEffect(() => {
    refreshLaunchData();
  }, [launchId]);

  return (
    <LaunchContext.Provider
      value={{
        launchId,
        setLaunchId,
        launchData,
        setLaunchData,
        telemetryData,
        setTelemetryData,
        refreshLaunchData,
      }}
    >
      {children}
    </LaunchContext.Provider>
  );
};

export const useLaunchContext = () => {
  const context = useContext(LaunchContext);
  if (!context) {
    throw new Error("useLaunchContext must be used within a LaunchProvider");
  }
  return context;
};
