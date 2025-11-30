"use client";

export default function DistractionPopup({ message, onClose }: any) {
  return (
    <div
      className="fade-in"
      style={{
        width: "100%",
        background: "rgba(255,255,255,0.95)",
        padding: "16px",
        borderRadius: "10px",
        boxShadow: "0 2px 10px rgba(0,0,0,0.15)",
      }}
    >
      <p className="font-semibold mb-3">{message}</p>

      <div className="flex justify-between">
        <button
          className="px-3 py-1 bg-blue-500 text-white rounded"
          onClick={onClose}
        >
          Reply
        </button>
        <button
          className="px-3 py-1 bg-gray-500 text-white rounded"
          onClick={onClose}
        >
          Ignore
        </button>
      </div>
    </div>
  );
}
