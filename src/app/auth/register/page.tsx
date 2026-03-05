"use client";

import RegisterLeftSection from "@/features/auth/register/RegisterLeftSection";
import RegisterRightSection from "@/features/auth/register/RegisterRightSection";

export default function RegisterPage() {
  return (
    <div className="min-h-screen flex flex-col lg:flex-row">
      {/* Left Side - Purple Section */}
      <RegisterLeftSection />

      {/* Right Side - Register Form */}
      <RegisterRightSection />
    </div>
  );
}
