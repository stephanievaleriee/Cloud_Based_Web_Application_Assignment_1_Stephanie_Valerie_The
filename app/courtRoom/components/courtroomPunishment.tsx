"use client";

export default function CourtroomPunishment({ type, onReset }: any) {
  const msg: any = {
    disability: "You violated the Disability Act!",
    bankruptcy: "You went bankrupt due to insecure login!",
    tort: "You caused a Tort breach — system compromised!"
  };

  return (
    <div
      style={{
        backgroundImage: "url('/courtroom.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "100vh",
        padding: "40px 20px",
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-start",
      }}
      className="fade-in"
    >
      <div
        style={{
          background: "rgba(255,255,255,0.92)",
          padding: "30px",
          borderRadius: "12px",
          maxWidth: "420px",
          marginTop: "20px",
          boxShadow: "0 4px 20px rgba(0,0,0,0.18)"
        }}
      >
        <h1 className="text-2xl font-bold mb-4">{msg[type]}</h1>

        <button
          onClick={onReset}
          className="px-4 py-2 bg-red-600 text-white rounded"
        >
          Back to Start
        </button>
      </div>
    </div>
  );
}
