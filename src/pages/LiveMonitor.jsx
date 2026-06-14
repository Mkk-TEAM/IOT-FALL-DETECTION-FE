import React, { useState, useEffect, useRef } from "react";
import {
  Wifi, WifiOff, CheckCircle, AlertTriangle,
  PhoneCall, HardDrive, RefreshCw, Cpu,
  Video, PlayCircle, Clock,
} from "lucide-react";
import LiveCameraStream from "../components/LiveCameraStream";
import api from "../api/axiosClient";

const GATEWAY_ID   = "gw_001";
const STREAM_BASE  = `${window.location.protocol}//${window.location.hostname}:8081`;

function useDevices() {
  const [devices, setDevices] = useState([]);
  useEffect(() => {
    api.get("/devices", { params: { gatewayId: GATEWAY_ID } })
      .then((res) => setDevices(res.data.data ?? []))
      .catch(() => {});
  }, []);
  return devices;
}

function useClips() {
  const [clips, setClips] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchClips = () => {
    setLoading(true);
    fetch(`${STREAM_BASE}/clips`)
      .then((r) => r.json())
      .then((d) => setClips(d.clips ?? []))
      .catch(() => setClips([]))
      .finally(() => setLoading(false));
  };

  useEffect(() => { fetchClips(); }, []);
  return { clips, loading, refresh: fetchClips };
}

