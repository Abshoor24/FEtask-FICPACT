"use client";

import React from "react";
import QuestButton from "../Button";
import Link from "next/link";

interface Props {
  session: SessionModel | null;
}

export default function Sec5({ session }: Props) {
  return (
    <section
      id="join-us"
      className="w-full min-h-screen bg-[#F7FAF8] flex items-center justify-center"
    >
      {/* CENTER WRAPPER */}
      <div className="w-full max-w-7xl px-6 flex justify-center">
        <div className="relative w-full max-w-4xl overflow-hidden rounded-3xl px-8 py-16 md:px-16 text-center text-white bg-linear-to-br from-[#7C3BED] via-[#6D28D9] to-[#4C1D95]">
          {/* Decorative glow */}
          <div className="pointer-events-none absolute -top-24 -left-24 w-80 h-80 rounded-full bg-white/10 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-24 -right-24 w-80 h-80 rounded-full bg-black/20 blur-3xl" />

          {/* Content */}
          <div className="relative z-10 mx-auto max-w-2xl space-y-6 flex flex-col items-center">
            <h2 className="text-3xl md:text-4xl font-extrabold leading-tight">
              Ready to Conquer
              <br className="hidden sm:block" />
              Your Syllabus?
            </h2>

            <p className="text-white/80 leading-relaxed">
              Join thousands of students who have traded academic burnout for
              organized, gamified success. Start your free quest today.
            </p>

            {session ? (
              <Link href="/dashboard">
                <QuestButton
                  label="Lanjutkan perjalanan kamu"
                  className="px-8 py-3 text-sm font-medium"
                  onClick={() => {}}
                />
              </Link>
            ) : (
              <Link href="/auth/login">
                <QuestButton
                  label="Mulai Quest"
                  className="px-8 py-3 text-sm font-medium"
                  onClick={() => {}}
                />
              </Link>
            )}

            <p className="text-xs text-white/60">
              No credit card required • Free forever for individuals
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
