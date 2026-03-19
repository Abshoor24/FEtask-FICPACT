"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import { Smartphone, ShieldCheck, Map, ArrowRight, Sparkles, Send, Loader2, CheckCircle2, Compass, MessageSquareQuote } from 'lucide-react';
import { useResendPhoneVerification, useUpdatePhone, useGetProfile } from '@/data/hooks/useAuth';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';

const OnboardingContent = () => {
    const [step, setStep] = useState(0); // 0: Intro/Lore, 1: Phone, 2: OTP, 3: Success
    const [phone, setPhone] = useState('');
    const [otp, setOtp] = useState('');
    const [resendTimer, setResendTimer] = useState(0);
    const router = useRouter();

    const { mutate: resendPhone, isPending: isResending } = useResendPhoneVerification();
    const { mutate: updatePhone, isPending: isUpdating } = useUpdatePhone();
    const { data: profile, isLoading: isProfileLoading } = useGetProfile();

    useEffect(() => {
        if (profile?.data?.phone) {
            router.push('/dashboard');
        }
    }, [profile, router]);

    useEffect(() => {
        let timer: NodeJS.Timeout;
        if (resendTimer > 0) {
            timer = setInterval(() => {
                setResendTimer((prev) => prev - 1);
            }, 1000);
        }
        return () => clearInterval(timer);
    }, [resendTimer]);

    const normalizePhoneInput = (rawValue: string) => {
        const digitsOnly = rawValue.replace(/\D/g, '');

        if (!digitsOnly) {
            return '';
        }

        if (digitsOnly.startsWith('0')) {
            return digitsOnly;
        }

        if (digitsOnly.startsWith('8')) {
            return `0${digitsOnly}`;
        }

        return digitsOnly;
    };

    const handleSendOTP = () => {
        if (!/^08\d{8,12}$/.test(phone)) {
            toast.error("Nomor harus diawali 08 dan hanya berisi angka, contoh: 08xxxxxxxxxx.");
            return;
        }

        resendPhone(phone, {
            onSuccess: () => {
                toast.success("Merpati kami sedang dalam perjalanan membawa gulungan rahasia!");
                setStep(2);
                setResendTimer(60);
            },
            onError: (err: any) => {
                toast.error(err?.response?.data?.message || "Ada gangguan badai di jalur udara, coba lagi nanti!");
            }
        });
    };

    const handleVerifyOTP = () => {
        if (!otp || otp.length < 6) {
            toast.error("Gulungan rahasia memiliki 6 digit simbol, Petualang!");
            return;
        }

        updatePhone({ phone, token: otp }, {
            onSuccess: () => {
                toast.success("Sandi diterima! Gerbang TaskQuest terbuka lebar untukmu.");
                setStep(3);
                setTimeout(() => {
                    router.push('/dashboard');
                }, 2500);
            },
            onError: (err: any) => {
                toast.error(err?.response?.data?.message || "Sandi tersebut ditolak oleh penjaga gerbang, coba lagi!");
            }
        });
    };

    const containerVariants: Variants = {
        hidden: { opacity: 0, scale: 0.95, y: 20 },
        visible: { 
            opacity: 1, 
            scale: 1,
            y: 0,
            transition: { duration: 0.5, ease: "easeOut" }
        },
        exit: { 
            opacity: 0, 
            scale: 1.05,
            y: -20,
            transition: { duration: 0.3 }
        }
    };

    const progressByStep = [20, 55, 85, 100];
    const progress = progressByStep[step] ?? 20;

    if (isProfileLoading) {
        return (
            <div className="min-h-screen bg-[#F7FAF8] flex flex-col items-center justify-center gap-4">
                <Loader2 className="size-10 text-[#7C3BED] animate-spin" />
                <p className="text-[#7C3BED] font-medium animate-pulse">Menyiapkan Arena Petualangan...</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#F7FAF8] flex items-center justify-center p-4 overflow-hidden relative font-sans selection:bg-[#7C3BED]/20">
            {/* Soft background layers aligned with app theme */}
            <div className="absolute inset-0 z-0">
                <div className="absolute top-[-10%] left-[-10%] w-[38%] h-[38%] bg-[#7C3BED]/12 rounded-full blur-[110px]" />
                <div className="absolute bottom-[-12%] right-[-10%] w-[42%] h-[42%] bg-[#4F46E5]/10 rounded-full blur-[130px]" />
                <div className="absolute top-[20%] right-[22%] w-64 h-64 bg-emerald-300/20 rounded-full blur-[90px]" />
                <div className="absolute inset-0 opacity-35" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(124,59,237,0.18) 1px, transparent 0)', backgroundSize: '28px 28px' }} />
            </div>

            <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.15 }}
                className="hidden md:flex absolute top-14 left-12 z-10 items-center gap-3 rounded-2xl border border-white/70 bg-white/80 backdrop-blur-md px-4 py-3 shadow-lg"
            >
                <div className="size-10 rounded-xl bg-[#7C3BED]/12 text-[#7C3BED] flex items-center justify-center">
                    <Sparkles className="size-5" />
                </div>
                <div>
                    <p className="text-[11px] uppercase tracking-[0.18em] text-slate-500 font-bold">Daily Boost</p>
                    <p className="text-sm font-bold text-slate-800">+3 XP setelah verifikasi</p>
                </div>
            </motion.div>

            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.25 }}
                className="hidden md:flex absolute bottom-16 right-12 z-10 items-center gap-3 rounded-2xl border border-amber-100 bg-amber-50/90 backdrop-blur-md px-4 py-3 shadow-lg"
            >
                <div className="size-10 rounded-xl bg-amber-100 text-amber-600 flex items-center justify-center">
                    <ShieldCheck className="size-5" />
                </div>
                <div>
                    <p className="text-[11px] uppercase tracking-[0.18em] text-amber-600 font-bold">Secure Line</p>
                    <p className="text-sm font-bold text-slate-800">Verifikasi OTP terlindungi</p>
                </div>
            </motion.div>

            <div className="max-w-md w-full relative z-10">
                <div className="mb-4 rounded-2xl border border-white/70 bg-white/80 backdrop-blur-md p-4 shadow-md shadow-[#7C3BED]/10">
                    <div className="flex items-center justify-between mb-2">
                        <p className="text-xs font-bold uppercase tracking-[0.18em] text-slate-500">Onboarding Quest</p>
                        <p className="text-xs font-bold text-[#7C3BED]">{progress}%</p>
                    </div>
                    <div className="h-2 w-full rounded-full bg-slate-100 overflow-hidden">
                        <motion.div
                            key={progress}
                            initial={{ width: 0 }}
                            animate={{ width: `${progress}%` }}
                            transition={{ duration: 0.45, ease: 'easeOut' }}
                            className="h-full bg-linear-to-r from-[#7C3BED] to-[#4F46E5]"
                        />
                    </div>
                </div>

                <AnimatePresence mode="wait">
                    {step === 0 && (
                        <motion.div 
                            key="step0"
                            variants={containerVariants}
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                            className="relative overflow-hidden bg-white/90 backdrop-blur-md p-8 rounded-[2rem] border border-[#E8E2FF] shadow-xl shadow-[#7C3BED]/10 text-center"
                        >
                            <div className="absolute top-0 inset-x-8 h-1 rounded-b-full bg-linear-to-r from-transparent via-[#7C3BED]/60 to-transparent" />

                            <div className="flex justify-center mb-6">
                                <motion.div 
                                    animate={{ rotate: [0, 10, -10, 0] }}
                                    transition={{ repeat: Infinity, duration: 4 }}
                                    className="size-20 rounded-3xl bg-linear-to-br from-[#7C3BED] to-[#4F46E5] flex items-center justify-center text-white shadow-lg shadow-[#7C3BED]/35"
                                >
                                    <Compass className="size-10" />
                                </motion.div>
                            </div>

                            <h1 className="text-3xl font-black text-slate-900 mb-4 tracking-tight leading-tight">Selamat Datang, Sang Penjaga Waktu!</h1>
                            <p className="text-slate-600 leading-relaxed mb-8">
                                Dunia <span className="text-[#7C3BED] font-bold">TaskQuest</span> menunggumu. Di sini, setiap tugas yang kamu selesaikan adalah mantra untuk mengubah hidupmu menjadi sebuah legenda.
                            </p>

                            <button 
                                onClick={() => setStep(1)}
                                className="w-full bg-[#7C3BED] text-white font-black py-4 rounded-2xl shadow-lg hover:bg-[#6D31DA] active:scale-[0.98] transition-all flex items-center justify-center gap-3 group"
                            >
                                Mulai Perjalanan
                                <ArrowRight className="size-5 group-hover:translate-x-1 transition-transform" />
                            </button>
                        </motion.div>
                    )}

                    {step === 1 && (
                        <motion.div 
                            key="step1"
                            variants={containerVariants}
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                            className="relative overflow-hidden bg-white/90 backdrop-blur-md p-8 rounded-[2rem] border border-[#E8E2FF] shadow-xl shadow-[#7C3BED]/10"
                        >
                            <div className="absolute top-0 inset-x-8 h-1 rounded-b-full bg-linear-to-r from-transparent via-[#7C3BED]/60 to-transparent" />

                            <div className="flex items-center gap-4 mb-8">
                                <div className="size-12 rounded-xl bg-[#7C3BED]/10 flex items-center justify-center text-[#7C3BED]">
                                    <Map className="size-6" />
                                </div>
                                <div className="text-left">
                                    <h2 className="text-xl font-bold text-slate-900">Koordinat Komunikasi</h2>
                                    <p className="text-xs text-slate-500">Langkah 1 dari 2</p>
                                </div>
                            </div>

                            <p className="text-slate-600 mb-6 text-sm leading-relaxed">
                                Agar para Penjaga bisa membimbingmu di sepanjang jalan, kami butuh koordinat WhatsApp-mu untuk mengirimkan gulungan rahasia (notifikasi & peringatan).
                            </p>

                            <div className="space-y-4">
                                <div className="relative group">
                                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-500 group-focus-within:text-[#7C3BED] transition-colors">
                                        <Smartphone className="size-5" />
                                    </div>
                                    <input 
                                        type="tel" 
                                        placeholder="08xxxxxxxxxx"
                                        value={phone}
                                        onChange={(e) => setPhone(normalizePhoneInput(e.target.value))}
                                        className="w-full bg-white border border-slate-200 rounded-2xl py-4 pl-12 pr-4 text-slate-900 font-medium focus:ring-2 focus:ring-[#7C3BED]/25 focus:border-[#7C3BED]/50 outline-none transition-all placeholder:text-slate-400"
                                    />
                                </div>

                                <button 
                                    onClick={handleSendOTP}
                                    disabled={isResending}
                                    className="w-full bg-[#7C3BED] hover:bg-[#6D31DA] disabled:opacity-50 text-white font-black py-4 rounded-2xl shadow-lg shadow-[#7C3BED]/25 active:scale-95 transition-all flex items-center justify-center gap-2"
                                >
                                    {isResending ? (
                                        <Loader2 className="size-5 animate-spin" />
                                    ) : (
                                        <>
                                            Panggil Merpati Pengirim
                                            <Send className="size-4" />
                                        </>
                                    )}
                                </button>
                            </div>

                            <div className="mt-8 p-4 bg-slate-50 rounded-xl border border-slate-200 flex gap-3">
                                <ShieldCheck className="size-5 text-emerald-500 shrink-0" />
                                <p className="text-[10px] text-slate-600 leading-tight italic">
                                    Kami menjamin kerahasiaan nomor ini. Hanya para Penjaga TaskQuest yang punya akses untuk mengirimkan kabar petualanganmu.
                                </p>
                            </div>
                        </motion.div>
                    )}

                    {step === 2 && (
                        <motion.div 
                            key="step2"
                            variants={containerVariants}
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                            className="relative overflow-hidden bg-white/90 backdrop-blur-md p-8 rounded-[2rem] border border-[#FFE7BF] shadow-xl shadow-amber-500/10"
                        >
                            <div className="absolute top-0 inset-x-8 h-1 rounded-b-full bg-linear-to-r from-transparent via-amber-400/70 to-transparent" />

                            <div className="flex items-center gap-4 mb-8">
                                <div className="size-12 rounded-xl bg-amber-500/20 flex items-center justify-center text-amber-400">
                                    <MessageSquareQuote className="size-6" />
                                </div>
                                <div className="text-left">
                                    <h2 className="text-xl font-bold text-slate-900">Dekripsi Sinyal</h2>
                                    <p className="text-xs text-slate-500">Langkah 2 dari 2</p>
                                </div>
                            </div>

                            <p className="text-slate-600 mb-6 text-sm leading-relaxed text-center">
                                Merpati kami telah mendarat di <span className="text-slate-900 font-bold">{phone}</span>. Ketikkan 6 kode rahasia yang ia bawa agar gerbang ini terbuka.
                            </p>

                            <div className="space-y-4">
                                <div className="relative">
                                    <input 
                                        type="text" 
                                        placeholder="......"
                                        maxLength={6}
                                        value={otp}
                                        onChange={(e) => setOtp(e.target.value)}
                                        className="w-full bg-white border border-slate-200 rounded-2xl py-6 text-center tracking-[1em] text-2xl text-slate-900 font-black focus:ring-2 focus:ring-amber-400/35 focus:border-amber-400/60 outline-none transition-all placeholder:text-slate-300"
                                    />
                                    <motion.div 
                                        animate={{ opacity: [0.2, 0.5, 0.2] }}
                                        transition={{ repeat: Infinity, duration: 1.5 }}
                                        className="absolute -inset-1 bg-amber-500/20 blur-xl rounded-2xl pointer-events-none"
                                    />
                                </div>

                                <button 
                                    onClick={handleVerifyOTP}
                                    disabled={isUpdating}
                                    className="w-full bg-amber-500 hover:bg-amber-400 disabled:opacity-50 text-slate-950 font-black py-4 rounded-2xl shadow-lg shadow-amber-500/20 active:scale-95 transition-all flex items-center justify-center gap-2"
                                >
                                    {isUpdating ? (
                                        <Loader2 className="size-5 animate-spin" />
                                    ) : (
                                        <>
                                            Konfirmasi Identitas
                                            <Sparkles className="size-5" />
                                        </>
                                    )}
                                </button>

                                <button 
                                    onClick={handleSendOTP}
                                    disabled={resendTimer > 0 || isResending}
                                    className="w-full text-slate-500 font-bold py-2 text-sm hover:text-slate-800 transition-colors disabled:opacity-30 flex items-center justify-center gap-2 leading-none"
                                >
                                    Kirim ulang merpati {resendTimer > 0 && `dalam ${resendTimer} detik`}
                                </button>
                            </div>
                        </motion.div>
                    )}

                    {step === 3 && (
                        <motion.div 
                            key="step3"
                            variants={containerVariants}
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                            className="relative overflow-hidden bg-white/90 backdrop-blur-md p-10 rounded-[2.5rem] border border-emerald-100 shadow-xl shadow-emerald-500/10 text-center"
                        >
                            <div className="absolute top-0 inset-x-8 h-1 rounded-b-full bg-linear-to-r from-transparent via-emerald-400/70 to-transparent" />

                            <div className="flex justify-center mb-8 relative">
                                <motion.div 
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    transition={{ type: "spring", damping: 10, stiffness: 100 }}
                                    className="size-24 rounded-full bg-emerald-500 flex items-center justify-center text-white shadow-lg shadow-emerald-500/50 z-10"
                                >
                                    <CheckCircle2 className="size-12" />
                                </motion.div>
                                <motion.div 
                                    animate={{ scale: [1, 2], opacity: [0.5, 0] }}
                                    transition={{ duration: 1.5, repeat: Infinity }}
                                    className="absolute inset-0 bg-emerald-500 rounded-full blur-2xl"
                                />
                            </div>

                            <h1 className="text-4xl font-black text-slate-900 mb-4 tracking-tighter">Gerbang Terbuka!</h1>
                            <p className="text-slate-600 mb-10 leading-relaxed italic">
                                "Keberanianmu telah dibuktikan, Petualang. Kini, takdirmu sebagai legenda di dunia TaskQuest telah dimulai. Jadilah pembasmi kemalasan yang terunggul!"
                            </p>

                            <div className="flex flex-col items-center gap-4">
                                <div className="h-1.5 w-48 bg-white/10 rounded-full overflow-hidden">
                                    <motion.div 
                                        initial={{ width: 0 }}
                                        animate={{ width: "100%" }}
                                        transition={{ duration: 2.5 }}
                                        className="h-full bg-linear-to-r from-[#7C3BED] to-emerald-500"
                                    />
                                </div>
                                <span className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em] animate-pulse">Menyebrang ke Dunia Baru...</span>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between text-[10px] text-slate-500 font-bold uppercase tracking-widest pointer-events-none">
                <div className="flex items-center gap-2">
                    <div className="size-2 bg-emerald-500 rounded-full animate-pulse" />
                    Server: TaskQuest-01
                </div>
                <div>v1.0.4 Saga Edition</div>
            </div>
        </div>
    );
};

export default OnboardingContent;
