import React, { useEffect } from "react";
import { useLaunchContext } from "../context/LaunchContext";
import TelemetryChart from "../components/TelemetryChart";
import MapVisualization from "../components/MapVisualization";
import useWebSocket from "../hooks/useWebSocket";

const SimulationPage = () => {
  const { telemetryData, setTelemetryData } = useLaunchContext();

  useWebSocket(
    (telemetryUpdate) => {
      setTelemetryData((prev) => [...prev, telemetryUpdate]);
    },
    () => {}
  );

  useEffect(() => {
    console.log("Telemetry Data:", telemetryData);
  }, [telemetryData]);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Simulation</h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="bg-white shadow rounded p-4">
          <h2 className="text-xl font-bold mb-2">Telemetry Data</h2>
          <TelemetryChart telemetryData={telemetryData} />
        </div>
        <div className="bg-white shadow rounded p-4">
          <h2 className="text-xl font-bold mb-2">Map Visualization</h2>
          <MapVisualization />
        </div>
      </div>
    </div>
  );
};

export default SimulationPage;
