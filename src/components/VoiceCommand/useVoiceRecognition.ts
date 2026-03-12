import { useState, useRef, useCallback, useEffect } from "react";
import { VoiceState, SpeechRecognitionInstance, SpeechRecognitionEvent, SpeechRecognitionErrorEvent } from "./types";
import { MAX_CHARS } from "./constants";

// ─── Helper ───────────────────────────────────────────────────────────────────

function getSpeechRecognition(): (new () => SpeechRecognitionInstance) | null {
    if (typeof window === "undefined") return null;
    return window.SpeechRecognition || window.webkitSpeechRecognition || null;
}

// ─── Hook Return Type ─────────────────────────────────────────────────────────

export interface UseVoiceRecognitionReturn {
    voiceState: VoiceState;
    transcript: string;
    interimText: string;
    errorMsg: string;
    supported: boolean;
    isListening: boolean;
    isProcessing: boolean;
    hasTranscript: boolean;
    isOverLimit: boolean;
    canSend: boolean;
    textareaRef: React.RefObject<HTMLTextAreaElement | null>;
    setTranscript: (value: string) => void;
    setVoiceState: (state: VoiceState) => void;
    toggleMic: () => void;
    handleReset: () => void;
    handleExampleClick: (prompt: string) => void;
    startProcessing: () => void;
    stopListening: () => void;
}

// ─── Hook ─────────────────────────────────────────────────────────────────────

export function useVoiceRecognition(open: boolean): UseVoiceRecognitionReturn {
    const [voiceState, setVoiceState] = useState<VoiceState>("idle");
    const [transcript, setTranscriptState] = useState("");
    const [interimText, setInterimText] = useState("");
    const [errorMsg, setErrorMsg] = useState("");
    const [supported, setSupported] = useState(true);

    const recognitionRef = useRef<SpeechRecognitionInstance | null>(null);
    const textareaRef = useRef<HTMLTextAreaElement | null>(null);

    // ── Check browser support ──────────────────────────────────────────────────

    useEffect(() => {
        const SR = getSpeechRecognition();
        if (!SR) setSupported(false);
    }, []);

    // ── Auto-resize textarea ───────────────────────────────────────────────────

    useEffect(() => {
        const el = textareaRef.current;
        if (!el) return;
        el.style.height = "auto";
        el.style.height = `${el.scrollHeight}px`;
    }, [transcript]);

    // ── Reset when modal closes ────────────────────────────────────────────────

    const stopListening = useCallback(() => {
        recognitionRef.current?.stop();
        recognitionRef.current = null;
    }, []);

    useEffect(() => {
        if (!open) {
            stopListening();
            setVoiceState("idle");
            setTranscriptState("");
            setInterimText("");
            setErrorMsg("");
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [open]);

    // ── Transcript setter (clamp to MAX_CHARS) ─────────────────────────────────

    const setTranscript = useCallback((value: string) => {
        setTranscriptState(value.slice(0, MAX_CHARS));
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
                setTranscriptState((prev) => {
                    const merged = prev
                        ? `${prev} ${finalText.trim()}`
                        : finalText.trim();
                    return merged.slice(0, MAX_CHARS);
                });
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

    // ── Toggle mic ─────────────────────────────────────────────────────────────

    const toggleMic = useCallback(() => {
        if (voiceState === "listening") {
            stopListening();
            setVoiceState("done");
        } else {
            startListening();
        }
    }, [voiceState, stopListening, startListening]);

    // ── Reset ──────────────────────────────────────────────────────────────────

    const handleReset = useCallback(() => {
        stopListening();
        setVoiceState("idle");
        setTranscriptState("");
        setInterimText("");
        setErrorMsg("");
    }, [stopListening]);

    // ── Example prompt click ───────────────────────────────────────────────────

    const handleExampleClick = useCallback((prompt: string) => {
        setTranscriptState(prompt.slice(0, MAX_CHARS));
        setVoiceState("done");
    }, []);

    // ── Start processing (for send) ────────────────────────────────────────────

    const startProcessing = useCallback(() => {
        setVoiceState("processing");
    }, []);

    // ── Derived state ──────────────────────────────────────────────────────────

    const isListening = voiceState === "listening";
    const isProcessing = voiceState === "processing";
    const hasTranscript = transcript.trim().length > 0;
    const isOverLimit = transcript.length > MAX_CHARS;
    const canSend = hasTranscript && !isListening && !isProcessing && !isOverLimit;

    return {
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
        stopListening,
    };
}
