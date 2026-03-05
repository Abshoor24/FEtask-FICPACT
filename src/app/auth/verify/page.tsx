"use client";

import VerifyLeftSection from "@/features/auth/verify/VerifyLeftSection";
import VerifyRightSection from "@/features/auth/verify/VerifyRightSection";


export default function VerifyPage() {
  return (
    <div className="min-h-screen flex flex-col lg:flex-row">
      {/* Left Side - Purple Section */}
      <VerifyLeftSection />

      {/* Right Side - Verification Form */}
      <VerifyRightSection />
    </div>
  );
}
