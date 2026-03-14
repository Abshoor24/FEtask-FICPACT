"use client";

import Link from "next/link";
import React from "react";
import {
  LayoutGrid,
  Calendar,
  Clock,
  User,
  Briefcase,
  Folder,
  Plus,
  LogOut,
} from "lucide-react";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import Image from "next/image";
import { useLogout } from "@/data/hooks/useAuth";

interface MenuItem {
  name: string;
  icon: React.ElementType;
  path: string;
}

export default function Sidebar() {
  const pathname = usePathname();

  const menuItems: MenuItem[] = [
    { name: "All Tasks", icon: LayoutGrid, path: "/dashboard" },
    { name: "Folders", icon: Folder, path: "/dashboard/folder" },
    { name: "Today", icon: Calendar, path: "/dashboard/today" },
    { name: "Upcoming", icon: Clock, path: "/dashboard/upcoming" },
    { name: "Achievements", icon: User, path: "/dashboard/achievement" },
  ];

  const categories: MenuItem[] = [
    { name: "Personal", icon: User, path: "/personal" },
    { name: "Work", icon: Briefcase, path: "/work" },
  ];

  const { mutate: logout } = useLogout();

  return (
    <aside className="w-72 h-screen bg-white border-r flex flex-col justify-between px-5 py-6">
      {/* TOP */}
      <div>
        {/* Logo */}
        <div className="flex items-center gap-3 mb-10">
          <div className="w-10 h-10 rounded-xl bg-[#7C3BED] flex items-center justify-center text-white font-bold">
            ✓
          </div>
          <div>
            <h1 className="text-lg font-semibold text-gray-900">TaskMaster</h1>
            <p className="text-xs text-[#7C3BED]">Productivity Hub</p>
          </div>
        </div>

        {/* MENU */}
        <nav className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const active = pathname === item.path;

            return (
              <Link
                key={item.name}
                href={item.path}
                className={clsx(
                  "flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition",
                  active
                    ? "bg-[#7C3BED]/10 text-[#7C3BED]"
                    : "text-gray-600 hover:bg-gray-100",
                )}
              >
                <Icon size={18} />
                {item.name}
              </Link>
            );
          })}
        </nav>

        {/* CATEGORIES */}
        <div className="mt-8">
          <p className="text-xs font-semibold text-gray-400 mb-3 uppercase">
            Categories
          </p>

          <div className="space-y-2">
            {categories.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.name}
                  href={item.path}
                  className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm text-gray-600 hover:bg-gray-100 transition"
                >
                  <Icon size={18} />
                  {item.name}
                </Link>
              );
            })}
          </div>
        </div>

        {/* PROJECTS */}
        <div className="mt-8">
          <div className="flex items-center justify-between mb-3">
            <p className="text-xs font-semibold text-gray-400 uppercase">
              Projects
            </p>
            <Plus size={16} className="text-gray-400 cursor-pointer" />
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm text-gray-600 hover:bg-gray-100 transition">
              <span className="w-2 h-2 rounded-full bg-blue-500" />
              Home Renovation
            </div>

            <div className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm text-gray-600 hover:bg-gray-100 transition">
              <span className="w-2 h-2 rounded-full bg-orange-400" />
              Q4 Launch
            </div>
          </div>
        </div>
      </div>

      {/* USER */}
<div className="flex items-center justify-between px-5 py-3 rounded-xl bg-[#7C3BED]/5">

  <Link href="/dashboard/profile" className="flex items-center gap-3">
    <Image
      src="/amba1.jpg"
      width={40}
      height={40}
      alt="User"
      className="w-9 h-9 rounded-full"
    />

    <p className="text-sm font-semibold text-gray-900">
      MASAmbaaaa
    </p>
  </Link>

  <div
    onClick={() => logout()}
    className="cursor-pointer flex items-center gap-2"
  >
    <LogOut size={16} className="text-gray-400" />
  </div>

</div>
    </aside>
  );
}
