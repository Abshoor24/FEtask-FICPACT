import { useUpdateCompletedQuest } from "@/data/hooks/useQuest";



export default function TaskItem({
  title,
  tag,
  priority,
  onClick,
  completed,
}: {
  title: string;
  tag: string;
  priority?: "High" | "Medium";
  completed?: boolean;
  onClick?: () => void;
}) {
  
  return (
    <div className="flex items-center gap-4 rounded-xl bg-white p-4 shadow-sm mb-3">
      <input type="checkbox" checked={completed} readOnly className="w-5 h-5" />

      <div className="flex-1">
        <p className={`font-medium ${completed ? "line-through text-gray-400" : "text-gray-900"}`}>
          {title}
        </p>

        <div className="mt-1 flex gap-2 text-xs">
          
          <span className="rounded bg-purple-100 px-2 py-0.5 text-purple-600">
            {tag}
          </span>
        </div>
      </div>
    </div>
  );
}
