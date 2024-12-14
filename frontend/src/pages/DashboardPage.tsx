import { useCallback } from "react";
import { useLaunches } from "../hooks/useLaunches";
import { useLaunchContext } from "../context/LaunchContext";
import TelemetryDisplay from "../components/TelemetryDisplay";
import MapVisualization from "../components/MapVisualization";
import ControlPanel from "../components/ControlPanel";
import useWebSocket from "../hooks/useWebSocket";

const DashboardPage = () => {
  const { data: launches, isLoading, error } = useLaunches();
  const { setLaunchId, launchData, setLaunchData, setTelemetryData } =
    useLaunchContext();

  // Use `useCallback` to ensure stable function references
  const handleTelemetryUpdate = useCallback(
    (telemetryUpdate: any) => {
      setTelemetryData((prev) => [...prev, telemetryUpdate]);
    },
    [setTelemetryData]
  );

  const handleLaunchUpdate = useCallback(
    (launchUpdate: any) => {
      setLaunchData(launchUpdate);
    },
    [setLaunchData]
  );

  // Initialize WebSocket with callbacks
  useWebSocket(handleTelemetryUpdate, handleLaunchUpdate);

  if (isLoading)
    return <p className="text-center text-gray-500">Loading launches...</p>;
  if (error)
    return <p className="text-center text-red-500">Error fetching launches</p>;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 p-4">
      <div className="col-span-2">
        <h1 className="text-3xl font-bold mb-4">Dashboard</h1>
      </div>

      <div className="col-span-1">
        <div className="bg-white shadow rounded p-4">
          <h2 className="text-xl font-bold mb-2">Launches</h2>
          <ul className="space-y-2">
            {launches.map((launch: any) => (
              <li
                key={launch.id}
                className="cursor-pointer hover:bg-gray-100 p-2 rounded border-b"
                onClick={() => setLaunchId(launch.id)}
              >
                {launch.name}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="col-span-1">
        {launchData ? (
          <div className="bg-white shadow rounded p-4">
            <h2 className="text-xl font-bold mb-2">Launch Details</h2>
            <p>
              <strong>Name:</strong> {launchData.name}
            </p>
            <p>
              <strong>Status:</strong>{" "}
              <span
                className={`font-semibold ${
                  launchData.status === "Aborted"
                    ? "text-red-500"
                    : "text-green-500"
                }`}
              >
                {launchData.status}
              </span>
            </p>
            {launchData.abortReason && (
              <p>
                <strong>Abort Reason:</strong> {launchData.abortReason}
              </p>
            )}
          </div>
        ) : (
          <div className="bg-white shadow rounded p-4">
            <p className="text-gray-500">
              Please select a launch to view details.
            </p>
          </div>
        )}
      </div>

      <div className="col-span-1 space-y-4">
        <TelemetryDisplay />
      </div>
      <div className="col-span-1 space-y-4">
        <MapVisualization />
      </div>
      <div className="col-span-2 space-y-4">
        <ControlPanel />
      </div>
    </div>
  );
};

export default DashboardPage;
