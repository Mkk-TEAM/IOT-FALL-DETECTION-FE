import { useState } from "react";
import {
  Phone,
  Mail,
  User,
  Shield,
  KeyRound,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import { authApi } from "../api/authApi";

export default function RegisterPage() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [otpSent, setOtpSent] = useState(false);
  //const [otpVerified, setOtpVerified] = useState(false);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [form, setForm] = useState({
    ho: "",
    ten: "",
    email: "",
    sdt: "",
    username: "",
    otp: "",
    password: "",
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

    if (
      !form.ho ||
      !form.ten ||
      !form.email ||
      !form.sdt ||
      !form.username
    ) {
      setError("Please fill all required fields.");
      return;
    }

    try {
      setLoading(true);

      await authApi.sendRegisterOtp({
        phoneNumber: form.sdt,
        email: form.email,
      });

      setOtpSent(true);

      setSuccess("OTP has been sent successfully.");
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

  // const handleVerifyOtp = async () => {
  //   setError("");
  //   setSuccess("");

  //   if (!form.otp) {
  //     setError("Please enter OTP.");
  //     return;
  //   }

  //   try {
  //     setLoading(true);

  //     await authApi.verifyOtp({
  //       email: form.email,
  //       otp: form.otp,
  //     });

  //     setOtpVerified(true);

  //     setSuccess("OTP Matched");
  //   } catch (error) {
  //     setOtpVerified(false);

  //     setError(
  //       error?.response?.data?.message ||
  //         "Invalid OTP."
  //     );
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  // =====================
  // REGISTER
  // =====================

  const handleRegister = async (e) => {
  e.preventDefault();

  setError("");
  setSuccess("");

  const {
    ho,
    ten,
    email,
    sdt,
    username,
    password,
    confirmPassword,
    otp,
  } = form;

  // Kiểm tra thông tin bắt buộc
  if (
    !ho ||
    !ten ||
    !email ||
    !sdt ||
    !username ||
    !password ||
    !confirmPassword
  ) {
    setError("Vui lòng nhập đầy đủ thông tin.");
    return;
  }

  // Password tối thiểu
  if (password.length < 6) {
    setError("Mật khẩu phải có ít nhất 6 ký tự.");
    return;
  }

  // Confirm password
  if (password !== confirmPassword) {
    setError("Mật khẩu nhập lại không khớp.");
    return;
  }

  // Chưa nhập OTP
  if (!otp) {
    setError("Vui lòng nhập mã OTP.");
    return;
  }

  // Chưa bấm Validate OTP
  // if (!otpVerified) {
  //   setError("OTP chưa được xác thực hoặc không hợp lệ.");
  //   return;
  // }

  try {
    setLoading(true);

    await authApi.register({
      username: username, // <-- BỔ SUNG DÒNG NÀY
      fullName: `${ho.trim()} ${ten.trim()}`,
      phoneNumber: sdt,
      email: email,
      password: password,
      otp: otp,
    });
    setError("");
    setSuccess(
      "Đăng ký thành công. Đang chuyển sang đăng nhập..."
    );

    setTimeout(() => {
      navigate("/login");
    }, 1500);

  } catch (error) {
    setError(
      error?.response?.data?.message ||
      "Đăng ký thất bại."
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
          {/* LOGO */}
          <Link
            to="/"
            className="mb-16 flex items-center gap-3"
          >
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
              Tạo tài khoản mới
            </h1>

            <p className="mt-3 text-[20px] text-[#4b5563]">
              Đăng ký để truy cập hệ thống giám sát chăm sóc sức khỏe.
            </p>
          </div>

          <form
            className="space-y-6"
            onSubmit={handleRegister}
          >
            {/* HỌ */}
            <div>
              <label className="mb-2 block text-[17px] font-medium">
                Họ
              </label>

              <div className="flex h-[64px] items-center rounded-2xl border bg-[#fafafa] px-5">
                <User className="h-5 w-5 text-gray-500" />

                <input
                  type="text"
                  name="ho"
                  value={form.ho}
                  onChange={handleChange}
                  placeholder="Nguyen"
                  className="ml-4 w-full bg-transparent outline-none"
                />
              </div>
            </div>

            {/* TÊN */}
            <div>
              <label className="mb-2 block text-[17px] font-medium">
                Tên
              </label>

              <div className="flex h-[64px] items-center rounded-2xl border bg-[#fafafa] px-5">
                <User className="h-5 w-5 text-gray-500" />

                <input
                  type="text"
                  name="ten"
                  value={form.ten}
                  onChange={handleChange}
                  placeholder="Van A"
                  className="ml-4 w-full bg-transparent outline-none"
                />
              </div>
            </div>

            {/* PHONE */}
            <div>
              <label className="mb-2 block text-[17px] font-medium">
                Số điện thoại
              </label>

              <div className="flex h-[64px] items-center rounded-2xl border bg-[#fafafa] px-5">
                <Phone className="h-5 w-5 text-gray-500" />

                <input
                  type="text"
                  name="sdt"
                  value={form.sdt}
                  onChange={handleChange}
                  placeholder="0xxx xxx xxx"
                  className="ml-4 w-full bg-transparent outline-none"
                />
              </div>
            </div>

            {/* EMAIL */}
            <div>
              <label className="mb-2 block text-[17px] font-medium">
                Email
              </label>

              <div className="flex h-[64px] items-center rounded-2xl border bg-[#fafafa] px-5">
                <Mail className="h-5 w-5 text-gray-500" />

                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="example@email.com"
                  className="ml-4 w-full bg-transparent outline-none"
                />
              </div>
            </div>

            {/* USERNAME */}
            <div>
              <label className="mb-2 block text-[17px] font-medium">
                Tên đăng nhập
              </label>

              <div className="flex h-[64px] items-center rounded-2xl border bg-[#fafafa] px-5">
                <User className="h-5 w-5 text-gray-500" />

                <input
                  type="text"
                  name="username"
                  value={form.username}
                  onChange={handleChange}
                  placeholder="Nhập tên đăng nhập"
                  className="ml-4 w-full bg-transparent outline-none"
                />
              </div>
            </div>

            {/* PASSWORD */}
            <div>
              <label className="mb-2 block text-[17px] font-medium">
                Mật khẩu
              </label>

              <div className="flex h-[64px] items-center rounded-2xl border bg-[#fafafa] px-5">
                <KeyRound className="h-5 w-5 text-gray-500" />

                <input
                  type="password"
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className="ml-4 w-full bg-transparent outline-none"
                />
              </div>
            </div>

            {/* CONFIRM PASSWORD */}
            <div>
              <label className="mb-2 block text-[17px] font-medium">
                Xác nhận Mật khẩu
              </label>

              <div className="flex h-[64px] items-center rounded-2xl border bg-[#fafafa] px-5">
                <KeyRound className="h-5 w-5 text-gray-500" />

                <input
                  type="password"
                  name="confirmPassword"
                  value={form.confirmPassword}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className="ml-4 w-full bg-transparent outline-none"
                />
              </div>
            </div>
            {/* OTP SECTION */}
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
                  disabled={loading}
                  className="rounded-2xl bg-blue-700 px-4 text-white hover:bg-blue-800"
                >
                {loading ? "Đang gửi..." : "Lấy OTP"}
                </button>
              </div>

              {otpSent && (
                <p className="mt-2 text-sm text-green-600">
                  OTP đã được gửi đến email của bạn.
                </p>
              )}
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
              disabled={loading}
              className="h-[64px] w-full rounded-2xl bg-blue-700 text-[20px] font-semibold text-white hover:bg-blue-800"
            >
              {loading
                ? "Đang tạo tài khoản..."
                : "Hoàn tất Đăng ký"}
            </button>

            <div className="pt-2 text-center">
              <span className="text-[#4b5563]">
                Đã có tài khoản?{" "}
              </span>

              <Link
                to="/login"
                className="ml-2 font-semibold text-blue-700 hover:underline"
              >
                Đăng nhập ngay
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

        <div className="absolute bottom-10 left-10 w-[480px] rounded-[28px] bg-white/95 p-8 shadow-2xl backdrop-blur-sm">
          <div className="mb-5 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100">
              <Shield className="h-5 w-5 text-blue-700" />
            </div>

            <span className="text-sm font-bold uppercase tracking-[2px] text-blue-700">
              Đăng ký an toàn
            </span>
          </div>

          <p className="text-[24px] leading-[40px] text-[#1f2937]">
            Tài khoản của bạn được bảo vệ bằng xác minh OTP và xác thực y tế an toàn.
          </p>
        </div>
      </div>
    </div>
  );
}