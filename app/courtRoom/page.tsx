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

  // DISTRACTION POPUPS
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
            onStart={(totalSec: number) => {
              setRemainingSeconds(totalSec);
              setTimerStarted(true);
            }}
            onTick={(sec: number) => setRemainingSeconds(sec)}
            onFinish={() => setTimerFinished(true)}
          />

          {timerStarted && (
            <TaskManager
              remainingSeconds={remainingSeconds}
              timerFinished={timerFinished}
              onPunish={(p: string) => setPunishment(p)}
            />
          )}

          {/* ⭐ NEW: Notification INSIDE white box */}
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
