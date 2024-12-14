import { useTelemetry } from "../hooks/useTelemetry";
import { useLaunchContext } from "../context/LaunchContext";

const TelemetryDisplay = () => {
  const { launchId } = useLaunchContext();
  const { data: telemetryData, isLoading, error } = useTelemetry(launchId || 0);

  console.log(`TelemetryDisplay is using launchId: ${launchId}`);

  if (!launchId) return <p>Please select a launch to view telemetry data.</p>;
  if (isLoading) return <p>Loading telemetry data...</p>;
  if (error) return <p>Error fetching telemetry data</p>;

  return (
    <div className="bg-white shadow rounded p-4">
      <h2 className="text-xl font-bold mb-2">Telemetry Data</h2>
      <ul className="space-y-2">
        {telemetryData.map((data: any) => (
          <li key={data.id} className="text-gray-700">
            <p>
              <strong>Altitude:</strong> {data.altitude} m
            </p>
            <p>
              <strong>Velocity:</strong> {data.velocity} m/s
            </p>
            <p>
              <strong>Fuel Level:</strong> {data.fuelLevel * 100}%
            </p>
            <p>
              <strong>Timestamp:</strong>{" "}
              {new Date(data.timestamp).toLocaleString()}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TelemetryDisplay;
