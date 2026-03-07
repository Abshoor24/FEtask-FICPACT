"use client";

import { useCreateFolder } from "@/data/hooks/useFolder";
import { CreateQuestFolderRequest } from "@/data/models/folderModel";
import { motion, AnimatePresence } from "framer-motion";
import { X, Folder } from "lucide-react";
import React, { useState } from "react";

interface AddFolderModalProps {
  open: boolean;
  onClose: () => void;
}

export default function AddFolderModal({ open, onClose }: AddFolderModalProps) {
  const { mutate: createFolder, isSuccess } = useCreateFolder();
  const [folderName, setFolderName] = useState("");
  const [description, setDescription] = useState("");
  const [selectedIcon, setSelectedIcon] = useState("📚");
  const [selectedColor, setSelectedColor] = useState("#7C3BED");

  const icons = [
    "📚",
    "🎓",
    "💻",
    "⭐",
    "🎯",
    "🏆",
    "💼",
    "🎨",
    "📝",
    "🔥",
    "💡",
    "🚀",
  ];

  const colors = [
    { name: "Purple", value: "#7C3BED" },
    { name: "Blue", value: "#3B82F6" },
    { name: "Green", value: "#10B981" },
    { name: "Orange", value: "#F59E0B" },
    { name: "Pink", value: "#EC4899" },
    { name: "Red", value: "#EF4444" },
    { name: "Indigo", value: "#6366F1" },
    { name: "Teal", value: "#14B8A6" },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!folderName.trim()) {
      alert("Please enter a folder name");
      return;
    }

    const folderData: CreateQuestFolderRequest = {
      name: folderName,
      description: description || null,
      icon: selectedIcon,
      color: selectedColor,
    };

    createFolder(folderData);
  };

  React.useEffect(() => {
    if (isSuccess) {
      setFolderName("");
      setDescription("");
      setSelectedIcon("📚");
      setSelectedColor("#7C3BED");
      onClose();
    }
  }, [isSuccess, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* BLUR OVERLAY */}
          <motion.div
            className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* MODAL */}
          <motion.div
            className="fixed left-1/2 top-1/2 z-50 w-full max-w-md -translate-x-1/2 -translate-y-1/2"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            <div className="bg-white rounded-xl shadow-2xl overflow-hidden">
              {/* HEADER */}
              <div className="flex items-center justify-between px-6 py-4 border-b">
                <div className="flex items-center gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#7C3BED]">
                    <Folder size={16} className="text-white" />
                  </div>
                  <h2 className="text-lg font-semibold text-gray-900">
                    Create New Folder
                  </h2>
                </div>
                <button
                  onClick={onClose}
                  className="rounded-lg p-2 transition hover:bg-gray-100"
                >
                  <X size={18} className="text-gray-500" />
                </button>
              </div>

              {/* FORM */}
              <form onSubmit={handleSubmit} className="p-6 space-y-5">
                {/* Folder Name */}
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    Folder Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={folderName}
                    onChange={(e) => setFolderName(e.target.value)}
                    placeholder="e.g., Ujian Minggu Ini"
                    className="w-full rounded-lg border px-3 py-2 text-sm focus:border-[#7C3BED] focus:outline-none focus:ring-2 focus:ring-[#7C3BED]/20"
                    maxLength={50}
                    required
                  />
                </div>

                {/* Description */}
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    Description
                    <span className="text-gray-400 font-normal ml-1">
                      (Optional)
                    </span>
                  </label>
                  <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Add details about this folder..."
                    className="w-full rounded-lg border px-3 py-2 text-sm focus:border-[#7C3BED] focus:outline-none focus:ring-2 focus:ring-[#7C3BED]/20"
                    rows={3}
                  />
                </div>

                {/* Icon Selection */}
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    Icon
                  </label>
                  <div className="grid grid-cols-6 gap-2">
                    {icons.map((icon) => (
                      <button
                        key={icon}
                        type="button"
                        onClick={() => setSelectedIcon(icon)}
                        className={`flex aspect-square items-center justify-center rounded-lg border-2 text-xl transition ${
                          selectedIcon === icon
                            ? "border-[#7C3BED] bg-purple-50"
                            : "border-gray-200 hover:border-gray-300"
                        }`}
                      >
                        {icon}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Color Selection */}
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    Color
                  </label>
                  <div className="grid grid-cols-4 gap-2">
                    {colors.map((color) => (
                      <button
                        key={color.value}
                        type="button"
                        onClick={() => setSelectedColor(color.value)}
                        className={`flex items-center gap-2 rounded-lg border-2 px-3 py-2 transition ${
                          selectedColor === color.value
                            ? "border-gray-900"
                            : "border-gray-200 hover:border-gray-300"
                        }`}
                      >
                        <div
                          className="h-5 w-5 rounded-full"
                          style={{ backgroundColor: color.value }}
                        />
                        <span className="text-xs font-medium text-gray-700">
                          {color.name}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3 pt-2">
                  <button
                    type="button"
                    onClick={onClose}
                    className="flex-1 rounded-lg border px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={!folderName.trim()}
                    className="flex-1 rounded-lg bg-[#7C3BED] px-4 py-2 text-sm font-medium text-white transition hover:bg-[#6B2FDB] disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Create Folder
                  </button>
                </div>
              </form>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
