// src/layout/Header.jsx

import { Link, NavLink, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

import logo from "../assets/logo.png";

import {
  Bell,
  User,
  LogOut,
} from "lucide-react";

function Header() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const navClass = ({ isActive }) =>
    `transition pb-1 border-b-2 ${
      isActive
        ? "text-blue-600 border-blue-600"
        : "border-transparent hover:text-blue-600"
    }`;

  return (
    <nav className="border-b border-blue-100 bg-blue-50 shadow-sm">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-3">

        {/* LEFT SIDE */}
        <div className="flex items-center gap-10">

          {/* LOGO */}
          <Link
            to="/"
            className="flex items-center gap-2"
          >
            <img
              src={logo}
              alt="logo"
              className="h-10 w-auto object-contain"
            />

            <span className="text-xl font-bold text-[#123a8f]">
              ElderCare IoT
            </span>
          </Link>

          {/* MENU */}
          <div className="flex gap-6 text-gray-700 font-medium">

            {/* Home luôn hiện */}
            <NavLink
              to="/"
              className={navClass}
            >
              Trang chủ
            </NavLink>

            {/* Chỉ hiện sau khi login */}
            {user && (
              <>
                <NavLink
                  to="/live-monitor"
                  className={navClass}
                >
                  Giám sát trực tiếp
                </NavLink>

                <NavLink
                  to="/incident-log"
                  className={navClass}
                >
                  Nhật ký sự cố
                </NavLink>

                <NavLink
                  to="/device-management"
                  className={navClass}
                >
                  Quản lý thiết bị
                </NavLink>
              </>
            )}
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="flex items-center gap-3">

          {!user ? (
            <>
              <Link
                to="/login"
                className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-700"
              >
                Đăng nhập
              </Link>

              <Link
                to="/register"
                className="rounded-lg border border-blue-600 px-4 py-2 text-sm font-semibold text-blue-600 transition hover:bg-blue-50"
              >
                Đăng ký
              </Link>
            </>
          ) : (
            <>
              {/* Notification */}
              <Link
                to="/notifications"
                className="rounded-lg p-2 hover:bg-gray-100"
                title="Thông báo"
              >
                <Bell className="h-5 w-5 text-gray-700" />
              </Link>

              {/* Profile */}
              <Link
                to="/profile"
                className="rounded-lg p-2 hover:bg-gray-100"
                title="Hồ sơ"
              >
                <User className="h-5 w-5 text-gray-700" />
              </Link>

              {/* User Name */}
              <span className="hidden md:block text-sm font-medium text-gray-700">
                Xin chào, {user?.fullName}
              </span>

              {/* Logout */}
              <button
                onClick={handleLogout}
                className="rounded-lg p-2 hover:bg-gray-100"
                title="Đăng xuất"
              >
                <LogOut className="h-5 w-5 text-red-500" />
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Header;