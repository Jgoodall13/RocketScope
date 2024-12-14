import React from "react";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
} from "recharts";

const TelemetryChart = ({ telemetryData }) => {
  const formattedData = telemetryData.map((data, index) => ({
    time: index + 1,
    altitude: data.altitude,
    velocity: data.velocity,
    fuelLevel: data.fuelLevel,
  }));

  return (
    <LineChart
      width={500}
      height={300}
      data={formattedData}
      margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis
        dataKey="time"
        label={{ value: "Time", position: "insideBottomRight", offset: -5 }}
      />
      <YAxis label={{ value: "Values", angle: -90, position: "insideLeft" }} />
      <Tooltip />
      <Legend />
      <Line
        type="monotone"
        dataKey="altitude"
        stroke="#8884d8"
        name="Altitude (m)"
      />
      <Line
        type="monotone"
        dataKey="velocity"
        stroke="#82ca9d"
        name="Velocity (m/s)"
      />
      <Line
        type="monotone"
        dataKey="fuelLevel"
        stroke="#ffc658"
        name="Fuel Level (%)"
      />
    </LineChart>
  );
};

export default TelemetryChart;
