import { Shield, CheckCircle } from 'lucide-react'
import Image from 'next/image'
import React from 'react'
import { motion } from 'framer-motion'
import { fadeUp, stagger } from '@/components/motion'

export default function VerifyLeftSection() {
  return (
    <div className="relative flex-1 bg-linear-to-br from-violet-600 to-violet-700 px-6 sm:px-8 lg:px-12 py-12 sm:py-16 lg:py-0 flex flex-col justify-center items-center overflow-hidden min-h-100 lg:min-h-screen">
      {/* Background gradient effect */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(255,255,255,0.1),transparent_50%)]"></div>
      
      {/* Glow effect */}
      <div className="absolute w-125 h-125 left-17.5 top-65.5 bg-white/10 rounded-full blur-3xl"></div>

      {/* Logo */}
      <motion.div 
        className="absolute top-6 lg:top-8 left-6 lg:left-8 z-20 flex items-center gap-2.5"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <div className="flex items-center justify-center">
          <Image src="/icon.png" width={32} height={32} alt="TaskQuest Logo" className="drop-shadow-lg" />
        </div>
        <span className="text-xl lg:text-2xl font-bold text-white">TaskQuest</span>
      </motion.div>

      {/* Main Content */}
      <motion.div 
        className="relative z-10 w-full max-w-md mx-auto space-y-6 sm:space-y-8 flex flex-col items-center text-center mb-16 sm:mb-20 lg:mb-0"
        variants={stagger}
        initial="hidden"
        animate="show"
      >
        {/* Shield Icon with Checkmark */}
        <motion.div 
          className="p-8 bg-white/10 backdrop-blur-md rounded-3xl border border-white/20 shadow-2xl"
          variants={fadeUp}
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <div className="relative">
            <Shield className="w-20 h-20 text-white" strokeWidth={1.5} />
            <CheckCircle 
              className="w-10 h-10 text-white absolute -bottom-2 -right-2 bg-violet-600 rounded-full" 
              fill="currentColor"
            />
          </div>
        </motion.div>

        {/* Heading */}
        <motion.div className="space-y-3" variants={fadeUp}>
          <h1 className="text-3xl sm:text-4xl font-bold text-white leading-tight">
            Satu Langkah Lagi Menuju
            <br />
            Petualangan!
          </h1>
          <p className="text-white/80 text-base sm:text-lg leading-relaxed max-w-sm mx-auto">
            Amankan akunmu untuk memulai quest produktivitas yang seru dan capai level tertinggi prestasimu.
          </p>
        </motion.div>
      </motion.div>

      {/* Footer */}
      <motion.div 
        className="absolute bottom-3 sm:bottom-4 lg:bottom-6 left-6 lg:left-8 z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.6 }}
      >
        <p className="text-white/60 text-xs sm:text-sm">© 2024 TaskQuest Academic Labs.</p>
      </motion.div>
    </div>
  )
}