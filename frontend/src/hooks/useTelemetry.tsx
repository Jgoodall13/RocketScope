import { useQuery } from "@tanstack/react-query";
import api from "../api/api";

const fetchTelemetry = async (launchId: number) => {
  const response = await api.get(`/telemetry/${launchId}`);
  return response.data;
};

export const useTelemetry = (launchId: number) => {
  return useQuery({
    queryKey: ["telemetry", launchId],
    queryFn: () => fetchTelemetry(launchId),
    enabled: !!launchId,
  });
};
