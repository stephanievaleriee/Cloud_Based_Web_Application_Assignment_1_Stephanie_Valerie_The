export async function getSessionLogs(sessionId: string) {
  const baseUrl =
    process.env.NODE_ENV === "production"
      ? "https://cloud-based-web-application-assignm.vercel.app"
      : "http://localhost:3000";

  const res = await fetch(
    `${baseUrl}/api/session-logs?sessionId=${sessionId}`,
    { cache: "no-store" }
  );

  if (!res.ok) {
    console.error("❌ Failed to fetch session logs");
    return [];
  }

  const data = await res.json();
  return data.logs ?? [];
}
