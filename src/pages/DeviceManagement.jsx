import { useState, useEffect } from "react";
import {
  Camera,
  Watch,
  Activity,
  Cpu,
  Wifi,
  WifiOff,
  RotateCcw,
  Plus,
  Battery,
  Layers,
  MapPin,
  Loader2,
} from "lucide-react";
import { deviceApi } from "../api/deviceApi";

export default function DeviceManagementPage() {
  const [devices, setDevices] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  
  // State phân trang & bộ lọc đồng bộ hóa với FE/BE query params
  const [meta, setMeta] = useState({ page: 1, pageSize: 10, total: 0 });
  const [filterType, setFilterType] = useState("");
  const [filterStatus, setFilterStatus] = useState("");

  // Hàm fetch dữ liệu tích hợp đa luồng: Lấy danh sách thiết bị + đối chiếu log mạng mới nhất
  const fetchDeviceData = async (targetPage = meta.page) => {
    try {
      setLoading(true);
      setError("");

      // 1. Gọi API lấy danh sách thiết bị (Khớp hàm DeviceService.list)
      const deviceParams = {
        page: targetPage,
        pageSize: meta.pageSize,
        ...(filterType && { type: filterType }),
        ...(filterStatus && { status: filterStatus }),
      };
      const deviceRes = await deviceApi.getDevices(deviceParams);
      const deviceData = deviceRes?.data?.data || deviceRes?.data;

      if (deviceData && deviceData.items) {
        let fetchedItems = deviceData.items;

        try {
          // 2. Gọi API lấy gói log trạng thái mới nhất để map chỉ số mạng (RSSI) 
          // Khớp hàm DeviceStatusLogService.latest
          const logRes = await deviceApi.getLatestStatusLogs();
          const latestLogs = logRes?.data?.data || logRes?.data || [];

          // Map RSSI (signalStrength) từ bảng log vào danh sách thiết bị hiển thị
          fetchedItems = fetchedItems.map((device) => {
            const matchLog = latestLogs.find((l) => l.deviceId === device.deviceId);
            return {
              ...device,
              signalStrength: matchLog ? matchLog.signalStrength : null,
              statusMessage: matchLog ? matchLog.statusMessage : "",
            };
          });
        } catch (logErr) {
          console.warn("Không thể tải thông tin tín hiệu mạng chi tiết:", logErr);
        }

        setDevices(fetchedItems);
        setMeta(deviceData.meta);
      }
    } catch (err) {
      console.error(err);
      setError("Không thể đồng bộ danh sách thiết bị phần cứng.");
    } finally {
      setLoading(false);
    }
  };

  // Kích hoạt fetch khi thay đổi bộ lọc hoặc chuyển trang
  useEffect(() => {
    fetchDeviceData(1);
  }, [filterType, filterStatus]);

  // Phân loại Icon dựa trên định dạng ENUM: DEVICE_TYPES của Backend
  const getDeviceIcon = (type) => {
    switch (type) {
      case "CAMERA":
        return <Camera className="h-5 w-5 text-blue-600" />;
      case "WRISTBAND":
      case "WATCH":
        return <Watch className="h-5 w-5 text-indigo-600" />;
      case "IMU":
        return <Activity className="h-5 w-5 text-orange-600" />;
      default:
        return <Cpu className="h-5 w-5 text-slate-600" />;
    }
  };

  // Định dạng hiển thị màu sắc dựa theo ENUM: DEVICE_STATUSES của Backend
  const getStatusStyle = (status) => {
    switch (status) {
      case "ONLINE":
        return "bg-emerald-50 text-emerald-700 border-emerald-200";
      case "OFFLINE":
        return "bg-rose-50 text-rose-700 border-rose-200";
      case "DISABLED":
        return "bg-slate-100 text-slate-600 border-slate-200";
      case "REGISTERED":
      default:
        return "bg-amber-50 text-amber-700 border-amber-200";
    }
  };

  // Tính toán cường độ sóng dựa vào chỉ số signalStrength (RSSI) từ DeviceStatusLog
  const getSignalBadge = (rssi) => {
    if (rssi === null || rssi === undefined) {
      return (
        <span className="flex items-center gap-1.5 text-sm text-slate-400">
          <WifiOff className="h-4 w-4" /> Không rõ
        </span>
      );
    }
    // Cường độ sóng dbm tiêu chuẩn cho thiết bị IoT
    if (rssi >= -60) return <span className="flex items-center gap-1.5 text-sm text-emerald-600 font-medium"><Wifi className="h-4 w-4" /> Tốt ({rssi} dBm)</span>;
    if (rssi >= -80) return <span className="flex items-center gap-1.5 text-sm text-amber-600 font-medium"><Wifi className="h-4 w-4" /> Trung bình ({rssi} dBm)</span>;
    return <span className="flex items-center gap-1.5 text-sm text-rose-500 font-medium"><Wifi className="h-4 w-4" /> Yếu ({rssi} dBm)</span>;
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] px-6 py-10">
      <div className="mx-auto max-w-7xl">
        
        {/* TOP BAR */}
        <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-slate-900">
              Hệ thống Thiết bị Phần cứng
            </h2>
            <p className="mt-2 text-base text-slate-500">
              Giám sát tình trạng kết nối, thời lượng pin và cấu hình cảm biến IoT/Camera trong mạng lưới.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => fetchDeviceData(meta.page)}
              className="inline-flex h-11 items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 font-semibold text-slate-700 shadow-sm hover:bg-slate-50 transition"
            >
              <RotateCcw className="h-4 w-4" /> Làm mới
            </button>
            <button className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 font-semibold text-white shadow-sm hover:bg-blue-700 transition">
              <Plus className="h-4 w-4" /> Thêm Thiết Bị
            </button>
          </div>
        </div>

        {/* CONTROLS & FILTERS */}
        <div className="mb-6 flex flex-wrap items-center gap-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
          <div className="flex items-center gap-2 text-sm font-bold text-slate-700 mr-2">
            <Layers className="h-4 w-4 text-blue-600" />
            <span>Lọc thiết bị:</span>
          </div>
          
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="rounded-xl border border-slate-200 bg-slate-50 p-2.5 text-sm outline-none focus:border-blue-500 focus:bg-white transition"
          >
            <option value="">Tất cả phân loại (Device Type)</option>
            <option value="CAMERA">CAMERA (Camera)</option>
            <option value="IMU">IMU (Cảm biến IMU)</option>
            <option value="GATEWAY">GATEWAY (Cổng kết nối)</option>
          </select>

          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="rounded-xl border border-slate-200 bg-slate-50 p-2.5 text-sm outline-none focus:border-blue-500 focus:bg-white transition"
          >
            <option value="">Tất cả trạng thái</option>
            <option value="ONLINE">ONLINE</option>
            <option value="OFFLINE">OFFLINE</option>
            <option value="REGISTERED">REGISTERED</option>
            <option value="DISABLED">DISABLED</option>
          </select>

          {loading && <Loader2 className="ml-auto h-5 w-5 animate-spin text-blue-600" />}
        </div>

        {error && <div className="mb-6 rounded-xl bg-red-50 border border-red-200 p-4 text-sm text-red-600">{error}</div>}

        {/* DATATABLE */}
        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-left text-sm">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50/70 text-xs font-bold uppercase tracking-wider text-slate-500">
                  <th className="px-6 py-4.5 pl-8">Thiết bị / ID</th>
                  <th className="px-6 py-4.5">Vị trí lắp đặt</th>
                  <th className="px-6 py-4.5">Trạng thái</th>
                  <th className="px-6 py-4.5">Tín hiệu mạng</th>
                  <th className="px-6 py-4.5">Tương tác cuối (Heartbeat)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {devices.length === 0 && !loading ? (
                  <tr>
                    <td colSpan="6" className="py-12 text-center text-slate-400">
                      Không tìm thấy thiết bị nào trong phân quyền quản lý.
                    </td>
                  </tr>
                ) : (
                  devices.map((device) => (
                    <tr key={device.deviceId} className="hover:bg-slate-50/50 transition">
                      
                      {/* Cột Tên & Phân Loại */}
                      <td className="whitespace-nowrap px-6 py-4.5 pl-8">
                        <div className="flex items-center gap-4">
                          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-slate-100 border border-slate-200">
                            {getDeviceIcon(device.deviceType)}
                          </div>
                          <div>
                            <div className="font-semibold text-slate-800">{device.displayName || "Thiết bị không tên"}</div>
                            <div className="text-xs font-mono text-slate-400 mt-0.5">ID: {device.deviceId}</div>
                          </div>
                        </div>
                      </td>

                      {/* Vị trí */}
                      <td className="px-6 py-4.5 text-slate-600 font-medium">
                        <div className="flex items-center gap-1.5 text-slate-700">
                          <MapPin className="h-4 w-4 text-slate-400" />
                          {device.location || <span className="text-slate-400 italic">Chưa định vị</span>}
                        </div>
                        <div className="text-xs text-slate-400 mt-0.5">Gateway: {device.gatewayId}</div>
                      </td>

                      {/* Trạng thái hoạt động */}
                      <td className="whitespace-nowrap px-6 py-4.5">
                        <span className={`inline-flex items-center rounded-lg border px-2.5 py-1 text-xs font-bold tracking-wide ${getStatusStyle(device.status)}`}>
                          ● {device.status}
                        </span>
                      </td>

                      {/* Mức pin */}
                      {/* <td className="whitespace-nowrap px-6 py-4.5">
                        {device.batteryLevel !== null && device.batteryLevel !== undefined ? (
                          <div className="w-24">
                            <div className="flex items-center gap-1.5 font-semibold text-slate-700">
                              <Battery className={`h-4 w-4 ${device.batteryLevel <= 15 ? "text-rose-500 animate-pulse" : "text-emerald-500"}`} />
                              <span>{device.batteryLevel}%</span>
                            </div>
                            <div className="mt-1.5 h-1 w-full rounded-full bg-slate-100 overflow-hidden">
                              <div
                                className={`h-full rounded-full ${device.batteryLevel <= 15 ? "bg-rose-500" : "bg-blue-600"}`}
                                style={{ width: `${device.batteryLevel}%` }}
                              />
                            </div>
                          </div>
                        ) : (
                          <span className="text-slate-400 text-xs italic">Nguồn điện trực tiếp (AC)</span>
                        )}
                      </td> */}

                      {/* Cường độ tín hiệu WiFi/Ble */}
                      <td className="whitespace-nowrap px-6 py-4.5">
                        {getSignalBadge(device.signalStrength)}
                      </td>

                      {/* Tương tác cuối cùng */}
                      <td className="whitespace-nowrap px-6 py-4.5 text-slate-500 text-xs font-medium">
                        {device.lastHeartbeat ? (
                          <div>{new Date(device.lastHeartbeat).toLocaleString("vi-VN")}</div>
                        ) : (
                          <span className="text-slate-400 italic">Mất tín hiệu hoàn toàn</span>
                        )}
                      </td>

                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* PHÂN TRANG */}
          <div className="flex items-center justify-between border-t border-slate-200 bg-white px-6 py-4 text-sm text-slate-500">
            <div>
              Hiển thị <span className="font-semibold text-slate-800">{devices.length}</span> trên tổng số{" "}
              <span className="font-semibold text-slate-800">{meta.total}</span> thiết bị phần cứng.
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => fetchDeviceData(meta.page - 1)}
                disabled={meta.page <= 1 || loading}
                className="inline-flex h-9 items-center justify-center rounded-xl border border-slate-200 bg-white px-4 font-semibold text-slate-700 shadow-sm hover:bg-slate-50 disabled:opacity-40 transition"
              >
                Trước
              </button>
              <button
                onClick={() => fetchDeviceData(meta.page + 1)}
                disabled={meta.page * meta.pageSize >= meta.total || loading}
                className="inline-flex h-9 items-center justify-center rounded-xl border border-slate-200 bg-white px-4 font-semibold text-slate-700 shadow-sm hover:bg-slate-50 disabled:opacity-40 transition"
              >
                Tiếp theo
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}