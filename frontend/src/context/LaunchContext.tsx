import React, { createContext, useContext, useState, useEffect } from "react";
import api from "../api/api";

interface Launch {
  id: number;
  name: string;
  startTime: string;
  status: string;
  abortReason?: string | null;
}

interface TelemetryData {
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
  setLaunchId: (id: number | null) => void;
  launchData: Launch | null;
  setLaunchData: (data: Launch | null) => void;
  telemetryData: TelemetryData[];
  setTelemetryData: (data: TelemetryData[]) => void;
  refreshLaunchData: () => void;
}

const LaunchContext = createContext<LaunchContextType | undefined>(undefined);

export const LaunchProvider = ({ children }: { children: React.ReactNode }) => {
  const [launchId, setLaunchId] = useState<number | null>(null);
  const [launchData, setLaunchData] = useState<Launch | null>(null);
  const [telemetryData, setTelemetryData] = useState<TelemetryData[]>([]);

  const refreshLaunchData = async () => {
    if (!launchId) return;
    try {
      const response = await api.get(`/launches/${launchId}`);
      setLaunchData(response.data);
    } catch (error) {
      console.error("Error fetching launch data:", error);
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

export const useLaunchContext = (): LaunchContextType => {
  const context = useContext(LaunchContext);
  if (!context) {
    throw new Error("useLaunchContext must be used within a LaunchProvider");
  }
  return context;
};
