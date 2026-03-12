import { X } from "lucide-react";

export default function TaskItem({
  title,
  tag,
  priority,
  onClick,
  completed,
  failed,
}: {
  title: string;
  tag: string;
  priority?: "High" | "Medium";
  completed?: boolean;
  failed?: boolean;
  onClick?: () => void;
}) {
  return (
    <div className="flex items-center gap-4 rounded-xl bg-white p-4 shadow-sm mb-3">
      {/* Checkbox / Status Indicator */}
      {failed ? (
        <div className="w-5 h-5 flex items-center justify-center rounded bg-red-100">
          <X size={14} className="text-red-500 stroke-[3]" />
        </div>
      ) : (
        <input
          type="checkbox"
          checked={completed}
          readOnly
          onClick={onClick}
          className="w-5 h-5 cursor-pointer accent-purple-600"
        />
      )}

      <div className="flex-1">
        <p
          className={`font-medium ${
            completed
              ? "line-through text-gray-400"
              : failed
                ? "line-through text-red-400"
                : "text-gray-900"
          }`}
        >
          {title}
        </p>

        <div className="mt-1 flex gap-2 text-xs">
          <span
            className={`rounded px-2 py-0.5 ${
              failed
                ? "bg-red-100 text-red-500"
                : completed
                  ? "bg-green-100 text-green-600"
                  : "bg-purple-100 text-purple-600"
            }`}
          >
            {tag}
          </span>
        </div>
      </div>
    </div>
  );
}
