"use client";

import React, { useState } from "react";
import { ShieldAlert, Check, X, Send } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import {
  useGetPunishment,
  useUpdatePunishment,
} from "@/data/hooks/usePunishment";
import { PunishmentStatus } from "@/data/models/punihsmentModel";

interface UpdatePunishmentModalProps {
  punishmentModalOpen: boolean;
  punishmentId: string;
  onClose: () => void;
  questName: string;
  notificationId: string;
}

export function UpdatePunishmentModal({
  punishmentModalOpen,
  punishmentId,
  onClose,
  questName,
  notificationId,
}: UpdatePunishmentModalProps) {
  const { data, isLoading } = useGetPunishment(punishmentId);
  const { mutate: updatePunishment, isPending: isUpdating } =
    useUpdatePunishment();

  const [selectedStatus, setSelectedStatus] = useState<boolean | null>(null);
  const punishment = data?.data;

  const handleSubmit = () => {
    if (selectedStatus === null) return;

    updatePunishment(
      {
        punishmentId,
        data: {
          status: selectedStatus,
          notificationId,
        },
      },
      {
        onSuccess: () => {
          // Parent component should handle closing the modal via state or refetch
        },
      },
    );
  };

  const status = punishment?.status as PunishmentStatus | undefined;
  const isCompleted = status === PunishmentStatus.COMPLETED;
  const isFailed = status === PunishmentStatus.FAILED;
  const isPending = !status || status === PunishmentStatus.PENDING;

  return (
    <AnimatePresence>
      {punishmentModalOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="relative bg-white rounded-[2rem] p-6 sm:p-8 w-full max-w-[420px] shadow-2xl flex flex-col"
          >
            
            {/* Close button */}
            {!isPending && (
              <button
                onClick={onClose}
                className="absolute top-3 right-4 rounded-full z-20"
              >
                <X className="w-6 h-6 text-gray-400" />
              </button>
            )}

            {/* Header / Icon */}
            <div className="flex flex-col items-center text-center mt-2">
              <div className="relative mb-5">
                <motion.div
                  animate={{ scale: [1, 1.15, 1], opacity: [0.3, 0.1, 0.3] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className={`absolute inset-0 rounded-full ${
                    isCompleted
                      ? "bg-emerald-500"
                      : isFailed
                        ? "bg-rose-500"
                        : "bg-orange-500"
                  }`}
                />
                <div
                  className={`relative p-4 rounded-full text-white shadow-md ${
                    isCompleted
                      ? "bg-gradient-to-tr from-emerald-500 to-green-400"
                      : isFailed
                        ? "bg-gradient-to-tr from-rose-500 to-red-400"
                        : "bg-gradient-to-tr from-orange-500 to-amber-400"
                  }`}
                >
                  {isCompleted ? (
                    <Check className="w-8 h-8" strokeWidth={3} />
                  ) : isFailed ? (
                    <X className="w-8 h-8" strokeWidth={3} />
                  ) : (
                    <ShieldAlert className="w-8 h-8" strokeWidth={2} />
                  )}
                </div>
              </div>

              <h3 className="text-xl font-bold text-slate-800">
                {isCompleted
                  ? "Punishment Selesai!"
                  : isFailed
                    ? "Punishment Gagal"
                    : "Konsekuensi Quest"}
              </h3>
              <p className="text-sm text-slate-500 mt-2 px-2 leading-relaxed">
                {isCompleted ? (
                  "Hebat! Kamu telah bertanggung jawab dan menyelesaikan punishment ini dengan baik."
                ) : isFailed ? (
                  "Sayang sekali, kamu memilih untuk tidak menyelesaikan konsekuensi dari quest ini."
                ) : (
                  <>
                    Kamu telah mengabaikan quest{" "}
                    <span className="font-semibold text-slate-700">
                      {`"${questName}"`}
                    </span>
                    . Sesuai kesepakatan, ada konsekuensi yang harus kamu
                    selesaikan.
                  </>
                )}
              </p>
            </div>

            {/* Detail Punishment */}
            <div className="mt-6 bg-slate-50 rounded-2xl p-4 border border-slate-100">
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                Detail Punishment
              </h4>
              {isLoading ? (
                <div className="animate-pulse flex space-x-4">
                  <div className="flex-1 space-y-3 py-1">
                    <div className="h-4 bg-slate-200 rounded w-3/4"></div>
                    <div className="h-4 bg-slate-200 rounded w-1/2"></div>
                  </div>
                </div>
              ) : (
                <div className="text-sm font-medium text-slate-700">
                  {punishment?.name || "Memuat detail konsekuensi..."}
                </div>
              )}
            </div>

            {isPending && (
              <>
                {/* Pertanyaan & Opsi */}
                <div className="mt-6">
                  <label className="block text-center text-sm font-bold text-slate-700 mb-4">
                    Apakah kamu akan mengerjakan punishment ini?
                  </label>

                  <div className="flex gap-3">
                    <motion.button
                      whileTap={{ scale: 0.96 }}
                      onClick={() => setSelectedStatus(false)}
                      className={`flex-1 py-3 px-2 rounded-xl border text-sm font-bold transition-all duration-200 flex items-center justify-center gap-2 ${
                        selectedStatus === false
                          ? "bg-rose-500 border-rose-500 text-white shadow-md shadow-rose-500/30"
                          : "bg-white border-slate-200 text-slate-500 hover:border-rose-200 hover:bg-rose-50 hover:text-rose-600"
                      }`}
                    >
                      <X className="w-4 h-4" /> Tidak
                    </motion.button>

                    <motion.button
                      whileTap={{ scale: 0.96 }}
                      onClick={() => setSelectedStatus(true)}
                      className={`flex-1 py-3 px-2 rounded-xl border text-sm font-bold transition-all duration-200 flex items-center justify-center gap-2 ${
                        selectedStatus === true
                          ? "bg-emerald-500 border-emerald-500 text-white shadow-md shadow-emerald-500/30"
                          : "bg-white border-slate-200 text-slate-500 hover:border-emerald-200 hover:bg-emerald-50 hover:text-emerald-600"
                      }`}
                    >
                      <Check className="w-4 h-4" /> Ya, Kerjakan
                    </motion.button>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="mt-8 pt-2 border-t border-slate-100">
                  <button
                    onClick={handleSubmit}
                    disabled={selectedStatus === null || isUpdating}
                    className={`w-full flex items-center justify-center gap-2 py-3.5 rounded-xl font-bold text-sm transition-all ${
                      selectedStatus !== null
                        ? "bg-slate-900 text-white hover:bg-slate-800 hover:shadow-lg shadow-slate-900/20 hover:-translate-y-0.5 active:translate-y-0"
                        : "bg-slate-200 text-slate-400 cursor-not-allowed"
                    }`}
                  >
                    {isUpdating ? (
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    ) : (
                      <>
                        Konfirmasi Pilihan
                        <Send className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </div>
              </>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
