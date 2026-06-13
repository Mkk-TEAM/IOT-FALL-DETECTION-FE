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

  // Đổi tên trường từ usernameOrEmail thành phoneNumber cho chuẩn cấu trúc
  const [form, setForm] = useState({
    phoneNumber: "",
    otp: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  // =====================
  // 1. SEND OTP
  // =====================
  const handleSendOtp = async () => {
    setError("");
    setSuccess("");

    if (!form.phoneNumber) {
      setError("Vui lòng nhập số điện thoại.");
      return;
    }

    try {
      setLoading(true);

      // Backend mong đợi object { phoneNumber }
      await authApi.sendForgotOtp({
        phoneNumber: form.phoneNumber,
      });

      setOtpSent(true);
      setSuccess("Mã OTP đã được gửi đến Email liên kết với số điện thoại này.");
    } catch (error) {
      setError(
        error?.response?.data?.message || "Không thể gửi OTP. Vui lòng kiểm tra lại số điện thoại!"
      );
    } finally {
      setLoading(false);
    }
  };

  // =====================
  // 2. VALIDATE OTP (Xử lý Offline tại FrontEnd hoặc bỏ qua vì Backend sẽ check lúc Submit)
  // =====================
  const handleVerifyOtp = () => {
    setError("");
    setSuccess("");

    if (!form.otp) {
      setError("Vui lòng nhập mã OTP.");
      return;
    }

    // Vì backend gộp bước check OTP vào chung với bước Reset, 
    // chúng ta sẽ đánh dấu tạm thời là true để người dùng nhập tiếp mật khẩu mới.
    setOtpVerified(true);
    setSuccess("Đã ghi nhận mã OTP. Vui lòng hoàn thành nhập mật khẩu mới.");
  };

  // =====================
  // 3. RESET PASSWORD
  // =====================
  const handleResetPassword = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!form.phoneNumber || !form.otp || !form.newPassword || !form.confirmPassword) {
      setError("Vui lòng điền đầy đủ tất cả các trường dữ liệu.");
      return;
    }

    if (form.newPassword.length < 6) {
      setError("Mật khẩu mới phải chứa ít nhất 6 ký tự.");
      return;
    }

    if (form.newPassword !== form.confirmPassword) {
      setError("Mật khẩu nhập lại không trùng khớp.");
      return;
    }

    try {
      setLoading(true);

      // Gọi API reset mật khẩu gộp của Backend
      await authApi.resetPassword({
        phoneNumber: form.phoneNumber,
        otp: form.otp,
        newPassword: form.newPassword,
      });

      setSuccess("Khôi phục mật khẩu thành công! Đang chuyển hướng về trang đăng nhập...");

      setTimeout(() => {
        navigate("/login");
      }, 1500);
    } catch (error) {
      setError(
        error?.response?.data?.message || "Khôi phục mật khẩu thất bại. OTP sai hoặc đã hết hạn."
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
              Quên mật khẩu
            </h1>

            <p className="mt-3 text-[20px] text-gray-600">
              Nhập thông tin để đặt lại mật khẩu của bạn.
            </p>
          </div>

          <form
            className="space-y-6"
            onSubmit={handleResetPassword}
          >
            {/* USERNAME / EMAIL */}
            <div>
              <label className="mb-2 block text-[17px] font-medium">
                Số điện thoại đã đăng ký
              </label>
              <div className="flex h-[64px] items-center rounded-2xl border bg-[#fafafa] px-5">
                {/* Bạn có thể giữ icon Mail hoặc đổi thành icon Phone */}
                <Mail className="h-5 w-5 text-gray-500" /> 
                <input
                  type="text"
                  name="phoneNumber" // <-- Đổi tên thuộc tính ở đây
                  value={form.phoneNumber} // <-- Cập nhật biến bind giá trị
                  placeholder="Nhập số điện thoại đã đăng ký"
                  onChange={handleChange}
                  className="ml-4 w-full bg-transparent outline-none"
                />
              </div>
            </div>

            {/* OTP */}
            <div>
              <label className="mb-2 block text-[17px] font-medium">
                Xác minh OTP
              </label>

              <div className="flex gap-2">
                <div className="flex flex-1 items-center rounded-2xl border bg-[#fafafa] px-4">
                  <Shield className="h-5 w-5 text-gray-500" />

                  <input
                    type="text"
                    name="otp"
                    value={form.otp}
                    onChange={handleChange}
                    placeholder="Nhập OTP"
                    className="ml-3 h-[56px] w-full bg-transparent outline-none"
                  />
                </div>

                <button
                  type="button"
                  onClick={handleSendOtp}
                  className="rounded-2xl bg-blue-700 px-4 text-white"
                >
                  Lấy OTP
                </button>

                {otpSent && (
                  <button
                    type="button"
                    onClick={handleVerifyOtp}
                    className="rounded-2xl bg-emerald-600 px-4 text-white"
                  >
                    Xác minh OTP
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
                Mật khẩu mới
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
                Xác nhận mật khẩu
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
              Đặt lại mật khẩu
            </button>

            <div className="text-center">
              <Link
                to="/login"
                className="font-semibold text-blue-700 hover:underline"
              >
                Quay lại đăng nhập
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