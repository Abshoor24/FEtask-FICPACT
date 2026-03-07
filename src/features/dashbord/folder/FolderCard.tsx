"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronDown,
  ChevronUp,
  Flame,
  Trophy,
  Clock,
  CheckCircle2,
  Circle,
  AlertCircle,
} from "lucide-react";
import clsx from "clsx";

interface Task {
  id: string;
  title: string;
  completed: boolean;
  deadline: string;
  priority: "High" | "Medium" | "Low";
}

interface Folder {
  id: string;
  name: string;
  icon: string;
  color: string;
  completedTasks: number;
  totalTasks: number;
  streak: number;
  streakBonus?: boolean;
  tasks: Task[];
}

interface FolderCardProps {
  folder: Folder;
}

export default function FolderCard({ folder }: FolderCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const progress = (folder.completedTasks / folder.totalTasks) * 100;
  const isCompleted = folder.completedTasks === folder.totalTasks;
  const hasActiveStreak = folder.streak > 0;

  // Check if any task is overdue
  const hasOverdueTasks = folder.tasks.some(
    (task) => !task.completed && new Date(task.deadline) < new Date(),
  );

  return (
    <motion.div
      layout
      className={clsx(
        "rounded-xl bg-white shadow-md border-2 transition-all overflow-hidden",
        isCompleted && "border-green-400 shadow-green-100",
        !isCompleted && hasActiveStreak && "border-purple-300",
        !isCompleted && !hasActiveStreak && "border-gray-200",
        hasOverdueTasks && !isCompleted && "border-red-300",
      )}
    >
      {/* ================= HEADER ================= */}
      <div
        className="p-5 cursor-pointer select-none"
        onClick={() => setIsExpanded(!isExpanded)}
        style={{
          background: isCompleted
            ? "linear-gradient(135deg, #10B981 0%, #059669 100%)"
            : `linear-gradient(135deg, ${folder.color}15 0%, ${folder.color}05 100%)`,
        }}
      >
        <div className="flex items-start justify-between mb-4">
          {/* Left: Icon & Name */}
          <div className="flex items-center gap-3">
            <div
              className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl shadow-sm"
              style={{
                backgroundColor: isCompleted ? "#10B981" : folder.color,
                color: "white",
              }}
            >
              {folder.icon}
            </div>
            <div>
              <h3 className="font-bold text-gray-900 text-lg">{folder.name}</h3>
              <p className="text-xs text-gray-500 mt-0.5">
                {folder.completedTasks} of {folder.totalTasks} quests completed
              </p>
            </div>
          </div>

          {/* Right: Streak & Expand Button */}
          <div className="flex items-center gap-2">
            {/* Streak Badge */}
            {hasActiveStreak && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className={clsx(
                  "flex items-center gap-1.5 px-3 py-1.5 rounded-full font-semibold text-sm shadow-sm",
                  folder.streakBonus
                    ? "bg-gradient-to-r from-yellow-400 to-orange-400 text-white"
                    : "bg-orange-100 text-orange-600",
                )}
              >
                <Flame size={14} />
                {folder.streak}
                {folder.streakBonus && <Trophy size={14} className="ml-0.5" />}
              </motion.div>
            )}

            {/* Expand Icon */}
            <button className="p-2 rounded-lg hover:bg-white/50 transition">
              {isExpanded ? (
                <ChevronUp size={20} className="text-gray-600" />
              ) : (
                <ChevronDown size={20} className="text-gray-600" />
              )}
            </button>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mb-3">
          <div className="flex items-center justify-between text-xs mb-1.5">
            <span className="text-gray-600 font-medium">Progress</span>
            <span
              className="font-bold"
              style={{ color: isCompleted ? "#10B981" : folder.color }}
            >
              {Math.round(progress)}%
            </span>
          </div>
          <div className="h-2.5 rounded-full bg-gray-200 overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="h-full rounded-full"
              style={{
                background: isCompleted
                  ? "linear-gradient(90deg, #10B981 0%, #059669 100%)"
                  : `linear-gradient(90deg, ${folder.color} 0%, ${folder.color}CC 100%)`,
              }}
            />
          </div>
        </div>

        {/* Status Badges */}
        <div className="flex items-center gap-2 flex-wrap">
          {isCompleted && (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-green-100 text-green-700 text-xs font-semibold">
              <CheckCircle2 size={12} />
              Completed
            </span>
          )}
          {folder.streakBonus && (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-gradient-to-r from-yellow-100 to-orange-100 text-orange-700 text-xs font-semibold">
              <Trophy size={12} />
              Streak Bonus!
            </span>
          )}
          {hasOverdueTasks && !isCompleted && (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-red-100 text-red-700 text-xs font-semibold">
              <AlertCircle size={12} />
              Overdue
            </span>
          )}
        </div>
      </div>

      {/* ================= TASKS LIST (EXPANDABLE) ================= */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="border-t"
          >
            <div className="p-5 space-y-3 bg-gray-50">
              {folder.tasks.map((task, index) => (
                <TaskItemInFolder
                  key={task.id}
                  task={task}
                  folderColor={folder.color}
                  index={index}
                />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

// ================= TASK ITEM INSIDE FOLDER =================
function TaskItemInFolder({
  task,
  folderColor,
  index,
}: {
  task: Task;
  folderColor: string;
  index: number;
}) {
  const isOverdue = !task.completed && new Date(task.deadline) < new Date();
  const deadlineDate = new Date(task.deadline);
  const now = new Date();
  const timeLeft = deadlineDate.getTime() - now.getTime();
  const hoursLeft = Math.floor(timeLeft / (1000 * 60 * 60));
  const daysLeft = Math.floor(hoursLeft / 24);

  const getTimeLeftText = () => {
    if (task.completed) return "Completed";
    if (isOverdue) return "Overdue";
    if (daysLeft > 1) return `${daysLeft} days left`;
    if (hoursLeft > 0) return `${hoursLeft} hours left`;
    return "Due soon";
  };

  const getPriorityColor = () => {
    switch (task.priority) {
      case "High":
        return "bg-red-100 text-red-700";
      case "Medium":
        return "bg-yellow-100 text-yellow-700";
      case "Low":
        return "bg-blue-100 text-blue-700";
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.1 }}
      className={clsx(
        "flex items-start gap-3 rounded-lg bg-white p-4 shadow-sm border transition-all",
        task.completed && "opacity-60 border-green-300",
        !task.completed &&
          !isOverdue &&
          "border-gray-200 hover:border-purple-300",
        isOverdue && "border-red-300 bg-red-50",
      )}
    >
      {/* Checkbox */}
      <button className="mt-0.5 flex-shrink-0">
        {task.completed ? (
          <CheckCircle2
            size={22}
            className="text-green-500"
            style={{ color: folderColor }}
          />
        ) : (
          <Circle size={22} className="text-gray-300" />
        )}
      </button>

      {/* Task Info */}
      <div className="flex-1 min-w-0">
        <p
          className={clsx(
            "font-medium text-sm mb-1",
            task.completed && "line-through text-gray-500",
            !task.completed && "text-gray-900",
          )}
        >
          {task.title}
        </p>

        <div className="flex items-center gap-2 flex-wrap text-xs">
          {/* Priority Badge */}
          <span
            className={clsx(
              "px-2 py-0.5 rounded-full font-semibold",
              getPriorityColor(),
            )}
          >
            {task.priority}
          </span>

          {/* Deadline Badge */}
          <span
            className={clsx(
              "inline-flex items-center gap-1 px-2 py-0.5 rounded-full font-medium",
              task.completed && "bg-green-100 text-green-700",
              !task.completed && !isOverdue && "bg-gray-100 text-gray-700",
              isOverdue && "bg-red-100 text-red-700",
            )}
          >
            <Clock size={11} />
            {getTimeLeftText()}
          </span>
        </div>
      </div>
    </motion.div>
  );
}
