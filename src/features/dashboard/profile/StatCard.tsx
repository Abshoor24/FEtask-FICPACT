import { motion } from "framer-motion";
import { scaleHover } from "@/components/motion";
import { Pencil } from "lucide-react";

export default function StatCard({
  title,
  value,
  note,
  onClick,
}: {
  title: string;
  value: string;
  note?: string;
  onClick?: () => void;
}) {
  return (
    <motion.div
      className={`relative bg-white border rounded-2xl p-6 overflow-hidden ${
        onClick
          ? "cursor-pointer border-purple-100 hover:border-purple-300 hover:bg-purple-50/30 transition-all group"
          : "border-gray-200"
      }`}
      {...(scaleHover as any)}
      onClick={onClick}
    >
      {onClick && (
        <div className="absolute top-0 right-0">
            <div className="bg-purple-100/50 text-purple-600 px-3 py-1 rounded-bl-xl text-[10px] font-bold flex items-center gap-1 group-hover:bg-purple-600 group-hover:text-white transition-all">
                <Pencil className="w-2.5 h-2.5" />
                <span>UBAH</span>
            </div>
        </div>
      )}
      <p className="text-sm text-gray-500">{title}</p>
      <h3 className="text-2xl font-semibold mt-1">{value}</h3>
      {note && <p className="text-xs text-green-500 mt-1">{note}</p>}
      
      {onClick && (
         <p className="text-[10px] text-purple-400 mt-2 font-medium">
            Klik untuk mengatur ulang jadwal
         </p>
      )}
    </motion.div>
  );
}