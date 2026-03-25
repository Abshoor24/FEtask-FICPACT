"use client";

import React, { useEffect, useRef, useState } from "react";
import { X, CheckCircle, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useCreateReflection } from "@/data/hooks/useReflection";
import toast from "react-hot-toast";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

interface DashboardAlertProps {
  // external control whether the alert should be shown
  isOpen?: boolean;
  // milliseconds until auto-hide; if undefined, don't auto-hide
  autoHideMs?: number;
  // optional callback when the alert is dismissed
  onClose?: () => void;
}

/**
 * DashboardAlert with Framer Motion animations
 *
 * - Smooth enter / exit using AnimatePresence + motion.div
 * - Controlled by `isOpen` prop; component syncs internal visible state
 * - Supports optional auto-hide (`autoHideMs`)
 * - Calls `onClose` when dismissed and `onReflect` when primary action clicked
 */
export default function DashboardAlert({
  isOpen = false,
  autoHideMs,
}: DashboardAlertProps) {
  const router = useRouter();
  const { mutate: reflect, isPending } = useCreateReflection();
  const [visible, setVisible] = useState<boolean>(isOpen);
  const autoHideTimer = useRef<number | null>(null);
  const queryClient = useQueryClient();

  // Auto-hide logic
  useEffect(() => {
    if (!visible) return;
    if (typeof autoHideMs === "number" && autoHideMs > 0) {
      // clear previous timer
      if (autoHideTimer.current) {
        window.clearTimeout(autoHideTimer.current);
      }
      autoHideTimer.current = window.setTimeout(() => {
        setVisible(false);
      }, autoHideMs);
    }
    return () => {
      if (autoHideTimer.current) {
        window.clearTimeout(autoHideTimer.current);
        autoHideTimer.current = null;
      }
    };
  }, [visible, autoHideMs]);

  // helper to close with callbacks
  const handleClose = () => {
    setVisible(false);
  };

  const handleReflect = () => {
    reflect(undefined, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["latest_reflection"] });
        queryClient.invalidateQueries({ queryKey: ["is_first_reflection"] });
        setVisible(false);
        router.push("/dashboard/profile");
      },
      onError: (err) => {
        toast.error(err.message || "Gagal melakukan refleksi");
      },
    });
  };

  // Motion variants for a subtle slide + fade + scale
  const variants = {
    hidden: { opacity: 0, y: -10, scale: 0.995 },
    visible: { opacity: 1, y: 0, scale: 1 },
    exit: { opacity: 0, y: -8, scale: 0.995 },
  };

  useEffect(() => {
    setVisible(!!isOpen);
  }, [isOpen]);

  return (
    <div className="w-full">
      <AnimatePresence>
        {visible && (
          <motion.div
            role="status"
            aria-live="polite"
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={variants}
            transition={{ duration: 0.28, ease: [0.16, 0.84, 0.24, 1] }}
            className="relative mx-auto w-full rounded-lg border border-emerald-200/60 bg-gradient-to-r from-emerald-50/60 to-emerald-100/40 backdrop-blur-sm shadow-sm p-4 md:p-5 flex items-start gap-4"
            style={{ overflow: "hidden" }}
          >
            {/* Left icon */}
            <div className="shrink-0 mt-0.5">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/60 text-emerald-700">
                <CheckCircle size={20} />
              </div>
            </div>

            {/* Content */}
            <div className="min-w-0 flex-1">
              <h3 className="text-sm font-semibold text-emerald-900">
                Ingin melakukan refleksi untuk pertama kali?
              </h3>

              <p className="mt-1 text-xs text-emerald-800/90">
                anda telah menyelesaikan quest pertama anda!! kesempatan
                refleksi terbuka untuk pertama kali!!
              </p>

              <div className="mt-3 flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={handleReflect}
                  className="inline-flex items-center gap-2 rounded-md bg-emerald-600 px-3 py-1.5 text-xs font-medium text-white shadow-sm hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-300"
                >
                  {isPending ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    "Mulai Refleksi"
                  )}
                </button>

                <button
                  type="button"
                  onClick={handleClose}
                  className="inline-flex items-center gap-2 rounded-md bg-white/40 px-3 py-1.5 text-xs font-medium text-emerald-800 hover:bg-white/60 border border-emerald-200/40 focus:outline-none"
                >
                  Nanti
                </button>
              </div>
            </div>

            {/* Close icon */}
            <button
              aria-label="Tutup notifikasi"
              onClick={handleClose}
              className="absolute right-3 top-3 inline-flex h-8 w-8 items-center justify-center rounded-md text-emerald-800 hover:bg-white/30 focus:outline-none"
            >
              <X size={16} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
