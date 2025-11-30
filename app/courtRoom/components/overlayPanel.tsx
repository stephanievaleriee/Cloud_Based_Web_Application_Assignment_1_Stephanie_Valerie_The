"use client";

export default function OverlayPanel({ children }: any) {
  return (
    <div
      style={{
        background: "rgba(255,255,255,0.88)",
        backdropFilter: "blur(6px)",
        borderRadius: "12px",
        boxShadow: "0 4px 20px rgba(0,0,0,0.15)",
        padding: "20px",

        height: "690px",
        maxHeight: "690px",

        overflowY: "auto",

        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
      }}
    >
      {children}
    </div>
  );
}
