import { MapContainer, TileLayer, Polyline, Marker } from "react-leaflet";
import { useTelemetry } from "../hooks/useTelemetry";
import { useLaunchContext } from "../context/LaunchContext";

const MapVisualization = () => {
  const { launchId } = useLaunchContext();
  const { data: telemetryData, isLoading, error } = useTelemetry(launchId || 0);

  if (!launchId) return <p>Please select a launch to view the map.</p>;
  if (isLoading) return <p>Loading map data...</p>;
  if (error) return <p>Error loading map data.</p>;

  // Convert telemetry data into [latitude, longitude] pairs
  const trajectory = telemetryData.map((point: any) => [
    point.latitude,
    point.longitude,
  ]);

  console.log("Trajectory Data:", trajectory);

  return (
    <div className="bg-white shadow rounded p-4">
      <h2 className="text-xl font-bold mb-2">Map Visualization</h2>
      <MapContainer
        center={trajectory[0] || [0, 0]} // Center on the first point
        zoom={5}
        style={{ height: "400px", width: "100%" }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />

        {/* Trajectory Line */}
        {trajectory.length > 1 && (
          <Polyline positions={trajectory} color="blue" />
        )}

        {/* End Marker */}
        {trajectory.length > 0 && (
          <Marker position={trajectory[trajectory.length - 1]} />
        )}
      </MapContainer>
    </div>
  );
};

export default MapVisualization;
