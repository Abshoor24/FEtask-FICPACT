import { Key, Shield } from "lucide-react";
import React from "react";
import { motion } from "framer-motion";
import { fadeUp, stagger } from "@/components/motion";

export default function ChangePasswordLeftSection() {
  return (
    <div className="relative flex-1 bg-linear-to-br from-violet-600 to-violet-700 px-6 sm:px-8 lg:px-12 py-12 sm:py-16 lg:py-0 flex flex-col justify-center items-center overflow-hidden min-h-75 lg:min-h-screen">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(255,255,255,0.1),transparent_50%)]"></div>
      <div className="absolute w-96 h-96 left-1/2 top-2/3 -translate-x-1/2 bg-white/10 rounded-full blur-[80px]"></div>

      {/* Logo */}
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
        {/* Icon Badge */}
        <motion.div
          className="p-4 bg-white/10 backdrop-blur-md rounded-2xl lg:rounded-3xl border border-white/20 inline-flex items-center justify-center"
          variants={fadeUp}
        >
          <Key className="w-10 h-10 sm:w-12 sm:h-12 lg:w-14 lg:h-14 text-white" strokeWidth={1.5} />
        </motion.div>

        {/* Heading */}
        <motion.div className="space-y-2 sm:space-y-3" variants={fadeUp}>
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight">
            Perkuat Kunci
            <br />
            Gerbangmu!
          </h1>
          <p className="text-white/80 text-sm sm:text-base md:text-lg lg:text-xl leading-relaxed max-w-sm">
            Gunakan kata sandi yang kuat agar progres quest-mu selalu aman dari gangguan.
          </p>
        </motion.div>
      </motion.div>

      {/* Footer Copyright */}
      <motion.div
        className="absolute bottom-4 sm:bottom-6 lg:bottom-8 left-6 lg:left-8 z-20"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        <p className="text-white/60 text-xs sm:text-sm">
          © 2024 TaskQuest. Lindungi petualanganmu.
        </p>
      </motion.div>
    </div>
  );
}
