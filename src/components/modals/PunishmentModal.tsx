"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { X } from "lucide-react";

interface PunishmentModalProps {
  open: boolean;
  questId: string | null;
  onClose: () => void;
}

export default function PunishmentModal({
  open,
  questId,
  onClose,
}: PunishmentModalProps) {
  const [step, setStep] = useState<"confirm" | "form">("confirm");
  const [name, setName] = useState("");
  const [deadline, setDeadline] = useState("");

  const handleClose = () => {
    setStep("confirm");
    setName("");
    setDeadline("");
    onClose();
  };

  const handleSubmit = () => {
    if (!questId) return;

    console.log({
      questId,
      name,
      deadline,
    });

    // 🔥 nanti sambung ke API create punishment

    handleClose();
  };

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* BLUR BACKGROUND */}
          <motion.div
            className="fixed inset-0 z-[60] bg-black/30 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
          />

          {/* MODAL */}
          <motion.div
            className="fixed z-[70] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white w-[400px] rounded-2xl shadow-xl"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
          >
            {/* HEADER */}
            <div className="flex justify-between items-center px-5 py-4 border-b">
              <h2 className="font-semibold text-gray-800">
                {step === "confirm"
                  ? "Tambah Hukuman?"
                  : "Tambah Hukuman"}
              </h2>
              <button onClick={handleClose}>
                <X size={18} />
              </button>
            </div>

            {/* CONTENT */}
            <div className="p-5">
              {step === "confirm" && (
                <div className="space-y-4">
                  <p className="text-sm text-gray-600">
                    Apakah anda ingin menambahkan hukuman untuk quest ini?
                  </p>

                  <div className="flex gap-3">
                    <button
                      onClick={handleClose}
                      className="flex-1 border rounded-lg py-2 text-sm hover:bg-gray-50"
                    >
                      Lewati
                    </button>
                    <button
                      onClick={() => setStep("form")}
                      className="flex-1 bg-[#7C3BED] text-white rounded-lg py-2 text-sm"
                    >
                      Tambahkan
                    </button>
                  </div>
                </div>
              )}

              {step === "form" && (
                <div className="space-y-4">
                  {/* NAME */}
                  <div>
                    <label className="text-sm font-medium">
                      Nama Hukuman
                    </label>
                    <input
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full mt-1 border rounded-lg px-3 py-2 text-sm"
                      placeholder="Contoh: Push up 20x"
                    />
                  </div>

                  {/* DEADLINE */}
                  <div>
                    <label className="text-sm font-medium">
                      Deadline Hukuman
                    </label>
                    <input
                      type="datetime-local"
                      value={deadline}
                      onChange={(e) => setDeadline(e.target.value)}
                      className="w-full mt-1 border rounded-lg px-3 py-2 text-sm"
                    />
                  </div>

                  <div className="flex gap-3 pt-2">
                    <button
                      onClick={handleClose}
                      className="flex-1 border rounded-lg py-2 text-sm"
                    >
                      Batal
                    </button>
                    <button
                      onClick={handleSubmit}
                      className="flex-1 bg-[#7C3BED] text-white rounded-lg py-2 text-sm"
                    >
                      Simpan
                    </button>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}