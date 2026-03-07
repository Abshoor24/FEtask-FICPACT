"use client";

import { Search, Plus } from "lucide-react";
import { useState } from "react";
import FolderItem from "./FolderItem";
import AddFolderModal from "./AddFolderModal";

export default function FolderContent() {
  const [openAddFolder, setOpenAddFolder] = useState(false);

  // Mock data - nanti bisa diganti dengan data dari API
  const folders = [
    {
      id: "1",
      name: "Ujian Minggu Ini",
      icon: "📚",
      color: "#7C3BED",
      taskCount: 3,
    },
    {
      id: "2",
      name: "Tugas Kuliah",
      icon: "🎓",
      color: "#10B981",
      taskCount: 5,
    },
    {
      id: "3",
      name: "Project Akhir Semester",
      icon: "💻",
      color: "#F59E0B",
      taskCount: 2,
    },
    {
      id: "4",
      name: "Personal Goals",
      icon: "⭐",
      color: "#EC4899",
      taskCount: 4,
    },
    {
      id: "5",
      name: "Side Projects",
      icon: "🚀",
      color: "#3B82F6",
      taskCount: 3,
    },
    {
      id: "6",
      name: "Learning & Development",
      icon: "💡",
      color: "#8B5CF6",
      taskCount: 6,
    },
  ];

  return (
    <>
      <div className="h-full overflow-y-auto px-10 py-8">
        {/* ================= HEADER ================= */}
        <div className="flex items-center justify-between mb-8">
          {/* LEFT */}
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Folders</h1>
            <p className="text-sm text-gray-500">
              Organize your quests into folders
            </p>
          </div>

          {/* RIGHT */}
          <div className="flex items-center gap-3">
            {/* SEARCH */}
            <div className="flex h-10 items-center gap-2 rounded-lg border bg-white px-3 text-sm text-gray-500">
              <Search size={16} />
              <input
                placeholder="Search folders..."
                className="bg-transparent outline-none"
              />
            </div>

            {/* ADD FOLDER BUTTON */}
            <button
              onClick={() => setOpenAddFolder(true)}
              className="flex h-10 items-center gap-2 rounded-lg bg-[#7C3BED] px-4 text-sm font-medium text-white transition hover:bg-[#6B2FDB]"
            >
              <Plus size={18} />
              New Folder
            </button>
          </div>
        </div>

        {/* ADD NEW FOLDER PROMPT */}
        <div
          onClick={() => setOpenAddFolder(true)}
          className="mb-6 cursor-pointer rounded-xl border-2 border-dashed bg-white p-4 text-sm text-gray-400 transition hover:border-[#7C3BED] hover:text-[#7C3BED]"
        >
          + Create a new folder to organize your quests...
        </div>

        {/* FOLDERS SECTION */}
        <div className="mb-8">
          <p className="mb-3 text-xs font-semibold uppercase text-gray-400">
            My Folders
          </p>

          {/* FOLDERS GRID */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {folders.map((folder) => (
              <FolderItem key={folder.id} folder={folder} />
            ))}
          </div>
        </div>

        {/* Empty State */}
        {folders.length === 0 && (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <div className="mb-4 text-6xl">📁</div>
            <h3 className="mb-2 text-lg font-semibold text-gray-900">
              No folders yet
            </h3>
            <p className="mb-6 text-sm text-gray-500">
              Create your first folder to organize your quests
            </p>
            <button
              onClick={() => setOpenAddFolder(true)}
              className="inline-flex items-center gap-2 rounded-lg bg-[#7C3BED] px-6 py-3 text-sm font-medium text-white transition hover:bg-[#6B2FDB]"
            >
              <Plus size={18} />
              Create Folder
            </button>
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
