"use client";

export default function StageNotification({ type, message }: any) {
  const bg =
    type === "urgent"
      ? "rgba(255,75,75,0.95)"
      : "rgba(255,195,0,0.95)";

  return (
    <div
      className="fade-in"
      style={{
        position: "fixed",
        top: "20px",
        right: "20px",
        padding: "14px 18px",
        background: bg,
        borderRadius: "10px",
        color: "white",
        fontWeight: "600",
        zIndex: 9999,
      }}
    >
      {message}
    </div>
  );
}
