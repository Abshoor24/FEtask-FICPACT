"use client";

import Link from "next/link";

interface FolderItemProps {
  folder: {
    id: string;
    name: string;
    icon: string;
    color: string;
    taskCount: number;
  };
}

export default function FolderItem({ folder }: FolderItemProps) {
  return (
    <Link href={`/dashboard/folder/${folder.id}`}>
      <div className="group cursor-pointer rounded-xl bg-white p-5 shadow-sm transition hover:shadow-md border border-gray-100 hover:border-gray-200">
        {/* Icon & Name */}
        <div className="flex items-start gap-3 mb-4">
          <div
            className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg text-2xl"
            style={{ backgroundColor: `${folder.color}20` }}
          >
            {folder.icon}
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-gray-900 truncate">
              {folder.name}
            </h3>
            <p className="text-xs text-gray-500 mt-1">
              {folder.taskCount} {folder.taskCount === 1 ? "quest" : "quests"}
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between pt-3 border-t">
          <span className="text-xs text-gray-400">Click to view</span>
          <div
            className="h-2 w-2 rounded-full"
            style={{ backgroundColor: folder.color }}
          />
        </div>
      </div>
    </Link>
  );
}
