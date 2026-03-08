import Image from "next/image";
import { motion } from "framer-motion";

export default function ProfileHeader() {
  return (
    <div className="flex items-center gap-6">
<div className="relative w-24 h-24 rounded-full border-2 border-[#7C3BED] flex items-center justify-center">
  <Image
    src="/amba1.jpg"
    alt="Profile"
    fill
    className="rounded-full object-cover"
  />

  <span className="absolute -bottom-1 -right-1 bg-[#7C3BED] text-white text-[10px] px-2 py-0.5 rounded-full">
    Lv14
  </span>
</div>

      <div>
        <h1 className="text-xl font-semibold">MASAmbaaaa</h1>
        <p className="text-sm text-gray-500">
          Guardian Kelas Menengah • Pelindung Fokus
        </p>

        <div className="mt-3 w-[320px]">
          <div className="flex justify-between text-xs mb-1 text-gray-500">
            <span>Experience Points</span>
            <span>2450 / 3000 XP</span>
          </div>

          <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
            <motion.div
              className="h-2 bg-[#7C3BED]"
              initial={{ width: 0 }}
              animate={{ width: "82%" }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}