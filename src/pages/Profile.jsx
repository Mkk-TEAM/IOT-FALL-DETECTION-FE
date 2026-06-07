import { useContext } from "react";
import { Link } from "react-router-dom";

import {
  User,
  Mail,
  Phone,
  Shield,
  LogOut,
  Edit,
} from "lucide-react";

import { AuthContext } from "../context/AuthContext";

export default function Profile() {
  const { user, logout } = useContext(AuthContext);

  if (!user) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center">
        <div className="rounded-2xl bg-white p-8 shadow-lg">
          <h2 className="mb-4 text-2xl font-bold text-gray-800">
            Bạn chưa đăng nhập
          </h2>

          <Link
            to="/login"
            className="rounded-lg bg-blue-600 px-5 py-3 text-white hover:bg-blue-700"
          >
            Đăng nhập ngay
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl px-6 py-10">
      {/* HEADER */}
      <div className="mb-8 rounded-3xl bg-white p-8 shadow-md">
        <div className="flex flex-col items-center gap-6 md:flex-row">
          
          {/* AVATAR */}
          <div className="flex h-32 w-32 items-center justify-center rounded-full bg-blue-600 text-5xl font-bold text-white shadow-lg">
            {user?.fullName?.charAt(0)?.toUpperCase()}
          </div>

          {/* INFO */}
          <div className="flex-1">
            <h1 className="text-3xl font-bold text-gray-900">
              {user.fullName}
            </h1>

            <p className="mt-2 text-gray-500">
              Thành viên hệ thống ElderCare IoT
            </p>

            <div className="mt-4 flex flex-wrap gap-2">
              <span className="rounded-full bg-green-100 px-4 py-1 text-sm font-semibold text-green-700">
                Đã xác thực
              </span>

              <span className="rounded-full bg-blue-100 px-4 py-1 text-sm font-semibold text-blue-700">
                Người dùng
              </span>
            </div>
          </div>

          {/* ACTION */}
          <button
            className="flex items-center gap-2 rounded-xl border px-4 py-3 text-gray-700 hover:bg-gray-50"
          >
            <Edit size={18} />
            Chỉnh sửa
          </button>
        </div>
      </div>

      {/* CONTENT */}
      <div className="grid gap-6 lg:grid-cols-3">
        
        {/* LEFT */}
        <div className="rounded-3xl bg-white p-6 shadow-md">
          <h2 className="mb-6 text-lg font-bold text-gray-900">
            Tài khoản
          </h2>

          <div className="space-y-4">
            <div className="flex items-center gap-3 rounded-xl bg-gray-50 p-4">
              <User className="text-blue-600" />
              <div>
                <p className="text-xs text-gray-500">
                  Họ và tên
                </p>
                <p className="font-semibold">
                  {user.fullName}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 rounded-xl bg-gray-50 p-4">
              <Mail className="text-blue-600" />
              <div>
                <p className="text-xs text-gray-500">
                  Email
                </p>
                <p className="font-semibold">
                  {user.email}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 rounded-xl bg-gray-50 p-4">
              <Phone className="text-blue-600" />
              <div>
                <p className="text-xs text-gray-500">
                  Số điện thoại
                </p>
                <p className="font-semibold">
                  {user.phoneNumber}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT */}
        <div className="lg:col-span-2">
          <div className="rounded-3xl bg-white p-8 shadow-md">
            <h2 className="mb-6 text-xl font-bold text-gray-900">
              Thông tin bảo mật
            </h2>

            <div className="space-y-4">
              <div className="flex items-center justify-between rounded-xl border p-4">
                <div className="flex items-center gap-3">
                  <Shield className="text-green-600" />

                  <div>
                    <p className="font-semibold">
                      Tài khoản đã xác thực
                    </p>

                    <p className="text-sm text-gray-500">
                      Email và số điện thoại hợp lệ
                    </p>
                  </div>
                </div>
              </div>

              <Link
                to="/forgot-password"
                className="flex items-center justify-between rounded-xl border p-4 transition hover:bg-gray-50"
              >
                <div>
                  <p className="font-semibold">
                    Đổi mật khẩu
                  </p>

                  <p className="text-sm text-gray-500">
                    Cập nhật mật khẩu tài khoản
                  </p>
                </div>

                <span className="text-blue-600">
                  →
                </span>
              </Link>
            </div>

            {/* LOGOUT */}
            <div className="mt-10 border-t pt-6">
              <button
                onClick={logout}
                className="flex items-center gap-3 rounded-xl bg-red-50 px-5 py-3 font-semibold text-red-600 transition hover:bg-red-100"
              >
                <LogOut size={18} />
                Đăng xuất
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}