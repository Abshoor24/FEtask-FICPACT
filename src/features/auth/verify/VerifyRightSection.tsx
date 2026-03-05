"use client";

import { Sparkles } from 'lucide-react'
import React, { useState, useRef } from 'react'
import { motion } from 'framer-motion'
import { fadeUp, stagger } from '@/components/motion'

export default function VerifyRightSection() {
  const [otp, setOtp] = useState<string[]>(["", "", "", "", "", ""]);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const handleChange = (index: number, value: string) => {
    if (value.length > 1) return; // Only allow single character
    
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto-focus to next input
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    // Handle backspace
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').slice(0, 6);
    const newOtp = pastedData.split('');
    
    setOtp([...newOtp, ...Array(6 - newOtp.length).fill("")]);
    
    // Focus on the next empty input or last input
    const nextIndex = Math.min(newOtp.length, 5);
    inputRefs.current[nextIndex]?.focus();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const code = otp.join('');
    console.log('Verification code:', code);
    // Add your verification logic here
  };

  const handleResend = () => {
    console.log('Resending verification code...');
    // Add your resend logic here
  };

  return (
    <div className="flex-1 bg-white px-6 sm:px-8 lg:px-16 py-8 sm:py-10 lg:py-12 flex flex-col justify-center min-h-125 lg:min-h-screen">
      <motion.div 
        className="w-full max-w-md mx-auto space-y-8"
        variants={stagger}
        initial="hidden"
        animate="show"
      >
        {/* Header */}
        <motion.div className="space-y-2" variants={fadeUp}>
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900">
            Verifikasi Akun
          </h2>
          <p className="text-slate-500 text-base leading-relaxed">
            Kami telah mengirimkan kode verifikasi ke email universitasmu. Silakan masukkan kode di bawah ini.
          </p>
        </motion.div>

        {/* Form */}
        <motion.form onSubmit={handleSubmit} className="space-y-8" variants={fadeUp}>
          {/* OTP Input Boxes */}
          <div className="flex justify-between gap-2 sm:gap-3">
            {otp.map((digit, index) => (
              <input
                key={index}
                ref={(el) => {inputRefs.current[index] = el}}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={digit}
                onChange={(e) => handleChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                onPaste={handlePaste}
                className="w-14 h-16 sm:w-16 sm:h-18 text-center text-2xl font-bold text-slate-900 bg-white border-2 border-slate-200 rounded-2xl sm:rounded-3xl focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-violet-500 transition-all duration-200"
                placeholder="•"
              />
            ))}
          </div>

          {/* Submit Button */}
          <div className="space-y-4">
            <div className="relative">
              {/* Shadow layer */}
              <div className="absolute inset-0 bg-slate-900 rounded-2xl translate-y-1.5"></div>

              {/* Button */}
              <button
                type="submit"
                className="relative w-full py-4 bg-violet-600 hover:bg-violet-700 text-white rounded-2xl font-bold text-base transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center gap-2 shadow-lg"
              >
                Verifikasi & Mulai Quest
                <Sparkles className="w-5 h-5" />
              </button>
            </div>

            {/* Resend Code Link */}
            <div className="text-center">
              <span className="text-slate-500 text-base">
                Tidak menerima kode?{' '}
              </span>
              <button
                type="button"
                onClick={handleResend}
                className="text-violet-600 hover:text-violet-700 font-bold text-base transition-colors duration-200"
              >
                Kirim Ulang Kode
              </button>
            </div>
          </div>
        </motion.form>

        {/* Help Section */}
        <motion.div className="border-t border-slate-100 pt-6" variants={fadeUp}>
          <div className="text-center">
            <p className="text-slate-400 text-sm">
              Pastikan kamu mengecek folder spam jika tidak menemukan email verifikasi.
            </p>
          </div>
        </motion.div>
      </motion.div>
    </div>
  )
}