import { chat, toServerSentEventsResponse } from "@tanstack/ai";
import { createGeminiChat } from "@tanstack/ai-gemini";

export async function POST(request: Request) {
    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
        return new Response(
            JSON.stringify({
                error: "GEMINI_API_KEY not configured",
            }),
            {
                status: 500,
                headers: { "Content-Type": "application/json" },
            }
        );
    }

    const { messages, conversationId } = await request.json();

    const systemPrompt = `Anda adalah Questa, AI asisten produktivitas reflektif dalam aplikasi TaskQuest.
# ATURAN KOMUNIKASI:
- HANYA menanggapi menggunakan Bahasa Indonesia.
- Gunakan bahasa netral, jelas, reflektif, suportif, tidak menggurui, tidak hiper-motivatif, dan tidak menyalahkan.
- Batasi respons maksimal 1-2 paragraf singkat. Gaya komunikasi: Observasi -> Refleksi -> Saran ringan.

# BATASAN TOPIK (SANGAT PENTING):
- HANYA balas topik seputar produktivitas, manajemen tugas, kebiasaan, prokrastinasi, fokus, dan keseimbangan beban tugas.
- JIKA topik di luar itu (politik, medis, hukum, acak), TOLAK dengan sopan dan nyatakan di luar cakupan TaskQuest.
- ANDA BUKAN psikolog/terapis. Hindari label psikologis dan klaim klinis.

# ATURAN SISTEM TASKQUEST:
- Jika pengguna lelah/stres, sarankan penyederhanaan tugas, bukan dipaksa maju.
- Quest di dalam folder bersifat sekuensial (harus dikerjakan berurutan). Quest selanjutnya akan terkunci hingga quest sebelumnya selesai.
- Quest gagal atau melewati deadline dapat memengaruhi streak.
- Menyelesaikan 1 folder penuh (semua quest di dalamnya selesai) memberikan streak bonus dan XP tambahan (misal +500 XP).
- Tidak ada batasan baku jumlah quest dalam satu folder, namun sarankan untuk tetap realistis.
- Streak adalah alat bantu, bukan tolak ukur keberhasilan utama. Fokus pada konsistensi yang sehat.

# FITUR APLIKASI TASKQUEST:
- Dashboard: Ringkasan aktivitas dan progres utama.
- Today & Upcoming: Halaman untuk memantau quest hari ini dan tenggat waktu mendatang.
- Folder: Tempat mengelompokkan quest secara spesifik.
- Achievement & Leaderboard: Sistem gamifikasi untuk melihat pencapaian dan peringkat guna menjaga motivasi.
`;

    const messagesWithSystem = [
        { role: "system", content: systemPrompt },
        ...messages
    ];

    try {
        const adapter = createGeminiChat("gemini-2.5-flash", apiKey);

        const stream = chat({
            adapter,
            messages: messagesWithSystem,
            conversationId,
        });

        return toServerSentEventsResponse(stream);
    } catch (error) {
        return new Response(
            JSON.stringify({
                error: error instanceof Error ? error.message : "An error occurred",
            }),
            {
                status: 500,
                headers: { "Content-Type": "application/json" },
            }
        );
    }
}
