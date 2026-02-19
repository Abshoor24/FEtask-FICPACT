"use client";

import React from "react";
import QuestButton from "../Button";

export default function Sec5() {
  return (
    <section className="w-full min-h-screen bg-[#F7FAF8] py-24 flex items-center">
      <div className="max-w-7xl mx-auto px-6 w-full">
        <div className="relative overflow-hidden rounded-3xl px-8 py-16 md:px-16 text-center text-white bg-linear-to-br from-[#7C3BED] via-[#6D28D9] to-[#4C1D95]">

          {/* Decorative glow */}
          <div className="pointer-events-none absolute -top-24 -left-24 w-80 h-80 rounded-full bg-white/10 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-24 -right-24 w-80 h-80 rounded-full bg-black/20 blur-3xl" />

          {/* Content */}
          <div className="relative z-10 mx-auto max-w-2xl space-y-6">
            <h2 className="text-3xl md:text-4xl font-extrabold leading-tight">
              Ready to Conquer
              <br className="hidden sm:block" />
              Your Syllabus?
            </h2>

            <p className="text-white/80 leading-relaxed">
              Join thousands of students who have traded academic burnout for
              organized, gamified success. Start your free quest today.
            </p>

            <div className="flex justify-center pt-4">
              <QuestButton
                label="Mulai Quest"
                className="px-8 py-3 text-sm font-medium"
                onClick={() => {
                  // router.push("/") nanti
                }}
              />
            </div>

            <p className="pt-2 text-xs text-white/60">
              No credit card required • Free forever for individuals
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
