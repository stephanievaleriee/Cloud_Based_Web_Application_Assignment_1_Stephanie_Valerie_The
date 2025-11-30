"use client";
import { useState, useEffect } from "react";

export default function Timer({ onStart, onTick, onFinish }: any) {
  const [minutes, setMinutes] = useState(1);
  const [secondsLeft, setSecondsLeft] = useState(0);
  const [running, setRunning] = useState(false);
  const [hasStartedBefore, setHasStartedBefore] = useState(false);

  // ---------- HANDLE COUNTDOWN ----------
  useEffect(() => {
    if (!running) return;

    if (secondsLeft <= 0) {
      setRunning(false);
      onFinish();
      return;
    }

    const t = setTimeout(() => {
      setSecondsLeft((s) => {
        const next = s - 1;
        onTick(next);
        return next;
      });
    }, 1000);

    return () => clearTimeout(t);
  }, [running, secondsLeft]);

  // ---------- START / RESUME TIMER ----------
  const start = () => {
    // FIRST TIME START → initialize
    if (!hasStartedBefore) {
      const total = Math.max(1, Number(minutes)) * 60;
      setSecondsLeft(total);
      onStart(total);
      onTick(total);
      setHasStartedBefore(true);
      setRunning(true);
      return;
    }

    // RESUME → do not reset secondsLeft
    setRunning(true);
  };

  // ---------- STOP / PAUSE TIMER ----------
  const stop = () => {
    setRunning(false);
  };

  // ---------- RESET (RELOAD PAGE COMPLETELY) ----------
  const reset = () => {
    window.location.reload();
  };

  // ---------- TIME DISPLAY ----------
  const display = `${String(Math.floor(secondsLeft / 60)).padStart(2, "0")}:${String(
    secondsLeft % 60
  ).padStart(2, "0")}`;

  return (
    <div style={{ marginBottom: "20px" }}>
      <h2 className="font-bold mb-2">Countdown Timer</h2>

      <div className="flex gap-2 items-center mb-2">
        <input
          type="number"
          min={1}
          value={minutes}
          onChange={(e) => setMinutes(Number(e.target.value))}
          className="border rounded px-3 py-2"
          disabled={hasStartedBefore} // lock input after starting
        />
        <span>minutes</span>
      </div>

      <div className="text-3xl font-semibold mb-3">{display}</div>

      <div className="flex gap-2">
        <button
          onClick={start}
          className="px-4 py-2 bg-blue-600 text-white rounded"
        >
          Start
        </button>

        <button
          onClick={stop}
          className="px-4 py-2 bg-gray-600 text-white rounded"
        >
          Stop
        </button>

        <button
          onClick={reset}
          className="px-4 py-2 bg-red-600 text-white rounded"
        >
          Reset
        </button>
      </div>
    </div>
  );
}
