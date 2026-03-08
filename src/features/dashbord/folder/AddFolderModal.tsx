"use client";

import { useCreateFolder } from "@/data/hooks/useFolder";
import { CreateQuestFolderRequest } from "@/data/models/folderModel";
import { motion, AnimatePresence } from "framer-motion";
import { X, Folder, CalendarClock } from "lucide-react";
import React, { useState } from "react";

interface AddFolderModalProps {
  open: boolean;
  onClose: () => void;
}

const ICONS = [
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

const COLORS = [
  { name: "Purple", value: "#7C3BED" },
  { name: "Blue", value: "#3B82F6" },
  { name: "Green", value: "#10B981" },
  { name: "Orange", value: "#F59E0B" },
  { name: "Pink", value: "#EC4899" },
  { name: "Red", value: "#EF4444" },
  { name: "Indigo", value: "#6366F1" },
  { name: "Teal", value: "#14B8A6" },
];

export default function AddFolderModal({ open, onClose }: AddFolderModalProps) {
  const { mutate: createFolder, isSuccess } = useCreateFolder();

  const [folderName, setFolderName] = useState("");
  const [description, setDescription] = useState("");
  const [endedDate, setEndedDate] = useState("");
  const [endedTime, setEndedTime] = useState("23:59");
  const [selectedIcon, setSelectedIcon] = useState("📚");
  const [selectedColor, setSelectedColor] = useState("#7C3BED");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!folderName.trim() || !endedDate) return;

    // Gabung tanggal + waktu, default time ke 23:59 kalau kosong
    const time = endedTime || "23:59";
    const combinedDateTime = new Date(`${endedDate}T${time}:00`);

    const folderData: CreateQuestFolderRequest = {
      name: folderName,
      description: description || "",
      icon: selectedIcon,
      color: selectedColor,
      endedAt: combinedDateTime.toISOString(),
    };

    createFolder(folderData);
    console.log(folderData);
  };

  React.useEffect(() => {
    if (isSuccess) {
      setFolderName("");
      setDescription("");
      setEndedDate("");
      setEndedTime("23:59");
      setSelectedIcon("📚");
      setSelectedColor("#7C3BED");
      onClose();
    }
  }, [isSuccess, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* OVERLAY */}
          <motion.div
            className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* MODAL */}
          <motion.div
            className="fixed left-1/2 top-1/2 z-50 w-full max-w-lg -translate-x-1/2 -translate-y-1/2"
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            <div className="bg-white rounded-2xl shadow-2xl flex flex-col max-h-[90vh]">
              {/* ── HEADER ── */}
              <div className="flex items-center justify-between px-5 py-4 border-b shrink-0">
                <div className="flex items-center gap-2.5">
                  <div
                    className="flex h-8 w-8 items-center justify-center rounded-lg"
                    style={{ backgroundColor: selectedColor }}
                  >
                    <span className="text-base leading-none">
                      {selectedIcon}
                    </span>
                  </div>
                  <h2 className="text-base font-semibold text-gray-900">
                    Buat Folder Baru
                  </h2>
                </div>
                <button
                  onClick={onClose}
                  className="rounded-lg p-1.5 text-gray-400 transition hover:bg-gray-100 hover:text-gray-600"
                >
                  <X size={18} />
                </button>
              </div>

              {/* ── SCROLLABLE BODY ── */}
              <form
                id="add-folder-form"
                onSubmit={handleSubmit}
                className="overflow-y-auto px-5 py-4 space-y-4"
              >
                {/* ROW 1 — Name + End Date */}
                <div className="grid grid-cols-2 gap-3">
                  {/* Folder Name */}
                  <div className="col-span-2 sm:col-span-1">
                    <label className="mb-1.5 block text-xs font-semibold text-gray-600 uppercase tracking-wide">
                      Nama Folder <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={folderName}
                      onChange={(e) => setFolderName(e.target.value)}
                      placeholder="cth. Ujian Minggu Ini"
                      className="w-full rounded-lg border px-3 py-2 text-sm focus:border-[#7C3BED] focus:outline-none focus:ring-2 focus:ring-[#7C3BED]/20"
                      maxLength={50}
                      required
                    />
                  </div>

                  {/* End Date */}
                  <div className="col-span-2 sm:col-span-1">
                    <label className="mb-1.5 flex items-center gap-1 text-xs font-semibold text-gray-600 uppercase tracking-wide">
                      <CalendarClock size={12} />
                      Berakhir <span className="text-red-500">*</span>
                    </label>
                    <div className="flex gap-2">
                      {/* Tanggal */}
                      <input
                        type="date"
                        value={endedDate}
                        onChange={(e) => setEndedDate(e.target.value)}
                        min={new Date().toISOString().slice(0, 10)}
                        className="flex-1 min-w-0 rounded-lg border px-3 py-2 text-sm focus:border-[#7C3BED] focus:outline-none focus:ring-2 focus:ring-[#7C3BED]/20 text-gray-700"
                      />
                      {/* Waktu */}
                      <input
                        type="time"
                        value={endedTime}
                        onChange={(e) => setEndedTime(e.target.value)}
                        className="w-24 rounded-lg border px-3 py-2 text-sm focus:border-[#7C3BED] focus:outline-none focus:ring-2 focus:ring-[#7C3BED]/20 text-gray-700"
                      />
                    </div>
                    {endedDate && (
                      <p className="mt-1 text-[11px] text-[#7C3BED]">
                        {new Date(
                          `${endedDate}T${endedTime || "23:59"}:00`,
                        ).toLocaleDateString("id-ID", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </p>
                    )}
                  </div>
                </div>

                {/* Description */}
                <div>
                  <label className="mb-1.5 block text-xs font-semibold text-gray-600 uppercase tracking-wide">
                    Deskripsi
                    <span className="ml-1 normal-case font-normal text-gray-400">
                      (opsional)
                    </span>
                  </label>
                  <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Tambahkan detail folder ini..."
                    className="w-full rounded-lg border px-3 py-2 text-sm focus:border-[#7C3BED] focus:outline-none focus:ring-2 focus:ring-[#7C3BED]/20 resize-none"
                    rows={2}
                  />
                </div>

                {/* ROW 2 — Icon + Color side-by-side */}
                <div className="grid grid-cols-2 gap-4">
                  {/* Icon */}
                  <div>
                    <label className="mb-1.5 block text-xs font-semibold text-gray-600 uppercase tracking-wide">
                      Ikon
                    </label>
                    <div className="grid grid-cols-6 gap-1.5">
                      {ICONS.map((icon) => (
                        <button
                          key={icon}
                          type="button"
                          onClick={() => setSelectedIcon(icon)}
                          className={`flex aspect-square items-center justify-center rounded-lg border-2 text-lg transition ${
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

                  {/* Color */}
                  <div>
                    <label className="mb-1.5 block text-xs font-semibold text-gray-600 uppercase tracking-wide">
                      Warna
                    </label>
                    <div className="grid grid-cols-4 gap-1.5">
                      {COLORS.map((c) => (
                        <button
                          key={c.value}
                          type="button"
                          title={c.name}
                          onClick={() => setSelectedColor(c.value)}
                          className={`flex h-8 w-full items-center justify-center rounded-lg border-2 transition ${
                            selectedColor === c.value
                              ? "border-gray-900 scale-105"
                              : "border-transparent hover:border-gray-300"
                          }`}
                          style={{ backgroundColor: `${c.value}30` }}
                        >
                          <span
                            className="h-4 w-4 rounded-full"
                            style={{ backgroundColor: c.value }}
                          />
                        </button>
                      ))}
                    </div>
                    {/* selected color name */}
                    <p className="mt-1.5 text-[11px] text-gray-400 text-center">
                      {COLORS.find((c) => c.value === selectedColor)?.name}
                    </p>
                  </div>
                </div>
              </form>

              {/* ── FOOTER ── */}
              <div className="flex gap-2.5 px-5 py-4 border-t shrink-0">
                <button
                  type="button"
                  onClick={onClose}
                  className="flex-1 rounded-lg border px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  form="add-folder-form"
                  disabled={!folderName.trim() || !endedDate}
                  className="flex-1 flex items-center justify-center gap-2 rounded-lg bg-[#7C3BED] px-4 py-2 text-sm font-medium text-white transition hover:bg-[#6B2FDB] disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  <Folder size={15} />
                  Buat Folder
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
