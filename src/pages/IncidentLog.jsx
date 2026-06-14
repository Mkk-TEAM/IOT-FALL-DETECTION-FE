import { useState, useEffect, useCallback } from "react";
import {
  CalendarDays,
  ChevronLeft,
  ChevronRight,
  Filter,
  RefreshCw,
} from "lucide-react";
import eventApi from "../api/eventApi";

const TYPE_META = {
  FALL:         { label: "Phát hiện ngã",  cls: "bg-red-100 text-red-600",      icon: "⚠" },
  INACTIVITY:   { label: "Không vận động", cls: "bg-yellow-100 text-yellow-700", icon: "⌁" },
  DISCONNECT:   { label: "Mất kết nối",    cls: "bg-gray-100 text-gray-600",     icon: "⌁" },
  OUT_OF_RANGE: { label: "Ngoài phạm vi",  cls: "bg-purple-100 text-purple-600", icon: "⌁" },
  LOW_BATTERY:  { label: "Pin yếu",        cls: "bg-orange-100 text-orange-600", icon: "🔋" },
};

const FILTER_ITEMS = [
  { type: "FALL",         label: "Phát hiện ngã" },
  { type: "INACTIVITY",   label: "Không vận động" },
  { type: "DISCONNECT",   label: "Mất kết nối" },
  { type: "OUT_OF_RANGE", label: "Ngoài phạm vi" },
  { type: "LOW_BATTERY",  label: "Pin yếu" },
];

const PAGE_SIZE = 10;

function fmtTime(ts) {
  return new Date(ts).toLocaleTimeString("vi-VN", {
    hour: "2-digit", minute: "2-digit", second: "2-digit",
  });
}

function fmtDate(ts) {
  return new Date(ts).toLocaleDateString("vi-VN", {
    day: "2-digit", month: "short", year: "numeric",
  });
}

