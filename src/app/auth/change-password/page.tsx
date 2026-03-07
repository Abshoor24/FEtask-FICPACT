"use client";

import ChangePasswordLeftSection from "@/features/auth/change-password/ChangePasswordLeftSection";
import ChangePasswordRightSection from "@/features/auth/change-password/ChangePasswordRightSection";

export default function ChangePasswordPage() {
  return (
    <div className="min-h-screen flex flex-col lg:flex-row">
      {/* Left Side - Purple Section */}
      <ChangePasswordLeftSection />

      {/* Right Side - Change Password Form */}
    <ChangePasswordRightSection />
    </div>
  );
}
