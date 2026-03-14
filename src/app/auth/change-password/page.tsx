"use client";

import { Suspense } from "react";
import ChangePasswordLeftSection from "@/features/auth/change-password/ChangePasswordLeftSection";
import ChangePasswordRightSection from "@/features/auth/change-password/ChangePasswordRightSection";
import { useSearchParams } from "next/navigation";

function ChangePasswordContent() {
  const searchParams = useSearchParams();
  const token = searchParams.get('token');
  const email = searchParams.get('email');
  
  return (
    <div className="min-h-screen flex flex-col lg:flex-row">
      {/* Left Side - Purple Section */}
      <ChangePasswordLeftSection />

      {/* Right Side - Change Password Form */}
      <ChangePasswordRightSection token={token} email={email} />
    </div>
  );
}

export default function ChangePasswordPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
      </div>
    }>
      <ChangePasswordContent />
    </Suspense>
  );
}
