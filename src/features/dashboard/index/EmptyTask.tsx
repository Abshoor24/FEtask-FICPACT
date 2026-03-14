"use client";

import { motion } from "framer-motion";
import { fadeUp, stagger } from "@/components/motion";
import { ClipboardList, Mic, Plus } from "lucide-react";

import {
  AlertDialog,
  // AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

interface EmptyTaskProps {
  onAdd: () => void;
  onVoiceClick: () => void;
}

export default function EmptyTask({ onAdd, onVoiceClick }: EmptyTaskProps) {
  return (
    <motion.div
      className="flex flex-col items-center justify-center py-24 gap-6"
      variants={stagger}
      initial="hidden"
      animate="show"
    >
      {/* Icon */}
      <motion.div
        variants={fadeUp}
        className="relative flex items-center justify-center w-28 h-28"
      >
        <div className="absolute inset-0 rounded-full bg-purple-100 animate-pulse" />

        <div className="relative z-10 flex items-center justify-center w-20 h-20 rounded-full bg-purple-50 border-2 border-dashed border-purple-300">
          <ClipboardList className="w-9 h-9 text-purple-400" />
        </div>
      </motion.div>

      {/* Text */}
      <motion.div
        variants={fadeUp}
        className="flex flex-col items-center gap-2 text-center"
      >
        <h3 className="text-xl font-bold text-gray-800">No tasks yet!</h3>

        <p className="text-sm text-gray-400 max-w-xs leading-relaxed">
          Kamu belum punya quest apapun. Yuk mulai tambahkan task pertamamu dan
          raih XP-mu!
        </p>
      </motion.div>

      {/* Alert Dialog */}
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <motion.button
            variants={fadeUp}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="flex items-center gap-2 rounded-xl bg-[#7C3BED] px-6 py-3 text-sm font-semibold text-white shadow-md hover:bg-[#6A2EE8] transition"
          >
            <Plus size={16} />
            Tambah Task Pertamamu
          </motion.button>
        </AlertDialogTrigger>

        <AlertDialogContent className="sm:max-w-105">
          <AlertDialogHeader>
            <AlertDialogTitle>Tambah Task</AlertDialogTitle>

            <AlertDialogDescription>
              Pilih cara kamu ingin membuat task baru.
            </AlertDialogDescription>
          </AlertDialogHeader>

          <div className="flex flex-col gap-3 py-4 bg-bg-[#7C3BED]">
            {/* Manual */}
            <AlertDialogCancel asChild>
              <button
                onClick={onAdd}
                className="flex items-center justify-center gap-2 w-full rounded-lg bg-[#7C3BED] px-4 py-2 text-sm font-medium text-black hover:bg-[#6A2EE8] transition"
              >
                <Plus size={16} />
                Add Manually
              </button>
            </AlertDialogCancel>

            {/* Voice */}
            <AlertDialogCancel asChild>
              <button
                onClick={onVoiceClick}
                className="flex items-center justify-center gap-2 w-full rounded-lg border-2 border-dashed border-[#7C3BED]/40 text-[#7C3BED] bg-[#7C3BED]/5 px-4 py-2 text-sm font-medium transition hover:bg-[#7C3BED]/10 hover:border-[#7C3BED]"
              >
                <Mic size={16} />
                Add with Voice
              </button>
            </AlertDialogCancel>
          </div>

          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </motion.div>
  );
}
