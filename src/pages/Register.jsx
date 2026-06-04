import { useState } from "react";
import {
  Phone,
  Mail,
  User,
  Shield,
  KeyRound,
} from "lucide-react";

import { Link } from "react-router-dom";
import logo from "../assets/logo.png";

export default function RegisterPage() {
  const [otpSent, setOtpSent] = useState(false);

  return (
    <div className="grid min-h-screen grid-cols-1 overflow-hidden lg:grid-cols-2">
      
      {/* LEFT */}
      <div className="flex items-center justify-center bg-white px-8 py-12">
        <div className="w-full max-w-[460px]">

          {/* LOGO */}
          <Link to="/" className="mb-16 flex items-center gap-3">
            <img
              src={logo}
              alt="logo"
              className="h-11 w-auto object-contain"
            />

            <span className="text-2xl font-bold text-[#123a8f]">
              ElderCare IoT
            </span>
          </Link>

          {/* TITLE */}
          <div className="mb-10">
            <h1 className="text-[48px] font-bold leading-tight text-[#111827]">
              Create Account
            </h1>

            <p className="mt-3 text-[20px] text-[#4b5563]">
              Register to access the healthcare monitoring system.
            </p>
          </div>

          {/* FORM */}
          <form className="space-y-6">

            {/* FULL NAME */}
            <div>
              <label className="mb-2 block text-[17px] font-medium text-[#111827]">
                Full Name
              </label>

              <div className="flex h-[64px] items-center rounded-2xl border border-[#d1d5db] bg-[#fafafa] px-5">
                <User className="h-5 w-5 text-[#6b7280]" />

                <input
                  type="text"
                  placeholder="Nguyen Van A"
                  className="ml-4 w-full bg-transparent text-[17px] outline-none"
                />
              </div>
            </div>

            {/* PHONE */}
            <div>
              <label className="mb-2 block text-[17px] font-medium text-[#111827]">
                Phone Number
              </label>

              <div className="flex h-[64px] items-center rounded-2xl border border-[#d1d5db] bg-[#fafafa] px-5">
                <Phone className="h-5 w-5 text-[#6b7280]" />

                <input
                  type="text"
                  placeholder="0xxx xxx xxx"
                  className="ml-4 w-full bg-transparent text-[17px] outline-none"
                />
              </div>
            </div>

            {/* EMAIL */}
            <div>
              <label className="mb-2 block text-[17px] font-medium text-[#111827]">
                Email
              </label>

              <div className="flex h-[64px] items-center rounded-2xl border border-[#d1d5db] bg-[#fafafa] px-5">
                <Mail className="h-5 w-5 text-[#6b7280]" />

                <input
                  type="email"
                  placeholder="example@email.com"
                  className="ml-4 w-full bg-transparent text-[17px] outline-none"
                />
              </div>
            </div>

            {/* OTP */}
            {otpSent && (
              <div>
                <label className="mb-2 block text-[17px] font-medium text-[#111827]">
                  Enter OTP
                </label>

                <div className="flex h-[64px] items-center rounded-2xl border border-[#d1d5db] bg-[#fafafa] px-5">
                  <Shield className="h-5 w-5 text-[#6b7280]" />

                  <input
                    type="text"
                    placeholder="6-digit OTP"
                    className="ml-4 w-full bg-transparent text-[17px] outline-none"
                  />
                </div>

                <p className="mt-2 text-sm text-[#6b7280]">
                  OTP has been sent to your phone/email.
                </p>
              </div>
            )}

            {/* PASSWORD */}
            {otpSent && (
              <div>
                <label className="mb-2 block text-[17px] font-medium text-[#111827]">
                  Create Password
                </label>

                <div className="flex h-[64px] items-center rounded-2xl border border-[#d1d5db] bg-[#fafafa] px-5">
                  <KeyRound className="h-5 w-5 text-[#6b7280]" />

                  <input
                    type="password"
                    placeholder="••••••••"
                    className="ml-4 w-full bg-transparent text-[17px] outline-none"
                  />
                </div>
              </div>
            )}

            {/* BUTTON */}
            {!otpSent ? (
              <button
                type="button"
                onClick={() => setOtpSent(true)}
                className="h-[64px] w-full rounded-2xl bg-blue-700 text-[20px] font-semibold text-white transition hover:bg-blue-800"
              >
                Get OTP
              </button>
            ) : (
              <button
                type="submit"
                className="h-[64px] w-full rounded-2xl bg-emerald-600 text-[20px] font-semibold text-white transition hover:bg-emerald-700"
              >
                Complete Registration
              </button>
            )}

            {/* LOGIN */}
            <div className="pt-2 text-center">
              <span className="text-[#4b5563]">
                Already have an account?
              </span>

              <Link
                to="/login"
                className="ml-2 font-semibold text-blue-700 hover:underline"
              >
                Sign In
              </Link>
            </div>
          </form>
        </div>
      </div>

      {/* RIGHT */}
      <div className="relative hidden lg:block">
        <img
          src="https://images.unsplash.com/photo-1516574187841-cb9cc2ca948b?q=80&w=1400&auto=format&fit=crop"
          alt="elderly"
          className="h-full w-full object-cover"
        />

        <div className="absolute inset-0 bg-black/20" />

        {/* INFO CARD */}
        <div className="absolute bottom-10 left-10 w-[480px] rounded-[28px] bg-white/95 p-8 shadow-2xl backdrop-blur-sm">
          <div className="mb-5 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100">
              <Shield className="h-5 w-5 text-blue-700" />
            </div>

            <span className="text-sm font-bold uppercase tracking-[2px] text-blue-700">
              Secure Registration
            </span>
          </div>

          <p className="text-[24px] leading-[40px] text-[#1f2937]">
            Your account is protected with OTP verification and secure healthcare authentication.
          </p>
        </div>
      </div>
    </div>
  );
}