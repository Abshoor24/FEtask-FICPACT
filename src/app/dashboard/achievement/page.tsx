"use client";

import React from "react";
import {
  Sparkles,
  Flame,
  Lock,
  Users,
  Shield,
  Trophy,
  Star,
} from "lucide-react";

import Header from "@/components/Header";
import { useGetUserAchievements } from "@/data/hooks/useAchievements";
import AchievementContent from "@/features/dashboard/achievement/AchievementContent";

export default function AchievmentPage() {
  return <AchievementContent />
}