import React, { useState } from "react";
import {
  Monitor,
  ClipboardList,
  TrendingUp,
  Cpu,
  Bell,
  Wifi,
  CheckCircle,
  AlertTriangle,
  Heart,
  Wind,
  Activity,
  Shield,
  PhoneCall,
  Layers,
  HardDrive
} from "lucide-react";

export default function HomePage() {
  // Giả lập trạng thái hệ thống: true = Bình thường (Stable), false = Phát hiện té ngã (Alert)
  const [isStable, setIsStable] = useState(true);

  return (
    <div className="flex min-h-screen bg-[#f5f7fb]">
      {/* MAIN CONTENT AREA */}
      <main className="flex-1">
        
        {/* TOPBAR */}
        <header className="flex h-[78px] items-center justify-between border-b border-[#e5e7eb] bg-white px-10 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
              <Shield className="h-6 w-6" />
            </div>
            <h2 className="text-[20px] font-semibold text-[#111827]">
              ElderCare IoT — Hệ Thống Giám Sát Trung Tâm
            </h2>
          </div>

          <div className="flex items-center gap-8">
            {/* Trạng thái kết nối Wifi của Trạm Gateway */}
            <div className="flex items-center gap-3 text-[17px] text-[#4b5563]">
              <Wifi className="h-5 w-5 text-emerald-500" />
              <span className="font-medium">Gateway: Online</span>
            </div>
            {/* Nút giả lập đổi trạng thái để test UI khẩn cấp */}
            <button 
              onClick={() => setIsStable(!isStable)} 
              className="rounded-xl bg-gray-200 px-4 py-2 text-[14px] font-medium text-[#4b5563] hover:bg-gray-300 transition-all"
            >
              Test Alert UI
            </button>
          </div>
        </header>

        {/* CONTENT GRID */}
        <div className="grid grid-cols-[300px_1fr_340px] gap-8 p-8">
          
          {/* CỘT TRÁI: TRẠNG THÁI & THÔNG TIN ĐỐI TƯỢNG */}
          <div className="space-y-6">
            
            {/* 1. Thẻ trạng thái động (An Toàn / Cảnh Báo Khẩn Cấp) */}
            {isStable ? (
              // Thẻ khi trạng thái bình thường (Màu xanh tương tự code mẫu)
              <div className="rounded-3xl bg-[#16c784] p-6 text-white shadow-sm transition-all duration-300">
                <div className="mb-4 flex justify-center">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white">
                    <CheckCircle className="h-7 w-7 text-[#16c784]" />
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-[24px] font-bold">An Toàn</div>
                  <div className="mt-2 text-[15px] text-white/90">
                    Không phát hiện bất thường trong vùng 25m²
                  </div>
                  <div className="mt-4 border-t border-white/20 pt-3 text-[13px] text-white/80">
                    Cập nhật mới nhất: Vừa xong
                  </div>
                </div>
              </div>
            ) : (
              // Thẻ khi phát hiện té ngã (Màu đỏ nhấp nháy khẩn cấp)
              <div className="rounded-3xl bg-red-500 p-6 text-white shadow-lg animate-pulse transition-all duration-300">
                <div className="mb-4 flex justify-center">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white">
                    <AlertTriangle className="h-7 w-7 text-red-500" />
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-[22px] font-bold uppercase tracking-wide">Cảnh Báo Té Ngã!</div>
                  <div className="mt-2 text-[14px] text-white/90 font-medium">
                    Phát hiện hành vi ngã tại khu vực trung tâm phòng.
                  </div>
                  <div className="mt-4 flex flex-col gap-2">
                    <button className="flex items-center justify-center gap-2 rounded-xl bg-white py-2.5 text-[15px] font-bold text-red-600 shadow-sm hover:bg-gray-50">
                      <PhoneCall className="h-4 w-4" /> Gọi Cứu Hộ Ngay
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* 2. Thẻ thông tin người cao tuổi & Thiết bị */}
            <div className="rounded-3xl border border-[#e5e7eb] bg-white p-6 shadow-sm">
              <div className="flex gap-4">
                <img
                  src="https://i.pravatar.cc/100?img=68"
                  alt="elderly-user"
                  className="h-16 w-16 rounded-2xl object-cover border border-[#e5e7eb]"
                />
                <div>
                  <h3 className="text-[20px] font-bold leading-tight text-[#111827]">
                    Cụ Nguyễn Văn A
                  </h3>
                  <div className="mt-2 text-[14px] text-[#6b7280] space-y-0.5">
                    <div>Tuổi: 82 • Phòng 25m²</div>
                    <div>Nguy cơ ngã: <span className="font-semibold text-red-500">Cao</span></div>
                  </div>
                </div>
              </div>

              <div className="my-5 border-t border-[#e5e7eb]" />

              {/* Quản lý thiết bị phần cứng thuộc phòng */}
              <div className="space-y-4 text-[15px]">
                <div className="flex items-center justify-between">
                  <span className="text-[#6b7280]">Mã cảm biến đeo</span>
                  <span className="font-medium text-[#111827] bg-gray-100 px-2 py-0.5 rounded-lg text-[13px]">
                    IMU-FALL-01
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-[#6b7280]">Thiết bị Camera</span>
                  <span className="font-medium text-[#111827] bg-gray-100 px-2 py-0.5 rounded-lg text-[13px]">
                    CAM-AI-ROOM
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-[#6b7280]">Pin thiết bị đeo</span>
                  <span className="font-semibold text-emerald-500">84%</span>
                </div>
              </div>
            </div>

          </div>

          {/* CỘT GIỮA: LIVE CAMERA STREAM (MVP) */}
          <div className="flex flex-col rounded-3xl bg-black shadow-sm overflow-hidden min-h-[500px]">
            <div className="relative flex-1 bg-neutral-900">
              {/* Giả lập luồng hình ảnh từ Camera giám sát phòng 25m2 */}
              <img
                src="https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?q=80&w=1400&auto=format&fit=crop"
                alt="living-room-live"
                className="h-full w-full object-cover opacity-75"
              />

              {/* AI Bounding Box Giả Lập */}
              <div className={`absolute top-1/3 left-1/3 w-32 h-48 border-2 rounded-xl transition-all duration-300 ${isStable ? 'border-emerald-500 bg-emerald-500/10' : 'border-red-500 bg-red-500/20'}`}>
                <span className={`absolute -top-6 left-0 text-[12px] font-bold px-2 py-0.5 rounded text-white ${isStable ? 'bg-emerald-500' : 'bg-red-500'}`}>
                  {isStable ? "Người dùng: Đang ngồi" : "Cảnh báo: Tư thế ngã"}
                </span>
              </div>

              {/* Nhãn Live định vị */}
              <div className="absolute left-6 top-6 flex items-center gap-2 rounded-2xl bg-[#111827]/90 px-4 py-2.5 text-[15px] font-semibold text-white backdrop-blur-sm">
                <span className="h-2 w-2 rounded-full bg-red-500 animate-ping" />
                🔴 Không Gian Sinh Hoạt — Live
              </div>

              {/* Chỉ số dung lượng lưu trữ server */}
              <div className="absolute bottom-6 left-6 flex items-center gap-2 rounded-xl bg-black/70 px-4 py-2 text-[13px] text-white/90 backdrop-blur-sm">
                <HardDrive className="h-4 w-4 text-sky-400" />
                Lưu trữ Video: 3 ngày dữ liệu ổn định
              </div>
            </div>
          </div>

          {/* CỘT PHẢI: CHỈ SỐ SỨC KHỎE (MỞ RỘNG) & LOG NHẬT KÝ */}
          <div className="space-y-6">
            
            {/* 1. Mở rộng: Chỉ số nhịp tim đeo tay */}
            <div className="rounded-3xl border border-[#e5e7eb] bg-white p-6 shadow-sm">
              <div className="mb-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Heart className="h-5 w-5 text-pink-500" />
                  <span className="text-[17px] font-semibold text-[#111827]">Nhịp tim (IMU)</span>
                </div>
                <span className="rounded-xl bg-emerald-50 px-2.5 py-0.5 text-[12px] font-medium text-emerald-600">
                  Real-time
                </span>
              </div>

              <div className="flex items-end gap-2">
                <div className="text-[56px] font-bold leading-none text-[#111827]">72</div>
                <div className="pb-1 text-[18px] text-[#6b7280]">bpm</div>
              </div>

              {/* Sóng nhịp tim tuần hoàn */}
              <svg viewBox="0 0 300 60" className="mt-4 h-[50px] w-full" fill="none">
                <path
                  d="M0 30 M 20 30 L 40 30 L 50 10 L 60 50 L 70 30 L 120 30 L 130 15 L 140 45 L 150 30 L 200 30 L 210 5 L 220 55 L 230 30 L 300 30"
                  stroke="#2563eb"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>

            {/* 2. Trạng thái vận động thực tế */}
            <div className="rounded-3xl border border-[#e5e7eb] bg-white p-5 shadow-sm">
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#eef4ff]">
                  <Activity className="h-6 w-6 text-blue-600" />
                </div>
                <div className="flex-1">
                  <div className="text-[16px] font-semibold text-[#111827]">Trạng thái vận động</div>
                  <div className="text-[14px] text-[#6b7280]">
                    {isStable ? "Đang nằm nghỉ trên giường" : "Bất động trên sàn nhà"}
                  </div>
                </div>
                <div className={`text-[18px] font-bold ${isStable ? 'text-emerald-500' : 'text-red-500'}`}>
                  {isStable ? "Thấp" : "Nguy cơ"}
                </div>
              </div>
            </div>

            {/* 3. Nhật ký Log hệ thống (Lưu trữ 1 tháng - Tính năng MVP) */}
            <div className="rounded-3xl border border-[#e5e7eb] bg-white p-6 shadow-sm">
              <div className="mb-4 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <ClipboardList className="h-5 w-5 text-indigo-500" />
                  <span className="text-[17px] font-semibold text-[#111827]">Log sự kiện (1 tháng)</span>
                </div>
              </div>

              {/* Dòng sự kiện thời gian (Timeline) */}
              <div className="space-y-3.5 max-h-[190px] overflow-y-auto pr-1 text-[13.5px]">
                <div className="flex gap-3 items-start">
                  <span className="font-mono text-gray-400 mt-0.5">21:15</span>
                  <p className="text-[#4b5563]">Hệ thống kiểm tra định kỳ thông mạch Wifi: 🟢 Tốt</p>
                </div>
                <div className="flex gap-3 items-start">
                  <span className="font-mono text-gray-400 mt-0.5">18:32</span>
                  <p className="text-[#4b5563]">Gửi thành công thông báo đẩy (App) về trạng thái ăn tối.</p>
                </div>
                <div className="flex gap-3 items-start">
                  <span className="font-mono text-gray-400 mt-0.5">12:04</span>
                  <p className="text-[#4b5563]">Đã làm mới bộ nhớ đệm log file. Dung lượng khả dụng 98%.</p>
                </div>
                <div className="flex gap-3 items-start">
                  <span className="font-mono text-gray-400 mt-0.5">08:00</span>
                  <p className="text-[#4b5563]">Cụ ông thức dậy; cảm biến IMU ghi nhận gia tốc chuyển động.</p>
                </div>
              </div>
            </div>

          </div>

        </div>
      </main>
    </div>
  );
}