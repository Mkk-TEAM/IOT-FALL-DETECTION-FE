import React, { useState, useEffect } from "react";
import {
  Wifi, WifiOff, CheckCircle, AlertTriangle,
  PhoneCall, HardDrive, RefreshCw, Cpu,
} from "lucide-react";
import LiveCameraStream from "../components/LiveCameraStream";
import api from "../api/axiosClient";

// ── Hardcoded device list ─────────────────────────────────────────────────────
const GATEWAY    = { gatewayId: "gw_001",  displayName: "Gateway phòng khách" };
const CAMERA_DEV = { deviceId: "cam_001",  displayName: "Camera phòng khách" };
const IMU_DEV    = { deviceId: "imu_001",  displayName: "Wristband IMU" };

export default function LiveMonitorPage() {
  const [latestFall, setLatestFall] = useState(null);
  const [loading, setLoading]       = useState(true);

  const fetchLatestFall = async () => {
    try {
      const res = await api.get("/events", {
        params: { gatewayId: GATEWAY.gatewayId, eventType: "FALL", pageSize: 1 },
      });
      const items = res.data.data ?? res.data.items ?? [];
      const fall  = items[0] ?? null;
      // Chỉ xét là cảnh báo nếu trong vòng 5 phút gần nhất
      if (fall && Date.now() - new Date(fall.timestamp).getTime() < 5 * 60 * 1000) {
        setLatestFall(fall);
      } else {
        setLatestFall(null);
      }
    } catch (e) {
      console.error("LiveMonitor fetch error:", e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLatestFall();
    const id = setInterval(fetchLatestFall, 10_000);
    return () => clearInterval(id);
  }, []);

  const isAlert = !!latestFall;

  return (
    <div className="flex min-h-screen bg-[#f5f7fb]">
      <main className="flex-1">

        {/* TOPBAR */}
        <header className="flex h-[78px] items-center justify-between border-b border-[#e5e7eb] bg-white px-10">
          <h2 className="text-[20px] font-semibold text-[#111827]">
            {GATEWAY.displayName}
          </h2>
          <div className="flex items-center gap-3 text-[18px]">
            {loading ? (
              <RefreshCw className="h-5 w-5 animate-spin text-gray-400" />
            ) : isAlert ? (
              <>
                <WifiOff className="h-5 w-5 animate-pulse text-red-500" />
                <span className="font-semibold text-red-600">Cảnh báo ngã!</span>
              </>
            ) : (
              <>
                <Wifi className="h-5 w-5 text-emerald-500" />
                <span className="font-semibold text-emerald-600">System Online</span>
              </>
            )}
          </div>
        </header>

        {/* CONTENT */}
        <div className="grid grid-cols-[280px_1fr_300px] gap-8 p-8">

          {/* CỘT TRÁI: trạng thái + thiết bị */}
          <div className="space-y-6">

            {isAlert ? (
              <div className="animate-pulse rounded-3xl bg-red-500 p-6 text-white shadow-lg">
                <div className="mb-4 flex justify-center">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white">
                    <AlertTriangle className="h-7 w-7 text-red-500" />
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-[22px] font-bold uppercase tracking-wide">Cảnh Báo!</div>
                  <div className="mt-2 text-[14px] text-white/90">
                    Phát hiện ngã lúc{" "}
                    {new Date(latestFall.timestamp).toLocaleTimeString("vi-VN")}
                  </div>
                  <div className="mt-4">
                    <button className="flex w-full items-center justify-center gap-2 rounded-xl bg-white py-2.5 text-[15px] font-bold text-red-600 shadow-sm hover:bg-gray-50">
                      <PhoneCall className="h-4 w-4" /> Gọi Cứu Hộ Ngay
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="rounded-3xl bg-[#16c784] p-6 text-white shadow-sm">
                <div className="mb-4 flex justify-center">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white">
                    <CheckCircle className="h-7 w-7 text-[#16c784]" />
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-[24px] font-bold">An Toàn</div>
                  <div className="mt-2 text-[15px] text-white/90">Không phát hiện bất thường</div>
                  <div className="mt-4 border-t border-white/20 pt-3 text-[13px] text-white/80">
                    Cập nhật: {new Date().toLocaleTimeString("vi-VN")}
                  </div>
                </div>
              </div>
            )}

            {/* Danh sách thiết bị (hardcoded) */}
            <div className="rounded-3xl border border-[#e5e7eb] bg-white p-6 shadow-sm">
              <div className="mb-4 flex items-center gap-2 text-[16px] font-semibold text-[#111827]">
                <Cpu className="h-5 w-5 text-blue-500" />
                Thiết bị
              </div>
              <div className="space-y-4 text-[15px]">
                <div className="flex items-center justify-between">
                  <span className="text-[#6b7280]">Cảm biến IMU</span>
                  <span className="rounded-lg bg-gray-100 px-2 py-0.5 text-[13px] font-medium">
                    {IMU_DEV.displayName}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[#6b7280]">Camera</span>
                  <span className="rounded-lg bg-gray-100 px-2 py-0.5 text-[13px] font-medium">
                    {CAMERA_DEV.displayName}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[#6b7280]">Gateway</span>
                  <span className="rounded-lg bg-gray-100 px-2 py-0.5 text-[13px] font-medium">
                    {GATEWAY.gatewayId}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* CỘT GIỮA: LIVE CAMERA */}
          <div className="flex min-h-[500px] flex-col overflow-hidden rounded-3xl bg-black shadow-sm">
            <div className="relative flex flex-1 items-center justify-center bg-neutral-900">
              <LiveCameraStream className="h-full w-full object-cover" />
              <div className="absolute left-6 top-6 flex items-center gap-2 rounded-2xl bg-[#111827]/90 px-4 py-2.5 text-[15px] font-semibold text-white backdrop-blur-sm">
                <span className="h-2 w-2 animate-ping rounded-full bg-red-500" />
                🔴 Live
              </div>
              <div className="absolute bottom-6 left-6 flex items-center gap-2 rounded-xl bg-black/70 px-4 py-2 text-[13px] text-white/90 backdrop-blur-sm">
                <HardDrive className="h-4 w-4 text-sky-400" />
                {CAMERA_DEV.displayName}
              </div>
            </div>
          </div>

          {/* CỘT PHẢI: sự kiện gần nhất */}
          <div className="space-y-6">
            <div className="rounded-3xl border border-[#e5e7eb] bg-white p-6 shadow-sm">
              <div className="mb-4 text-[16px] font-semibold text-[#111827]">Sự kiện gần nhất</div>
              {loading ? (
                <div className="flex justify-center py-4">
                  <RefreshCw className="h-6 w-6 animate-spin text-gray-400" />
                </div>
              ) : latestFall ? (
                <div className="space-y-3 text-[14px]">
                  <div className="flex justify-between">
                    <span className="text-[#6b7280]">Loại</span>
                    <span className="rounded-lg bg-red-100 px-2 py-0.5 font-semibold text-red-600">
                      Phát hiện ngã
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#6b7280]">Thời gian</span>
                    <span>{new Date(latestFall.timestamp).toLocaleTimeString("vi-VN")}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#6b7280]">Độ tin cậy</span>
                    <span>
                      {latestFall.confidence != null
                        ? `${Math.round(latestFall.confidence * 100)}%`
                        : "–"}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#6b7280]">Trạng thái</span>
                    <span>{latestFall.status}</span>
                  </div>
                </div>
              ) : (
                <p className="text-[14px] text-[#6b7280]">
                  Không có sự kiện ngã trong 5 phút qua.
                </p>
              )}
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}