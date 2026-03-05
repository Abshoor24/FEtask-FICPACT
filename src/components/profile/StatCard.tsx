import { motion } from "framer-motion";
import { scaleHover } from "@/components/motion";

export default function StatCard({
  title,
  value,
  note,
}: {
  title: string;
  value: string;
  note?: string;
}) {
  return (
    <motion.div
      className="bg-white border rounded-2xl p-6"
      {...(scaleHover as any)}
    >
      <p className="text-sm text-gray-500">{title}</p>
      <h3 className="text-2xl font-semibold mt-1">{value}</h3>
      {note && <p className="text-xs text-green-500 mt-1">{note}</p>}
    </motion.div>
  );
}