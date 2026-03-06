import { Lock, Shield } from "lucide-react";
import React from "react";
import { motion } from "framer-motion";
import { fadeUp, stagger } from "@/components/motion";

export default function ForgotPasswordLeftSection() {
  return (
    <div className="relative flex-1 bg-linear-to-br from-violet-600 to-violet-700 px-6 sm:px-8 lg:px-12 py-12 sm:py-16 lg:py-0 flex flex-col justify-center items-center overflow-hidden min-h-125 lg:min-h-screen">
      <div className="absolute inset-0 bg-[radial-linear(ellipse_at_top_right,rgba(255,255,255,0.1),transparent_50%)]"></div>

      <motion.div
        className="absolute top-6 lg:top-8 left-6 lg:left-8 z-20 flex items-center gap-2.5"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <div className="p-1.5 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
          <Shield className="w-5 h-5 text-white" />
        </div>
        <span className="text-xl lg:text-2xl font-bold text-white">
          TaskQuest
        </span>
      </motion.div>

      {/* Main Content */}
      <motion.div
        className="relative z-10 w-full max-w-md mx-auto space-y-5 sm:space-y-6 lg:space-y-8 flex flex-col items-center text-center lg:text-left lg:items-start mb-16 sm:mb-20 lg:mb-0"
        variants={stagger}
        initial="hidden"
        animate="show"
      >
        {/* Heading */}
        <motion.div className="space-y-2 sm:space-y-3" variants={fadeUp}>
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight">
            Jangan Biarkan
            <br />
            Quest-mu Terhenti!
          </h1>
          <p className="text-white/90 text-xs sm:text-sm md:text-base lg:text-lg leading-relaxed max-w-sm">
            Pulihkan akses ke petualangan akademikmu sekarang. Para Guardian
            sedang menunggumu di gerbang TaskQuest.
          </p>
        </motion.div>

        {/* Status Card */}
        <motion.div
          className="w-full bg-white/10 backdrop-blur-md rounded-xl sm:rounded-2xl lg:rounded-3xl p-3.5 sm:p-4 lg:p-5 border border-white/20 shadow-2xl"
          variants={fadeUp}
        >
          <div className="flex items-start gap-3 sm:gap-4 text-left">
            <div className="p-2 sm:p-2.5 bg-white/20 rounded-lg sm:rounded-xl flex items-center justify-center flex-0">
              <svg
                className="w-5 h-5 sm:w-6 sm:h-6 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                />
              </svg>
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-white font-bold text-sm sm:text-base lg:text-lg mb-1">
                Account Recovery Mode
              </h3>
              <div className="flex items-center gap-1.5 sm:gap-2">
                <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-yellow-400 rounded-full animate-pulse"></div>
                <p className="text-white/80 text-xs sm:text-sm">
                  Menunggu Magic Link
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* Lock Icon Section with Divine Glow */}
      <motion.div
        className="absolute bottom-4 sm:bottom-8 lg:bottom-6 left-1/2 -translate-x-1/2 flex items-center justify-center pointer-events-none"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
      >
        {/* Lapisan Cahaya Terluar (Sangat Halus) */}
        <div className="absolute w-32 h-32 sm:w-48 sm:h-48 lg:w-64 lg:h-64 bg-white/10 rounded-full blur-[60px] sm:blur-[80px] animate-pulse"></div>

        {/* Lapisan Cahaya Inti (Lebih Terang) */}
        <div className="absolute w-20 h-20 sm:w-24 sm:h-24 lg:w-32 lg:h-32 bg-violet-400/60 rounded-full blur-[30px] sm:blur-2xl"></div>

        {/* Ikon Gembok */}
        <div className="relative opacity-15 sm:opacity-20 lg:opacity-30">
          <Lock
            className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 lg:w-40 lg:h-40 text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.5)]"
            strokeWidth={1}
          />
        </div>
      </motion.div>

      {/* Footer */}
      <motion.div
        className="absolute bottom-3 sm:bottom-4 lg:bottom-6 left-6 lg:left-8 z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.6 }}
      >
        <p className="text-white/60 text-[10px] sm:text-xs lg:text-sm">
          © 2024 TaskQuest Academic Labs.
        </p>
      </motion.div>
    </div>
  );
}
