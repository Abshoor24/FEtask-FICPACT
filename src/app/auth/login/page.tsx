"use client";

import LoginLeftSection from "@/features/auth/login/LoginLeftSection";
import LoginRightSection from "@/features/auth/login/LoginRightSection";

export default function LoginPage() {
  return (
    <div className="min-h-screen flex flex-col lg:flex-row">
      {/* Left Side - Purple Section */}
      <LoginLeftSection />

      {/* Right Side - Login Form */}
      <LoginRightSection />
    </div>
  );
}
