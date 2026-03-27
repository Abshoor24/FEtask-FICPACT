"use client";

import { Search, Plus, Loader2, AlertCircle } from "lucide-react";
import { useState } from "react";
import FolderItem from "./FolderItem";
import AddFolderModal from "./AddFolderModal";
import { useGetAllFolders } from "@/data/hooks/useFolder";

export default function FolderContent() {
  const [openAddFolder, setOpenAddFolder] = useState(false);
  const [search, setSearch] = useState("");

  const { data, isLoading, isError, refetch } = useGetAllFolders();

  const folders = data?.data ?? [];

  const filtered = folders.filter((f) =>
    f.name.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <>
      <div className="h-full overflow-y-auto px-4 md:px-10 py-6 md:py-8">
        {/* ── HEADER ── */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Folders</h1>
            <p className="text-sm text-gray-500">
              {isLoading
                ? "Memuat folder..."
                : `${folders.length} folder ditemukan`}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full md:w-auto">
            {/* SEARCH */}
            <div className="flex w-full sm:w-auto sm:flex-1 h-10 shrink-0 items-center gap-2 rounded-lg border bg-white px-3 text-sm text-gray-500">
              <Search size={16} className="shrink-0" />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Cari folder..."
                className="bg-transparent outline-none w-full min-w-0"
              />
            </div>

            {/* ADD FOLDER BUTTON */}
            <div className="shrink-0 flex items-center justify-end">
              <button
                onClick={() => setOpenAddFolder(true)}
                className="flex h-10 items-center justify-center gap-2 rounded-lg bg-[#7C3BED] px-4 text-sm font-medium text-white transition hover:bg-[#6B2FDB]"
              >
                <Plus size={18} />
                New Folder
              </button>
            </div>
          </div>
        </div>

        {/* ADD NEW FOLDER PROMPT */}
        <div
          onClick={() => setOpenAddFolder(true)}
          className="mb-6 cursor-pointer rounded-xl border-2 border-dashed bg-white p-4 text-sm text-gray-400 transition hover:border-[#7C3BED] hover:text-[#7C3BED]"
        >
          + Buat folder baru untuk mengorganisir quest kamu...
        </div>

        {/* ── LOADING STATE ── */}
        {isLoading && (
          <div className="flex flex-col items-center justify-center py-20 text-gray-400">
            <Loader2 size={36} className="animate-spin mb-3 text-[#7C3BED]" />
            <p className="text-sm">Memuat folder...</p>
          </div>
        )}

        {/* ── ERROR STATE ── */}
        {isError && !isLoading && (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <AlertCircle size={40} className="mb-3 text-red-400" />
            <h3 className="text-base font-semibold text-gray-800 mb-1">
              Gagal memuat folder
            </h3>
            <p className="text-sm text-gray-500 mb-4">
              Terjadi kesalahan saat mengambil data.
            </p>
            <button
              onClick={() => refetch()}
              className="rounded-lg bg-[#7C3BED] px-5 py-2 text-sm font-medium text-white hover:bg-[#6B2FDB] transition"
            >
              Coba Lagi
            </button>
          </div>
        )}

        {/* ── FOLDER GRID ── */}
        {!isLoading && !isError && (
          <div className="mb-8">
            {filtered.length > 0 && (
              <p className="mb-3 text-xs font-semibold uppercase text-gray-400 tracking-wide">
                My Folders
              </p>
            )}

            {filtered.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 items-stretch">
                {filtered.map((folder) => (
                  <FolderItem
                    key={folder.id}
                    folder={{
                      id: folder.id,
                      name: folder.name,
                      icon: folder.icon ?? "📁",
                      color: folder.color ?? "#7C3BED",
                      taskCount: folder.taskCount,
                      endedAt: folder.endedAt ?? null,
                      status: folder.status,
                      quests: folder.quests,
                    }}
                  />
                ))}
              </div>
            ) : (
              /* ── EMPTY STATE ── */
              <div className="flex flex-col items-center justify-center py-16 text-center">
                <div className="mb-4 text-6xl">{search ? "🔍" : "📁"}</div>
                <h3 className="mb-2 text-lg font-semibold text-gray-900">
                  {search ? "Folder tidak ditemukan" : "Belum ada folder"}
                </h3>
                <p className="mb-6 text-sm text-gray-500">
                  {search
                    ? `Tidak ada folder dengan nama "${search}"`
                    : "Buat folder pertama kamu untuk mulai mengorganisir quest"}
                </p>
                {!search && (
                  <button
                    onClick={() => setOpenAddFolder(true)}
                    className="inline-flex items-center gap-2 rounded-lg bg-[#7C3BED] px-6 py-3 text-sm font-medium text-white transition hover:bg-[#6B2FDB]"
                  >
                    <Plus size={18} />
                    Buat Folder
                  </button>
                )}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Add Folder Modal */}
      <AddFolderModal
        open={openAddFolder}
        onClose={() => setOpenAddFolder(false)}
      />
    </>
  );
}
