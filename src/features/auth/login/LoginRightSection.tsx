import { Lock, Mail, Sword } from "lucide-react";
import Link from "next/link";
import React from "react";
import { motion } from "framer-motion";
import { fadeUp, stagger } from "@/components/motion";
import { useForm } from '@tanstack/react-form'
import { loginSchema } from "@/common/validations/authValidation";
import { useLogin } from "@/data/hooks/useAuth";
import FieldInfo from "@/components/FieldInfo";
import { useRouter } from "next/navigation";

export default function LoginRightSection() {
  const router = useRouter()
  const { mutate: loginMutate, isPending, isSuccess } = useLogin()
  const loginWithGoogle = () => {
    window.location.href = "http://localhost:8080/auth/google"
  }

  const form = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
    validators: {
      onSubmit: loginSchema
    },
    onSubmit: ({ value }) => {
      loginMutate({
        email: value.email,
        password: value.password,
      })
    }
  })

  React.useEffect(() => {
    if (isSuccess === true) {
      router.push('/dashboard')
    }
  }, [isSuccess])


  return (
    <div className="flex-1 bg-white p-6 lg:p-12 flex items-center justify-center">
      <motion.div
        className="w-full max-w-md"
        variants={stagger}
        initial="hidden"
        animate="show"
      >
        {/* Header */}
        <motion.div className="mb-8" variants={fadeUp}>
          <h2 className="text-3xl font-bold text-slate-900 mb-2">
            Selamat Datang
          </h2>
          <p className="text-slate-500">
            Masuk untuk memulai quest akademis harianmu.
          </p>
        </motion.div>

        {/* Login Form */}
        <motion.form
          onSubmit={(e) => {
            e.preventDefault(),
              e.stopPropagation(),
              form.handleSubmit()
          }}
          className="space-y-6" variants={fadeUp}>
          {/* Email Input */}
          <form.Field name="email">
            {(field) => {
              return (<div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Email Universitas
                </label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <input
                    id={field.name}
                    name={field.name}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    type="email"
                    placeholder="nama@universitas.ac.id"
                    className="w-full text-slate-700 pl-12 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-600 focus:border-transparent transition"
                  />
                </div>
                <FieldInfo field={field} />
              </div>)
            }}
          </form.Field>

          {/* Password Input */}
          <form.Field name="password">
            {(field) => {
              return (
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
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      placeholder="••••••••"
                      className="w-full text-slate-700 pl-12 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-600 focus:border-transparent transition"
                    />
                  </div>
                  <FieldInfo  field={field} />
                </div>
              )
            }}
          </form.Field>

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
              {isPending ? "Memasuki Dunia..." : "Mulai Quest"}
            </button>
          </div>
        </motion.form>

        {/* Divider */}
        <motion.div className="relative my-8" variants={fadeUp}>
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-slate-200"></div>
          </div>
          <div className="relative flex justify-center">
            <span className="px-4 bg-white text-xs font-bold text-slate-500 uppercase tracking-wide">
              Atau Masuk Melalui
            </span>
          </div>
        </motion.div>

        {/* Google Login */}
        <motion.button
          initial="hidden"
          animate="show"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.97 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          onClick={() => loginWithGoogle()}
          className="w-full py-3 bg-white border border-slate-200 rounded-xl text-slate-700 font-semibold hover:bg-slate-50 transition flex items-center justify-center gap-3"
          variants={fadeUp}
        >
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
        </motion.button>

        {/* Sign Up Link */}
        <motion.p
          className="text-center  text-sm text-slate-500 mt-6"
          variants={fadeUp}
        >
          Belum punya guild?{" "}
          <Link
            href="/auth/register"
            className="font-bold text-violet-600 hover:text-violet-700 transition"
          >
            Daftar Sekarang
          </Link>
        </motion.p>
      </motion.div>
    </div>
  );
}
