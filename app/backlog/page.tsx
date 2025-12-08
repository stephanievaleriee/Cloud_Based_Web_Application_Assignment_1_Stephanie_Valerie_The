export const dynamic = "force-dynamic";

import { getSessionLogs } from "@/services/sessionLogService";
import BacklogTable from "./BacklogTable";

export default async function BacklogPage() {
  try {
    const result = await getSessionLogs("test-session-1");

    const logs = Array.isArray(result) ? result : result?.logs ?? [];

    return (
      <div className="p-6 text-white">
        <h1 className="text-2xl font-semibold mb-6">Session Backlog</h1>

        {logs.length === 0 ? (
          <p className="text-gray-400">No session logs found.</p>
        ) : (
          <BacklogTable logs={logs} />
        )}
      </div>
    );
  } catch (error) {
    console.error("BACKLOG ERROR:", error);

    return (
      <div className="p-6 text-white">
        <h1 className="text-2xl font-semibold mb-6">Session Backlog</h1>
        <p className="text-red-400">Failed to load session logs.</p>
      </div>
    );
  }
}
