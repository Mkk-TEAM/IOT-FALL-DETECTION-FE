import React, { useState } from "react";
// Đã bổ sung đầy đủ các icon bị thiếu trong danh sách import
import {
  Monitor,
  ClipboardList,
  TrendingUp,
  Cpu,
  Bell,
  Wifi,
  CheckCircle,
  Heart,
  Wind,
  Activity,
  AlertTriangle,
  PhoneCall,
  HardDrive
} from "lucide-react";
import LiveCameraStream from "../components/LiveCameraStream";
export default function LiveMonitorPage() {
  // Khởi tạo State để quản lý trạng thái An Toàn / Té Ngã mà không bị crash code
  const [isStable, setIsStable] = useState(true);

  return (
    <div className="flex min-h-screen bg-[#f5f7fb]">
      {/* MAIN */}
      <main className="flex-1">
        {/* TOPBAR */}
        <header className="flex h-[78px] items-center justify-between border-b border-[#e5e7eb] bg-white px-10">
          <h2 className="text-[20px] font-semibold text-[#111827]">
            Room 402 - Cụ Nguyễn Văn A
          </h2>

          <div className="flex items-center gap-8">
            <div className="flex items-center gap-3 text-[18px] text-[#4b5563]">
              <Wifi className="h-5 w-5 text-emerald-500" />
              System Online
            </div>
            {/* Nút bấm chuyển đổi nhanh trạng thái để test tính năng đổi màu UI */}
            <button 
              onClick={() => setIsStable(!isStable)} 
              className="rounded-xl bg-gray-200 px-4 py-2 text-[14px] font-medium text-[#4b5563] hover:bg-gray-300 transition-all"
            >
              Test Cảnh Báo
            </button>
          </div>
        </header>

        {/* CONTENT */}
        <div className="grid grid-cols-[300px_1fr_340px] gap-8 p-8">
          
          {/* CỘT TRÁI: TRẠNG THÁI & THÔNG TIN ĐỐI TƯỢNG */}
          <div className="space-y-6">
            
            {/* 1. Thẻ trạng thái động (An Toàn / Cảnh Báo Khẩn Cấp) */}
            {isStable ? (
              // Thẻ khi trạng thái bình thường
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
              <LiveCameraStream />

              {/* Nhãn Live định vị */}
              <div className="absolute left-6 top-6 flex items-center gap-2 rounded-2xl bg-[#111827]/90 px-4 py-2.5 text-[15px] font-semibold text-white backdrop-blur-sm">
                <span className="h-2 w-2 rounded-full bg-red-500 animate-ping" />
                🔴 Live
              </div>

              {/* Chỉ số dung lượng lưu trữ server */}
              <div className="absolute bottom-6 left-6 flex items-center gap-2 rounded-xl bg-black/70 px-4 py-2 text-[13px] text-white/90 backdrop-blur-sm">
                <HardDrive className="h-4 w-4 text-sky-400" />
                Lưu trữ Video: 3 ngày dữ liệu ổn định
              </div>
            </div>
          </div>

          {/* CỘT PHẢI: CHỈ SỐ SỨC KHỎE (MỞ RỘNG) & LOG NHẬT KÝ */}
           {/* <div className="space-y-6">
            
            <div className="rounded-3xl border border-[#e5e7eb] bg-white p-6 shadow-sm">
              <div className="mb-4 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <ClipboardList className="h-5 w-5 text-indigo-500" />
                  <span className="text-[17px] font-semibold text-[#111827]">Log sự kiện (1 tháng)</span>
                </div>
              </div>

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

          </div>  */}

        </div>
      </main>
    </div>
  );
}