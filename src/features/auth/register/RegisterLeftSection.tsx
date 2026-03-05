import { Sword } from 'lucide-react'
import Image from 'next/image'
import React from 'react'
import { motion } from 'framer-motion'
import { fadeUp, stagger } from '@/components/motion'

export default function RegisterLeftSection() {
  return (
          <div className="flex-1 bg-linear-to-br from-violet-600 to-purple-500 p-6 lg:p-12 flex items-center justify-center relative overflow-hidden">
        {/* Decorative Blobs */}
        <div className="absolute -top-24 -left-24 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl"></div>

        {/*Gambar instana*/}
        <motion.div 
          className="absolute top-70 right-0"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
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
          className="w-full max-w-sm relative z-10 flex flex-col gap-10"
          variants={stagger}
          initial="hidden"
          animate="show"
        >
          {/* Logo */}
          <motion.div className="flex items-center gap-2" variants={fadeUp}>
            <div className="w-8 h-8 bg-white/20 backdrop-blur-sm rounded-lg flex items-center justify-center">
              <Sword className="w-5 h-5 text-white" />
            </div>
            <span className="text-2xl font-extrabold text-white">
              TaskQuest
            </span>
          </motion.div>

          {/* Hero Text */}
          <motion.div className="flex flex-col gap-4" variants={fadeUp}>
            <h1 className="text-4xl lg:text-5xl font-extrabold text-white leading-tight">
              Mulai
              <br />
              Petualanganmu!
            </h1>
            <p className="text-white/90 text-base lg:text-lg leading-relaxed">
              Daftar sekarang dan ubah tugas kuliahmu menjadi
              <br className="hidden lg:block" />
              quest epik yang menyenangkan.
            </p>
          </motion.div>

          {/* New Recruit Card */}
          <motion.div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 shadow-xl flex flex-col gap-5" variants={fadeUp}>
            {/* Card Header */}
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-full border-2 border-white/30 overflow-hidden bg-violet-800/40 flex-0">
                <img
                  src="https://i.pravatar.cc/150?img=33"
                  alt="New Recruit"
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <p className="text-white/70 text-xs font-semibold uppercase tracking-wider mb-1">
                  New Recruit
                </p>
                <p className="text-white text-lg font-bold leading-snug">
                  Siap untuk quest pertama?
                </p>
              </div>
            </div>

            {/* XP Bar */}
            <div className="flex flex-col gap-2">
              <div className="flex justify-between items-center">
                <span className="text-white text-sm font-medium">
                  Guardian Level 1
                </span>
                <span className="text-white text-sm font-medium">0% XP</span>
              </div>
              <div className="w-full h-2.5 bg-white/20 rounded-full overflow-hidden">
                <div className="h-full w-0 bg-white/60 rounded-full"></div>
              </div>
              <p className="text-white/60 text-xs">
                Selesaikan tugas pertamamu untuk naik level!
              </p>
            </div>
          </motion.div>

          {/* Social Proof */}
          <motion.div className="flex items-center gap-4" variants={fadeUp}>
            <div className="flex -space-x-2">
              {[10, 20, 30].map((i) => (
                <img
                  key={i}
                  src={`https://i.pravatar.cc/150?img=${i}`}
                  alt="user"
                  className="w-8 h-8 rounded-full border-2 border-violet-600 object-cover"
                />
              ))}
            </div>
            <p className="text-white/80 text-sm font-medium">
              Bergabung dengan 12,000+ mahasiswa lainnya
            </p>
          </motion.div>
        </motion.div>
      </div>
  )
}
