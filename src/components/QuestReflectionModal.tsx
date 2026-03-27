"use client";

import React, { useEffect, useMemo, useState } from "react";
import { Sparkles, Send, Flame } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import {
  useCreateUserReflection,
  useCreateUserFailed,
} from "@/data/hooks/useReflection";
import { useQueryClient } from "@tanstack/react-query";
import type {
  CreateUserReflection,
  UserFailedReflection,
  QuestLevel,
} from "@/data/models/reflectionModel";

interface QuestReflectionModalProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  mode: "success" | "failed";
  questId?: string;
  questSuccessed?: boolean;
  notificationId?: string;
}

const LOCALSTORAGE_KEY = "reflection_last_choices_v2";

const successReasonOptions = [
  "Santai / Luang",
  "Tugas Mudah",
  "Semangat Tinggi",
  "Terencana Baik",
];

const failedReasonOptions = [
  "Sedang Malas",
  "Terlalu Sulit",
  "Banyak Gangguan",
  "Kurang Waktu",
];

const difficultyMap: { label: string; value: QuestLevel }[] = [
  { label: "EASY", value: "LOW" },
  { label: "MEDIUM", value: "NORMAL" },
  { label: "HARD", value: "HIGH" },
];

export default function QuestReflectionModal({
  isOpen,
  setIsOpen,
  mode,
  questId,
  questSuccessed,
  notificationId,
}: QuestReflectionModalProps) {
  const queryClient = useQueryClient();

  const { mutate: createReflection, isPending: creatingReflection } =
    useCreateUserReflection();

  const [selectedReasons, setSelectedReasons] = useState<string[]>([]);
  const [otherText, setOtherText] = useState<string>("");
  const [selectedDifficulty, setSelectedDifficulty] =
    useState<QuestLevel | null>(null);

  const [validationMessage, setValidationMessage] = useState<string | null>(
    null,
  );
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const submitting = creatingReflection;

  const reasonOptions =
    mode === "success" ? successReasonOptions : failedReasonOptions;

  // Load saved choices from localStorage when modal opens
  useEffect(() => {
    if (!isOpen) return;
    try {
      const raw = localStorage.getItem(LOCALSTORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (parsed?.reasons && Array.isArray(parsed.reasons)) {
          setSelectedReasons(parsed.reasons.slice(0, 4)); // Limit to max 4 to keep UI tidy
        }
        if (parsed?.difficulty) {
          setSelectedDifficulty(parsed.difficulty);
        }
        if (parsed?.otherText) {
          setOtherText(parsed.otherText);
        }
      }
    } catch (e) {
      // ignore parse error
    }
    setValidationMessage(null);
    setSuccessMessage(null);
  }, [isOpen]);

  // Reset UI transient state when mode changes
  useEffect(() => {
    if (!isOpen) return;
    setValidationMessage(null);
    setSuccessMessage(null);
  }, [mode, isOpen]);

  const toggleReason = (reason: string) => {
    setSelectedReasons((prev) =>
      prev.includes(reason)
        ? prev.filter((r) => r !== reason)
        : [...prev, reason],
    );
    setValidationMessage(null);
  };

  const allReasons = useMemo(() => {
    const list = [...selectedReasons];
    const trimmedOther = otherText?.trim();
    if (trimmedOther && !list.includes(trimmedOther)) {
      list.push(trimmedOther);
    }
    return list;
  }, [selectedReasons, otherText]);

  const canSubmit = useMemo(() => {
    if (mode === "success") {
      return (
        allReasons.length > 0 && selectedDifficulty !== null && !submitting
      );
    }
    return allReasons.length > 0 && !submitting;
  }, [mode, allReasons, selectedDifficulty, submitting]);

  const close = () => setIsOpen(false);

  const persistChoices = (
    reasons: string[],
    difficulty?: QuestLevel | null,
    other?: string,
  ) => {
    try {
      const payload = { reasons, difficulty, otherText: other ?? "" };
      localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(payload));
    } catch (e) {
      // ignore quota limits
    }
  };

  const handleSubmit = () => {
    setValidationMessage(null);
    setSuccessMessage(null);

    if (allReasons.length === 0) {
      setValidationMessage(
        "Pilih minimal satu alasan, atau ketik di 'Lainnya'.",
      );
      return;
    }
    if (mode === "success" && selectedDifficulty === null) {
      setValidationMessage("Pilih tingkat kesulitan quest terlebih dahulu.");
      return;
    }

    const payload: CreateUserReflection = {
      questId: questId ?? "",
      questLevel: selectedDifficulty ?? "NORMAL",
      questStatus: !!questSuccessed || mode === "success",
      reasons: allReasons,
      notificationId: notificationId ?? "",
    };

    createReflection(payload, {
      onSuccess: () => {
        persistChoices(selectedReasons, selectedDifficulty, otherText);
        queryClient.invalidateQueries({ queryKey: ["latest_reflection"] });
        setSuccessMessage("Refleksi berhasil disimpan! ✨");
        setTimeout(() => close(), 1000);
        if (notificationId) {
          queryClient.invalidateQueries({
            queryKey: ["get_notification", notificationId],
          });
        }
      },
      onError: () => setValidationMessage("Gagal menyimpan. Coba lagi."),
    });
  };

  return (
    <AnimatePresence>
      {isOpen && (
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
            onClick={(e) => e.stopPropagation()}
            className="relative bg-white rounded-[2rem] p-6 sm:p-8 w-full max-w-[420px] shadow-2xl flex flex-col"
          >
            {/* Header / Icon */}
            <div className="flex flex-col items-center text-center mt-2">
              <div className="relative mb-5">
                <motion.div
                  animate={{ scale: [1, 1.15, 1], opacity: [0.3, 0.1, 0.3] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className={`absolute inset-0 rounded-full ${
                    mode === "success" ? "bg-[#7C3BED]" : "bg-rose-500"
                  }`}
                />
                <div
                  className={`relative p-4 rounded-full text-white shadow-md ${
                    mode === "success"
                      ? "bg-gradient-to-tr from-[#7C3BED] to-purple-500"
                      : "bg-gradient-to-tr from-rose-500 to-orange-400"
                  }`}
                >
                  {mode === "success" ? (
                    <Sparkles className="w-8 h-8" strokeWidth={2} />
                  ) : (
                    <Flame className="w-8 h-8" strokeWidth={2} />
                  )}
                </div>
              </div>

              <h3 className="text-xl font-bold text-slate-800">
                {mode === "success"
                  ? "Quest Berhasil Diselesaikan!"
                  : "Yah, Quest Gagal"}
              </h3>
              <p className="text-sm text-slate-500 mt-2 px-2 leading-relaxed">
                {mode === "success"
                  ? "Kerja bagus! Apa sih rahasia di balik keberhasilan kamu kali ini?"
                  : "Nggak apa-apa! Mari refleksi sebentar biar ke depannya bisa jauh lebih baik."}
              </p>
            </div>

            {/* Form Content - Reasons */}
            <div className="mt-8">
              <label className="block text-center text-sm font-bold text-slate-700 mb-3">
                {mode === "success"
                  ? "Pilih Alasan Utama"
                  : "Pilih Penyebab Utama"}
              </label>

              <div className="grid grid-cols-2 gap-3">
                {reasonOptions.map((r) => {
                  const active = selectedReasons.includes(r);
                  return (
                    <motion.button
                      whileTap={{ scale: 0.96 }}
                      key={r}
                      type="button"
                      onClick={() => toggleReason(r)}
                      className={`py-3 px-2 rounded-xl border text-sm font-semibold transition-all duration-200 flex items-center justify-center text-center leading-tight min-h-[48px] ${
                        active
                          ? "bg-[#7C3BED]/10 border-[#7C3BED] text-[#7C3BED] shadow-sm"
                          : "bg-white border-slate-200 text-slate-600 hover:border-slate-300 hover:bg-slate-50"
                      }`}
                    >
                      {r}
                    </motion.button>
                  );
                })}
              </div>

              <div className="mt-3">
                <input
                  type="text"
                  value={otherText}
                  onChange={(e) => {
                    setOtherText(e.target.value);
                    setValidationMessage(null);
                  }}
                  placeholder="Atau ketik alasan lainnya..."
                  className="w-full py-3 px-4 rounded-xl border border-slate-200 text-sm font-medium text-slate-700 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#7C3BED]/30 focus:border-[#7C3BED] transition-all text-center"
                />
              </div>
            </div>

            {/* Form Content - Difficulty (Success Only) */}

            <div className="mt-6">
              <label className="block text-center text-sm font-bold text-slate-700 mb-3">
                Tingkat Kesulitan
              </label>
              <div className="grid grid-cols-3 gap-2.5">
                {difficultyMap.map((d) => {
                  const active = selectedDifficulty === d.value;
                  return (
                    <motion.button
                      whileTap={{ scale: 0.96 }}
                      key={d.value}
                      type="button"
                      onClick={() => {
                        setSelectedDifficulty(d.value);
                        setValidationMessage(null);
                      }}
                      className={`py-2.5 px-1 rounded-xl border text-xs sm:text-sm font-bold transition-all duration-200 tracking-wide ${
                        active
                          ? "bg-[#7C3BED] border-[#7C3BED] text-white shadow-md shadow-[#7C3BED]/30"
                          : "bg-white border-slate-200 text-slate-500 hover:border-slate-300 hover:bg-slate-50 hover:text-slate-700"
                      }`}
                    >
                      {d.label}
                    </motion.button>
                  );
                })}
              </div>
            </div>

            {/* Validation / Success Message area */}
            <div className="mt-5 min-h-[20px] flex items-center justify-center text-center">
              <AnimatePresence mode="wait">
                {validationMessage && (
                  <motion.p
                    key="error"
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 5 }}
                    className="text-xs font-semibold text-rose-500 bg-rose-50 px-3 py-1 rounded-full"
                  >
                    {validationMessage}
                  </motion.p>
                )}
                {successMessage && (
                  <motion.p
                    key="success"
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 5 }}
                    className="text-xs font-semibold text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full"
                  >
                    {successMessage}
                  </motion.p>
                )}
              </AnimatePresence>
            </div>

            {/* Action Buttons */}
            <div className="mt-5 flex gap-3 pt-2 border-t border-slate-100">
              <button
                onClick={handleSubmit}
                disabled={!canSubmit && validationMessage === null}
                className={`w-full flex items-center justify-center gap-2 py-3.5 rounded-xl font-bold text-sm transition-all ${
                  canSubmit || validationMessage !== null
                    ? "bg-[#7C3BED] text-white hover:bg-[#6b33cc] hover:shadow-lg shadow-[#7C3BED]/30 hover:-translate-y-0.5 active:translate-y-0"
                    : "bg-slate-200 text-slate-400 cursor-not-allowed"
                }`}
              >
                {submitting ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <>
                    Simpan
                    <Send className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
