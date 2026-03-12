"use client";

import { AnimatePresence, motion } from "framer-motion";
import {
  Mic,
  MicOff,
  X,
  Sparkles,
  RotateCcw,
  Send,
  Volume2,
} from "lucide-react";
import { useEffect, useRef, useState, useCallback } from "react";

// ─── Types ────────────────────────────────────────────────────────────────────

type VoiceState = "idle" | "listening" | "processing" | "done" | "error";

interface VoiceCommandProps {
  open: boolean;
  onClose: () => void;
}

// ─── Web Speech API type shim ──────────────────────────────────────────────────

interface SpeechRecognitionEvent extends Event {
  results: SpeechRecognitionResultList;
  resultIndex: number;
}

interface SpeechRecognitionErrorEvent extends Event {
  error: string;
}

interface SpeechRecognitionInstance extends EventTarget {
  lang: string;
  continuous: boolean;
  interimResults: boolean;
  maxAlternatives: number;
  start(): void;
  stop(): void;
  abort(): void;
  onresult: ((event: SpeechRecognitionEvent) => void) | null;
  onerror: ((event: SpeechRecognitionErrorEvent) => void) | null;
  onend: (() => void) | null;
  onstart: (() => void) | null;
}

declare global {
  interface Window {
    SpeechRecognition: new () => SpeechRecognitionInstance;
    webkitSpeechRecognition: new () => SpeechRecognitionInstance;
  }
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

const EXAMPLE_PROMPTS = [
  "Buatkan task untuk belajar matematika minggu ini",
  "Buat folder project dan tambahkan task deadline jumat",
  "Buatkan quest untuk olahraga rutin setiap hari",
  "Tambahkan task presentasi bisnis besok jam 9",
];

function getSpeechRecognition(): (new () => SpeechRecognitionInstance) | null {
  if (typeof window === "undefined") return null;
  return window.SpeechRecognition || window.webkitSpeechRecognition || null;
}

// ─── Animated Sound Wave ──────────────────────────────────────────────────────

function SoundWave({ active }: { active: boolean }) {
  const bars = [3, 5, 8, 5, 10, 6, 4, 8, 5, 3];
  return (
    <div className="flex items-center justify-center gap-[3px] h-10">
      {bars.map((h, i) => (
        <motion.span
          key={i}
          className="w-[3px] rounded-full bg-[#7C3BED]"
          animate={
            active
              ? {
                  scaleY: [1, h / 3, 1],
                  opacity: [0.6, 1, 0.6],
                }
              : { scaleY: 0.3, opacity: 0.3 }
          }
          transition={
            active
              ? {
                  duration: 0.6 + i * 0.05,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: i * 0.06,
                }
              : { duration: 0.3 }
          }
          style={{ height: `${h * 3}px`, originY: 0.5 }}
        />
      ))}
    </div>
  );
}

// ─── Pulse Ring ────────────────────────────────────────────────────────────────

function PulseRing({ active }: { active: boolean }) {
  return (
    <div className="relative flex items-center justify-center">
      {active && (
        <>
          <motion.span
            className="absolute rounded-full bg-[#7C3BED]/20"
            animate={{ scale: [1, 2.2], opacity: [0.5, 0] }}
            transition={{ duration: 1.4, repeat: Infinity, ease: "easeOut" }}
            style={{ width: 80, height: 80 }}
          />
          <motion.span
            className="absolute rounded-full bg-[#7C3BED]/15"
            animate={{ scale: [1, 2.8], opacity: [0.4, 0] }}
            transition={{
              duration: 1.4,
              repeat: Infinity,
              ease: "easeOut",
              delay: 0.4,
            }}
            style={{ width: 80, height: 80 }}
          />
        </>
      )}

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className={`relative z-10 flex items-center justify-center rounded-full shadow-lg transition-colors duration-300 ${
          active
            ? "bg-[#7C3BED] text-white shadow-[#7C3BED]/40"
            : "bg-gray-100 text-gray-400 hover:bg-[#7C3BED]/10 hover:text-[#7C3BED]"
        }`}
        style={{ width: 80, height: 80 }}
      >
        {active ? <Mic size={30} /> : <MicOff size={26} />}
      </motion.button>
    </div>
  );
}

// ─── Main Component ────────────────────────────────────────────────────────────

export default function VoiceCommand({ open, onClose }: VoiceCommandProps) {
  const [voiceState, setVoiceState] = useState<VoiceState>("idle");
  const [transcript, setTranscript] = useState("");
  const [interimText, setInterimText] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [supported, setSupported] = useState(true);

  const recognitionRef = useRef<SpeechRecognitionInstance | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // ── Check browser support ─────────────────────────────────────────────────

  useEffect(() => {
    const SR = getSpeechRecognition();
    if (!SR) setSupported(false);
  }, []);

  // ── Reset state when modal closes ─────────────────────────────────────────

  useEffect(() => {
    if (!open) {
      stopListening();
      setVoiceState("idle");
      setTranscript("");
      setInterimText("");
      setErrorMsg("");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  // ── Auto-resize textarea ──────────────────────────────────────────────────

  useEffect(() => {
    const el = textareaRef.current;
    if (!el) return;
    el.style.height = "auto";
    el.style.height = `${el.scrollHeight}px`;
  }, [transcript]);

  // ── Stop recognition ──────────────────────────────────────────────────────

  const stopListening = useCallback(() => {
    recognitionRef.current?.stop();
    recognitionRef.current = null;
  }, []);

  // ── Start recognition ──────────────────────────────────────────────────────

  const startListening = useCallback(() => {
    const SR = getSpeechRecognition();
    if (!SR) return;

    setErrorMsg("");
    setInterimText("");

    const recognition: SpeechRecognitionInstance = new SR();
    recognition.lang = "id-ID";
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.maxAlternatives = 1;

    recognition.onstart = () => {
      setVoiceState("listening");
    };

    recognition.onresult = (event: SpeechRecognitionEvent) => {
      let finalText = "";
      let interim = "";

      for (let i = event.resultIndex; i < event.results.length; i++) {
        const result = event.results[i];
        if (result.isFinal) {
          finalText += result[0].transcript;
        } else {
          interim += result[0].transcript;
        }
      }

      if (finalText) {
        setTranscript((prev) =>
          prev ? `${prev} ${finalText.trim()}` : finalText.trim(),
        );
      }
      setInterimText(interim);
    };

    recognition.onerror = (event: SpeechRecognitionErrorEvent) => {
      const msgs: Record<string, string> = {
        "not-allowed":
          "Akses mikrofon ditolak. Izinkan akses mikrofon di browser kamu.",
        "no-speech": "Tidak ada suara terdeteksi. Coba lagi.",
        network: "Koneksi bermasalah. Periksa internet kamu.",
        aborted: "",
      };
      const msg = msgs[event.error] ?? `Error: ${event.error}`;
      if (msg) {
        setErrorMsg(msg);
        setVoiceState("error");
      }
    };

    recognition.onend = () => {
      setInterimText("");
      setVoiceState((prev) => {
        if (prev === "listening") return "done";
        return prev;
      });
    };

    recognitionRef.current = recognition;
    recognitionRef.current.start();
  }, []);

  // ── Toggle mic ────────────────────────────────────────────────────────────

  const toggleMic = () => {
    if (voiceState === "listening") {
      stopListening();
      setVoiceState("done");
    } else {
      startListening();
    }
  };

  // ── Reset ─────────────────────────────────────────────────────────────────

  const handleReset = () => {
    stopListening();
    setVoiceState("idle");
    setTranscript("");
    setInterimText("");
    setErrorMsg("");
  };

  // ── Send (placeholder – backend logic later) ──────────────────────────────

  const handleSend = () => {
    if (!transcript.trim()) return;
    setVoiceState("processing");

    // TODO: kirim transcript ke backend untuk AI processing
    // Contoh nanti:
    // await aiService.processVoiceCommand(transcript)
    //   .then((result) => { ... })
    alert(transcript);

    setTimeout(() => {
      // Simulasi response – hapus setelah backend ready
      setVoiceState("idle");
      setTranscript("");
      //onClose()
    }, 1500);
  };

  // ── Example prompt click ──────────────────────────────────────────────────

  const handleExampleClick = (prompt: string) => {
    setTranscript(prompt);
    setVoiceState("done");
  };

  // ── Status label ──────────────────────────────────────────────────────────

  const statusLabel: Record<VoiceState, string> = {
    idle: "Tekan mikrofon untuk mulai",
    listening: "Sedang mendengarkan...",
    processing: "AI sedang memproses...",
    done: "Selesai merekam",
    error: errorMsg || "Terjadi kesalahan",
  };

  const statusColor: Record<VoiceState, string> = {
    idle: "text-gray-400",
    listening: "text-[#7C3BED]",
    processing: "text-amber-500",
    done: "text-green-600",
    error: "text-red-500",
  };

  const isListening = voiceState === "listening";
  const isProcessing = voiceState === "processing";
  const hasTranscript = transcript.trim().length > 0;
  const canSend = hasTranscript && !isListening && !isProcessing;

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

          {/* ── Modal ── */}
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center px-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="relative w-full max-w-lg rounded-2xl bg-white shadow-2xl overflow-hidden"
              initial={{ scale: 0.88, y: 24 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.88, y: 24 }}
              transition={{ type: "spring", stiffness: 300, damping: 28 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* ── Purple gradient top bar ── */}
              <div className="h-1.5 w-full bg-gradient-to-r from-[#7C3BED] via-purple-400 to-indigo-400" />

              {/* ── Header ── */}
              <div className="flex items-center justify-between px-6 pt-5 pb-2">
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
                  onClick={onClose}
                  className="flex h-8 w-8 items-center justify-center rounded-lg text-gray-400 transition hover:bg-gray-100 hover:text-gray-600"
                >
                  <X size={16} />
                </button>
              </div>

              {/* ── Body ── */}
              <div className="px-6 pb-6 pt-4 space-y-5">
                {/* Mic section */}
                <div className="flex flex-col items-center gap-3 py-2">
                  {/* Sound wave / idle visual */}
                  <div className="h-10 flex items-center">
                    {isListening ? (
                      <SoundWave active />
                    ) : (
                      <SoundWave active={false} />
                    )}
                  </div>

                  {/* Mic button with pulse */}
                  <div onClick={toggleMic} className="cursor-pointer">
                    <PulseRing active={isListening} />
                  </div>

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

                  {/* Browser not supported */}
                  {!supported && (
                    <p className="rounded-lg bg-red-50 px-4 py-2 text-center text-xs text-red-500">
                      Browser kamu tidak mendukung Speech Recognition.
                      <br />
                      Gunakan Chrome atau Edge versi terbaru.
                    </p>
                  )}
                </div>

                {/* Transcript textarea */}
                <div className="relative">
                  <label className="mb-1.5 block text-xs font-medium text-gray-500 uppercase tracking-wide">
                    Hasil transkripsi
                  </label>
                  <div className="relative rounded-xl border border-gray-200 bg-gray-50 transition focus-within:border-[#7C3BED] focus-within:ring-2 focus-within:ring-[#7C3BED]/20">
                    <textarea
                      ref={textareaRef}
                      value={
                        transcript + (interimText ? ` ${interimText}` : "")
                      }
                      onChange={(e) => {
                        // Only update the final transcript on manual edit
                        setTranscript(e.target.value);
                      }}
                      readOnly={isListening || isProcessing}
                      placeholder={
                        isListening
                          ? "Mendengarkan suara kamu..."
                          : 'Contoh: "Buatkan task untuk belajar matematika minggu ini"'
                      }
                      rows={3}
                      className="w-full resize-none rounded-xl bg-transparent px-4 py-3 text-sm text-gray-800 placeholder:text-gray-300 focus:outline-none"
                      style={{ minHeight: 80 }}
                    />
                    {isListening && interimText && (
                      <span className="absolute bottom-3 right-3">
                        <Volume2
                          size={14}
                          className="text-[#7C3BED] animate-pulse"
                        />
                      </span>
                    )}
                  </div>
                  {/* Character count */}
                  <p className="mt-1 text-right text-xs text-gray-300">
                    {transcript.length} karakter
                  </p>
                </div>

                {/* Example prompts */}
                {!hasTranscript && voiceState === "idle" && (
                  <div>
                    <p className="mb-2 text-xs font-medium text-gray-400 uppercase tracking-wide">
                      Contoh perintah
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {EXAMPLE_PROMPTS.map((prompt) => (
                        <button
                          key={prompt}
                          onClick={() => handleExampleClick(prompt)}
                          className="rounded-full border border-dashed border-gray-200 px-3 py-1 text-xs text-gray-500 transition hover:border-[#7C3BED] hover:text-[#7C3BED] hover:bg-[#7C3BED]/5"
                        >
                          {prompt}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* AI info box */}
                <AnimatePresence>
                  {hasTranscript && !isListening && (
                    <motion.div
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 6 }}
                      className="flex gap-3 rounded-xl border border-purple-100 bg-purple-50 px-4 py-3"
                    >
                      <Sparkles
                        size={16}
                        className="mt-0.5 shrink-0 text-[#7C3BED]"
                      />
                      <p className="text-xs text-gray-600 leading-relaxed">
                        AI akan menganalisis perintahmu dan otomatis{" "}
                        <strong className="text-[#7C3BED]">
                          membuat folder & task
                        </strong>{" "}
                        yang sesuai. Kamu bisa edit hasilnya setelahnya.
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Action buttons */}
                <div className="flex gap-2 pt-1">
                  {/* Reset */}
                  {(hasTranscript || voiceState !== "idle") && (
                    <motion.button
                      whileTap={{ scale: 0.95 }}
                      onClick={handleReset}
                      disabled={isProcessing}
                      className="flex items-center gap-1.5 rounded-lg border px-3 py-2.5 text-sm text-gray-500 transition hover:bg-gray-50 disabled:opacity-40"
                    >
                      <RotateCcw size={14} />
                      Reset
                    </motion.button>
                  )}

                  {/* Stop / Start */}
                  <motion.button
                    whileTap={{ scale: 0.95 }}
                    onClick={toggleMic}
                    disabled={!supported || isProcessing}
                    className={`flex flex-1 items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-sm font-medium transition disabled:opacity-40 ${
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
                    whileTap={{ scale: 0.95 }}
                    onClick={handleSend}
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
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
