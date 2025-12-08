import { prisma } from "@/lib/prisma";

export async function GET() {
  const logs = await prisma.sessionLog.findMany({
    orderBy: { createdAt: "desc" },
    take: 20, 
  });

  const rows = logs
    .map(
      (log) => `
        <tr>
          <td>${log.id}</td>
          <td>${log.sessionId}</td>
          <td>${log.event}</td>
          <td>${log.details ?? "-"}</td>
          <td>${new Date(log.createdAt).toLocaleString()}</td>
        </tr>
      `
    )
    .join("");

  const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <title>Session Log Report</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            padding: 40px;
            background: #111;
            color: #eee;
          }
          h1 {
            margin-bottom: 20px;
          }
          table {
            width: 100%;
            border-collapse: collapse;
            background: #1f1f1f;
          }
          th, td {
            border: 1px solid #555;
            padding: 10px;
            text-align: left;
          }
          th {
            background: #333;
          }
        </style>
      </head>
      <body>
        <h1>Session Log Report (Live from Cloud DB)</h1>
        <p>Generated at: ${new Date().toLocaleString()}</p>

        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Session</th>
              <th>Event</th>
              <th>Details</th>
              <th>Timestamp</th>
            </tr>
          </thead>
          <tbody>
            ${rows}
          </tbody>
        </table>
      </body>
    </html>
  `;

  return new Response(html, {
    headers: {
      "Content-Type": "text/html",
    },
  });
}
