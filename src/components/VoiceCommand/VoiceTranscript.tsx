"use client";

import { Volume2 } from "lucide-react";
import { VoiceTranscriptProps } from "./types";

export default function VoiceTranscript({
  transcript,
  interimText,
  isListening,
  isProcessing,
  isOverLimit,
  aiMode,
  maxChars,
  textareaRef,
  onChange,
}: VoiceTranscriptProps) {
  const isNearLimit = transcript.length >= maxChars * 0.9;

  const borderClass = isOverLimit
    ? "border-red-300 focus-within:border-red-400 focus-within:ring-red-200"
    : isNearLimit
      ? "border-amber-300 focus-within:border-amber-400 focus-within:ring-amber-100"
      : "border-gray-200 focus-within:border-[#7C3BED] focus-within:ring-[#7C3BED]/20";

  const counterClass = isOverLimit
    ? "text-red-500"
    : isNearLimit
      ? "text-amber-500"
      : "text-gray-300";

  const placeholder = isListening
    ? "Mendengarkan suara kamu..."
    : aiMode === "with-folder"
      ? 'Contoh: "Buatkan folder Matematika dan task belajar untuk ujian..."'
      : 'Contoh: "Buatkan task belajar matematika untuk besok..."';

  return (
    <div className="relative">
      <label className="mb-1.5 block text-xs font-semibold text-gray-400 uppercase tracking-wide">
        Hasil transkripsi
      </label>

      <div
        className={`relative rounded-xl border bg-gray-50 transition focus-within:ring-2 ${borderClass}`}
      >
        <textarea
          ref={textareaRef}
          value={transcript + (interimText ? ` ${interimText}` : "")}
          onChange={(e) => onChange(e.target.value.slice(0, maxChars))}
          readOnly={isListening || isProcessing}
          placeholder={placeholder}
          rows={3}
          className="w-full resize-none rounded-xl bg-transparent px-4 py-3 text-sm text-gray-800 placeholder:text-gray-300 focus:outline-none"
          style={{ minHeight: 80 }}
        />

        {isListening && interimText && (
          <span className="absolute bottom-3 right-3">
            <Volume2 size={14} className="text-[#7C3BED] animate-pulse" />
          </span>
        )}
      </div>

      <div className="mt-1 flex items-center justify-end gap-1.5">
        {isOverLimit && (
          <p className="text-xs text-red-500 font-medium">
            Maksimal {maxChars} karakter
          </p>
        )}
        <p className={`text-xs font-medium tabular-nums transition-colors ${counterClass}`}>
          {transcript.length}/{maxChars}
        </p>
      </div>
    </div>
  );
}
