import React, { useState, useEffect } from "react";
import {
  Monitor,
  ClipboardList,
  TrendingUp,
  Cpu,
  Bell,
  Wifi,
  WifiOff, // Bổ sung icon báo mất mạng
  CheckCircle,
  Heart,
  Wind,
  Activity,
  AlertTriangle,
  PhoneCall,
  HardDrive,
  RefreshCw
} from "lucide-react";
import LiveCameraStream from "../components/LiveCameraStream";
import { streamApi } from "../api/streamApi"; 
import { monitorApi } from "../api/monitorApi"; 

export default function LiveMonitorPage() {
  const [roomData, setRoomData] = useState(null);
  const [isDataLoading, setIsDataLoading] = useState(true);
  const [isStable, setIsStable] = useState(true);
  
  const [streamSession, setStreamSession] = useState(null);
  const [streamLoading, setStreamLoading] = useState(true);
  const [streamError, setStreamError] = useState(null);

  const GATEWAY_ID = "GW-ROOM-402"; 

  useEffect(() => {
    const fetchRoomData = async () => {
      try {
        setIsDataLoading(true);
        const res = await monitorApi.getRoomStatus(GATEWAY_ID);
        const data = res?.data?.data || res?.data;
        
        setRoomData(data);
        setIsStable(data?.currentStatus === 'SAFE');
      } catch (error) {
        console.error("Lỗi khi lấy thông tin phòng:", error);
      } finally {
        setIsDataLoading(false);
      }
    };

    fetchRoomData();
    const intervalId = setInterval(fetchRoomData, 10000);
    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    let currentSessionId = null;

    const initStreamSession = async () => {
      if (!roomData?.camera?.deviceId) return;

      try {
        setStreamLoading(true);
        setStreamError(null);
        
        const res = await streamApi.createSession(roomData.camera.deviceId);
        const sessionData = res?.data?.data || res?.data;
        
        setStreamSession(sessionData);
        currentSessionId = sessionData.sessionId;
      } catch (err) {
        console.error("Lỗi khởi tạo phiên stream:", err);
        setStreamError(err.response?.data?.message || "Không thể kết nối đến Camera.");
      } finally {
        setStreamLoading(false);
      }
    };

    initStreamSession();

    return () => {
      if (currentSessionId) {
        streamApi.closeSession(currentSessionId).catch(console.error);
      }
    };
  }, [roomData?.camera?.deviceId]);

  return (
    <div className="flex min-h-screen bg-[#f5f7fb]">
      <main className="flex-1">
        {/* TOPBAR */}
        <header className="flex h-[78px] items-center justify-between border-b border-[#e5e7eb] bg-white px-10">
          <h2 className="text-[20px] font-semibold text-[#111827]">
            {isDataLoading 
              ? "Đang tải dữ liệu phòng..." 
              : `${roomData?.roomName || "Phòng"} - ${roomData?.patientName || "Chưa có thông tin"}`
            }
          </h2>

          <div className="flex items-center gap-8">
            {/* TRẠNG THÁI MẠNG ĐỘNG */}
            <div className="flex items-center gap-3 text-[18px]">
              {isDataLoading ? (
                <>
                  <RefreshCw className="h-5 w-5 animate-spin text-gray-400" />
                  <span className="text-gray-500 font-medium">Đang kiểm tra...</span>
                </>
              ) : roomData?.status === "ONLINE" ? (
                <>
                  <Wifi className="h-5 w-5 text-emerald-500" />
                  <span className="text-emerald-600 font-semibold">System Online</span>
                </>
              ) : (
                <>
                  <WifiOff className="h-5 w-5 text-red-500 animate-pulse" />
                  <span className="text-red-600 font-semibold">System Offline</span>
                </>
              )}
            </div>
          </div>
        </header>

        {/* CONTENT */}
        <div className="grid grid-cols-[300px_1fr_340px] gap-8 p-8">
          
          {/* CỘT TRÁI: THÔNG TIN TRẠNG THÁI & THIẾT BỊ */}
          <div className="space-y-6">
            
            {/* CARD 1: Trạng thái an toàn */}
            {isStable ? (
              <div className="rounded-3xl bg-[#16c784] p-6 text-white shadow-sm transition-all duration-300">
                <div className="mb-4 flex justify-center">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white">
                    <CheckCircle className="h-7 w-7 text-[#16c784]" />
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-[24px] font-bold">An Toàn</div>
                  <div className="mt-2 text-[15px] text-white/90">
                    Không phát hiện bất thường
                  </div>
                  <div className="mt-4 border-t border-white/20 pt-3 text-[13px] text-white/80">
                    Cập nhật mới nhất: {new Date().toLocaleTimeString('vi-VN')}
                  </div>
                </div>
              </div>
            ) : (
              <div className="animate-pulse rounded-3xl bg-red-500 p-6 text-white shadow-lg transition-all duration-300">
                <div className="mb-4 flex justify-center">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white">
                    <AlertTriangle className="h-7 w-7 text-red-500" />
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-[22px] font-bold uppercase tracking-wide">Cảnh Báo!</div>
                  <div className="mt-2 text-[14px] font-medium text-white/90">
                    Hệ thống ghi nhận sự kiện bất thường.
                  </div>
                  <div className="mt-4 flex flex-col gap-2">
                    <button className="flex items-center justify-center gap-2 rounded-xl bg-white py-2.5 text-[15px] font-bold text-red-600 shadow-sm hover:bg-gray-50">
                      <PhoneCall className="h-4 w-4" /> Gọi Cứu Hộ Ngay
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* CARD 2: Bảng thông số Thiết bị thực tế */}
            <div className="rounded-3xl border border-[#e5e7eb] bg-white p-6 shadow-sm">
              {isDataLoading ? (
                <div className="flex justify-center py-4">
                  <RefreshCw className="h-6 w-6 animate-spin text-gray-400" />
                </div>
              ) : (
                <div className="space-y-4 text-[15px]">
                  <div className="flex items-center justify-between">
                    <span className="text-[#6b7280]">Mã cảm biến đeo</span>
                    <span className="rounded-lg bg-gray-100 px-2 py-0.5 text-[13px] font-medium text-[#111827]">
                      {roomData?.wearable?.deviceId || "Chưa kết nối"}
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-[#6b7280]">Thiết bị Camera</span>
                    <span className="rounded-lg bg-gray-100 px-2 py-0.5 text-[13px] font-medium text-[#111827]">
                      {roomData?.camera?.deviceId || "Chưa kết nối"}
                    </span>
                  </div>

                  {/* <div className="flex items-center justify-between">
                    <span className="text-[#6b7280]">Pin thiết bị đeo</span>
                    {roomData?.wearable?.batteryLevel != null ? (
                      <span className={`font-semibold ${roomData.wearable.batteryLevel > 20 ? 'text-emerald-500' : 'text-red-500'}`}>
                        {roomData.wearable.batteryLevel}%
                      </span>
                    ) : (
                      <span className="font-semibold text-gray-400">N/A</span>
                    )}
                  </div> */}
                </div>
              )}
            </div>

          </div>

          {/* CỘT GIỮA: LIVE CAMERA STREAM */}
          <div className="flex min-h-[500px] flex-col overflow-hidden rounded-3xl bg-black shadow-sm">
            <div className="relative flex flex-1 items-center justify-center bg-neutral-900">
              
              {!roomData?.camera?.deviceId ? (
                <div className="text-white/60">Không tìm thấy Camera trong phòng này</div>
              ) : streamLoading ? (
                <div className="flex flex-col items-center text-white/80">
                  <RefreshCw className="mb-4 h-8 w-8 animate-spin text-blue-500" />
                  <p>Đang kết nối Camera {roomData.camera.deviceId}...</p>
                </div>
              ) : streamError ? (
                <div className="flex flex-col items-center text-red-500">
                  <AlertTriangle className="mb-4 h-10 w-10" />
                  <p className="font-medium">{streamError}</p>
                </div>
              ) : (
                <>
                  <LiveCameraStream session={streamSession} />
                  <div className="absolute left-6 top-6 flex items-center gap-2 rounded-2xl bg-[#111827]/90 px-4 py-2.5 text-[15px] font-semibold text-white backdrop-blur-sm">
                    <span className="h-2 w-2 animate-ping rounded-full bg-red-500" />
                    🔴 Live
                  </div>
                </>
              )}

              <div className="absolute bottom-6 left-6 flex items-center gap-2 rounded-xl bg-black/70 px-4 py-2 text-[13px] text-white/90 backdrop-blur-sm">
                <HardDrive className="h-4 w-4 text-sky-400" />
                Lưu trữ Video: Hệ thống bảo mật
              </div>
            </div>
          </div>

          {/* CỘT PHẢI: MODULE KHÁC */}
          <div></div>

        </div>
      </main>
    </div>
  );
}