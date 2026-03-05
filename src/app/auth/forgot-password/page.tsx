"use client";

import { Mail, Zap, ArrowLeft, HelpCircle, Shield, Lock } from "lucide-react";

export default function ForgotPasswordPage() {
  return (
    <div className="min-h-screen flex flex-col lg:flex-row">
      {/* Left Side - Purple Section */}
      <div className="relative flex-1 bg-linear-to-br from-violet-600 to-violet-700 px-6 sm:px-8 lg:px-12 py-12 sm:py-16 lg:py-0 flex flex-col justify-center items-center overflow-hidden min-h-125 lg:min-h-screen">

        {/* Background Effects & Logo tetap sama... */}
        <div className="absolute inset-0 bg-[radial-linear(ellipse_at_top_right,rgba(255,255,255,0.1),transparent_50%)]"></div>

        {/* Logo - Posisikan absolute supaya tidak ganggu flex center */}
        <div className="absolute top-6 lg:top-8 left-6 lg:left-8 z-20 flex items-center gap-2.5">
          <div className="p-1.5 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
            <Shield className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl lg:text-2xl font-bold text-white">TaskQuest</span>
        </div>

        {/* Main Content */}
        <div className="relative z-10 w-full max-w-md mx-auto space-y-5 sm:space-y-6 lg:space-y-8 flex flex-col items-center text-center lg:text-left lg:items-start mb-16 sm:mb-20 lg:mb-0">
          {/* Heading */}
          <div className="space-y-2 sm:space-y-3">
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight">
              Jangan Biarkan
              <br />
              Quest-mu Terhenti!
            </h1>
            <p className="text-white/90 text-xs sm:text-sm md:text-base lg:text-lg leading-relaxed max-w-sm">
              Pulihkan akses ke petualangan akademikmu sekarang. Para Guardian sedang menunggumu di gerbang TaskQuest.
            </p>
          </div>

          {/* Status Card */}
          <div className="w-full bg-white/10 backdrop-blur-md rounded-xl sm:rounded-2xl lg:rounded-3xl p-3.5 sm:p-4 lg:p-5 border border-white/20 shadow-2xl">
            <div className="flex items-start gap-3 sm:gap-4 text-left">
              <div className="p-2 sm:p-2.5 bg-white/20 rounded-lg sm:rounded-xl flex items-center justify-center flex-0">
                <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-white font-bold text-sm sm:text-base lg:text-lg mb-1">Account Recovery Mode</h3>
                <div className="flex items-center gap-1.5 sm:gap-2">
                  <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-yellow-400 rounded-full animate-pulse"></div>
                  <p className="text-white/80 text-xs sm:text-sm">Menunggu Magic Link</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Lock Icon Section with Divine Glow */}
        <div className="absolute bottom-4 sm:bottom-8 lg:bottom-6 left-1/2 -translate-x-1/2 flex items-center justify-center pointer-events-none">
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
        </div>

        {/* Footer */}
        <div className="absolute bottom-3 sm:bottom-4 lg:bottom-6 left-6 lg:left-8 z-10">
          <p className="text-white/60 text-[10px] sm:text-xs lg:text-sm">© 2024 TaskQuest Academic Labs.</p>
        </div>
      </div>

      {/* Right Side - Form Section */}
      <div className="flex-1 bg-white px-6 sm:px-8 lg:px-16 py-8 sm:py-10 lg:py-12 flex flex-col justify-center min-h-150 lg:min-h-screen">
        <div className="w-full max-w-md mx-auto space-y-6 sm:space-y-8">
          {/* Header */}
          <div className="space-y-1.5 sm:space-y-2">
            <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-slate-900">
              Lupa Kata Sandi?
            </h2>
            <p className="text-slate-600 text-xs sm:text-sm md:text-base leading-relaxed">
              Jangan khawatir, ksatria! Masukkan email universitasmu untuk menerima tautan pemulihan quest.
            </p>
          </div>

          {/* Form */}
          <form className="space-y-5 sm:space-y-6">
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
          </form>

          {/* Back to Login Link */}
          <div className="flex justify-center pt-1 sm:pt-2">
            <a
              href="/auth/login"
              className="inline-flex items-center gap-1.5 sm:gap-2 text-violet-600 hover:text-violet-700 font-semibold text-xs sm:text-sm md:text-base transition-colors duration-200 group"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform duration-200" />
              Kembali ke Login
            </a>
          </div>

          {/* Help Section */}
          <div className="border-t border-slate-200 pt-5 sm:pt-6">
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
          </div>
        </div>
      </div>
    </div>
  );
}
