"use client";

import { ArrowLeft, ArrowRight, Check, Eye, EyeOff } from "lucide-react";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { fadeUp, stagger } from "@/components/motion";
import SuccessModal from "@/components/SuccessModal";

export default function ChangePasswordRightSection({ token, email }: { token: string | null; email: string | null }) {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Password validation rules
  const hasMinLength = password.length >= 8;
  const hasUpperLowerNumber =
    /[A-Z]/.test(password) && /[a-z]/.test(password) && /[0-9]/.test(password);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Add your password change logic here
    console.log("Password change submitted", { token, email } );
    
    // Show success modal
    setIsModalOpen(true);
  };

  return (
    <div className="flex-1 bg-white px-6 sm:px-8 lg:px-16 xl:px-24 py-8 sm:py-10 lg:py-12 flex flex-col justify-center min-h-100 lg:min-h-screen">
      <motion.div
        className="w-full max-w-md mx-auto space-y-6 sm:space-y-8"
        variants={stagger}
        initial="hidden"
        animate="show"
      >
        {/* Header */}
        <motion.div className="space-y-1.5 sm:space-y-2 pt-4 sm:pt-6 lg:pt-8" variants={fadeUp}>
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-slate-900">
            Atur Ulang Kata Sandi
          </h2>
          <p className="text-slate-500 text-sm sm:text-base leading-relaxed">
            Masukkan kata sandi baru untuk akun TaskQuest-mu.
          </p>
        </motion.div>

        {/* Form */}
        <motion.form onSubmit={handleSubmit} className="space-y-5 sm:space-y-6" variants={fadeUp}>
          {/* New Password Input */}
          <div className="space-y-1.5 sm:space-y-2">
            <label
              htmlFor="password"
              className="block text-sm font-semibold text-slate-700"
            >
              Kata Sandi Baru
            </label>
            <div className="relative">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-4 py-3 sm:py-4 bg-white border border-slate-200 rounded-2xl sm:rounded-3xl text-slate-900 placeholder:text-slate-300 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all duration-200 text-sm sm:text-base"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
              >
                {showPassword ? (
                  <EyeOff className="w-4 h-4 sm:w-5 sm:h-5" />
                ) : (
                  <Eye className="w-4 h-4 sm:w-5 sm:h-5" />
                )}
              </button>
            </div>
          </div>

          {/* Confirm Password Input */}
          <div className="space-y-1.5 sm:space-y-2">
            <label
              htmlFor="confirm-password"
              className="block text-sm font-semibold text-slate-700"
            >
              Konfirmasi Kata Sandi Baru
            </label>
            <div className="relative">
              <input
                id="confirm-password"
                type={showConfirmPassword ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-4 py-3 sm:py-4 bg-white border border-slate-200 rounded-2xl sm:rounded-3xl text-slate-900 placeholder:text-slate-300 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all duration-200 text-sm sm:text-base"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
              >
                {showConfirmPassword ? (
                  <EyeOff className="w-4 h-4 sm:w-5 sm:h-5" />
                ) : (
                  <Eye className="w-4 h-4 sm:w-5 sm:h-5" />
                )}
              </button>
            </div>
          </div>

          {/* Password Requirements Checklist */}
          <div className="p-4 bg-slate-50 rounded-2xl sm:rounded-3xl border border-slate-100 space-y-2">
            <div className="flex items-center gap-2">
              <div
                className={`w-3 h-3 rounded-full flex items-center justify-center transition-colors ${
                  hasMinLength ? "bg-green-500" : "bg-slate-300"
                }`}
              >
                {hasMinLength && <Check className="w-2 h-2 text-white" strokeWidth={3} />}
              </div>
              <span
                className={`text-xs sm:text-sm transition-colors ${
                  hasMinLength ? "text-green-600 font-medium" : "text-slate-500"
                }`}
              >
                Minimal 8 karakter
              </span>
            </div>
            <div className="flex items-center gap-2">
              <div
                className={`w-3 h-3 rounded-full flex items-center justify-center transition-colors ${
                  hasUpperLowerNumber ? "bg-green-500" : "bg-slate-300"
                }`}
              >
                {hasUpperLowerNumber && <Check className="w-2 h-2 text-white" strokeWidth={3} />}
              </div>
              <span
                className={`text-xs sm:text-sm transition-colors ${
                  hasUpperLowerNumber ? "text-green-600 font-medium" : "text-slate-500"
                }`}
              >
                Kombinasi huruf besar, kecil, dan angka
              </span>
            </div>
          </div>

          {/* Submit Button with 3D Effect */}
          <div className="relative pt-2">
            {/* Shadow layer */}
            <div className="absolute inset-0 bg-violet-700/30 rounded-2xl sm:rounded-3xl translate-y-1.5 blur-sm"></div>

            {/* Button */}
            <button
              type="submit"
              disabled={!hasMinLength || !hasUpperLowerNumber || password !== confirmPassword || !password}
              className="relative w-full py-3 sm:py-4 bg-violet-600 hover:bg-violet-700 disabled:bg-slate-300 disabled:cursor-not-allowed text-white rounded-2xl sm:rounded-3xl font-bold text-sm sm:text-base transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 disabled:translate-y-0 disabled:hover:translate-y-0 flex items-center justify-center gap-2 shadow-lg"
            >
              Simpan & Masuk Ke Dashboard
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </motion.form>

        {/* Back to Login Link */}
        <motion.div
          className="flex justify-center pt-4 sm:pt-6"
          variants={fadeUp}
        >
          <a
            href="/auth/login"
            className="inline-flex items-center gap-1.5 sm:gap-2 text-slate-500 hover:text-slate-700 font-bold text-xs sm:text-sm transition-colors duration-200 group"
          >
            <ArrowLeft className="w-3 h-3 sm:w-3.5 sm:h-3.5 group-hover:-translate-x-0.5 transition-transform duration-200" />
            Kembali ke Halaman Login
          </a>
        </motion.div>
      </motion.div>

      {/* Success Modal */}
      <SuccessModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Berhasil Diperbarui!"
        description="Kata sandi kamu sudah aman. Sekarang, mari kembali ke petualanganmu!"
        buttonText="Lanjut ke Dashboard"
        redirectTo="/dashboard"
      />
    </div>
  );
}
