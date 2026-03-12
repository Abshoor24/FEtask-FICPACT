// ─── Voice State & Mode ───────────────────────────────────────────────────────

export type VoiceState = "idle" | "listening" | "processing" | "done" | "error";
export type AIMode = "with-folder" | "task-only";

// ─── Component Props ──────────────────────────────────────────────────────────

export interface VoiceCommandProps {
    open: boolean;
    onClose: () => void;
}

export interface ModeSelectorProps {
    value: AIMode;
    onChange: (mode: AIMode) => void;
    disabled?: boolean;
}

export interface ModeInfoCardProps {
    mode: AIMode;
}

export interface SoundWaveProps {
    active: boolean;
}

export interface PulseRingProps {
    active: boolean;
    onClick: () => void;
}

export interface VoiceTranscriptProps {
    transcript: string;
    interimText: string;
    isListening: boolean;
    isProcessing: boolean;
    isOverLimit: boolean;
    aiMode: AIMode;
    maxChars: number;
    textareaRef: React.RefObject<HTMLTextAreaElement | null>;
    onChange: (value: string) => void;
}

export interface VoiceActionsProps {
    voiceState: VoiceState;
    hasTranscript: boolean;
    isListening: boolean;
    isProcessing: boolean;
    canSend: boolean;
    supported: boolean;
    onToggleMic: () => void;
    onReset: () => void;
    onSend: () => void;
}

// ─── Web Speech API type shim ─────────────────────────────────────────────────

export interface SpeechRecognitionEvent extends Event {
    results: SpeechRecognitionResultList;
    resultIndex: number;
}

export interface SpeechRecognitionErrorEvent extends Event {
    error: string;
}

export interface SpeechRecognitionInstance extends EventTarget {
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
