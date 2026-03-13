"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Sparkles, X } from "lucide-react";
import { useState } from "react";

import ModeInfoCard from "./ModeInfoCard";
import ModeSelector from "./ModeSelector";
import PulseRing from "./PulseRing";
import SoundWave from "./SoundWave";
import VoiceActions from "./VoiceActions";
import VoiceTranscript from "./VoiceTranscript";
import { EXAMPLE_PROMPTS, MAX_CHARS, MODE_CONFIG } from "./constants";
import { AIMode, VoiceCommandProps } from "./types";
import { useVoiceRecognition } from "./useVoiceRecognition";
import { useCreateQuestWithVoice } from "@/data/hooks/useQuest";
import { useQueryClient } from "@tanstack/react-query";

export default function VoiceCommand({ open, onClose }: VoiceCommandProps) {
  const [aiMode, setAIMode] = useState<AIMode>("with-folder");
  const queryInvalidate = useQueryClient();
  const {
    voiceState,
    transcript,
    interimText,
    errorMsg,
    supported,
    isListening,
    isProcessing,
    hasTranscript,
    isOverLimit,
    canSend,
    textareaRef,
    setTranscript,
    setVoiceState,
    toggleMic,
    handleReset,
    handleExampleClick,
    startProcessing,
  } = useVoiceRecognition(open);

  const { mutate: createQuestWithVoice } = useCreateQuestWithVoice();

  // ── Status labels ───────────────────────────────────────────────────────────

  const statusLabel: Record<string, string> = {
    idle: "Tekan mikrofon untuk mulai",
    listening: "Sedang mendengarkan...",
    processing: "AI sedang memproses...",
    done: "Selesai merekam",
    error: errorMsg || "Terjadi kesalahan",
  };

  const statusColor: Record<string, string> = {
    idle: "text-gray-400",
    listening: "text-[#7C3BED]",
    processing: "text-amber-500",
    done: "text-green-600",
    error: "text-red-500",
  };

  // ── Send handler ────────────────────────────────────────────────────────────

  const handleSend = () => {
    if (!transcript.trim()) return;
    startProcessing();

    // TODO: kirim transcript + aiMode ke backend untuk AI processing
    // await aiService.processVoiceCommand({ transcript, mode: aiMode })
    // alert(
    //   JSON.stringify({
    //     transcript,
    //     mode: aiMode,
    //   }),
    // );
    createQuestWithVoice(
      { text: transcript, mode: aiMode },
      {
        onSuccess: () => {
          queryInvalidate.invalidateQueries({ queryKey: ["get_user_quests"] });
          setVoiceState("idle");
          setTranscript("");
          onClose();
        },
        onError: () => {
          setVoiceState("idle");
          setTranscript("");
        },
      },
    );

    // setTimeout(() => {
    //   // Simulasi response – hapus setelah backend ready
    //   setVoiceState("idle");
    //   setTranscript("");
    //   onClose();
    // }, 1500);
  };

  const currentPrompts = EXAMPLE_PROMPTS[aiMode];

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* ── Backdrop ── */}
          <motion.div
            className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* ── Modal wrapper ── */}
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center px-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="relative w-full max-w-lg rounded-2xl bg-white shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
              initial={{ scale: 0.88, y: 24 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.88, y: 24 }}
              transition={{ type: "spring", stiffness: 300, damping: 28 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* ── Top gradient bar ── */}
              <div className="h-1.5 w-full shrink-0 bg-gradient-to-r from-[#7C3BED] via-purple-400 to-indigo-400" />

              {/* ── Header ── */}
              <div className="shrink-0 flex items-center justify-between px-6 pt-5 pb-3 border-b border-gray-100">
                <div className="flex items-center gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#7C3BED]/10">
                    <Sparkles size={16} className="text-[#7C3BED]" />
                  </div>
                  <div>
                    <h2 className="text-base font-semibold text-gray-900 leading-tight">
                      AI Voice Quest
                    </h2>
                    <p className="text-xs text-gray-400">
                      Ucapkan perintah, AI akan membuat task untukmu
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={onClose}
                  className="flex h-8 w-8 items-center justify-center rounded-lg text-gray-400 transition hover:bg-gray-100 hover:text-gray-600"
                >
                  <X size={16} />
                </button>
              </div>

              {/* ── Scrollable body ── */}
              <div className="flex-1 overflow-y-auto px-6 pb-6 pt-4 space-y-4">
                {/* ── Mode selector ── */}
                <div>
                  <p className="mb-2 text-xs font-semibold text-gray-400 uppercase tracking-wide">
                    Mode AI
                  </p>
                  <ModeSelector
                    value={aiMode}
                    onChange={setAIMode}
                    disabled={isListening || isProcessing}
                  />
                </div>

                {/* ── Mode description (animated swap) ── */}
                <AnimatePresence mode="wait">
                  <motion.p
                    key={aiMode}
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -4 }}
                    transition={{ duration: 0.18 }}
                    className="text-xs text-gray-400 text-center"
                  >
                    {MODE_CONFIG[aiMode].description}
                  </motion.p>
                </AnimatePresence>

                {/* ── Divider ── */}
                <div className="border-t border-gray-100" />

                {/* ── Mic section ── */}
                <div className="flex flex-col items-center gap-3 py-1">
                  <div className="h-10 flex items-center">
                    <SoundWave active={isListening} />
                  </div>

                  <PulseRing active={isListening} onClick={toggleMic} />

                  {/* Status text */}
                  <div className="flex items-center gap-1.5">
                    {isListening && (
                      <motion.span
                        className="h-2 w-2 rounded-full bg-red-500"
                        animate={{ opacity: [1, 0.2, 1] }}
                        transition={{ duration: 1, repeat: Infinity }}
                      />
                    )}
                    {isProcessing && (
                      <motion.span
                        className="h-2 w-2 rounded-full bg-amber-500"
                        animate={{ scale: [1, 1.4, 1] }}
                        transition={{ duration: 0.8, repeat: Infinity }}
                      />
                    )}
                    <p
                      className={`text-sm font-medium ${statusColor[voiceState]}`}
                    >
                      {statusLabel[voiceState]}
                    </p>
                  </div>

                  {/* Browser not supported warning */}
                  {!supported && (
                    <p className="rounded-lg bg-red-50 px-4 py-2 text-center text-xs text-red-500">
                      Browser kamu tidak mendukung Speech Recognition.
                      <br />
                      Gunakan Chrome atau Edge versi terbaru.
                    </p>
                  )}
                </div>

                {/* ── Transcript ── */}
                <VoiceTranscript
                  transcript={transcript}
                  interimText={interimText}
                  isListening={isListening}
                  isProcessing={isProcessing}
                  isOverLimit={isOverLimit}
                  aiMode={aiMode}
                  maxChars={MAX_CHARS}
                  textareaRef={textareaRef}
                  onChange={setTranscript}
                />

                {/* ── Example prompts (changes with mode) ── */}
                {!hasTranscript && voiceState === "idle" && (
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={aiMode}
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -6 }}
                      transition={{ duration: 0.2 }}
                    >
                      <p className="mb-2 text-xs font-semibold text-gray-400 uppercase tracking-wide">
                        Contoh perintah
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {currentPrompts.map((prompt) => (
                          <button
                            key={prompt}
                            type="button"
                            onClick={() => handleExampleClick(prompt)}
                            className="rounded-full border border-dashed border-gray-200 px-3 py-1 text-xs text-gray-500 transition hover:border-[#7C3BED] hover:text-[#7C3BED] hover:bg-[#7C3BED]/5 text-left"
                          >
                            {prompt}
                          </button>
                        ))}
                      </div>
                    </motion.div>
                  </AnimatePresence>
                )}

                {/* ── AI info box (changes with mode) ── */}
                <AnimatePresence mode="wait">
                  {hasTranscript && !isListening && (
                    <ModeInfoCard key={aiMode} mode={aiMode} />
                  )}
                </AnimatePresence>

                {/* ── Action buttons ── */}
                <VoiceActions
                  voiceState={voiceState}
                  hasTranscript={hasTranscript}
                  isListening={isListening}
                  isProcessing={isProcessing}
                  canSend={canSend}
                  supported={supported}
                  onToggleMic={toggleMic}
                  onReset={handleReset}
                  onSend={handleSend}
                />
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
