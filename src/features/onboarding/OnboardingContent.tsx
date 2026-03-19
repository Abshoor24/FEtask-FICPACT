"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import { Smartphone, ShieldCheck, Map, ArrowRight, Sparkles, Send, Loader2, CheckCircle2, Compass, MessageSquareQuote, Volume2, VolumeX } from 'lucide-react';
import { useResendPhoneVerification, useUpdatePhone, useGetProfile } from '@/data/hooks/useAuth';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';

const OnboardingContent = () => {
    const [step, setStep] = useState(0); // 0: Intro/Lore, 1: Phone, 2: OTP, 3: Success
    const [phone, setPhone] = useState('');
    const [otp, setOtp] = useState('');
    const [isMuted, setIsMuted] = useState(false);
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

    const handleSendOTP = () => {
        if (!phone || phone.length < 10) {
            toast.error("Berikan nomor yang valid agar merpati kami tidak tersesat di hutan belantara!");
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

    if (isProfileLoading) {
        return (
            <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center gap-4">
                <Loader2 className="size-10 text-violet-500 animate-spin" />
                <p className="text-violet-400 font-medium animate-pulse">Menyiapkan Arena Petualangan...</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#020617] flex items-center justify-center p-4 overflow-hidden relative font-sans selection:bg-violet-500/30">
            {/* Background Narrative Layers */}
            <div className="absolute inset-0 z-0">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-violet-600/20 rounded-full blur-[120px] animate-pulse" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-indigo-600/20 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '1s' }} />
                
                {/* Stars/Dust Particles Effect */}
                <div className="absolute inset-0 opacity-30" style={{ backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
            </div>

            {/* Audio Toggle/Misc HUD */}
            <div className="absolute top-6 right-6 z-20 flex gap-4">
                <button 
                    onClick={() => setIsMuted(!isMuted)}
                    className="p-3 rounded-full bg-white/5 border border-white/10 text-slate-400 hover:text-white hover:bg-white/10 transition-all active:scale-95"
                >
                    {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
                </button>
            </div>

            <div className="max-w-md w-full relative z-10">
                <AnimatePresence mode="wait">
                    {step === 0 && (
                        <motion.div 
                            key="step0"
                            variants={containerVariants}
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                            className="bg-slate-900/80 backdrop-blur-xl p-8 rounded-[2rem] border border-white/10 shadow-2xl shadow-violet-500/10 text-center"
                        >
                            <div className="flex justify-center mb-6">
                                <motion.div 
                                    animate={{ rotate: [0, 10, -10, 0] }}
                                    transition={{ repeat: Infinity, duration: 4 }}
                                    className="size-20 rounded-3xl bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center text-white shadow-lg shadow-violet-500/40"
                                >
                                    <Compass className="size-10" />
                                </motion.div>
                            </div>

                            <h1 className="text-3xl font-black text-white mb-4 tracking-tight leading-tight">Selamat Datang, Sang Penjaga Waktu!</h1>
                            <p className="text-slate-400 leading-relaxed mb-8">
                                Dunia <span className="text-violet-400 font-bold">TaskQuest</span> menunggumu. Di sini, setiap tugas yang kamu selesaikan adalah mantra untuk mengubah hidupmu menjadi sebuah legenda.
                            </p>

                            <button 
                                onClick={() => setStep(1)}
                                className="w-full bg-white text-slate-950 font-black py-4 rounded-2xl shadow-xl hover:bg-violet-50 active:scale-[0.98] transition-all flex items-center justify-center gap-3 group"
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
                            className="bg-slate-900/80 backdrop-blur-xl p-8 rounded-[2rem] border border-white/10 shadow-2xl shadow-violet-500/10"
                        >
                            <div className="flex items-center gap-4 mb-8">
                                <div className="size-12 rounded-xl bg-violet-500/20 flex items-center justify-center text-violet-400">
                                    <Map className="size-6" />
                                </div>
                                <div className="text-left">
                                    <h2 className="text-xl font-bold text-white">Koordinat Komunikasi</h2>
                                    <p className="text-xs text-slate-500">Langkah 1 dari 2</p>
                                </div>
                            </div>

                            <p className="text-slate-400 mb-6 text-sm leading-relaxed">
                                Agar para Penjaga bisa membimbingmu di sepanjang jalan, kami butuh koordinat WhatsApp-mu untuk mengirimkan gulungan rahasia (notifikasi & peringatan).
                            </p>

                            <div className="space-y-4">
                                <div className="relative group">
                                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-500 group-focus-within:text-violet-500 transition-colors">
                                        <Smartphone className="size-5" />
                                    </div>
                                    <input 
                                        type="tel" 
                                        placeholder="08xxxxxxxxxx"
                                        value={phone}
                                        onChange={(e) => setPhone(e.target.value)}
                                        className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white font-medium focus:ring-2 focus:ring-violet-500/50 focus:border-violet-500/50 outline-none transition-all placeholder:text-slate-600"
                                    />
                                </div>

                                <button 
                                    onClick={handleSendOTP}
                                    disabled={isResending}
                                    className="w-full bg-violet-600 hover:bg-violet-500 disabled:opacity-50 text-white font-black py-4 rounded-2xl shadow-lg shadow-violet-600/20 active:scale-95 transition-all flex items-center justify-center gap-2"
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

                            <div className="mt-8 p-4 bg-white/5 rounded-xl border border-white/5 flex gap-3">
                                <ShieldCheck className="size-5 text-emerald-500 shrink-0" />
                                <p className="text-[10px] text-slate-500 leading-tight italic">
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
                            className="bg-slate-900/80 backdrop-blur-xl p-8 rounded-[2rem] border border-white/10 shadow-2xl shadow-amber-500/10"
                        >
                            <div className="flex items-center gap-4 mb-8">
                                <div className="size-12 rounded-xl bg-amber-500/20 flex items-center justify-center text-amber-400">
                                    <MessageSquareQuote className="size-6" />
                                </div>
                                <div className="text-left">
                                    <h2 className="text-xl font-bold text-white">Dekripsi Sinyal</h2>
                                    <p className="text-xs text-slate-500">Langkah 2 dari 2</p>
                                </div>
                            </div>

                            <p className="text-slate-400 mb-6 text-sm leading-relaxed text-center">
                                Merpati kami telah mendarat di <span className="text-white font-bold">{phone}</span>. Ketikkan 6 kode rahasia yang ia bawa agar gerbang ini terbuka.
                            </p>

                            <div className="space-y-4">
                                <div className="relative">
                                    <input 
                                        type="text" 
                                        placeholder="......"
                                        maxLength={6}
                                        value={otp}
                                        onChange={(e) => setOtp(e.target.value)}
                                        className="w-full bg-white/5 border border-white/10 rounded-2xl py-6 text-center tracking-[1em] text-2xl text-white font-black focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500/50 outline-none transition-all placeholder:text-slate-800"
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
                                    className="w-full text-slate-500 font-bold py-2 text-sm hover:text-white transition-colors disabled:opacity-30 flex items-center justify-center gap-2 leading-none"
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
                            className="bg-slate-900/80 backdrop-blur-xl p-10 rounded-[2.5rem] border border-white/10 shadow-2xl shadow-emerald-500/10 text-center"
                        >
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

                            <h1 className="text-4xl font-black text-white mb-4 tracking-tighter">Gerbang Terbuka!</h1>
                            <p className="text-slate-400 mb-10 leading-relaxed italic">
                                "Keberanianmu telah dibuktikan, Petualang. Kini, takdirmu sebagai legenda di dunia TaskQuest telah dimulai. Jadilah pembasmi kemalasan yang terunggul!"
                            </p>

                            <div className="flex flex-col items-center gap-4">
                                <div className="h-1.5 w-48 bg-white/10 rounded-full overflow-hidden">
                                    <motion.div 
                                        initial={{ width: 0 }}
                                        animate={{ width: "100%" }}
                                        transition={{ duration: 2.5 }}
                                        className="h-full bg-gradient-to-r from-violet-500 to-emerald-500"
                                    />
                                </div>
                                <span className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em] animate-pulse">Menyebrang ke Dunia Baru...</span>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* Immersive Footer HUD */}
            <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between text-[10px] text-slate-600 font-bold uppercase tracking-widest pointer-events-none">
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
