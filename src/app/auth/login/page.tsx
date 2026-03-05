"use client";

import { Mail, Lock, Sword } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function LoginPage() {
  return (
    <div className="min-h-screen flex flex-col lg:flex-row">
      {/* Left Side - Purple Section */}
      <div className="flex-1  bg-linear-to-br from-violet-600 to-purple-500 p-6 lg:p-12 flex items-center justify-center relative overflow-hidden">
        {/* Decorative Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 right-20 w-64 h-64 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 left-20 w-96 h-96 bg-white/50 rounded-full blur-3xl"></div>
        </div>

        {/*Gambar instana*/}
        <div className="absolute top-70 right-0">
          <Image
            width={180}
            height={180}
            alt="BG_INSTANA"
            src={"/bg_instana.png"}
          />
        </div>

        <div className="w-full max-w-lg relative z-10">
          {/* Logo */}
          <div className="flex items-center gap-3 mb-12">
            <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-lg flex items-center justify-center">
              <Sword className="w-6 h-6 text-white" />
            </div>
            <span className="text-3xl font-bold text-white">TaskQuest</span>
          </div>

          {/* Hero Text */}
          <h1 className="text-4xl lg:text-5xl font-bold text-white mb-12 leading-tight">
            Ubah Tugas Jadi
            <br />
            Petualangan Epik
          </h1>

          {/* Profile Card */}
          <div className="bg-white/20 backdrop-blur-md rounded-2xl p-6 border border-white/20 shadow-xl">
            {/* Profile Header */}
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 rounded-full border-2 border-white overflow-hidden bg-white shadow-sm">
                <img
                  src="https://i.pravatar.cc/150?img=12"
                  alt="Alex Rivera"
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-800">
                  Alex Rivera
                </h3>
                <p className="text-xs text-slate-600">
                  Level 14 Academic Knight
                </p>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="mb-4">
              <div className="flex justify-between items-center mb-2">
                <span className="text-xs font-semibold text-slate-700">
                  EXP Petualangan
                </span>
                <span className="text-xs font-semibold text-slate-700">
                  85%
                </span>
              </div>
              <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-violet-600 rounded-full shadow-[0_0_10px_rgba(124,61,237,0.5)] transition-all"
                  style={{ width: "85%" }}
                ></div>
              </div>
            </div>

            {/* Quote */}
            <p className="text-sm text-slate-700 italic">
              &quot;Siap melanjutkan petualangan hari ini?&quot;
            </p>
          </div>
        </div>
      </div>

      {/* Right Side - Login Form */}
      <div className="flex-1 bg-white p-6 lg:p-12 flex items-center justify-center">
        <div className="w-full max-w-md">
          {/* Header */}
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-slate-900 mb-2">
              Selamat Datang
            </h2>
            <p className="text-slate-500">
              Masuk untuk memulai quest akademis harianmu.
            </p>
          </div>

          {/* Login Form */}
          <form className="space-y-6">
            {/* Email Input */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Email Universitas
              </label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  type="email"
                  placeholder="nama@universitas.ac.id"
                  className="w-full text-slate-700 pl-12 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-600 focus:border-transparent transition"
                />
              </div>
            </div>

            {/* Password Input */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-sm font-semibold text-slate-700">
                  Kata Sandi
                </label>
                <a
                  href="#"
                  className="text-sm font-semibold text-violet-600 hover:text-violet-700 transition"
                >
                  Lupa Sandi?
                </a>
              </div>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  type="password"
                  placeholder="••••••••"
                  className="w-full text-slate-700 pl-12 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-600 focus:border-transparent transition"
                />
              </div>
            </div>

            {/* Remember Me */}
            <div className="flex items-center">
              <input
                type="checkbox"
                id="remember"
                className="w-4 h-4  text-violet-600 border-slate-300 rounded focus:ring-violet-600"
              />
              <label htmlFor="remember" className="ml-2 text-sm text-slate-600">
                Ingat petualangan saya
              </label>
            </div>

            {/* Submit Button with 3D Effect */}
            <div className="relative">
              <div className="absolute inset-0 bg-black rounded-xl translate-y-1"></div>
              <button
                type="submit"
                className="relative w-full py-3.5 bg-violet-600 text-white rounded-xl font-bold text-base hover:bg-violet-700 transition hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center gap-2 shadow-lg"
              >
                <Sword className="w-5 h-5" />
                Mulai Quest
              </button>
            </div>
          </form>

          {/* Divider */}
          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-200"></div>
            </div>
            <div className="relative flex justify-center">
              <span className="px-4 bg-white text-xs font-bold text-slate-500 uppercase tracking-wide">
                Atau Masuk Melalui
              </span>
            </div>
          </div>

          {/* Google Login */}
          <button className="w-full py-3 bg-white border border-slate-200 rounded-xl text-slate-700 font-semibold hover:bg-slate-50 transition flex items-center justify-center gap-3">
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
            Masuk dengan Google
          </button>

          {/* Sign Up Link */}
          <p className="text-center text-sm text-slate-500 mt-6">
            Belum punya guild?{" "}
            <Link
              href="/auth/register"
              className="font-bold text-violet-600 hover:text-violet-700 transition"
            >
              Daftar Sekarang
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
