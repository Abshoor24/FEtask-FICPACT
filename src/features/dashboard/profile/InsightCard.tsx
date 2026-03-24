import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { UserModel } from "@/data/models/userModel";
import { useGetLatestReflection } from "@/data/hooks/useReflection";

interface InsightCardProps {
  user: UserModel;
}

/**
 * InsightCard
 *
 * - Menampilkan insight terbaru (jika ada)
 * - Konten akan dipangkas ke preview jika terlalu panjang
 * - Terdapat tombol "Tampilkan selengkapnya" / "Sembunyikan" untuk expand / collapse
 * - Menggunakan `whitespace-pre-wrap` dan `break-words` agar teks rapi walau panjang / berisi newline
 */
export default function InsightCard({ user }: InsightCardProps) {
  const { data: reflections } = useGetLatestReflection();
  const latestInsight = reflections?.data?.[0];

  const rawContent =
    latestInsight?.content ||
    "Ayo lakukan refleksi sekarang untuk mendapatkan Insight AI Pertamamu";

  // Preview settings
  const MAX_PREVIEW_CHARS = 220;
  const [expanded, setExpanded] = useState(false);

  const preview = useMemo(() => {
    if (!rawContent) return "";
    if (rawContent.length <= MAX_PREVIEW_CHARS) return rawContent;

    // Try to cut at last space before limit so words don't break awkwardly
    const idx = rawContent.lastIndexOf(" ", MAX_PREVIEW_CHARS);
    const end = idx > 0 ? idx : MAX_PREVIEW_CHARS;
    return rawContent.slice(0, end) + "...";
  }, [rawContent]);

  const isTruncated = rawContent.length > MAX_PREVIEW_CHARS;

  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ type: "spring", stiffness: 300 }}
      className="max-w-md bg-linear-to-br from-[#7C3BED] to-purple-500 text-white rounded-2xl p-6"
    >
      <h3 className="font-semibold mb-2">Insight AI Pertama</h3>

      {/* Content with proper wrapping + expandable behavior */}
      <div className="text-sm opacity-90">
        <p className="text-justify whitespace-pre-wrap break-words leading-relaxed">
          {expanded || !isTruncated ? rawContent : preview}
        </p>

        {isTruncated && (
          <button
            onClick={() => setExpanded((s) => !s)}
            className="mt-2 text-xs font-semibold underline underline-offset-2 decoration-white/60 decoration-dashed text-white/95 hover:text-white/100"
            aria-expanded={expanded}
          >
            {expanded ? "Sembunyikan" : "Tampilkan selengkapnya"}
          </button>
        )}
      </div>

      <div className="mt-4 bg-white/20 px-4 py-2 rounded-lg text-sm inline-block">
        Status akun: {user.isOnboarded ? "Onboarded" : "Belum Onboarded"}
      </div>
    </motion.div>
  );
}