export default function IncidentLogPage() {
  const [events, setEvents]   = useState([]);
  const [meta, setMeta]       = useState({ page: 1, pageSize: PAGE_SIZE, total: 0 });
  const [page, setPage]       = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState(null);

  const [activeType, setActiveType] = useState("");

  const [selectedDay, setSelectedDay] = useState(null);
  const [currentDate, setCurrentDate] = useState(new Date());
  const currentYear  = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth();

  const fetchEvents = useCallback(async (p, typeFilter, dayFilter) => {
    setLoading(true);
    setError(null);
    try {
      const params = { page: p, pageSize: PAGE_SIZE };
      if (typeFilter) params.eventType = typeFilter;
      if (dayFilter) {
        params.from = new Date(currentYear, currentMonth, dayFilter, 0, 0, 0, 0).toISOString();
        params.to   = new Date(currentYear, currentMonth, dayFilter, 23, 59, 59, 999).toISOString();
      }
      const res = await eventApi.getEvents(params);
      setEvents(res.data.data ?? res.data.items ?? []);
      setMeta(res.data.meta ?? { page: p, pageSize: PAGE_SIZE, total: 0 });
    } catch (e) {
      setError(e.response?.data?.message ?? "Không thể tải dữ liệu. Vui lòng thử lại.");
    } finally {
      setLoading(false);
    }
  }, [currentYear, currentMonth]);

  useEffect(() => {
    fetchEvents(page, activeType, selectedDay);
  }, [page, activeType, selectedDay, fetchEvents]);

  const toggleType = (type) => {
    setActiveType((prev) => (prev === type ? "" : type));
    setPage(1);
  };

  const handleDayClick = (day) => {
    setSelectedDay((prev) => (prev === day ? null : day));
    setPage(1);
  };

  const totalPages = Math.ceil(meta.total / PAGE_SIZE) || 1;
  const startItem  = meta.total === 0 ? 0 : (page - 1) * PAGE_SIZE + 1;
  const endItem    = Math.min(page * PAGE_SIZE, meta.total);

  const [showJumpInput, setShowJumpInput] = useState(false);
  const [jumpPage, setJumpPage]           = useState("");

  const handleJumpPage = () => {
    const target = Number(jumpPage);
    if (target >= 1 && target <= totalPages) setPage(target);
    setShowJumpInput(false);
    setJumpPage("");
  };

  const firstDay    = new Date(currentYear, currentMonth, 1).getDay();
  const totalDays   = new Date(currentYear, currentMonth + 1, 0).getDate();
  const calendarDays = [
    ...Array(firstDay).fill(null),
    ...Array.from({ length: totalDays }, (_, i) => i + 1),
  ];

  const changeMonth = (direction) => {
    setCurrentDate((prev) => new Date(prev.getFullYear(), prev.getMonth() + direction, 1));
    setSelectedDay(null);
    setPage(1);
  };

  return (
    <div className="min-h-screen bg-[#f5f7fb] text-[#111827]">
      <main className="mx-auto max-w-[1280px] px-10 py-10">
        {/* TOP */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold tracking-tight text-gray-900">Nhật ký sự cố</h2>
          <p className="mt-2 text-base text-gray-500">Xem lại các cảnh báo và sự kiện hệ thống</p>
        </div>

        {/* CONTENT */}
        <div className="grid grid-cols-[320px_1fr] gap-8">

          {/* SIDEBAR */}
          <div className="space-y-7">
            {/* DATE CARD */}
            <div className="rounded-2xl border border-[#dbe1ea] bg-white p-7 shadow-sm">
              <div className="mb-6 flex items-center gap-3">
                <CalendarDays className="h-6 w-6 text-[#4b5563]" />
                <h3 className="text-[20px] font-semibold">Lọc theo ngày</h3>
              </div>

              <div className="mb-6 flex items-center justify-between">
                <ChevronLeft
                  onClick={() => changeMonth(-1)}
                  className="h-5 w-5 cursor-pointer text-[#6b7280]"
                />
                <span className="text-[18px] font-semibold">
                  {new Date(currentYear, currentMonth).toLocaleString("vi-VN", {
                    month: "long", year: "numeric",
                  })}
                </span>
                <ChevronRight
                  onClick={() => changeMonth(1)}
                  className="h-5 w-5 cursor-pointer text-[#6b7280]"
                />
              </div>

              <div className="grid grid-cols-7 gap-2 mb-3 text-center">
                {["Su","Mo","Tu","We","Th","Fr","Sa"].map((d) => (
                  <div key={d} className="text-sm font-semibold text-gray-500">{d}</div>
                ))}
              </div>

              <div className="grid grid-cols-7 gap-2">
                {calendarDays.map((day, index) => {
                  if (!day) return <div key={index} className="h-12" />;
                  const today       = new Date();
                  const isToday     = day === today.getDate() && currentMonth === today.getMonth() && currentYear === today.getFullYear();
                  const isSelected  = selectedDay === day;
                  const hasIncident = events.some((item) => {
                    const d = new Date(item.timestamp);
                    return d.getDate() === day && d.getMonth() === currentMonth && d.getFullYear() === currentYear;
                  });
                  return (
                    <button
                      key={day}
                      onClick={() => handleDayClick(day)}
                      className={`relative flex h-12 w-12 items-center justify-center rounded-xl transition-all
                        ${isSelected ? "bg-blue-600 text-white shadow-lg" : ""}
                        ${isToday && !isSelected ? "border-2 border-blue-600 font-bold" : ""}
                        ${!isSelected ? "hover:bg-gray-100" : ""}`}
                    >
                      {day}
                      {hasIncident && (
                        <span className={`absolute bottom-1 h-1.5 w-1.5 rounded-full ${isSelected ? "bg-white" : "bg-blue-600"}`} />
                      )}
                    </button>
                  );
                })}
              </div>

              <div className="mt-6 rounded-xl bg-gray-50 p-3">
                <p className="text-sm text-gray-600">Đang hiển thị:</p>
                <p className="mt-1 font-semibold text-gray-900">
                  {selectedDay ? `${selectedDay}/${currentMonth + 1}/${currentYear}` : "Tất cả sự kiện"}
                </p>
              </div>
            </div>

            {/* FILTER */}
            <div className="rounded-2xl border border-[#dbe1ea] bg-white p-7 shadow-sm">
              <div className="mb-8 flex items-center gap-3">
                <Filter className="h-5 w-5 text-[#4b5563]" />
                <h3 className="text-[20px] font-semibold">Loại sự kiện</h3>
              </div>
              <div className="space-y-5 text-[17px]">
                <label className="flex cursor-pointer items-center gap-4">
                  <input type="radio" name="eventType" checked={activeType === ""} onChange={() => { setActiveType(""); setPage(1); }} className="h-5 w-5 accent-blue-600" />
                  Tất cả
                </label>
                {FILTER_ITEMS.map(({ type, label }) => (
                  <label key={type} className="flex cursor-pointer items-center gap-4">
                    <input type="radio" name="eventType" checked={activeType === type} onChange={() => toggleType(type)} className="h-5 w-5 accent-blue-600" />
                    {label}
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* TABLE */}
          <div className="flex flex-col overflow-hidden rounded-2xl border border-[#dbe1ea] bg-white shadow-sm">
            {/* HEADER */}
            <div className="grid grid-cols-[180px_1fr_140px] border-b border-[#e5e7eb] bg-[#f8fafc] px-7 py-5 text-[14px] font-bold uppercase tracking-wide text-[#6b7280]">
              <div>Thời gian</div>
              <div>Sự kiện</div>
              <div>Độ tin cậy</div>
            </div>

            {/* LOADING */}
            {loading && (
              <div className="flex items-center justify-center py-20 text-[#6b7280]">
                <RefreshCw className="mr-3 h-6 w-6 animate-spin" />
                <span className="text-[17px]">Đang tải...</span>
              </div>
            )}

            {/* ERROR */}
            {!loading && error && (
              <div className="px-7 py-16 text-center">
                <p className="text-[17px] text-red-500">{error}</p>
                <button
                  onClick={() => fetchEvents(page, activeType, selectedDay)}
                  className="mt-4 rounded-xl border border-[#d1d5db] px-6 py-3 text-[16px] font-semibold hover:bg-gray-50"
                >
                  Thử lại
                </button>
              </div>
            )}

            {/* EMPTY */}
            {!loading && !error && events.length === 0 && (
              <div className="px-7 py-16 text-center text-[17px] text-[#6b7280]">
                Không có sự kiện nào
              </div>
            )}

            {/* ROWS */}
            {!loading && !error && (
              <div className="flex-1 overflow-y-auto">
                {events.map((event, idx) => {
                  const typeMeta = TYPE_META[event.eventType] ?? {
                    label: event.eventType,
                    cls: "bg-gray-100 text-gray-600",
                    icon: "•",
                  };
                  const isLast = idx === events.length - 1;
                  return (
                    <div
                      key={event.eventId}
                      className={`grid grid-cols-[180px_1fr_140px] items-center px-7 py-5 ${!isLast ? "border-b border-[#e5e7eb]" : ""}`}
                    >
                      <div>
                        <div className="text-[17px] font-semibold text-[#111827]">{fmtTime(event.timestamp)}</div>
                        <div className="mt-1 text-[14px] text-[#6b7280]">{fmtDate(event.timestamp)}</div>
                        {event.device?.displayName && (
                          <div className="mt-1 text-[13px] text-[#9ca3af]">{event.device.displayName}</div>
                        )}
                      </div>

                      <div>
                        <span className={`inline-flex rounded-lg px-4 py-2 text-[14px] font-semibold ${typeMeta.cls}`}>
                          {typeMeta.icon} {typeMeta.label}
                        </span>
                        {event.message && (
                          <div className="mt-1.5 text-[13px] text-[#6b7280] leading-snug max-w-sm truncate">{event.message}</div>
                        )}
                      </div>

                      <div className="text-[17px] font-medium text-[#4b5563]">
                        {event.confidence != null ? `${Math.round(event.confidence * 100)}%` : "–"}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {/* FOOTER */}
            <div className="flex items-center justify-between border-t border-[#e5e7eb] bg-white px-7 py-5 mt-auto">
              <div className="text-[16px] text-[#6b7280]">
                {meta.total === 0 ? "Không có sự kiện nào" : `${startItem}–${endItem} / ${meta.total} sự kiện`}
              </div>

              <div className="flex items-center gap-2">
                <button onClick={() => setPage((p) => Math.max(p - 1, 1))} disabled={page === 1} className="rounded-lg border px-4 py-2 disabled:opacity-40">
                  Trước
                </button>

                <div className="flex items-center gap-2">
                  {totalPages <= 5 ? (
                    Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
                      <button key={n} onClick={() => setPage(n)} className={`flex h-10 w-10 items-center justify-center rounded-xl font-medium transition ${page === n ? "bg-[#ff6b4a] text-white" : "hover:bg-gray-100"}`}>{n}</button>
                    ))
                  ) : (
                    <>
                      {[1, 2, 3].map((n) => (
                        <button key={n} onClick={() => setPage(n)} className={`flex h-10 w-10 items-center justify-center rounded-xl ${page === n ? "bg-[#ff6b4a] text-white" : "hover:bg-gray-100"}`}>{n}</button>
                      ))}
                      {!showJumpInput ? (
                        <button onClick={() => setShowJumpInput(true)} className="flex h-10 w-10 items-center justify-center rounded-xl font-bold hover:bg-gray-100">...</button>
                      ) : (
                        <input autoFocus type="number" min={1} max={totalPages} value={jumpPage} onChange={(e) => setJumpPage(e.target.value)} onBlur={handleJumpPage} onKeyDown={(e) => e.key === "Enter" && handleJumpPage()} className="h-10 w-16 rounded-lg border text-center outline-none" />
                      )}
                      <button onClick={() => setPage(totalPages)} className={`flex h-10 w-10 items-center justify-center rounded-xl ${page === totalPages ? "bg-[#ff6b4a] text-white" : "hover:bg-gray-100"}`}>{totalPages}</button>
                    </>
                  )}
                </div>

                <button onClick={() => setPage((p) => Math.min(p + 1, totalPages))} disabled={page === totalPages} className="rounded-lg border px-4 py-2 disabled:opacity-40">
                  Sau
                </button>
              </div>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}
