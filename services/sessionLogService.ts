export async function logSessionEvent(
  sessionId: string,
  event: string,
  details?: string
) {
  await fetch("/api/session-logs", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ sessionId, event, details }),
  });
}

export async function getSessionLogs(sessionId: string) {
  const res = await fetch(
    `/api/session-logs?sessionId=${sessionId}`,
    { cache: "no-store" }
  );

  if (!res.ok) {
    console.error("❌ Failed to fetch session logs");
    return [];
  }

  const data = await res.json();
  return data.logs ?? [];
}
