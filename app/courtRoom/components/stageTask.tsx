"use client";

export default function StageTask({ task, completedRequirements }: any) {
  return (
    <div>
      <h2 className="text-xl font-bold mb-4">{task.title}</h2>

      {task.requirements.map((req: any) => {
        const done = completedRequirements[req.id];

        return (
          <div key={req.id} className="flex justify-between mb-2">
            <span>{done ? "✔️" : "❌"} {req.label}</span>
            <span
              className="text-blue-600 cursor-pointer"
              onClick={() => alert(req.hint)}
            >
              Hint
            </span>
          </div>
        );
      })}
    </div>
  );
}
