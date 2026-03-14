import { motion } from "framer-motion";
import { fadeUp } from "@/components/motion";
import { X, Clock, CalendarDays, Flame, Zap } from "lucide-react";
import { questService } from "@/data/services/questService";

export default function UpcomingTaskItem({
  title,
  tag,
  priority,
  deadline,
  onClick,
  completed,
  failed,
}: {
  title: string;
  tag: string;
  priority?: "High" | "Medium" | "Low";
  deadline?: string;
  completed?: boolean;
  failed?: boolean;
  onClick?: () => void;
}) {
  const priorityConfig = {
    High: {
      icon: <Flame size={12} />,
      bg: "bg-red-50",
      text: "text-red-500",
      border: "border-red-200",
    },
    Medium: {
      icon: <Zap size={12} />,
      bg: "bg-amber-50",
      text: "text-amber-500",
      border: "border-amber-200",
    },
    Low: {
      icon: <Clock size={12} />,
      bg: "bg-blue-50",
      text: "text-blue-500",
      border: "border-blue-200",
    },
  };

  const pConfig = priority ? priorityConfig[priority] : priorityConfig.Medium;

  const timeLeft = deadline ? questService.getTimeLeft(deadline) : null;
  const isOverdue = timeLeft === "Overdue";

  return (
    <motion.div
      variants={fadeUp}
      whileHover={{
        y: -2,
        boxShadow: "0 8px 25px -5px rgba(124, 59, 237, 0.1)",
      }}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
      className={`group flex items-center gap-4 rounded-2xl bg-white p-4 shadow-sm mb-3 border border-gray-100 transition-colors ${
        completed
          ? "bg-green-50/40 border-green-100"
          : failed
            ? "bg-red-50/40 border-red-100"
            : "hover:border-purple-200"
      }`}
    >
      {/* Checkbox / Status */}
      {failed ? (
        <div className="w-6 h-6 flex items-center justify-center rounded-lg bg-red-100 shrink-0">
          <X size={14} className="text-red-500 stroke-[3]" />
        </div>
      ) : (
        <div className="relative shrink-0">
          <input
            type="checkbox"
            checked={completed}
            readOnly
            onClick={onClick}
            className="peer w-6 h-6 cursor-pointer appearance-none rounded-lg border-2 border-gray-200 checked:border-purple-500 checked:bg-purple-500 transition-all duration-200"
          />
          {completed && (
            <svg
              className="absolute top-1 left-1 w-4 h-4 text-white pointer-events-none"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={3}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5 13l4 4L19 7"
              />
            </svg>
          )}
        </div>
      )}

      {/* Content */}
      <div className="flex-1 min-w-0">
        <p
          className={`font-medium truncate ${
            completed
              ? "line-through text-gray-400"
              : failed
                ? "line-through text-red-400"
                : "text-gray-800"
          }`}
        >
          {title}
        </p>

        <div className="mt-1.5 flex items-center gap-2 flex-wrap">
          {/* Status Tag */}
          <span
            className={`inline-flex items-center gap-1 rounded-lg px-2 py-0.5 text-xs font-medium ${
              failed
                ? "bg-red-100 text-red-500"
                : completed
                  ? "bg-green-100 text-green-600"
                  : "bg-purple-100 text-purple-600"
            }`}
          >
            {tag}
          </span>

          {/* Priority Badge */}
          {priority && (
            <span
              className={`inline-flex items-center gap-1 rounded-lg px-2 py-0.5 text-xs font-medium border ${pConfig.bg} ${pConfig.text} ${pConfig.border}`}
            >
              {pConfig.icon}
              {priority}
            </span>
          )}
        </div>
      </div>

      {/* Right: Deadline Info */}
      {deadline && (
        <div className="flex flex-col items-end gap-1 shrink-0">
          <div
            className={`flex items-center gap-1.5 text-xs font-medium ${
              isOverdue
                ? "text-red-500"
                : "text-gray-400 group-hover:text-purple-500"
            } transition-colors`}
          >
            <CalendarDays size={13} />
            <span>{questService.formatDeadline(deadline)}</span>
          </div>
          {timeLeft && !completed && !failed && (
            <span
              className={`text-[11px] font-semibold px-2 py-0.5 rounded-md ${
                isOverdue
                  ? "bg-red-50 text-red-500"
                  : "bg-purple-50 text-purple-500"
              }`}
            >
              {timeLeft}
            </span>
          )}
        </div>
      )}
    </motion.div>
  );
}
