"use client";

import { CreateQuestSchema, createQuestSchema } from "@/common/validations/questValidation";
import { useGetUserAvailableFolders } from "@/data/hooks/useFolder";
import { useCreateQuest } from "@/data/hooks/useQuest";
import { useForm } from "@tanstack/react-form";
import { motion, AnimatePresence } from "framer-motion";
import { X, Calendar, Folder } from "lucide-react";
import { useEffect, useState } from "react";

interface AddTaskDrawerProps {
  open: boolean;
  onClose: () => void;
}

export default function AddTaskDrawer({ open, onClose }: AddTaskDrawerProps) {
  const { data: foldersData } = useGetUserAvailableFolders()
  const { mutate: createQuestMutate, isSuccess, isPending } = useCreateQuest();
  // Mock folders - nanti diganti dengan data dari API

  const form = useForm({
    defaultValues: {
      name: "",
      description: "",
      folderId: "",
      deadLineAt: "",
    },
    validators: {
      onSubmit: createQuestSchema
    },
    onSubmit: ({ value }) => {
      createQuestMutate({ ...value, deadLineAt: new Date(value.deadLineAt).toISOString() })
    }
  })

  useEffect(() => {
    if (isSuccess) {
      onClose()
    }
  }, [isSuccess, onClose])
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
            <form onSubmit={(e) => {
              e.preventDefault();
              e.stopPropagation()
              form.handleSubmit();
            }}
              className="flex flex-col h-full">

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
                        <p className="text-red-500 text-xs">{err?.message}</p>
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
                      <select
                        id={field.name}
                        name={field.name}
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(e) => field.handleChange(e.target.value)}
                        className="w-full rounded-lg border px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#7C3BED] focus:border-transparent"
                        required
                      >
                        <option value="">Select a folder...</option>
                        {foldersData?.data?.map((folder) => (
                          <option key={folder.id} value={folder.id}>
                            {folder.icon} {folder.name}
                          </option>
                        ))}
                      </select>
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
                        className="w-full rounded-lg border px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#7C3BED] focus:border-transparent"
                        required
                      />
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
      )
      }
    </AnimatePresence >
  );
}
