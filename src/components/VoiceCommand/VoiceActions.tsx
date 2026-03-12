"use client";

import { motion } from "framer-motion";
import { Mic, MicOff, RotateCcw, Send } from "lucide-react";
import { VoiceActionsProps } from "./types";

export default function VoiceActions({
  voiceState,
  hasTranscript,
  isListening,
  isProcessing,
  canSend,
  supported,
  onToggleMic,
  onReset,
  onSend,
}: VoiceActionsProps) {
  const showReset = hasTranscript || voiceState !== "idle";

  return (
    <div className="flex gap-2 pt-1 pb-1">
      {/* Reset */}
      {showReset && (
        <motion.button
          type="button"
          whileTap={{ scale: 0.95 }}
          onClick={onReset}
          disabled={isProcessing}
          className="flex items-center gap-1.5 rounded-lg border px-3 py-2.5 text-sm text-gray-500 transition hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed"
        >
          <RotateCcw size={14} />
          Reset
        </motion.button>
      )}

      {/* Stop / Start mic */}
      <motion.button
        type="button"
        whileTap={{ scale: 0.95 }}
        onClick={onToggleMic}
        disabled={!supported || isProcessing}
        className={`flex flex-1 items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-sm font-medium transition disabled:opacity-40 disabled:cursor-not-allowed ${
          isListening
            ? "bg-red-50 text-red-600 border border-red-200 hover:bg-red-100"
            : "border border-[#7C3BED]/30 text-[#7C3BED] bg-[#7C3BED]/5 hover:bg-[#7C3BED]/10"
        }`}
      >
        {isListening ? (
          <>
            <MicOff size={15} />
            Stop
          </>
        ) : (
          <>
            <Mic size={15} />
            {hasTranscript ? "Rekam Lagi" : "Mulai Rekam"}
          </>
        )}
      </motion.button>

      {/* Send to AI */}
      <motion.button
        type="button"
        whileTap={{ scale: 0.95 }}
        onClick={onSend}
        disabled={!canSend}
        className="flex items-center gap-2 rounded-lg bg-[#7C3BED] px-5 py-2.5 text-sm font-medium text-white shadow-md shadow-[#7C3BED]/30 transition hover:bg-[#6B2FDB] disabled:opacity-40 disabled:cursor-not-allowed disabled:shadow-none"
      >
        {isProcessing ? (
          <>
            <motion.span
              animate={{ rotate: 360 }}
              transition={{
                duration: 0.8,
                repeat: Infinity,
                ease: "linear",
              }}
              className="block h-4 w-4 rounded-full border-2 border-white/30 border-t-white"
            />
            Memproses...
          </>
        ) : (
          <>
            <Send size={14} />
            Kirim ke AI
          </>
        )}
      </motion.button>
    </div>
  );
}
