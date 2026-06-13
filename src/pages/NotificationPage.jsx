import { useState, useEffect } from "react";
import {
  Bell,
  Mail,
  MessageSquare,
  CheckCircle2,
  XCircle,
  AlertCircle,
  RefreshCw,
  ChevronLeft,
  ChevronRight,
  Filter,
} from "lucide-react";
// Giả định bạn đã cấu hình axios instance trong api/notificationApi.js
// Nếu chưa có, bạn tạo file api và export hàm listLogs gọi tới endpoint tương ứng
import { notificationApi } from "../api/notificationApi"; 

export default function NotificationPage() {
  const [logs, setLogs] = useState([]);
  const [meta, setMeta] = useState({ page: 1, pageSize: 10, total: 0 });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Các State phục vụ Bộ lọc (Filters) đúng chuẩn tham số Backend nhận
  const [filters, setFilters] = useState({
    channel: "",         // EMAIL, SMS...
    deliveryStatus: "",  // PENDING, SUCCESS, FAILED
    eventId: "",
  });

  // Hàm gọi API lấy dữ liệu nhật ký từ Backend
  const fetchLogs = async (pageTarget = meta.page) => {
    try {
      setLoading(true);
      setError("");

      // Gộp params phân trang và bộ lọc lọc dữ liệu rỗng
      const params = {
        page: pageTarget,
        pageSize: meta.pageSize,
        ...(filters.channel && { channel: filters.channel }),
        ...(filters.deliveryStatus && { deliveryStatus: filters.deliveryStatus }),
        ...(filters.eventId && { eventId: filters.eventId }),
      };

      const res = await notificationApi.listLogs(params);
      
      // Khớp cấu trúc trả về từ hàm listLogs của BE: { items, meta: { page, pageSize, total } }
      const responseData = res?.data?.data || res?.data; 
      
      if (responseData?.items) {
        setLogs(responseData.items);
        setMeta(responseData.meta);
      }
    } catch (err) {
      console.error("Lỗi tải nhật ký thông báo:", err);
      setError(err?.response?.data?.message || "Không thể tải danh sách nhật ký thông báo.");
    } finally {
      setLoading(false);
    }
  };

  // Tự động gọi lại dữ liệu khi thay đổi trang hoặc bấm áp dụng bộ lọc
  useEffect(() => {
    fetchLogs(1);
  }, [filters]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  // Trả về Icon tương ứng với kênh thông báo (Channel) của Backend
  const getChannelBadge = (channel) => {
    switch (channel) {
      case "EMAIL":
        return (
          <span className="inline-flex items-center gap-1.5 rounded-lg bg-blue-50 px-2.5 py-1 text-xs font-semibold text-blue-700 border border-blue-200">
            <Mail className="h-3.5 w-3.5" /> EMAIL
          </span>
        );
      default: // Cho các kênh SMS, CALL,... mở rộng sau này
        return (
          <span className="inline-flex items-center gap-1.5 rounded-lg bg-purple-50 px-2.5 py-1 text-xs font-semibold text-purple-700 border border-purple-200">
            <MessageSquare className="h-3.5 w-3.5" /> {channel}
          </span>
        );
    }
  };

  // Trả về giao diện nhãn trạng thái (DeliveryStatus) của Backend
  const getStatusBadge = (status) => {
    switch (status) {
      case "SUCCESS":
        return (
          <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-medium text-emerald-700 border border-emerald-200">
            <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" /> Thành công
          </span>
        );
      case "FAILED":
        return (
          <span className="inline-flex items-center gap-1 rounded-full bg-rose-50 px-2.5 py-1 text-xs font-medium text-rose-700 border border-rose-200">
            <XCircle className="h-3.5 w-3.5 text-rose-600" /> Thất bại
          </span>
        );
      case "PENDING":
      default:
        return (
          <span className="inline-flex items-center gap-1 rounded-full bg-amber-50 px-2.5 py-1 text-xs font-medium text-amber-700 border border-amber-200 animate-pulse">
            <AlertCircle className="h-3.5 w-3.5 text-amber-600" /> Đang xử lý
          </span>
        );
    }
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] px-6 py-10">
      <div className="mx-auto max-w-6xl">
        
        {/* HEADER */}
        <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-slate-900 flex items-center gap-3">
              <Bell className="h-8 w-8 text-blue-700" /> Thông báo
            </h1>
            <p className="mt-2 text-base text-slate-500">
              Kiểm tra trạng thái điều phối dữ liệu cảnh báo thiết bị IoT tới người giám hộ và gia đình.
            </p>
          </div>

          <button
            onClick={() => fetchLogs(meta.page)}
            disabled={loading}
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50 disabled:opacity-50"
          >
            <RefreshCw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} /> Tải lại
          </button>
        </div>

        {/* FILTERS PANEL */}
        <div className="mb-6 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-center gap-2 mb-4 font-bold text-slate-800">
            <Filter className="h-4 w-4 text-blue-700" />
            <span>Bộ lọc tìm kiếm</span>
          </div>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            {/* Filter theo Kênh */}
            <div>
              <label className="block text-sm font-medium text-slate-600 mb-1.5">Kênh thông báo</label>
              <select
                name="channel"
                value={filters.channel}
                onChange={handleFilterChange}
                className="w-full rounded-xl border border-slate-200 bg-slate-50 p-3 text-sm outline-none focus:border-blue-500 focus:bg-white transition"
              >
                <option value="">Tất cả các kênh</option>
                <option value="EMAIL">EMAIL</option>
                <option value="SMS">SMS</option>
              </select>
            </div>

            {/* Filter theo Trạng thái chuyển phát */}
            <div>
              <label className="block text-sm font-medium text-slate-600 mb-1.5">Trạng thái gửi</label>
              <select
                name="deliveryStatus"
                value={filters.deliveryStatus}
                onChange={handleFilterChange}
                className="w-full rounded-xl border border-slate-200 bg-slate-50 p-3 text-sm outline-none focus:border-blue-500 focus:bg-white transition"
              >
                <option value="">Tất cả trạng thái</option>
                <option value="PENDING">PENDING (Chờ gửi)</option>
                <option value="SUCCESS">SUCCESS (Thành công)</option>
                <option value="FAILED">FAILED (Thất bại)</option>
              </select>
            </div>

            {/* Filter theo ID Sự kiện */}
            <div>
              <label className="block text-sm font-medium text-slate-600 mb-1.5">Mã sự kiện (Event ID)</label>
              <input
                type="text"
                name="eventId"
                value={filters.eventId}
                placeholder="Nhập mã event để tra cứu..."
                onChange={handleFilterChange}
                className="w-full rounded-xl border border-slate-200 bg-slate-50 p-3 text-sm outline-none focus:border-blue-500 focus:bg-white transition"
              />
            </div>
          </div>
        </div>

        {/* ERROR ERROR */}
        {error && (
          <div className="mb-6 rounded-xl bg-red-50 p-4 border border-red-200 text-sm text-red-600">
            {error}
          </div>
        )}

        {/* DATA TABLE / LIST LOGS */}
        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          {loading && logs.length === 0 ? (
            <div className="py-20 text-center text-slate-500 font-medium"> đang đồng bộ dữ liệu nhật ký...</div>
          ) : logs.length === 0 ? (
            <div className="py-20 text-center text-slate-400">
              <Bell className="mx-auto h-12 w-12 text-slate-300 mb-3" />
              Không tìm thấy nhật ký gửi thông báo nào phù hợp.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-left text-sm">
                <thead>
                  <tr className="border-b border-slate-200 bg-slate-50 text-xs font-bold uppercase tracking-wider text-slate-500">
                    <th className="px-6 py-4">Thời gian</th>
                    <th className="px-6 py-4">Người nhận (Recipient)</th>
                    <th className="px-6 py-4">Kênh gửi</th>
                    <th className="px-6 py-4">Trạng thái</th>
                    <th className="px-6 py-4">Chi tiết / Mã lỗi phản hồi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {logs.map((log) => (
                    <tr key={log.deliveryLogId} className="hover:bg-slate-50/70 transition">
                      {/* Thời gian */}
                      <td className="whitespace-nowrap px-6 py-4.5 text-slate-600">
                        {new Date(log.createdAt).toLocaleString("vi-VN")}
                      </td>

                      {/* Thông tin người nhận */}
                      <td className="px-6 py-4.5">
                        <div className="font-semibold text-slate-800">{log.recipient}</div>
                        <div className="text-xs text-slate-400 mt-0.5">ID: {log.recipientUserId || "N/A"}</div>
                      </td>

                      {/* Kênh */}
                      <td className="whitespace-nowrap px-6 py-4.5">
                        {getChannelBadge(log.channel)}
                      </td>

                      {/* Trạng thái xử lý */}
                      <td className="whitespace-nowrap px-6 py-4.5">
                        {getStatusBadge(log.deliveryStatus)}
                      </td>

                      {/* Chi tiết tin nhắn lỗi hoặc Message ID nhà cung cấp */}
                      <td className="px-6 py-4.5 text-slate-600 max-w-xs truncate">
                        {log.deliveryStatus === "SUCCESS" && (
                          <span className="text-xs font-mono text-slate-500 bg-slate-100 px-1.5 py-0.5 rounded">
                            ID: {log.providerMessageId || "None"}
                          </span>
                        )}
                        {log.deliveryStatus === "FAILED" && (
                          <span className="text-xs text-rose-600 font-medium" title={log.errorMessage}>
                            {log.errorMessage}
                          </span>
                        )}
                        {log.deliveryStatus === "PENDING" && <span className="text-xs text-slate-400">-</span>}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* PAGINATION FOOTER */}
          <div className="flex items-center justify-between border-t border-slate-200 bg-white px-6 py-4 text-sm text-slate-500">
            <div>
              Hiển thị từ <span className="font-semibold text-slate-800">{logs.length}</span> trên tổng số{" "}
              <span className="font-semibold text-slate-800">{meta.total}</span> bản ghi nhật ký.
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => fetchLogs(meta.page - 1)}
                disabled={meta.page <= 1 || loading}
                className="inline-flex h-9 items-center justify-center rounded-xl border border-slate-200 bg-white px-3 text-slate-700 shadow-sm hover:bg-slate-50 disabled:opacity-40"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              
              <span className="inline-flex h-9 items-center justify-center px-3 font-semibold text-slate-800">
                Trang {meta.page}
              </span>

              <button
                onClick={() => fetchLogs(meta.page + 1)}
                disabled={meta.page * meta.pageSize >= meta.total || loading}
                className="inline-flex h-9 items-center justify-center rounded-xl border border-slate-200 bg-white px-3 text-slate-700 shadow-sm hover:bg-slate-50 disabled:opacity-40"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}