"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

export default function AddTaskDrawer({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  return (
    <AnimatePresence>
      {open && (
        <>
          {/* BLUR OVERLAY */}
          <motion.div
            className="fixed inset-0 z-40 bg-black/30 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* DRAWER */}
          <motion.aside
            className="fixed right-0 top-0 z-50 h-screen w-105 bg-white shadow-xl flex flex-col"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 260, damping: 30 }}
          >
            {/* HEADER */}
            <div className="flex items-center justify-between px-6 py-4 border-b">
              <h2 className="text-sm font-semibold">
                Finalize Design Specs
              </h2>
              <button
                onClick={onClose}
                className="p-2 rounded-lg hover:bg-gray-100"
              >
                <X size={18} />
              </button>
            </div>

            {/* CONTENT */}
            <div className="flex-1 overflow-y-auto px-6 py-4 space-y-6">
              {/* DUE DATE & PRIORITY */}
              <div className="grid grid-cols-2 gap-4">
                <Input label="Due Date" placeholder="Oct 24, 2023" />
                <Input label="Priority" placeholder="High" />
              </div>

              {/* LABELS */}
              <div>
                <p className="text-xs font-medium text-gray-500 mb-2">
                  Labels
                </p>
                <div className="flex gap-2">
                  <span className="px-2 py-1 text-xs rounded-full bg-purple-100 text-purple-600">
                    Design
                  </span>
                  <span className="px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-600">
                    Internal
                  </span>
                  <button className="w-6 h-6 rounded-full border flex items-center justify-center text-xs">
                    +
                  </button>
                </div>
              </div>

              {/* DESCRIPTION */}
              <div>
                <p className="text-xs font-medium text-gray-500 mb-2">
                  Description
                </p>
                <textarea
                  className="w-full rounded-lg border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#7C3BED]"
                  rows={4}
                  placeholder="Write task description..."
                />
              </div>

              {/* SUBTASK */}
              <div>
                <p className="text-xs font-medium text-gray-500 mb-2">
                  Subtasks
                </p>
                <div className="space-y-2">
                  <Subtask label="Wireframes" checked />
                  <Subtask label="Color Palette" checked />
                  <Subtask label="User Flow" />
                </div>
              </div>
            </div>

            {/* FOOTER */}
            <div className="border-t px-6 py-4 flex justify-between text-xs text-gray-500">
              <button className="hover:text-red-500">
                Delete Task
              </button>
              <button className="hover:text-gray-700">
                Archive
              </button>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}

// SEMENTATARA

function Input({
  label,
  placeholder,
}: {
  label: string;
  placeholder: string;
}) {
  return (
    <div>
      <p className="text-xs font-medium text-gray-500 mb-1">
        {label}
      </p>
      <input
        className="w-full rounded-lg border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#7C3BED]"
        placeholder={placeholder}
      />
    </div>
  );
}

function Subtask({
  label,
  checked,
}: {
  label: string;
  checked?: boolean;
}) {
  return (
    <label className="flex items-center gap-2 text-sm">
      <input
        type="checkbox"
        defaultChecked={checked}
        className="accent-[#7C3BED]"
      />
      {label}
    </label>
  );
}