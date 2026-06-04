import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import logo from "../assets/logo.png"; 
import { Bell, User, LogOut } from "lucide-react";
import { NavLink } from "react-router-dom";
function Header() {
  const { user, logout } = useContext(AuthContext);
  return (
    <nav className="header bg-blue-50 border-b border-blue-100 ">
      <div className="mx-auto max-w-7xl flex justify-between items-center px-6 py-3">
        {/* Logo + menu*/}
        <div className="flex items-center gap-10">
          <Link to="/" className="flex items-center gap-2">
            <img src={logo} alt="logo" className="h-10 w-auto object-contain" />
            <span className="text-xl font-bold text-black-600">
              ElderCare IoT
            </span>
          </Link>
          <div className="flex gap-6 text-gray-700 font-medium">
            <div className="flex gap-6 text-gray-700 font-medium">
            <NavLink
              to="/"
              className={({ isActive }) =>
              `transition pb-1 border-b-2 ${
              isActive
              ? "text-blue-600 border-blue-600"
              : "border-transparent hover:text-blue-600"
            }`}
            >
              Màn hình trực tiếp
            </NavLink>

          <NavLink
            to="/incident"
            className={({ isActive }) =>
              `transition pb-1 border-b-2 ${
                isActive
                ? "text-blue-600 border-blue-600"
                : "border-transparent hover:text-blue-600"
              }`}
            >
            Lịch sử Cảnh báo
          </NavLink>

          <NavLink
            to="/health"
            className={({ isActive }) =>
              `transition pb-1 border-b-2 ${
                isActive
                  ? "text-blue-600 border-blue-600"
                  : "border-transparent hover:text-blue-600"
              }`}
            >
              Xu hướng Sức khỏe
            </NavLink>

          <NavLink
            to="/devices"
            className={({ isActive }) =>
              `transition pb-1 border-b-2 ${
                isActive
                  ? "text-blue-600 border-blue-600"
                  : "border-transparent hover:text-blue-600"
              }`}
            >
              Quản lý Thiết bị
            </NavLink>
            </div>
          </div>

        </div>
        {/* User */}
        <div className="flex items-center gap-4">
          <Link to="/chat" className="rounded-lg p-2 hover:bg-gray-100">
            <Bell className="h-5 w-5 text-gray-700" />
          </Link>

          {!user ? (
            <Link
              to="/login"
              className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700 transition"
            >
              Đăng nhập
            </Link>
           ) : (
            <div className="flex items-center gap-2">
              <Link to="/profile" className="rounded-lg p-2 hover:bg-gray-100">
                <User className="h-5 w-5 text-gray-700" />
              </Link>
              <button
                onClick={logout}
                className="rounded-lg p-2 hover:bg-gray-100"
                title="Đăng xuất"
              >
                <LogOut className="h-5 w-5 text-gray-700" />
              </button>
            </div>
            )}
        </div>
      </div>
    </nav>
  );
}

export default Header;