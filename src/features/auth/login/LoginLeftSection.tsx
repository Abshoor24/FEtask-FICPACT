import { Sword } from 'lucide-react'
import Image from 'next/image'
import React from 'react'
import { motion } from 'framer-motion'
import { fadeUp, stagger } from '@/components/motion'

export default function LoginLeftSection() {
    return (
        <div className="flex-1  bg-linear-to-br from-violet-600 to-purple-500 p-6 lg:p-12 flex items-center justify-center relative overflow-hidden">
            {/* Decorative Background Pattern */}
            <div className="absolute inset-0 opacity-10">
                <div className="absolute top-20 right-20 w-64 h-64 bg-white rounded-full blur-3xl"></div>
                <div className="absolute bottom-20 left-20 w-96 h-96 bg-white/50 rounded-full blur-3xl"></div>
            </div>

            {/*Gambar instana*/}
            <motion.div 
                className="absolute top-70 right-0"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
            >
                <Image
                    width={180}
                    height={180}
                    alt="BG_INSTANA"
                    src="/bg_instana.png"
                />
            </motion.div>

            <motion.div 
                className="w-full max-w-lg relative z-10"
                variants={stagger}
                initial="hidden"
                animate="show"
            >
                {/* Logo */}
                <motion.div className="flex items-center gap-3 mb-12" variants={fadeUp}>
                    <div className="w-10 h-10 flex items-center justify-center">
                        <Image src="/icon.png" width={40} height={40} alt="TaskQuest Logo" className="drop-shadow-lg" />
                    </div>
                    <span className="text-3xl font-bold text-white">TaskQuest</span>
                </motion.div>

                {/* Hero Text */}
                <motion.h1 className="text-4xl lg:text-5xl font-bold text-white mb-12 leading-tight" variants={fadeUp}>
                    Ubah Tugas Jadi
                    <br />
                    Petualangan Epik
                </motion.h1>

                {/* Profile Card */}
                <motion.div className="bg-white/20 backdrop-blur-md rounded-2xl p-6 border border-white/20 shadow-xl" variants={fadeUp}>
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
                </motion.div>
            </motion.div>
        </div>
    )
}
