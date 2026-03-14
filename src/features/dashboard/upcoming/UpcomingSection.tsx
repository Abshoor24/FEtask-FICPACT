import { motion } from "framer-motion";
import { fadeUp } from "@/components/motion";
import { CalendarDays, ChevronDown } from "lucide-react";
import { useState } from "react";

// Map API keys to friendlier display labels & icons
const sectionMeta: Record<string, { label: string; color: string; bg: string }> = {
  TOMORROW: { label: "Besok", color: "text-blue-600", bg: "bg-blue-100" },
  THIS_WEEK: { label: "Minggu Ini", color: "text-purple-600", bg: "bg-purple-100" },
  NEXT_WEEK: { label: "Minggu Depan", color: "text-indigo-600", bg: "bg-indigo-100" },
  THIS_MONTH: { label: "Bulan Ini", color: "text-teal-600", bg: "bg-teal-100" },
  LATER: { label: "Nanti", color: "text-gray-600", bg: "bg-gray-100" },
};

export default function UpcomingSection({
  sectionKey,
  count,
  children,
}: {
  sectionKey: string;
  count: number;
  children: React.ReactNode;
}) {
  const [collapsed, setCollapsed] = useState(false);

  const meta = sectionMeta[sectionKey] ?? {
    label: sectionKey.charAt(0) + sectionKey.slice(1).toLowerCase().replace(/_/g, " "),
    color: "text-gray-600",
    bg: "bg-gray-100",
  };

  return (
    <motion.div variants={fadeUp} className="mb-6">
      {/* Section Header */}
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="flex items-center gap-3 mb-3 w-full group"
      >
        <div
          className={`w-7 h-7 rounded-lg ${meta.bg} flex items-center justify-center shrink-0`}
        >
          <CalendarDays size={14} className={meta.color} />
        </div>
        <p
          className={`text-sm font-bold uppercase tracking-wide ${meta.color}`}
        >
          {meta.label}
        </p>
        <span className="text-[11px] font-medium text-gray-300 bg-gray-50 px-2 py-0.5 rounded-md">
          {count} quest{count > 1 ? "s" : ""}
        </span>
        <div className="flex-1" />
        <ChevronDown
          size={16}
          className={`text-gray-300 group-hover:text-gray-500 transition-all duration-200 ${
            collapsed ? "-rotate-90" : "rotate-0"
          }`}
        />
      </button>

      {/* Section Content */}
      <motion.div
        initial={false}
        animate={{
          height: collapsed ? 0 : "auto",
          opacity: collapsed ? 0 : 1,
        }}
        transition={{ duration: 0.25, ease: "easeInOut" }}
        className="overflow-hidden"
      >
        {children}
      </motion.div>
    </motion.div>
  );
}
