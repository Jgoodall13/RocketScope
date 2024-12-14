import { useQuery } from "@tanstack/react-query";
import api from "../api/api";

const fetchLaunches = async () => {
  const response = await api.get("/launches");
  console.log(response.data);
  return response.data;
};

export const useLaunches = () => {
  return useQuery({
    queryKey: ["launches"],
    queryFn: fetchLaunches,
  });
};
