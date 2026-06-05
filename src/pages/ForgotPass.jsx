import { useState } from "react";
import {
  Mail,
  Shield,
  KeyRound,
  Eye,
  EyeOff,
} from "lucide-react";

import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import { authApi } from "../api/authApi";

export default function ForgotPasswordPage() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [otpSent, setOtpSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);

  const [showPassword, setShowPassword] =
    useState(false);

  const [showConfirmPassword, setShowConfirmPassword] =
    useState(false);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [form, setForm] = useState({
    usernameOrEmail: "",
    otp: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // =====================
  // SEND OTP
  // =====================

  const handleSendOtp = async () => {
    setError("");
    setSuccess("");

    if (!form.usernameOrEmail) {
      setError("Please enter username or email.");
      return;
    }

    try {
      setLoading(true);

      await authApi.sendForgotOtp({
        usernameOrEmail:
          form.usernameOrEmail,
      });

      setOtpSent(true);

      setSuccess(
        "OTP has been sent successfully."
      );
    } catch (error) {
      setError(
        error?.response?.data?.message ||
          "Failed to send OTP."
      );
    } finally {
      setLoading(false);
    }
  };

  // =====================
  // VERIFY OTP
  // =====================

  const handleVerifyOtp = async () => {
    setError("");
    setSuccess("");

    if (!form.otp) {
      setError("Please enter OTP.");
      return;
    }

    try {
      setLoading(true);

      await authApi.verifyForgotOtp({
        usernameOrEmail:
          form.usernameOrEmail,
        otp: form.otp,
      });

      setOtpVerified(true);

      setSuccess("OTP Matched");
    } catch (error) {
      setOtpVerified(false);

      setError(
        error?.response?.data?.message ||
          "Invalid OTP."
      );
    } finally {
      setLoading(false);
    }
  };

  // =====================
  // RESET PASSWORD
  // =====================

  const handleResetPassword = async (e) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    if (!form.usernameOrEmail) {
      setError(
        "Please enter username or email."
      );
      return;
    }

    if (!form.otp) {
      setError("Please enter OTP.");
      return;
    }

    if (!otpVerified) {
      setError(
        "OTP has not been verified."
      );
      return;
    }

    if (!form.newPassword) {
      setError(
        "Please enter new password."
      );
      return;
    }

    if (form.newPassword.length < 6) {
      setError(
        "Password must be at least 6 characters."
      );
      return;
    }

    if (
      form.newPassword !==
      form.confirmPassword
    ) {
      setError(
        "Confirm password does not match."
      );
      return;
    }

    try {
      setLoading(true);

      await authApi.resetPassword({
        usernameOrEmail:
          form.usernameOrEmail,
        otp: form.otp,
        newPassword:
          form.newPassword,
      });

      setSuccess(
        "Password reset successfully. Redirecting..."
      );

      setTimeout(() => {
        navigate("/login");
      }, 1500);
    } catch (error) {
      setError(
        error?.response?.data?.message ||
          "Failed to reset password."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grid min-h-screen grid-cols-1 overflow-hidden lg:grid-cols-2">
      {/* LEFT */}
      <div className="flex items-center justify-center bg-white px-8 py-12">
        <div className="w-full max-w-[460px]">

          <Link
            to="/"
            className="mb-16 flex items-center gap-3"
          >
            <img
              src={logo}
              alt="logo"
              className="h-11 w-auto"
            />

            <span className="text-2xl font-bold text-[#123a8f]">
              ElderCare IoT
            </span>
          </Link>

          <div className="mb-10">
            <h1 className="text-[48px] font-bold">
              Forgot Password
            </h1>

            <p className="mt-3 text-[20px] text-gray-600">
              Recover your account securely.
            </p>
          </div>

          <form
            className="space-y-6"
            onSubmit={handleResetPassword}
          >
            {/* USERNAME / EMAIL */}
            <div>
              <label className="mb-2 block text-[17px] font-medium">
                Username or Email
              </label>

              <div className="flex h-[64px] items-center rounded-2xl border bg-[#fafafa] px-5">
                <Mail className="h-5 w-5 text-gray-500" />

                <input
                  type="text"
                  name="usernameOrEmail"
                  value={form.usernameOrEmail}
                  placeholder="Enter account"
                  onChange={handleChange}
                  className="ml-4 w-full bg-transparent outline-none"
                />
              </div>
            </div>

            {/* OTP */}
            <div>
              <label className="mb-2 block text-[17px] font-medium">
                OTP Verification
              </label>

              <div className="flex gap-2">
                <div className="flex flex-1 items-center rounded-2xl border bg-[#fafafa] px-4">
                  <Shield className="h-5 w-5 text-gray-500" />

                  <input
                    type="text"
                    name="otp"
                    value={form.otp}
                    onChange={handleChange}
                    placeholder="Enter OTP"
                    className="ml-3 h-[56px] w-full bg-transparent outline-none"
                  />
                </div>

                <button
                  type="button"
                  onClick={handleSendOtp}
                  className="rounded-2xl bg-blue-700 px-4 text-white"
                >
                  Get OTP
                </button>

                {otpSent && (
                  <button
                    type="button"
                    onClick={handleVerifyOtp}
                    className="rounded-2xl bg-emerald-600 px-4 text-white"
                  >
                    Validate
                  </button>
                )}
              </div>

              {otpVerified && (
                <p className="mt-2 font-semibold text-green-500">
                  OTP Matched ✓
                </p>
              )}
            </div>

            {/* PASSWORD */}
            <div>
              <label className="mb-2 block text-[17px] font-medium">
                New Password
              </label>

              <div className="flex h-[64px] items-center rounded-2xl border bg-[#fafafa] px-5">
                <KeyRound className="h-5 w-5 text-gray-500" />

                <input
                  type={
                    showPassword
                      ? "text"
                      : "password"
                  }
                  name="newPassword"
                  value={
                    form.newPassword
                  }
                  placeholder="••••••••"
                  onChange={handleChange}
                  className="ml-4 w-full bg-transparent text-[18px] outline-none placeholder:text-[#9ca3af]"
                />

                {showPassword ? (
                  <EyeOff
                    onClick={() =>
                      setShowPassword(false)
                    }
                    className="cursor-pointer"
                  />
                ) : (
                  <Eye
                    onClick={() =>
                      setShowPassword(true)
                    }
                    className="cursor-pointer"
                  />
                )}
              </div>
            </div>

            {/* CONFIRM */}
            <div>
              <label className="mb-2 block text-[17px] font-medium">
                Confirm Password
              </label>

              <div className="flex h-[64px] items-center rounded-2xl border bg-[#fafafa] px-5">
                <KeyRound className="h-5 w-5 text-gray-500" />

                <input
                  type={
                    showConfirmPassword
                      ? "text"
                      : "password"
                  }
                  name="confirmPassword"
                  value={
                    form.confirmPassword
                  }
                  placeholder="••••••••"
                  onChange={handleChange}
                  className="ml-4 w-full bg-transparent text-[18px] outline-none placeholder:text-[#9ca3af]"
                />

                {showConfirmPassword ? (
                  <EyeOff
                    onClick={() =>
                      setShowConfirmPassword(
                        false
                      )
                    }
                    className="cursor-pointer"
                  />
                ) : (
                  <Eye
                    onClick={() =>
                      setShowConfirmPassword(
                        true
                      )
                    }
                    className="cursor-pointer"
                  />
                )}
              </div>
            </div>

            {error && (
              <div className="rounded-xl bg-red-50 p-4 text-red-600">
                {error}
              </div>
            )}

            {success && (
              <div className="rounded-xl bg-green-50 p-4 text-green-600">
                {success}
              </div>
            )}

            <button
              type="submit"
              className="h-[64px] w-full rounded-2xl bg-blue-700 text-[20px] font-semibold text-white hover:bg-blue-800"
            >
              Reset Password
            </button>

            <div className="text-center">
              <Link
                to="/login"
                className="font-semibold text-blue-700 hover:underline"
              >
                Back to Login
              </Link>
            </div>
          </form>
        </div>
      </div>

      {/* RIGHT SIDE */}
      <div className="relative hidden lg:block">
        <img
          src="https://images.unsplash.com/photo-1516574187841-cb9cc2ca948b?q=80&w=1400&auto=format&fit=crop"
          alt="forgot password"
          className="h-full w-full object-cover"
        />

        <div className="absolute inset-0 bg-black/20" />
      </div>
    </div>
  );
}