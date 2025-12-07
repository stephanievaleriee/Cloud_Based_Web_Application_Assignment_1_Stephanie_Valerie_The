"use client";

import { useState, useEffect } from "react";
import OverlayPanel from "./components/overlayPanel";
import Timer from "./components/timer";
import TaskManager from "./components/taskManager";
import DistractionPopup from "./components/distractionPopup";
import CourtroomPunishment from "./components/courtroomPunishment";

export default function CourtRoomPage() {
  const [timerStarted, setTimerStarted] = useState(false);
  const [timerFinished, setTimerFinished] = useState(false);
  const [remainingSeconds, setRemainingSeconds] = useState(0);
  const [popup, setPopup] = useState("");
  const [punishment, setPunishment] = useState("");

  // ✅ DISTRACTION POPUPS (UNCHANGED)
  useEffect(() => {
    if (!timerStarted) return;

    const messages = [
      "Boss: Are you done with sprint 1?",
      "Family: Can you pick up the kids?",
      "Agile Team: Please update the UI color.",
      "System: Meeting in 10 minutes!",
    ];

    const interval = setInterval(() => {
      setPopup(messages[Math.floor(Math.random() * messages.length)]);
    }, Math.random() * 8000 + 15000);

    return () => clearInterval(interval);
  }, [timerStarted]);

  // ✅ SAVE PROGRESS (UNCHANGED)
  async function saveProgress() {
    await fetch("/api/session-progress", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        sessionId: "test-session-1",
        timeRemaining: remainingSeconds,
        stage: 1,
      }),
    });

    alert("✅ Progress Saved!");
  }

  if (punishment) {
    return (
      <CourtroomPunishment
        type={punishment}
        onReset={() => window.location.reload()}
      />
    );
  }

  return (
    <div
      style={{
        backgroundImage: "url('/workdesk.jpeg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "100vh",
        padding: "40px 20px",
      }}
    >
      <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
        <OverlayPanel>
          <Timer
            onStart={async (totalSec: number) => {
              setRemainingSeconds(totalSec);
              setTimerStarted(true);

              // ✅ ✅ ✅ RESTORED: AUTO BACKLOG ENTRY WHEN SESSION STARTS
              await fetch("/api/session-logs", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                  sessionId: "test-session-1",
                  event: "Session Started",
                  details: `Started with ${Math.floor(totalSec / 60)} minutes`,
                }),
              });
            }}
            onTick={(sec: number) => setRemainingSeconds(sec)}
            onFinish={async () => {
              setTimerFinished(true);

              // ✅ Optional: Log finish (safe)
              await fetch("/api/session-logs", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                  sessionId: "test-session-1",
                  event: "Session Finished",
                  details: "Timer completed",
                }),
              });
            }}
          />

          {timerStarted && (
            <TaskManager
              remainingSeconds={remainingSeconds}
              timerFinished={timerFinished}
              onPunish={(p: string) => setPunishment(p)}
              onSaveProgress={saveProgress}
            />
          )}

          {timerStarted && popup && (
            <div style={{ marginTop: "20px" }}>
              <DistractionPopup message={popup} onClose={() => setPopup("")} />
            </div>
          )}
        </OverlayPanel>
      </div>
    </div>
  );
}
