"use client";

import { useState, useEffect, useRef } from "react";
import StageTask from "./stageTask";
import CodeEditor from "./codeEditor";
import StageNotification from "./stageNotification";
import { tasks } from "../data/tasks";

export default function TaskManager({ remainingSeconds, timerFinished, onPunish }: any) {
  const [stage, setStage] = useState(1);
  const [completedReq, setCompletedReq] = useState<any>({});
  const [notification, setNotification] = useState<any>(null);

  const warnRef = useRef<any>(null);
  const urgentRef = useRef<any>(null);
  const punishRef = useRef<any>(null);

  const current = tasks[stage - 1];

  const clearTimers = () => {
    if (warnRef.current) clearTimeout(warnRef.current);
    if (urgentRef.current) clearTimeout(urgentRef.current);
    if (punishRef.current) clearTimeout(punishRef.current);
  };

  // IF GLOBAL TIMER ENDS → punish immediately
  useEffect(() => {
    if (timerFinished) {
      clearTimers();
      onPunish(current.punishment);
    }
  }, [timerFinished]);

  // ⭐ STAGE TIMING BASED ON REMAINING TIMER
  useEffect(() => {
    clearTimers();

    const stageStartTime = remainingSeconds; // time left at stage start

    const warningDelay = (stageStartTime / 2) * 1000;
    const urgentDelay = Math.max(0, (stageStartTime - 5)) * 1000;
    const punishDelay = stageStartTime * 1000;

    // WARNING
    warnRef.current = setTimeout(() => {
      setNotification({
        type: "warning",
        message: `Warning: "${current.title}" needs attention soon.`,
      });
      setTimeout(() => setNotification(null), 2000);
    }, warningDelay);

    // URGENT
    urgentRef.current = setTimeout(() => {
      setNotification({
        type: "urgent",
        message: `URGENT: "${current.title}" must be fixed NOW!`,
      });
      setTimeout(() => setNotification(null), 2000);
    }, urgentDelay);

    // PUNISH
    punishRef.current = setTimeout(() => {
      const allGood = Object.values(completedReq).every(Boolean);
      if (!allGood) onPunish(current.punishment);
    }, punishDelay);

    return () => clearTimers();
  }, [stage]);

  const handleCheck = (code: string) => {
    const pass = current.validator(code);

    if (!pass) {
      alert("Incorrect code — try again!");
      return;
    }

    const done: any = {};
    current.requirements.forEach((r) => (done[r.id] = true));
    setCompletedReq(done);

    clearTimers();

    setTimeout(() => {
      if (stage === tasks.length) {
        alert("🎉 All tasks completed!");
        window.location.reload();
      } else {
        setStage(stage + 1);
        setCompletedReq({});
      }
    }, 350);
  };

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 fade-in">
        <StageTask task={current} completedRequirements={completedReq} />
        <CodeEditor starter={current.starterCode} onCheck={handleCheck} />
      </div>

      {notification && (
        <StageNotification type={notification.type} message={notification.message} />
      )}
    </>
  );
}
