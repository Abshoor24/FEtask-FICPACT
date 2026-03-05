import { Lock, Mail, User } from 'lucide-react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { fadeUp, stagger } from '@/components/motion'

export default function RegisterRightSection() {
  return (
        <div className="flex-1 bg-neutral-100 p-6 lg:p-12 flex items-center justify-center">
        <motion.div 
          className="w-full max-w-sm flex flex-col gap-2"
          variants={stagger}
          initial="hidden"
          animate="show"
        >
          {/* Header */}
          <motion.div className="flex flex-col gap-1" variants={fadeUp}>
            <h2 className="text-2xl font-bold text-slate-900">
              Buat Akun Baru
            </h2>
            <p className="text-slate-500 text-base">
              Mulailah perjalanan akademismu dengan cara baru.
            </p>
          </motion.div>

          {/* Form */}
          <motion.form className="flex flex-col gap-5" variants={fadeUp}>
            {/* Nama Lengkap */}
            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold text-slate-700">
                Nama Lengkap
              </label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  placeholder="Budi Santoso"
                  className="w-full pl-11 pr-4 text-slate-700  py-3.5 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-600 focus:border-transparent transition text-base"
                />
              </div>
            </div>

            {/* Email Universitas */}
            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold text-slate-700">
                Email Universitas
              </label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="email"
                  placeholder="budi@mhs.kampus.ac.id"
                  className="w-full pl-11 pr-4 text-slate-700 py-3.5 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-600 focus:border-transparent transition text-base"
                />
              </div>
            </div>

            {/* Kata Sandi & Konfirmasi - Side by Side */}
            <div className="grid grid-cols-2 gap-3">
              <div className="flex flex-col gap-2">
                <label className="text-sm font-semibold text-slate-700">
                  Kata Sandi
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type="password"
                    placeholder="••••••••"
                    className="w-full pl-10 pr-3 text-slate-700 py-3.5 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-600 focus:border-transparent transition text-base"
                  />
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-sm font-semibold text-slate-700">
                  Konfirmasi Kata Sandi
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type="password"
                    placeholder="••••••••"
                    className="w-full text-slate-700 pl-10 pr-3 py-3.5 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-600 focus:border-transparent transition text-base"
                  />
                </div>
              </div>
            </div>

            {/* Terms & Conditions */}
            <div className="flex items-start gap-3 py-1">
              <input
                type="checkbox"
                id="terms"
                className="mt-0.5 w-4 h-4 text-violet-600 border-slate-300 rounded focus:ring-violet-600 flex-0"
              />
              <label
                htmlFor="terms"
                className="text-sm text-slate-500 leading-5"
              >
                Saya setuju dengan{" "}
                <a href="#" className="text-violet-600 hover:underline">
                  Syarat &amp; Ketentuan
                </a>{" "}
                serta Kebijakan Privasi TaskQuest.
              </label>
            </div>

            {/* Submit Button with 3D Effect */}
            <div className="relative">
              <div className="absolute inset-0 bg-black rounded-xl translate-y-1"></div>
              <button
                type="submit"
                className="relative w-full py-4 bg-violet-600 text-white rounded-xl font-bold text-base hover:bg-violet-700 transition hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center gap-2 shadow-lg"
              >
                Daftar &amp; Mulai Quest
              </button>
            </div>
          </motion.form>

          {/* Divider */}
          <motion.div className="relative flex items-center" variants={fadeUp}>
            <div className="flex-1 border-t border-slate-200"></div>
            <span className="px-4 bg-neutral-100 text-xs font-bold text-slate-400 uppercase tracking-wider whitespace-nowrap">
              Atau Daftar Melalui
            </span>
            <div className="flex-1 border-t border-slate-200"></div>
          </motion.div>

          {/* Google Button */}
          <motion.button   initial="hidden"
  animate="show"
  whileHover={{ scale: 1.02 }}
  whileTap={{ scale: 0.97 }}
  transition={{ type: "spring", stiffness: 300, damping: 20 }} className="w-full py-3 bg-white border border-slate-200 rounded-xl text-slate-700 font-semibold hover:bg-slate-50 transition flex items-center justify-center gap-3" variants={fadeUp}>
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              />
            </svg>
            Daftar dengan Google
          </motion.button>

          {/* Login Link */}
          <motion.p className="text-center text-sm text-slate-500" variants={fadeUp}>
            Sudah punya guild?{" "}
            <Link
              href="/auth/login"
              className="font-bold text-violet-600 hover:text-violet-700 transition"
            >
              Masuk Sekarang
            </Link>
          </motion.p>
        </motion.div>
      </div>
  )
}
