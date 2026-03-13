"use client";

import ChangePasswordLeftSection from "@/features/auth/change-password/ChangePasswordLeftSection";
import ChangePasswordRightSection from "@/features/auth/change-password/ChangePasswordRightSection";
import { useSearchParams } from "next/navigation";

export default function ChangePasswordPage() {
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
