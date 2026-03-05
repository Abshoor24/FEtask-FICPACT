"use client";

import ForgotPasswordLeftSection from "@/features/auth/forgot-password/ForgotPasswordLeftSection";
import ForgotPasswordRightSection from "@/features/auth/forgot-password/ForgotPasswordRightSection";


export default function ForgotPasswordPage() {
  return (
    <div className="min-h-screen flex flex-col lg:flex-row">
      {/* Left Side - Purple Section */}
      <ForgotPasswordLeftSection/>
      {/* Right Side - Form Section */}
      <ForgotPasswordRightSection/>
    </div>
  );
}
