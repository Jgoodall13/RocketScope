import { useQuery } from "@tanstack/react-query";
import api from "../api/api";

const LogsPage = () => {
  const {
    data: logs,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["abortedLaunches"],
    queryFn: async () => {
      const response = await api.get("/launches/aborted");
      return response.data;
    },
  });

  if (isLoading)
    return <p className="text-center text-gray-500">Loading logs...</p>;
  if (error)
    return <p className="text-center text-red-500">Error fetching logs</p>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Aborted Launch Logs</h1>
      <table className="min-w-full bg-white border border-gray-200">
        <thead>
          <tr className="bg-gray-100 border-b">
            <th className="border px-4 py-2 text-left">Name</th>
            <th className="border px-4 py-2 text-left">Timestamp</th>
            <th className="border px-4 py-2 text-left">Abort Reason</th>
          </tr>
        </thead>
        <tbody>
          {logs?.map((log: any) => (
            <tr key={log.id} className="border-b hover:bg-gray-50">
              <td className="border px-4 py-2">{log.name}</td>
              <td className="border px-4 py-2">
                {new Date(log.startTime).toLocaleString()}
              </td>
              <td className="border px-4 py-2">{log.abortReason || "N/A"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default LogsPage;
