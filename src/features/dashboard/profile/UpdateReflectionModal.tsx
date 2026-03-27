"use client";

import React, { useState } from "react";
import { Calendar, Clock, Send } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useUpdateReflectionTime, useUserProfile } from "@/data/hooks/useUser";
import { useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

interface UpdateReflectionModalProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  currentDays: number;
}

export default function UpdateReflectionModal({
  isOpen,
  setIsOpen,
  currentDays,
}: UpdateReflectionModalProps) {
  const queryClient = useQueryClient();
  const { mutate: updateTime, isPending } = useUpdateReflectionTime();
  
  const [days, setDays] = useState<number>(currentDays || 1);
  const [hours, setHours] = useState<number>(20); // Default 8 PM
  
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = () => {
    setSuccessMessage(null);
    setErrorMessage(null);

    updateTime(
      { days, hours },
      {
        onSuccess: () => {
          setSuccessMessage("Waktu refleksi diperbarui! ✨");
          queryClient.invalidateQueries({ queryKey: ["user_profile"] });
          toast.success(`Jadwal refleksi berhasil diperbarui! Setiap ${days} hari pukul ${hours}:00 WIB.`);
          setTimeout(() => {
            setIsOpen(false);
          }, 800);
        },
        onError: (error: any) => {
          setErrorMessage(error.message || "Gagal memperbarui waktu refleksi.");
        },
      }
    );
  };

  return (
    <>
      <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm"
          onClick={() => setIsOpen(false)}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            onClick={(e) => e.stopPropagation()}
            className="relative bg-white rounded-[2rem] p-6 sm:p-8 w-full max-w-[400px] shadow-2xl overflow-hidden"
          >
            {/* Background Decor */}
            <div className="absolute top-0 right-0 -mt-8 -mr-8 w-32 h-32 bg-purple-50 rounded-full blur-3xl opacity-60" />
            <div className="absolute bottom-0 left-0 -mb-8 -ml-8 w-32 h-32 bg-blue-50 rounded-full blur-3xl opacity-60" />

            <div className="relative">
              <div className="flex flex-col items-center text-center mb-8">
                <div className="p-4 bg-purple-100 rounded-2xl text-purple-600 mb-4">
                  <Calendar className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-slate-800">
                  Ubah Jadwal Refleksi
                </h3>
                <p className="text-sm text-slate-500 mt-2">
                  Atur seberapa sering kamu ingin melakukan refleksi diri.
                </p>
              </div>

              <div className="space-y-6">
                {/* Days Interval */}
                <div>
                  <label className="flex items-center gap-2 text-sm font-bold text-slate-700 mb-3">
                    <Calendar className="w-4 h-4 text-purple-500" />
                    Setiap Berapa Hari?
                  </label>
                  <div className="grid grid-cols-4 gap-2">
                    {[1, 3, 5, 7].map((val) => (
                      <button
                        key={val}
                        onClick={() => setDays(val)}
                        className={`py-3 rounded-xl border-2 font-bold text-sm transition-all ${
                          days === val
                            ? "border-purple-500 bg-purple-50 text-purple-600 shadow-sm"
                            : "border-slate-100 bg-slate-50 text-slate-400 hover:border-slate-200"
                        }`}
                      >
                        {val} {val === 1 ? "Hari" : "Hari"}
                      </button>
                    ))}
                    <div className="col-span-4 mt-2">
                         <input 
                            type="range" 
                            min="1" 
                            max="30" 
                            value={days} 
                            onChange={(e) => setDays(parseInt(e.target.value))}
                            className="w-full h-2 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-purple-500"
                         />
                         <div className="flex justify-between text-[10px] text-slate-400 mt-1 px-1">
                            <span>1 Hari</span>
                            <span>{days} Hari</span>
                            <span>30 Hari</span>
                         </div>
                    </div>
                  </div>
                </div>

                {/* Hour selection */}
                <div>
                  <label className="flex items-center gap-2 text-sm font-bold text-slate-700 mb-3">
                    <Clock className="w-4 h-4 text-purple-500" />
                    Jam Berapa?
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {[18, 20, 22].map((h) => (
                      <button
                        key={h}
                        onClick={() => setHours(h)}
                        className={`py-3 rounded-xl border-2 font-bold text-sm transition-all ${
                          hours === h
                            ? "border-purple-500 bg-purple-50 text-purple-600 shadow-sm"
                            : "border-slate-100 bg-slate-50 text-slate-400 hover:border-slate-200"
                        }`}
                      >
                        {h}:00
                      </button>
                    ))}
                  </div>
                  <div className="mt-4 flex items-center gap-3">
                         <input 
                            type="number" 
                            min="1" 
                            max="23" 
                            value={hours} 
                            onChange={(e) => setHours(Math.max(1, Math.min(23, parseInt(e.target.value) || 1)))}
                            className="w-20 py-2 px-3 border-2 border-slate-100 rounded-xl text-center font-bold text-slate-700 focus:outline-none focus:border-purple-500 transition-all"
                         />
                         <span className="text-sm font-medium text-slate-500">: 00 (WIB)</span>
                  </div>
                </div>
              </div>

              {/* Status Messages */}
              <div className="mt-6 min-h-[20px]">
                <AnimatePresence mode="wait">
                  {successMessage && (
                    <motion.p
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-xs font-bold text-emerald-500 bg-emerald-50 py-2 px-4 rounded-xl text-center"
                    >
                      {successMessage}
                    </motion.p>
                  )}
                  {errorMessage && (
                    <motion.p
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-xs font-bold text-rose-500 bg-rose-50 py-2 px-4 rounded-xl text-center"
                    >
                      {errorMessage}
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>

              {/* Footer Actions */}
              <div className="mt-6 flex gap-3">
                <button
                  disabled={isPending}
                  onClick={handleSubmit}
                  className="flex-1 bg-purple-600 hover:bg-purple-700 text-white font-bold py-4 rounded-2xl flex items-center justify-center gap-2 transition-all shadow-lg shadow-purple-200 disabled:opacity-50"
                >
                  {isPending ? (
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <>
                      Simpan Perubahan
                      <Send className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
      </AnimatePresence>
    </>
  );
}
