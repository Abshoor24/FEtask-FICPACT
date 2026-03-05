import { ArrowLeft, HelpCircle, Mail, Zap } from 'lucide-react'
import React from 'react'
import { motion } from 'framer-motion'
import { fadeUp, stagger } from '@/components/motion'

export default function ForgotPasswordRightSection() {
  return (
       <div className="flex-1 bg-white px-6 sm:px-8 lg:px-16 py-8 sm:py-10 lg:py-12 flex flex-col justify-center min-h-150 lg:min-h-screen">
        <motion.div 
          className="w-full max-w-md mx-auto space-y-6 sm:space-y-8"
          variants={stagger}
          initial="hidden"
          animate="show"
        >
          {/* Header */}
          <motion.div className="space-y-1.5 sm:space-y-2" variants={fadeUp}>
            <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-slate-900">
              Lupa Kata Sandi?
            </h2>
            <p className="text-slate-600 text-xs sm:text-sm md:text-base leading-relaxed">
              Jangan khawatir, ksatria! Masukkan email universitasmu untuk menerima tautan pemulihan quest.
            </p>
          </motion.div>

          {/* Form */}
          <motion.form className="space-y-5 sm:space-y-6" variants={fadeUp}>
            {/* Email Input */}
            <div className="space-y-1.5 sm:space-y-2">
              <label
                htmlFor="email"
                className="block text-sm font-semibold text-slate-700"
              >
                Email Universitas
              </label>
              <div className="relative">
                <div className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 pointer-events-none">
                  <Mail className="w-4 h-4 sm:w-5 sm:h-5 text-slate-400" />
                </div>
                <input
                  id="email"
                  type="email"
                  placeholder="nama@mahasiswa.univ.ac.id"
                  className="w-full pl-10 sm:pl-12 pr-3 sm:pr-4 py-3 sm:py-3.5 bg-slate-50 border border-slate-200 rounded-xl sm:rounded-2xl text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all duration-200 text-sm sm:text-base"
                />
              </div>
            </div>

            {/* Submit Button with 3D Effect */}
            <div className="relative pt-2">
              {/* Shadow layer */}
              <div className="absolute inset-0 bg-slate-900 rounded-xl sm:rounded-2xl translate-y-1.5"></div>

              {/* Button */}
              <button
                type="submit"
                className="relative w-full py-3 sm:py-3.5 lg:py-4 bg-violet-600 hover:bg-violet-700 text-white rounded-xl sm:rounded-2xl font-bold text-sm sm:text-base transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center gap-2 shadow-lg"
              >
                Kirim Link Pemulihan
                <Zap className="w-4 h-4 fill-current" />
              </button>
            </div>
          </motion.form>

          {/* Back to Login Link */}
          <motion.div className="flex justify-center pt-1 sm:pt-2" variants={fadeUp}>
            <a
              href="/auth/login"
              className="inline-flex items-center gap-1.5 sm:gap-2 text-violet-600 hover:text-violet-700 font-semibold text-xs sm:text-sm md:text-base transition-colors duration-200 group"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform duration-200" />
              Kembali ke Login
            </a>
          </motion.div>

          {/* Help Section */}
          <motion.div className="border-t border-slate-200 pt-5 sm:pt-6" variants={fadeUp}>
            <div className="flex items-start gap-2.5 sm:gap-3 md:gap-4">
              <div className="w-9 h-9 sm:w-10 sm:h-10 bg-violet-100 rounded-full flex items-center justify-center flex-0">
                <HelpCircle className="w-4 h-4 sm:w-5 sm:h-5 text-violet-600" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-slate-900 text-xs sm:text-sm font-semibold mb-0.5">
                  Butuh bantuan lebih?
                </p>
                <p className="text-slate-500 text-[10px] sm:text-xs md:text-sm">
                  Hubungi dukungan penyihir kami di{" "}
                  <a
                    href="mailto:support@taskquest.id"
                    className="text-violet-600 hover:text-violet-700 font-medium underline"
                  >
                    support@taskquest.id
                  </a>
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
  )
}
