"use client";

type Log = {
  id: number;
  sessionId: string;
  event: string;
  details: string | null;
  createdAt: string;
};

export default function BacklogTable({ logs }: { logs: Log[] }) {
  if (logs.length === 0) {
    return <p className="text-white">No logs recorded yet.</p>;
  }

  return (
    <table className="w-full text-sm border-collapse border border-gray-600 text-white">
      <thead>
        <tr className="bg-gray-700">
          <th className="px-3 py-2 border border-gray-600">ID</th>
          <th className="px-3 py-2 border border-gray-600">Event</th>
          <th className="px-3 py-2 border border-gray-600">Details</th>
          <th className="px-3 py-2 border border-gray-600">Timestamp</th>
          <th className="px-3 py-2 border border-gray-600">Actions</th>
        </tr>
      </thead>

      <tbody>
        {logs.map((log) => (
          <tr key={log.id} className="bg-gray-800 hover:bg-gray-700">
            <td className="px-3 py-2 border border-gray-600">{log.id}</td>
            <td className="px-3 py-2 border border-gray-600">{log.event}</td>
            <td className="px-3 py-2 border border-gray-600">
              {log.details || "-"}
            </td>
            <td className="px-3 py-2 border border-gray-600">
              {new Date(log.createdAt).toLocaleString()}
            </td>

            {/* ✅ ACTIONS */}
            <td className="px-3 py-2 border border-gray-600 space-x-4">
              {/* ✅ EDIT */}
              <button
                className="text-blue-400 hover:underline"
                onClick={async () => {
                  const newDetails = prompt("Enter updated log details:");
                  if (!newDetails) return;

                  const res = await fetch(`/api/session-logs/${log.id}`, {
                    method: "PATCH",
                    headers: {
                      "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ newDetails }),
                  });

                  if (!res.ok) {
                    alert("Edit failed");
                    return;
                  }

                  location.reload();
                }}
              >
                Edit
              </button>

              {/* ✅ DELETE */}
              <button
                className="text-red-400 hover:underline"
                onClick={async () => {
                  const sure = confirm("Delete this log?");
                  if (!sure) return;

                  const res = await fetch(`/api/session-logs/${log.id}`, {
                    method: "DELETE",
                  });

                  if (!res.ok) {
                    alert("Delete failed");
                    return;
                  }

                  location.reload();
                }}
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