function fmtSize(bytes) {
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

function fmtMtime(mtime) {
  return new Date(mtime * 1000).toLocaleString("vi-VN", {
    day: "2-digit", month: "2-digit", year: "numeric",
    hour: "2-digit", minute: "2-digit",
  });
}

export default function LiveMonitorPage() {
  const [latestFall, setLatestFall] = useState(null);
  const [loading, setLoading]       = useState(true);
  const [playingClip, setPlayingClip] = useState(null);

  const devices  = useDevices();
  const { clips, loading: clipsLoading, refresh: refreshClips } = useClips();

  const imuDevice    = devices.find((d) => d.deviceType === "IMU");
  const cameraDevice = devices.find((d) => d.deviceType === "CAMERA");
  const gateway      = { gatewayId: GATEWAY_ID, displayName: "Gateway phòng khách" };

  const fetchLatestFall = async () => {
    try {
      const res   = await api.get("/events", { params: { gatewayId: GATEWAY_ID, eventType: "FALL", pageSize: 1 } });
      const items = res.data.data ?? res.data.items ?? [];
      const fall  = items[0] ?? null;
      setLatestFall(fall && Date.now() - new Date(fall.timestamp).getTime() < 5 * 60 * 1000 ? fall : null);
    } catch {
      // ignore
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
          <h2 className="text-[20px] font-semibold text-[#111827]">{gateway.displayName}</h2>
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

        {/* LIVE SECTION */}
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
                    Phát hiện ngã lúc {new Date(latestFall.timestamp).toLocaleTimeString("vi-VN")}
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

            {/* Danh sách thiết bị từ DB */}
            <div className="rounded-3xl border border-[#e5e7eb] bg-white p-6 shadow-sm">
              <div className="mb-4 flex items-center gap-2 text-[16px] font-semibold text-[#111827]">
                <Cpu className="h-5 w-5 text-blue-500" />
                Thiết bị
              </div>
              <div className="space-y-4 text-[15px]">
                <div className="flex items-center justify-between">
                  <span className="text-[#6b7280]">Cảm biến IMU</span>
                  <span className="rounded-lg bg-gray-100 px-2 py-0.5 text-[13px] font-medium">
                    {imuDevice?.displayName ?? "imu_001"}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[#6b7280]">Camera</span>
                  <span className="rounded-lg bg-gray-100 px-2 py-0.5 text-[13px] font-medium">
                    {cameraDevice?.displayName ?? "cam_001"}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[#6b7280]">Gateway</span>
                  <span className="rounded-lg bg-gray-100 px-2 py-0.5 text-[13px] font-medium">
                    {gateway.gatewayId}
                  </span>
                </div>
                {imuDevice && (
                  <div className="mt-2 flex items-center gap-1.5">
                    <span className={`h-2 w-2 rounded-full ${imuDevice.status === "ONLINE" ? "bg-emerald-500" : "bg-rose-500"}`} />
                    <span className="text-[13px] text-[#6b7280]">IMU: {imuDevice.status}</span>
                  </div>
                )}
                {cameraDevice && (
                  <div className="flex items-center gap-1.5">
                    <span className={`h-2 w-2 rounded-full ${cameraDevice.status === "ONLINE" ? "bg-emerald-500" : "bg-rose-500"}`} />
                    <span className="text-[13px] text-[#6b7280]">Camera: {cameraDevice.status}</span>
                  </div>
                )}
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
                {cameraDevice?.displayName ?? "Camera"}
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
                    <span className="rounded-lg bg-red-100 px-2 py-0.5 font-semibold text-red-600">Phát hiện ngã</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#6b7280]">Thời gian</span>
                    <span>{new Date(latestFall.timestamp).toLocaleTimeString("vi-VN")}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#6b7280]">Độ tin cậy</span>
                    <span>{latestFall.confidence != null ? `${Math.round(latestFall.confidence * 100)}%` : "–"}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#6b7280]">Thiết bị</span>
                    <span className="text-right max-w-[140px] truncate">{latestFall.device?.displayName ?? latestFall.deviceId ?? "–"}</span>
                  </div>
                </div>
              ) : (
                <p className="text-[14px] text-[#6b7280]">Không có sự kiện ngã trong 5 phút qua.</p>
              )}
            </div>
          </div>

        </div>

        {/* VIDEO CLIPS SECTION */}
        <div className="px-8 pb-10">
          <div className="rounded-3xl border border-[#e5e7eb] bg-white shadow-sm overflow-hidden">
            {/* Header */}
            <div className="flex items-center justify-between border-b border-[#e5e7eb] px-8 py-5">
              <div className="flex items-center gap-3">
                <Video className="h-6 w-6 text-blue-500" />
                <h3 className="text-[18px] font-semibold text-[#111827]">Video đã lưu</h3>
                {!clipsLoading && (
                  <span className="rounded-full bg-blue-50 px-3 py-0.5 text-[13px] font-medium text-blue-600">
                    {clips.length} clip
                  </span>
                )}
              </div>
              <button
                onClick={refreshClips}
                className="flex items-center gap-2 rounded-xl border border-[#e5e7eb] px-4 py-2 text-[14px] font-medium text-[#4b5563] hover:bg-gray-50"
              >
                <RefreshCw className={`h-4 w-4 ${clipsLoading ? "animate-spin" : ""}`} />
                Làm mới
              </button>
            </div>

            {/* Video player */}
            {playingClip && (
              <div className="border-b border-[#e5e7eb] bg-black">
                <div className="relative">
                  <video
                    src={`${STREAM_BASE}${playingClip.url}`}
                    controls
                    autoPlay
                    className="mx-auto max-h-[420px] w-full"
                    style={{ background: "#000" }}
                  />
                  <button
                    onClick={() => setPlayingClip(null)}
                    className="absolute right-4 top-4 rounded-xl bg-black/60 px-3 py-1.5 text-[13px] font-medium text-white hover:bg-black/80"
                  >
                    ✕ Đóng
                  </button>
                  <div className="absolute bottom-4 left-4 rounded-xl bg-black/60 px-3 py-1.5 text-[13px] text-white">
                    {playingClip.path}
                  </div>
                </div>
              </div>
            )}

            {/* Clip list */}
            {clipsLoading ? (
              <div className="flex items-center justify-center py-16 text-[#6b7280]">
                <RefreshCw className="mr-3 h-5 w-5 animate-spin" />
                Đang tải danh sách video...
              </div>
            ) : clips.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-16 text-[#9ca3af]">
                <Video className="mb-3 h-10 w-10 opacity-40" />
                <p className="text-[16px]">Chưa có video nào được lưu</p>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-0 divide-x divide-y divide-[#e5e7eb] sm:grid-cols-3 lg:grid-cols-4">
                {clips.map((clip) => {
                  const isPlaying = playingClip?.path === clip.path;
                  return (
                    <button
                      key={clip.path}
                      onClick={() => setPlayingClip(isPlaying ? null : clip)}
                      className={`flex flex-col items-start gap-2 p-5 text-left transition hover:bg-blue-50 ${isPlaying ? "bg-blue-50 ring-inset ring-2 ring-blue-400" : ""}`}
                    >
                      <div className="flex w-full items-center justify-between">
                        <PlayCircle className={`h-7 w-7 ${isPlaying ? "text-blue-500" : "text-[#9ca3af]"}`} />
                        <span className="text-[12px] font-medium text-[#9ca3af]">{fmtSize(clip.size)}</span>
                      </div>
                      <div className="w-full truncate text-[14px] font-semibold text-[#111827]">
                        {clip.path.split("/").pop().replace(".mp4", "")}
                      </div>
                      <div className="flex items-center gap-1.5 text-[12px] text-[#6b7280]">
                        <Clock className="h-3.5 w-3.5" />
                        {fmtMtime(clip.mtime)}
                      </div>
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        </div>

      </main>
    </div>
  );
}
