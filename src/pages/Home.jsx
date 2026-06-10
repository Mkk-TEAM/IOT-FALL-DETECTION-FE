import { Link } from "react-router-dom";
import {
  HeartPulse,
  Activity,
  Bell,
  Shield,
  Smartphone,
  BarChart3,
  ArrowRight,
} from "lucide-react";

export default function HomePage() {
  return (
    <div className="bg-white">

      {/* HERO SECTION */}
      <section className="relative overflow-hidden bg-gradient-to-r from-[#0F766E] to-[#14B8A6]">
        <div className="mx-auto max-w-7xl px-6 py-24">

          <div className="max-w-3xl text-white">
            <span className="rounded-full bg-white/20 px-4 py-2 text-sm font-medium">
              ElderCare IoT Monitoring System
            </span>

            <h1 className="mt-6 text-5xl font-bold leading-tight">
              Giám sát sức khỏe người cao tuổi
              <br />
              theo thời gian thực
            </h1>

            <p className="mt-6 text-xl text-blue-100">
              Hệ thống ElderCare IoT giúp theo dõi sức khỏe, phát hiện té ngã,
              gửi cảnh báo khẩn cấp và hỗ trợ chăm sóc người cao tuổi mọi lúc mọi nơi.
            </p>

            <div className="mt-10 flex flex-wrap gap-4">
              <Link
                to="/register"
                className="rounded-xl bg-white px-8 py-4 font-semibold text-blue-700 transition hover:bg-blue-50"
              >
                Đăng ký ngay
              </Link>

              <Link
                to="/login"
                className="rounded-xl border border-white px-8 py-4 font-semibold text-white transition hover:bg-white/10"
              >
                Đăng nhập
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-6">

          <div className="text-center">
            <h2 className="text-4xl font-bold text-gray-900">
              Tính năng nổi bật
            </h2>

            <p className="mt-4 text-lg text-gray-600">
              Hỗ trợ giám sát sức khỏe toàn diện và nâng cao chất lượng chăm sóc.
            </p>
          </div>

          <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">

            <div className="rounded-2xl border p-8 shadow-sm">
              <Activity className="h-12 w-12 text-blue-600" />
              <h3 className="mt-4 text-xl font-bold">
                Theo dõi thời gian thực
              </h3>
              <p className="mt-3 text-gray-600">
                Giám sát nhịp tim, SpO₂ và các chỉ số quan trọng liên tục.
              </p>
            </div>

            <div className="rounded-2xl border p-8 shadow-sm">
              <Bell className="h-12 w-12 text-red-500" />
              <h3 className="mt-4 text-xl font-bold">
                Cảnh báo té ngã
              </h3>
              <p className="mt-3 text-gray-600">
                Tự động phát hiện sự cố và gửi cảnh báo đến người chăm sóc.
              </p>
            </div>

            <div className="rounded-2xl border p-8 shadow-sm">
              <HeartPulse className="h-12 w-12 text-pink-500" />
              <h3 className="mt-4 text-xl font-bold">
                Theo dõi sức khỏe
              </h3>
              <p className="mt-3 text-gray-600">
                Phân tích các chỉ số sinh tồn giúp phát hiện bất thường sớm.
              </p>
            </div>

            <div className="rounded-2xl border p-8 shadow-sm">
              <BarChart3 className="h-12 w-12 text-green-600" />
              <h3 className="mt-4 text-xl font-bold">
                Health Trends
              </h3>
              <p className="mt-3 text-gray-600">
                Thống kê và hiển thị xu hướng sức khỏe theo ngày, tuần, tháng.
              </p>
            </div>

            <div className="rounded-2xl border p-8 shadow-sm">
              <Smartphone className="h-12 w-12 text-cyan-600" />
              <h3 className="mt-4 text-xl font-bold">
                Truy cập mọi lúc
              </h3>
              <p className="mt-3 text-gray-600">
                Theo dõi thiết bị và dữ liệu sức khỏe trên mọi nền tảng.
              </p>
            </div>

            <div className="rounded-2xl border p-8 shadow-sm">
              <Shield className="h-12 w-12 text-purple-600" />
              <h3 className="mt-4 text-xl font-bold">
                Bảo mật dữ liệu
              </h3>
              <p className="mt-3 text-gray-600">
                Thông tin người dùng được bảo vệ bằng cơ chế xác thực an toàn.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="bg-gray-50 py-20">
        <div className="mx-auto max-w-7xl px-6">

          <div className="text-center">
            <h2 className="text-4xl font-bold">
              Hệ thống hoạt động như thế nào?
            </h2>
          </div>

          <div className="mt-16 grid gap-8 md:grid-cols-3">

            <div className="rounded-2xl bg-white p-8 shadow-sm">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 font-bold text-blue-600">
                1
              </div>

              <h3 className="text-xl font-bold">
                Thu thập dữ liệu
              </h3>

              <p className="mt-3 text-gray-600">
                Thiết bị IoT ghi nhận dữ liệu sức khỏe của người dùng.
              </p>
            </div>

            <div className="rounded-2xl bg-white p-8 shadow-sm">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 font-bold text-blue-600">
                2
              </div>

              <h3 className="text-xl font-bold">
                Phân tích
              </h3>

              <p className="mt-3 text-gray-600">
                Hệ thống xử lý dữ liệu và phát hiện các bất thường.
              </p>
            </div>

            <div className="rounded-2xl bg-white p-8 shadow-sm">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 font-bold text-blue-600">
                3
              </div>

              <h3 className="text-xl font-bold">
                Cảnh báo
              </h3>

              <p className="mt-3 text-gray-600">
                Gửi cảnh báo ngay khi xảy ra sự cố hoặc nguy cơ sức khỏe.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#14B8A6] py-20 text-center text-white">
        <div className="mx-auto max-w-3xl px-6">

          <h2 className="text-4xl font-bold">
            Bắt đầu sử dụng ElderCare IoT ngay hôm nay
          </h2>

          <p className="mt-4 text-xl text-blue-100">
            Theo dõi sức khỏe người thân một cách chủ động và an toàn hơn.
          </p>

          <Link
            to="/register"
            className="mt-8 inline-flex items-center gap-2 rounded-xl bg-white px-8 py-4 font-semibold text-blue-700 transition hover:bg-blue-50"
          >
            Đăng ký ngay
            <ArrowRight className="h-5 w-5" />
          </Link>

        </div>
      </section>
    </div>
  );
}