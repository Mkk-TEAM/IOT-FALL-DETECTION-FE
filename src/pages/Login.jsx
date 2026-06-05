
import { Phone, Lock, Eye, EyeOff, Shield } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import logo from "../assets/logo.png";
import { authApi } from "../api/authApi";

export default function LoginPage() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const [loginForm, setLoginForm] = useState({
    usernameOrGmail: "",
    password: "",
  });

  const [loginError, setLoginError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChangeLogin = (e) => {
    const { name, value } = e.target;

    setLoginForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    setLoginError("");

    if (!loginForm.usernameOrGmail || !loginForm.password) {
      setLoginError("Please enter your account and password.");
      return;
    }

    setIsSubmitting(true);

    try {
      const res = await authApi.login({
        usernameOrGmail: loginForm.usernameOrGmail,
        password: loginForm.password,
      });

      const { meta } = res.data || {};
      const { token, userInfo } = meta || {};

      if (token) {
        localStorage.setItem("token", token);
      }

      if (userInfo) {
        localStorage.setItem(
          "user",
          JSON.stringify(userInfo)
        );
      }

      const role = userInfo?.role;

      if (role === "nhanvien") {
        navigate("/admin/dashboard");
      } else {
        navigate("/");
      }
    } catch (error) {
      const msg =
        error?.response?.data?.message ||
        "Login failed. Please check your credentials.";

      setLoginError(msg);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="grid min-h-screen grid-cols-1 overflow-hidden lg:grid-cols-2">

      {/* LEFT SIDE */}
      <div className="flex items-center justify-center bg-white px-8 py-12">
        <div className="w-full max-w-[420px]">

          {/* LOGO */}
          <div className="mb-20 flex items-center gap-4">
            <Link to="/" className="flex items-center gap-4">
              <img
                src={logo}
                alt="logo"
                className="h-12 w-auto object-contain"
              />

              <span className="text-[32px] font-bold tracking-tight text-[#123a8f]">
                ElderCare IoT
              </span>
            </Link>
          </div>

          {/* TITLE */}
          <div className="mb-10">
            <h1 className="text-[54px] font-bold leading-[60px] tracking-tight text-[#111827]">
              Welcome Back
            </h1>

            <p className="mt-4 text-[22px] text-[#4b5563]">
              Sign in to monitor your residents.
            </p>
          </div>

          {/* FORM */}
          <form
            className="space-y-8"
            onSubmit={handleLogin}
          >
            {/* ACCOUNT */}
            <div>
              <label className="mb-3 block text-[18px] font-medium text-[#111827]">
                Account / Email / Phone
              </label>

              <div className="flex h-[66px] items-center rounded-2xl border border-[#d1d5db] bg-[#fafafa] px-5 shadow-sm">
                <Phone className="h-5 w-5 text-[#6b7280]" />

                <input
                  type="text"
                  name="usernameOrGmail"
                  value={loginForm.usernameOrGmail}
                  onChange={handleChangeLogin}
                  placeholder="Enter account"
                  className="ml-4 w-full bg-transparent text-[18px] outline-none placeholder:text-[#9ca3af]"
                />
              </div>
            </div>

            {/* PASSWORD */}
            <div>
              <label className="mb-3 block text-[18px] font-medium text-[#111827]">
                Password
              </label>

              <div className="flex h-[66px] items-center rounded-2xl border border-[#d1d5db] bg-[#fafafa] px-5 shadow-sm">
                <Lock className="h-5 w-5 text-[#6b7280]" />

                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={loginForm.password}
                  onChange={handleChangeLogin}
                  placeholder="••••••••"
                  className="ml-4 w-full bg-transparent text-[18px] outline-none placeholder:text-[#9ca3af]"
                />

                {showPassword ? (
                  <EyeOff
                    onClick={() =>
                      setShowPassword(false)
                    }
                    className="h-5 w-5 cursor-pointer text-[#6b7280]"
                  />
                ) : (
                  <Eye
                    onClick={() =>
                      setShowPassword(true)
                    }
                    className="h-5 w-5 cursor-pointer text-[#6b7280]"
                  />
                )}
              </div>
            </div>

            {/* OPTIONS */}
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-3 text-[17px] text-[#374151]">
                <input
                  type="checkbox"
                  className="h-5 w-5 rounded border-gray-300 accent-blue-600"
                />
                Remember me
              </label>

              <Link
                to="/forgot-password"
                className="text-[17px] font-medium text-blue-700 hover:underline"
              >
                Forgot password?
              </Link>
            </div>

            {/* ERROR */}
            {loginError && (
              <div className="rounded-xl bg-red-50 p-4 text-sm text-red-600">
                {loginError}
              </div>
            )}

            {/* LOGIN */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="h-[66px] w-full rounded-2xl bg-blue-700 text-[22px] font-semibold text-white shadow-md transition hover:bg-blue-800 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isSubmitting
                ? "Signing In..."
                : "Sign In"}
            </button>

            {/* GUEST */}
            <button
              type="button"
              onClick={() => navigate("/")}
              className="h-[66px] w-full rounded-2xl border border-[#cfd4dc] bg-white text-[22px] font-medium text-[#1f3b82] transition hover:bg-gray-50"
            >
              Continue as Guest
            </button>
          </form>

          {/* FOOTER */}
          <div className="mt-10 flex items-center justify-between text-[17px]">
            <Link
              to="/register"
              className="text-[#374151]"
            >
              Don't have an account?
            </Link>

            <button className="font-semibold text-[#1f3b82] hover:underline">
              Contact administrator
            </button>
          </div>

          <div className="mt-28 text-[14px] uppercase tracking-wide text-[#9ca3af]">
            VIGILANCE HEALTHCARE IOT. CLINICAL GRADE PRECISION.
          </div>
        </div>
      </div>

      {/* RIGHT SIDE */}
      <div className="relative hidden lg:block">
        <img
          src="https://images.unsplash.com/photo-1581579438747-1dc8d17bbce4?q=80&w=1400&auto=format&fit=crop"
          alt="elderly"
          className="h-full w-full object-cover"
        />

        <div className="absolute inset-0 bg-black/10" />

        <div className="absolute bottom-12 left-12 w-[500px] rounded-[28px] bg-white/95 p-8 shadow-2xl backdrop-blur-sm">
          <div className="mb-5 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100">
              <Shield className="h-5 w-5 text-blue-700" />
            </div>

            <span className="text-[16px] font-bold uppercase tracking-[2px] text-[#1f3b82]">
              High-Reliability Mode
            </span>
          </div>

          <p className="text-[28px] leading-[44px] text-[#1f2937]">
            Ensuring continuous, secure monitoring for resident
            safety and caregiver peace of mind.
          </p>
        </div>
      </div>
    </div>
  );
}

