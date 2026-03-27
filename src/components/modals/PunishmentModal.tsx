"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { useForm } from "@tanstack/react-form";
import toast from "react-hot-toast";

import { createPunishmentSchema } from "@/common/validations/punishmentValidation";
import { useCreatePunishment } from "@/data/hooks/usePunishment";

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
  const [minDateTime, setMinDateTime] = useState<string>("");
  const { mutate: createPunishment, isPending } = useCreatePunishment();

  const form = useForm({
    defaultValues: {
      name: "",
      deadlineAt: "",
    },
    validators: {
      onSubmit: createPunishmentSchema,
    },
    onSubmit: ({ value }) => {
      if (!questId) return;
      createPunishment(
        {
          name: value.name,
          questId,
          deadlineAt: new Date(value.deadlineAt).toISOString(),
        },
        {
          onSuccess: () => {
            form.reset();
            toast.success("Punishment berhasil ditambahkan!");
            handleClose();
          },
          onError: (err) => {
            toast.error(err.message || "Gagal menambahkan punishment!");
          },
        },
      );
    },
  });

  const handleClose = () => {
    setStep("confirm");
    form.reset();
    onClose();
  };

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

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* OVERLAY */}
          <motion.div
            className="fixed inset-0 z-[60] bg-black/30 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
          />

          {/* WRAPPER */}
          <div className="fixed inset-0 z-[70] flex items-center justify-center">
            {/* MODAL */}
            <motion.div
              className="bg-white w-[400px] rounded-2xl shadow-xl pointer-events-auto"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* HEADER */}
              <div className="flex justify-between items-center px-5 py-4 border-b">
                <h2 className="font-semibold text-gray-800">
                  {step === "confirm" ? "Tambah Hukuman?" : "Tambah Hukuman"}
                </h2>
              </div>

              {/* CONTENT */}
              <div className="p-5">
                {/* STEP 1 */}
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

                {/* STEP 2 (FORM) */}
                {step === "form" && (
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      form.handleSubmit(e);
                    }}
                    className="space-y-4"
                  >
                    {/* NAME */}
                    <form.Field name="name">
                      {(field) => (
                        <div>
                          <label className="text-sm font-medium">
                            Nama Hukuman
                          </label>
                          <input
                            id={field.name}
                            name={field.name}
                            value={field.state.value}
                            onChange={(e) => field.handleChange(e.target.value)}
                            onBlur={field.handleBlur}
                            className="w-full mt-1 border rounded-lg px-3 py-2 text-sm"
                          />
                          {field.state.meta.errors?.map((err) => (
                            <p
                              key={err?.message}
                              className="text-red-500 text-xs"
                            >
                              {err?.message}
                            </p>
                          ))}
                        </div>
                      )}
                    </form.Field>

                    {/* DEADLINE */}
                    <form.Field name="deadlineAt">
                      {(field) => (
                        <div>
                          <label className="text-sm font-medium">
                            Deadline Hukuman
                          </label>
                          <input
                            id={field.name}
                            name={field.name}
                            type="datetime-local"
                            value={field.state.value}
                            onChange={(e) => field.handleChange(e.target.value)}
                            onBlur={field.handleBlur}
                            min={minDateTime}
                            className="w-full mt-1 border rounded-lg px-3 py-2 text-sm"
                          />
                          {field.state.meta.errors?.map((err) => (
                            <p
                              key={err?.message}
                              className="text-red-500 text-xs"
                            >
                              {err?.message}
                            </p>
                          ))}
                        </div>
                      )}
                    </form.Field>

                    {/* ACTION */}
                    <div className="flex gap-3 pt-2">
                      <button
                        type="button"
                        onClick={handleClose}
                        className="flex-1 border rounded-lg py-2 text-sm"
                      >
                        Batal
                      </button>
                      <button
                        type="submit"
                        disabled={isPending}
                        className="flex-1 bg-[#7C3BED] text-white rounded-lg py-2 text-sm disabled:opacity-50 hover:bg-amber-100 transition-transform active:scale-95"
                      >
                        Simpan
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
