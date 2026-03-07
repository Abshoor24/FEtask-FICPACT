"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Calendar, Folder } from "lucide-react";
import { useState } from "react";

interface AddTaskDrawerProps {
  open: boolean;
  onClose: () => void;
}

export default function AddTaskDrawer({ open, onClose }: AddTaskDrawerProps) {
  const [questName, setQuestName] = useState("");
  const [description, setDescription] = useState("");
  const [deadline, setDeadline] = useState("");
  const [selectedFolder, setSelectedFolder] = useState("");

  // Mock folders - nanti diganti dengan data dari API
  const folders = [
    { id: "1", name: "Ujian Minggu Ini", icon: "📚", color: "#7C3BED" },
    { id: "2", name: "Tugas Kuliah", icon: "🎓", color: "#10B981" },
    { id: "3", name: "Project Akhir Semester", icon: "💻", color: "#F59E0B" },
    { id: "4", name: "Personal Goals", icon: "⭐", color: "#EC4899" },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const questData = {
      name: questName,
      description: description || null,
      folderId: selectedFolder,
      deadLineAt: new Date(deadline).toISOString(),
    };

    console.log("Creating quest:", questData);

    // TODO: Call API to create quest
    // POST /api/quests

    // Reset form
    setQuestName("");
    setDescription("");
    setDeadline("");
    setSelectedFolder("");
    onClose();
  };

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
            <form onSubmit={handleSubmit} className="flex flex-col h-full">
              {/* HEADER */}
              <div className="flex items-center justify-between px-6 py-4 border-b">
                <h2 className="text-lg font-semibold text-gray-900">
                  Add New Quest
                </h2>
                <button
                  type="button"
                  onClick={onClose}
                  className="p-2 rounded-lg hover:bg-gray-100 transition"
                >
                  <X size={18} />
                </button>
              </div>

              {/* CONTENT */}
              <div className="flex-1 overflow-y-auto px-6 py-6 space-y-5">
                {/* QUEST NAME */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Quest Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={questName}
                    onChange={(e) => setQuestName(e.target.value)}
                    placeholder="e.g., Review Materi Matematika"
                    className="w-full rounded-lg border px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#7C3BED] focus:border-transparent"
                    required
                  />
                </div>

                {/* FOLDER SELECTION */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Folder size={14} className="inline mr-1" />
                    Folder <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={selectedFolder}
                    onChange={(e) => setSelectedFolder(e.target.value)}
                    className="w-full rounded-lg border px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#7C3BED] focus:border-transparent"
                    required
                  >
                    <option value="">Select a folder...</option>
                    {folders.map((folder) => (
                      <option key={folder.id} value={folder.id}>
                        {folder.icon} {folder.name}
                      </option>
                    ))}
                  </select>
                  <p className="text-xs text-gray-500 mt-1">
                    Each folder can contain up to 3 quests
                  </p>
                </div>

                {/* DEADLINE */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Calendar size={14} className="inline mr-1" />
                    Deadline <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="datetime-local"
                    value={deadline}
                    onChange={(e) => setDeadline(e.target.value)}
                    className="w-full rounded-lg border px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#7C3BED] focus:border-transparent"
                    required
                  />
                </div>

                {/* DESCRIPTION */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Description
                    <span className="text-gray-400 font-normal ml-1">
                      (Optional)
                    </span>
                  </label>
                  <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full rounded-lg border px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#7C3BED] focus:border-transparent"
                    rows={4}
                    placeholder="Add more details about this quest..."
                  />
                </div>

                {/* INFO BOX */}
                <div className="rounded-lg bg-purple-50 border border-purple-200 p-4">
                  <div className="flex gap-2">
                    <span className="text-lg">💡</span>
                    <div>
                      <p className="text-sm font-medium text-gray-900 mb-1">
                        Quest Rewards
                      </p>
                      <p className="text-xs text-gray-600 leading-relaxed">
                        Complete this quest before the deadline to earn{" "}
                        <strong className="text-purple-600">10 EXP</strong> and
                        maintain your streak! 🔥
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* FOOTER */}
              <div className="border-t px-6 py-4 flex gap-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="flex-1 rounded-lg border px-4 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={!questName || !selectedFolder || !deadline}
                  className="flex-1 rounded-lg bg-[#7C3BED] px-4 py-2.5 text-sm font-medium text-white transition hover:bg-[#6B2FDB] disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Create Quest
                </button>
              </div>
            </form>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
