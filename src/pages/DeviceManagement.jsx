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
  MapPin,
  Loader2,
  Trash2,
  X,
  ListRestart
} from "lucide-react";
import { deviceApi } from "../api/deviceApi";

export default function DeviceManagementPage() {
  const [devices, setDevices] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  
  const [meta, setMeta] = useState({ page: 1, pageSize: 10, total: 0 });
  const [filterType, setFilterType] = useState("");
  const [filterStatus, setFilterStatus] = useState("");

  // ================= STATE CHO POPUP THÊM THIẾT BỊ =================
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [addForm, setAddForm] = useState({
    deviceId: "",
    deviceType: "CAMERA",
    gatewayId: "",
    displayName: "",
    location: "",
  });

  // ================= STATE CHO POPUP CHI TIẾT THIẾT BỊ =================
  const [detailModalOpen, setDetailModalOpen] = useState(false);
  const [selectedDevice, setSelectedDevice] = useState(null);
  const [deviceLogs, setDeviceLogs] = useState([]);
  const [loadingLogs, setLoadingLogs] = useState(false);

  // FETCH DỮ LIỆU CHÍNH
  const fetchDeviceData = async (targetPage = meta.page) => {
    try {
      setLoading(true);
      setError("");

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
          const logRes = await deviceApi.getLatestStatusLogs();
          const latestLogs = logRes?.data?.data || logRes?.data || [];

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

  useEffect(() => {
    fetchDeviceData(1);
  }, [filterType, filterStatus]);

  // ================= HANDLER TƯƠNG TÁC =================

  // 1. Thêm thiết bị
  const handleAddSubmit = async (e) => {
    e.preventDefault();
    try {
      setIsSubmitting(true);
      await deviceApi.createDevice(addForm);
      setIsAddModalOpen(false);
      setAddForm({ deviceId: "", deviceType: "CAMERA", gatewayId: "", displayName: "", location: "" });
      fetchDeviceData(1); // Refresh list
    } catch (err) {
      alert(err?.response?.data?.message || "Lỗi khi thêm thiết bị. Vui lòng kiểm tra lại ID/Gateway.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // 2. Xóa thiết bị
  const handleDelete = async (e, device) => {
    e.stopPropagation(); // Ngăn không cho click lan ra thẻ <tr> để không mở popup chi tiết
    
    if (device.status === "ONLINE") {
      alert("Không thể xóa thiết bị đang ONLINE. Hãy vô hiệu hóa hoặc ngắt kết nối trước.");
      return;
    }

    if (window.confirm(`Bạn có chắc chắn muốn xóa thiết bị ${device.deviceId} vĩnh viễn không?`)) {
      try {
        await deviceApi.deleteDevice(device.deviceId);
        fetchDeviceData(); // Refresh list
      } catch (err) {
        alert(err?.response?.data?.message || "Lỗi khi xóa thiết bị.");
      }
    }
  };

  // 3. Xem chi tiết trạng thái (Row Click)
  const handleRowClick = async (device) => {
    setSelectedDevice(device);
    setDetailModalOpen(true);
    try {
      setLoadingLogs(true);
      // Gọi API lấy lịch sử log của riêng device này
      const res = await deviceApi.getDeviceStatusLogs({ deviceId: device.deviceId, pageSize: 10 });
      const logsData = res?.data?.data?.items || res?.data?.items || [];
      setDeviceLogs(logsData);
    } catch (err) {
      console.error("Lỗi tải chi tiết log:", err);
    } finally {
      setLoadingLogs(false);
    }
  };

  // ================= UI HELPERS =================
  const getDeviceIcon = (type) => {
    switch (type) {
      case "CAMERA": return <Camera className="h-5 w-5 text-blue-600" />;
      case "WRISTBAND": case "WATCH": return <Watch className="h-5 w-5 text-indigo-600" />;
      case "FALL_SENSOR": return <Activity className="h-5 w-5 text-orange-600" />;
      default: return <Cpu className="h-5 w-5 text-slate-600" />;
    }
  };

  const getStatusStyle = (status) => {
    switch (status) {
      case "ONLINE": return "bg-emerald-50 text-emerald-700 border-emerald-200";
      case "OFFLINE": return "bg-rose-50 text-rose-700 border-rose-200";
      case "DISABLED": return "bg-slate-100 text-slate-600 border-slate-200";
      case "REGISTERED": default: return "bg-amber-50 text-amber-700 border-amber-200";
    }
  };

  const getSignalBadge = (rssi) => {
    if (rssi === null || rssi === undefined) {
      return (
        <span className="flex items-center gap-1.5 text-sm text-slate-400">
          <WifiOff className="h-4 w-4" /> Không rõ
        </span>
      );
    }
    if (rssi >= -60) return <span className="flex items-center gap-1.5 text-sm font-medium text-emerald-600"><Wifi className="h-4 w-4" /> Tốt ({rssi} dBm)</span>;
    if (rssi >= -80) return <span className="flex items-center gap-1.5 text-sm font-medium text-amber-600"><Wifi className="h-4 w-4" /> Trung bình ({rssi} dBm)</span>;
    return <span className="flex items-center gap-1.5 text-sm font-medium text-rose-500"><Wifi className="h-4 w-4" /> Yếu ({rssi} dBm)</span>;
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] px-6 py-10 relative">
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
              className="inline-flex h-11 items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50"
            >
              <RotateCcw className="h-4 w-4" /> Làm mới
            </button>
            <button 
              onClick={() => setIsAddModalOpen(true)}
              className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 font-semibold text-white shadow-sm transition hover:bg-blue-700"
            >
              <Plus className="h-4 w-4" /> Thêm Thiết Bị
            </button>
          </div>
        </div>

        {/* CONTROLS & FILTERS */}
        <div className="mb-6 flex flex-wrap items-center gap-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="rounded-xl border border-slate-200 bg-slate-50 p-2.5 text-sm transition outline-none focus:border-blue-500 focus:bg-white"
          >
            <option value="">Tất cả phân loại</option>
            <option value="CAMERA">CAMERA</option>
            <option value="WRISTBAND">WRISTBAND (Vòng đeo tay)</option>
            <option value="FALL_SENSOR">FALL_SENSOR (Cảm biến ngã)</option>
          </select>

          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="rounded-xl border border-slate-200 bg-slate-50 p-2.5 text-sm transition outline-none focus:border-blue-500 focus:bg-white"
          >
            <option value="">Tất cả trạng thái</option>
            <option value="ONLINE">ONLINE</option>
            <option value="OFFLINE">OFFLINE</option>
            <option value="REGISTERED">REGISTERED</option>
            <option value="DISABLED">DISABLED</option>
          </select>

          {loading && <Loader2 className="ml-auto h-5 w-5 animate-spin text-blue-600" />}
        </div>

        {error && <div className="mb-6 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-600">{error}</div>}

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
                  <th className="px-6 py-4.5">Hành động</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {devices.length === 0 && !loading ? (
                  <tr>
                    <td colSpan="5" className="py-12 text-center text-slate-400">
                      Không tìm thấy thiết bị nào.
                    </td>
                  </tr>
                ) : (
                  devices.map((device) => (
                    <tr 
                      key={device.deviceId} 
                      onClick={() => handleRowClick(device)}
                      className="cursor-pointer transition hover:bg-slate-50"
                    >
                      <td className="whitespace-nowrap px-6 py-4.5 pl-8">
                        <div className="flex items-center gap-4">
                          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-slate-200 bg-slate-100">
                            {getDeviceIcon(device.deviceType)}
                          </div>
                          <div>
                            <div className="font-semibold text-slate-800">{device.displayName || "Thiết bị không tên"}</div>
                            <div className="mt-0.5 font-mono text-xs text-slate-400">ID: {device.deviceId}</div>
                          </div>
                        </div>
                      </td>

                      <td className="px-6 py-4.5 font-medium text-slate-600">
                        <div className="flex items-center gap-1.5 text-slate-700">
                          <MapPin className="h-4 w-4 text-slate-400" />
                          {device.location || <span className="italic text-slate-400">Chưa định vị</span>}
                        </div>
                        <div className="mt-0.5 text-xs text-slate-400">Gateway: {device.gatewayId}</div>
                      </td>

                      <td className="whitespace-nowrap px-6 py-4.5">
                        <span className={`inline-flex items-center rounded-lg border px-2.5 py-1 text-xs font-bold tracking-wide ${getStatusStyle(device.status)}`}>
                          ● {device.status}
                        </span>
                      </td>

                      <td className="whitespace-nowrap px-6 py-4.5">
                        {getSignalBadge(device.signalStrength)}
                      </td>

                      <td className="whitespace-nowrap px-6 py-4.5">
                        <button
                          onClick={(e) => handleDelete(e, device)}
                          className="flex h-9 w-9 items-center justify-center rounded-lg border border-red-200 bg-red-50 text-red-600 transition hover:bg-red-100 disabled:opacity-50"
                          title="Xóa thiết bị"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
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
          </div>
        </div>

      </div>

      {/* ================= MODAL THÊM THIẾT BỊ ================= */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm">
          <div className="w-full max-w-lg rounded-3xl bg-white p-8 shadow-2xl">
            <div className="mb-6 flex items-center justify-between">
              <h3 className="text-xl font-bold text-slate-800">Thêm Thiết Bị Mới</h3>
              <button onClick={() => setIsAddModalOpen(false)} className="rounded-full p-2 hover:bg-slate-100"><X className="h-5 w-5 text-slate-500" /></button>
            </div>
            
            <form onSubmit={handleAddSubmit} className="space-y-4">
              <div>
                <label className="mb-1 block text-sm font-medium text-slate-700">Mã thiết bị (Device ID) *</label>
                <input required value={addForm.deviceId} onChange={(e) => setAddForm({...addForm, deviceId: e.target.value})} className="w-full rounded-xl border border-slate-300 px-4 py-2.5 outline-none focus:border-blue-600" placeholder="VD: CAM-AI-01" />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-slate-700">Mã Gateway quản lý (Gateway ID) *</label>
                <input required value={addForm.gatewayId} onChange={(e) => setAddForm({...addForm, gatewayId: e.target.value})} className="w-full rounded-xl border border-slate-300 px-4 py-2.5 outline-none focus:border-blue-600" placeholder="VD: GW-ROOM-402" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="mb-1 block text-sm font-medium text-slate-700">Loại thiết bị</label>
                  <select value={addForm.deviceType} onChange={(e) => setAddForm({...addForm, deviceType: e.target.value})} className="w-full rounded-xl border border-slate-300 px-4 py-2.5 outline-none focus:border-blue-600">
                    <option value="CAMERA">CAMERA</option>
                    <option value="WRISTBAND">WRISTBAND</option>
                    <option value="FALL_SENSOR">FALL_SENSOR</option>
                  </select>
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium text-slate-700">Tên hiển thị</label>
                  <input value={addForm.displayName} onChange={(e) => setAddForm({...addForm, displayName: e.target.value})} className="w-full rounded-xl border border-slate-300 px-4 py-2.5 outline-none focus:border-blue-600" placeholder="Camera Phòng Khách" />
                </div>
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-slate-700">Vị trí lắp đặt</label>
                <input value={addForm.location} onChange={(e) => setAddForm({...addForm, location: e.target.value})} className="w-full rounded-xl border border-slate-300 px-4 py-2.5 outline-none focus:border-blue-600" placeholder="Góc tường trái" />
              </div>

              <div className="mt-8 flex justify-end gap-3 pt-4">
                <button type="button" onClick={() => setIsAddModalOpen(false)} className="rounded-xl px-5 py-2.5 font-semibold text-slate-600 hover:bg-slate-100">Hủy</button>
                <button type="submit" disabled={isSubmitting} className="rounded-xl bg-blue-600 px-6 py-2.5 font-semibold text-white shadow-sm hover:bg-blue-700 disabled:opacity-50">
                  {isSubmitting ? "Đang lưu..." : "Xác nhận Thêm"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ================= MODAL CHI TIẾT LOG THIẾT BỊ ================= */}
      {detailModalOpen && selectedDevice && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm p-6">
          <div className="w-full max-w-4xl rounded-3xl bg-white shadow-2xl flex flex-col max-h-[85vh]">
            
            <div className="flex items-center justify-between border-b border-slate-200 px-8 py-5">
              <div>
                <h3 className="text-xl font-bold text-slate-800">Chi tiết trạng thái: {selectedDevice.displayName || selectedDevice.deviceId}</h3>
                <p className="text-sm text-slate-500 mt-1">Lịch sử tín hiệu và thông báo lỗi (10 lượt gần nhất)</p>
              </div>
              <button onClick={() => setDetailModalOpen(false)} className="rounded-full bg-slate-100 p-2 hover:bg-slate-200"><X className="h-5 w-5 text-slate-600" /></button>
            </div>

            <div className="flex-1 overflow-auto p-8 bg-slate-50">
              {loadingLogs ? (
                <div className="flex justify-center py-10"><Loader2 className="h-8 w-8 animate-spin text-blue-500" /></div>
              ) : deviceLogs.length === 0 ? (
                <div className="text-center py-10 text-slate-500">Chưa có lịch sử trạng thái cho thiết bị này.</div>
              ) : (
                <div className="space-y-4">
                  {deviceLogs.map((log) => (
                    <div key={log.statusLogId} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm flex items-start gap-4">
                      <div className="mt-1">
                        <ListRestart className="h-5 w-5 text-indigo-400" />
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between items-center mb-2">
                          <span className={`inline-flex items-center rounded border px-2 py-0.5 text-xs font-bold ${getStatusStyle(log.status)}`}>{log.status}</span>
                          <span className="text-xs font-mono text-slate-400">{new Date(log.recordedAt).toLocaleString("vi-VN")}</span>
                        </div>
                        <p className="text-sm font-medium text-slate-700">{log.statusMessage || "Ghi nhận Ping định kỳ bình thường."}</p>
                        <div className="mt-3 flex gap-4 text-xs text-slate-500">
                          {log.batteryLevel != null && <span>Pin: {log.batteryLevel}%</span>}
                          {log.signalStrength != null && <span>Tín hiệu: {log.signalStrength} dBm</span>}
                          {log.ipAddress && <span>IP: {log.ipAddress}</span>}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
            
          </div>
        </div>
      )}

    </div>
  );
}