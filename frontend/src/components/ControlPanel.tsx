import React, { useState } from "react";
import api from "../api/api";
import { useLaunchContext } from "../context/LaunchContext";

const ControlPanel = () => {
  const { launchId, refreshLaunchData } = useLaunchContext();
  const [abortReason, setAbortReason] = useState<string>("Weather");

  const handleStartLaunch = async () => {
    if (!launchId) return;
    try {
      await api.patch(`/launches/${launchId}/start`);
      console.log("Launch started!");
      refreshLaunchData();
    } catch (error) {
      console.error("Error starting launch:", error);
    }
  };

  const handleAbortLaunch = async () => {
    if (!launchId) return;
    try {
      await api.patch(`/launches/${launchId}/abort`, { reason: abortReason });
      console.log("Launch aborted with reason:", abortReason);
      refreshLaunchData();
    } catch (error) {
      console.error("Error aborting launch:", error);
    }
  };

  return (
    <div className="bg-white shadow rounded p-4">
      <h2 className="text-xl font-bold mb-2">Control Panel</h2>
      <div className="space-y-2">
        <button
          className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
          onClick={handleStartLaunch}
        >
          Start Launch
        </button>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Abort Reason
          </label>
          <select
            value={abortReason}
            onChange={(e) => setAbortReason(e.target.value)}
            className="w-full border border-gray-300 rounded px-2 py-1"
          >
            <option value="Weather">Weather</option>
            <option value="System Failure">System Failure</option>
            <option value="Manual Override">Manual Override</option>
          </select>
        </div>

        <button
          className="w-full bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
          onClick={handleAbortLaunch}
        >
          Abort Launch
        </button>
      </div>
    </div>
  );
};

export default ControlPanel;
