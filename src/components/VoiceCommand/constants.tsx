import { FolderPlus, ListTodo } from "lucide-react";
import { AIMode } from "./types";

// ─── Validation ───────────────────────────────────────────────────────────────

export const MAX_CHARS = 200;

// ─── Example Prompts ──────────────────────────────────────────────────────────

export const EXAMPLE_PROMPTS: Record<AIMode, string[]> = {
  "with-folder": [
    "Buatkan folder Matematika dan task belajar untuk ulangan minggu ini",
    "Buat folder Project Sekolah dengan task presentasi deadline jumat",
    "Buatkan folder Olahraga dan tambahkan task lari pagi setiap hari",
    "Buat folder Belajar Bahasa Inggris beserta task latihan soal",
  ],
  "task-only": [
    "Buatkan task belajar matematika untuk besok",
    "Tambahkan task presentasi bisnis besok jam 9",
    "Buatkan quest olahraga rutin setiap hari",
    "Tambahkan task review materi fisika minggu ini",
  ],
};

// ─── Mode Config ──────────────────────────────────────────────────────────────

export const MODE_CONFIG = {
  "with-folder": {
    label: "Dengan Folder Baru",
    shortLabel: "Folder + Task",
    icon: FolderPlus,
    description: "AI akan membuat folder baru beserta task-tasknya sekaligus",
    infoText: (
      <>
        AI akan otomatis{" "}
        <strong className="text-[#7C3BED]">membuat folder baru</strong> dan
        mengisi task-task di dalamnya sesuai perintahmu.
      </>
    ),
    badge: "bg-violet-100 text-violet-700",
    activeBg: "bg-[#7C3BED]",
    activeText: "text-white",
  },
  "task-only": {
    label: "Task Saja",
    shortLabel: "Task Only",
    icon: ListTodo,
    description:
      "AI akan membuat task dan menyesuaikan dengan folder yang sudah ada",
    infoText: (
      <>
        AI akan membuat task dan otomatis{" "}
        <strong className="text-[#7C3BED]">
          menyesuaikan dengan folder yang sudah ada
        </strong>{" "}
        milikmu.
      </>
    ),
    badge: "bg-blue-100 text-blue-700",
    activeBg: "bg-[#7C3BED]",
    activeText: "text-white",
  },
} as const;
