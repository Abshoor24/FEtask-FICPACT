"use client";

import {
  CreateQuestSchema,
  createQuestSchema,
} from "@/common/validations/questValidation";
import { useGetUserAvailableFolders } from "@/data/hooks/useFolder";
import { useCreateQuest } from "@/data/hooks/useQuest";
import { useForm } from "@tanstack/react-form";
import { useQueryClient } from "@tanstack/react-query";
import { motion, AnimatePresence } from "framer-motion";
import { X, Calendar, Folder, ChevronDown } from "lucide-react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import PunishmentModal from "./modals/PunishmentModal";

interface AddTaskDrawerProps {
  open: boolean;
  onClose: () => void;
}

export default function AddTaskDrawer({ open, onClose }: AddTaskDrawerProps) {
  const { data: foldersData } = useGetUserAvailableFolders();
  const { mutate: createQuestMutate, isPending } = useCreateQuest();
  const invalidateQuery = useQueryClient();
  const [isPunishmentOpen, setIsPunishmentOpen] = useState(false);
  const [selectedQuestId, setSelectedQuestId] = useState<string | null>(null);
  const [minDateTime, setMinDateTime] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  useEffect(() => {
    if (open) {
      const now = new Date();
      const tzOffset = now.getTimezoneOffset() * 60000;
      const localISOTime = new Date(now.getTime() - tzOffset)
        .toISOString()
        .slice(0, 16);
      setMinDateTime(localISOTime);
    }
  }, [open]);

  // Mock folders - nanti diganti dengan data dari API

  const form = useForm({
    defaultValues: {
      name: "",
      description: "",
      folderId: "",
      deadLineAt: "",
    },
    validators: {
      onSubmit: createQuestSchema,
    },
    onSubmit: ({ value }) => {
      createQuestMutate(
        {
          ...value,
          deadLineAt: new Date(value.deadLineAt).toISOString(),
        },
        {
          onSuccess: (res) => {
            form.reset();
            toast.success("Quest created successfully!");

            invalidateQuery.invalidateQueries({
              queryKey: ["get_user_quests"],
            });

            if (!res) return;
            setSelectedQuestId(res.id);
            setIsPunishmentOpen(true);
          },
          onError: (err) => {
            toast.error(err.message || "Gagal menambahkan quest baru")
          }
        },
      );
    },
  });

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
            <form
              onSubmit={(e) => {
                e.preventDefault();
                e.stopPropagation();
                form.handleSubmit();
              }}
              className="flex flex-col h-full"
            >
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
                <form.Field name="name">
                  {(field) => (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Quest Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        id={field.name}
                        name={field.name}
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(e) => field.handleChange(e.target.value)}
                        type="text"
                        placeholder="e.g., Review Materi Matematika"
                        className="w-full rounded-lg border px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#7C3BED] focus:border-transparent"
                        required
                      />
                      {field.state.meta.errors?.map((err) => (
                        <p key={err?.message} className="text-red-500 text-xs">
                          {err?.message}
                        </p>
                      ))}
                    </div>
                  )}
                </form.Field>

                {/* FOLDER SELECTION */}
                <form.Field name="folderId">
                  {(field) => (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        <Folder size={14} className="inline mr-1" />
                        Folder <span className="text-red-500">*</span>
                      </label>

                      {/* CUSTOM FOLDER DROPDOWN */}
                      <div className="relative">
                        <button
                          type="button"
                          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                          className="w-full flex items-center justify-between rounded-lg border px-3 py-2.5 text-sm bg-white hover:border-[#7C3BED] transition-colors focus:ring-2 focus:ring-[#7C3BED]/20 focus:outline-none"
                        >
                          <div className="flex items-center gap-2">
                            {field.state.value ? (
                              <>
                                <span className="text-lg leading-none">
                                  {
                                    foldersData?.data?.find(
                                      (f) => f.id === field.state.value,
                                    )?.icon
                                  }
                                </span>
                                <span className="text-gray-900 font-medium">
                                  {
                                    foldersData?.data?.find(
                                      (f) => f.id === field.state.value,
                                    )?.name
                                  }
                                </span>
                              </>
                            ) : (
                              <span className="text-gray-400">
                                Select a folder...
                              </span>
                            )}
                          </div>
                          <motion.span
                            animate={{ rotate: isDropdownOpen ? 180 : 0 }}
                          >
                            <ChevronDown size={14} className="text-gray-400" />
                          </motion.span>
                        </button>

                        <AnimatePresence>
                          {isDropdownOpen && (
                            <>
                              {/* OVERLAY for closing */}
                              <div
                                className="fixed inset-0 z-[60]"
                                onClick={() => setIsDropdownOpen(false)}
                              />

                              <motion.div
                                initial={{ opacity: 0, y: -10, scale: 0.95 }}
                                animate={{ opacity: 1, y: 4, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                className="absolute left-0 right-0 z-[70] mt-1 bg-white border border-gray-100 rounded-xl shadow-2xl max-h-60 overflow-y-auto p-1.5"
                              >
                                {foldersData?.data?.length === 0 && (
                                  <div className="px-3 py-8 text-center bg-gray-50/50 rounded-lg m-1 border border-dashed border-gray-200">
                                    <Folder
                                      size={24}
                                      className="mx-auto text-gray-300 mb-2"
                                    />
                                    <p className="text-xs text-gray-500 font-medium">
                                      No folders available
                                    </p>
                                    <button
                                      type="button"
                                      className="mt-2 text-[10px] text-purple-600 font-semibold hover:underline"
                                      onClick={() => {
                                        /* Link to folder creation maybe? */
                                      }}
                                    >
                                      Create your first folder
                                    </button>
                                  </div>
                                )}
                                {foldersData?.data?.map((folder) => (
                                  <button
                                    key={folder.id}
                                    type="button"
                                    onClick={() => {
                                      field.handleChange(folder.id);
                                      setIsDropdownOpen(false);
                                    }}
                                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left transition-all duration-200 group ${
                                      field.state.value === folder.id
                                        ? "bg-purple-50 text-purple-700 ring-1 ring-purple-100 shadow-sm"
                                        : "hover:bg-gray-50 text-gray-700 hover:translate-x-1"
                                    }`}
                                  >
                                    <span className="text-xl leading-none flex items-center justify-center bg-white shadow-sm border border-gray-100 rounded-lg w-10 h-10 group-hover:scale-110 transition-transform">
                                      {folder.icon}
                                    </span>
                                    <div className="flex-1 min-w-0">
                                      <p className="text-sm font-bold truncate">
                                        {folder.name}
                                      </p>
                                      {folder.description && (
                                        <p className="text-[10px] text-gray-500 truncate leading-tight mt-0.5 font-medium opacity-80 group-hover:opacity-100">
                                          {folder.description}
                                        </p>
                                      )}
                                    </div>
                                    {field.state.value === folder.id ? (
                                      <div className="w-5 h-5 rounded-full bg-purple-600 flex items-center justify-center">
                                        <div className="w-1.5 h-1.5 rounded-full bg-white" />
                                      </div>
                                    ) : (
                                      <div className="w-5 h-5 rounded-full border border-gray-200 group-hover:border-purple-200 transition-colors" />
                                    )}
                                  </button>
                                ))}
                              </motion.div>
                            </>
                          )}
                        </AnimatePresence>
                      </div>

                      {field.state.meta.errors?.map((err) => (
                        <p
                          key={err?.message}
                          className="text-red-500 text-xs mt-1"
                        >
                          {err?.message}
                        </p>
                      ))}
                      <p className="text-xs text-gray-500 mt-1">
                        Each folder can contain up to 3 quests
                      </p>
                    </div>
                  )}
                </form.Field>

                {/* DEADLINE */}
                <form.Field name="deadLineAt">
                  {(field) => (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        <Calendar size={14} className="inline mr-1" />
                        Deadline <span className="text-red-500">*</span>
                      </label>
                      <input
                        id={field.name}
                        name={field.name}
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(e) => field.handleChange(e.target.value)}
                        type="datetime-local"
                        min={minDateTime}
                        className="w-full rounded-lg border px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#7C3BED] focus:border-transparent"
                        required
                      />
                      {field.state.meta.errors?.map((err) => (
                        <p key={err?.message} className="text-red-500 text-xs mt-1">
                          {err?.message}
                        </p>
                      ))}
                    </div>
                  )}
                </form.Field>

                {/* DESCRIPTION */}
                <form.Field name="description">
                  {(field) => (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Description
                        <span className="text-gray-400 font-normal ml-1">
                          (Optional)
                        </span>
                      </label>
                      <textarea
                        id={field.name}
                        name={field.name}
                        onBlur={field.handleBlur}
                        value={field.state.value}
                        onChange={(e) => field.handleChange(e.target.value)}
                        className="w-full rounded-lg border px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#7C3BED] focus:border-transparent"
                        rows={4}
                        placeholder="Add more details about this quest..."
                      />
                    </div>
                  )}
                </form.Field>

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
                  disabled={isPending}
                  className="flex-1 rounded-lg bg-[#7C3BED] px-4 py-2.5 text-sm font-medium text-white transition hover:bg-[#6B2FDB] disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Create Quest
                </button>
              </div>
            </form>
          </motion.aside>
        </>
      )}
      <PunishmentModal
        open={isPunishmentOpen}
        questId={selectedQuestId}
        onClose={() => setIsPunishmentOpen(false)}
      />
    </AnimatePresence>
  );
}
