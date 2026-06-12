import { useState, useEffect, useCallback } from "react";
import {
  CalendarDays,
  ChevronLeft,
  ChevronRight,
  Download,
  Filter,
  CheckCircle2,
  RefreshCw,
} from "lucide-react";
import api from "../api/axiosClient";

const TYPE_META = {
  FALL:         { label: "Phát hiện ngã",  cls: "bg-red-100 text-red-600",       icon: "⚠" },
  INACTIVITY:   { label: "Không vận động", cls: "bg-yellow-100 text-yellow-700",  icon: "⌁" },
  DISCONNECT:   { label: "Mất kết nối",    cls: "bg-gray-100 text-gray-600",     icon: "⌁" },
  OUT_OF_RANGE: { label: "Ngoài phạm vi",  cls: "bg-purple-100 text-purple-600",  icon: "⌁" },
  LOW_BATTERY:  { label: "Pin yếu",        cls: "bg-orange-100 text-orange-600",  icon: "🔋" },
};

const STATUS_LABEL = {
  UNREAD:         "Chưa xem",
  VIEWED:         "Đã xem",
  CONFIRMED_FALL: "Xác nhận ngã",
  FALSE_ALARM:    "Báo nhầm",
  RESOLVED:       "Đã giải quyết",
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

function PreviewCell({ snapshotUrl }) {
  return (
    <div className="relative h-[54px] w-[70px]">
      {snapshotUrl && (
        <img
          src={snapshotUrl}
          className="h-full w-full rounded-lg object-cover"
          onError={(e) => {
            e.currentTarget.style.display = "none";
            e.currentTarget.nextElementSibling.style.display = "flex";
          }}
        />
      )}
      <div
        className="h-full w-full items-center justify-center rounded-lg bg-[#1f2937] text-[22px] text-white"
        style={{ display: snapshotUrl ? "none" : "flex" }}
      >
        📷
      </div>
    </div>
  );
}

function ExpandedRow({ event, typeMeta, onClose }) {
  return (
    <div className="border-t border-[#dbe1ea] px-7 py-6">
      <div className="grid grid-cols-[1fr_250px] gap-6">
        {/* VIDEO / SNAPSHOT */}
        <div className="overflow-hidden rounded-2xl border-l-4 border-blue-600 bg-black">
          {event.relatedVideoUrl ? (
            <video
              src={event.relatedVideoUrl}
              controls
              className="h-[350px] w-full"
              style={{ background: "#000" }}
            />
          ) : event.snapshotUrl ? (
            <div className="relative">
              <img
                src={event.snapshotUrl}
                className="h-[350px] w-full object-cover opacity-80"
              />
              <div className="absolute left-5 top-5 rounded-lg bg-black/70 px-4 py-1 text-[13px] font-medium text-white">
                {event.device?.displayName ?? "Camera"}
              </div>
            </div>
          ) : (
            <div className="flex h-[350px] items-center justify-center text-[17px] text-[#6b7280]">
              Không có video
            </div>
          )}
        </div>

        {/* NOTES */}
        <div>
          <div className="text-[13px] font-bold uppercase tracking-wide text-[#6b7280]">
            Event Notes
          </div>
          <div className="mt-3 rounded-xl bg-[#f3f4f6] p-5 text-[16px] leading-[30px] text-[#374151]">
            {event.message || "Không có ghi chú."}
          </div>

          <div className="mt-6 grid grid-cols-2 gap-5">
            <div>
              <div className="text-[13px] font-bold uppercase tracking-wide text-[#6b7280]">
                Loại sự kiện
              </div>
              <div className="mt-3">
                <span className={`rounded-lg px-3 py-1 text-[14px] font-semibold ${typeMeta.cls}`}>
                  {typeMeta.label}
                </span>
              </div>
            </div>
            <div>
              <div className="text-[13px] font-bold uppercase tracking-wide text-[#6b7280]">
                Trạng thái
              </div>
              <div className="mt-3 flex items-center gap-2 text-[16px] font-semibold text-emerald-500">
                <CheckCircle2 className="h-5 w-5" />
                {STATUS_LABEL[event.status] ?? event.status}
              </div>
            </div>
          </div>

          <div className="mt-7 flex gap-4">
            {event.relatedVideoUrl && (
              <a
                href={event.relatedVideoUrl}
                download
                className="text-[16px] font-semibold text-blue-600 hover:underline"
              >
                Download Clip
              </a>
            )}
            <button
              onClick={onClose}
              className="rounded-xl border border-[#d1d5db] bg-white px-5 py-3 text-[16px] font-semibold transition hover:bg-gray-50"
            >
              Đóng
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function IncidentLogPage() {
  const [events, setEvents]         = useState([]);
  const [meta, setMeta]             = useState({ page: 1, pageSize: PAGE_SIZE, total: 0 });
  const [page, setPage]             = useState(1);
  const [loading, setLoading]       = useState(true);
  const [error, setError]           = useState(null);
  const [expandedId, setExpandedId] = useState(null);
  const [activeTypes, setActiveTypes] = useState(
    () => new Set(FILTER_ITEMS.map((f) => f.type))
  );

  const fetchEvents = useCallback(async (p) => {
    setLoading(true);
    setError(null);
    try {
      const res = await api.get("/events", {
        params: { page: p, pageSize: PAGE_SIZE },
      });
      setEvents(res.data.data ?? []);
      setMeta(res.data.meta ?? { page: p, pageSize: PAGE_SIZE, total: 0 });
    } catch (e) {
      setError(
        e.response?.data?.message ?? "Không thể tải dữ liệu. Vui lòng thử lại."
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchEvents(page);
  }, [page, fetchEvents]);

  const toggleType = (type) =>
    setActiveTypes((prev) => {
      const next = new Set(prev);
      next.has(type) ? next.delete(type) : next.add(type);
      return next;
    });

  const visible    = events.filter((e) => activeTypes.has(e.eventType));
  const totalPages = Math.ceil(meta.total / PAGE_SIZE) || 1;
  const start      = (page - 1) * PAGE_SIZE + 1;
  const end        = Math.min(page * PAGE_SIZE, meta.total);

  // Calendar helpers (visual-only, shows current month)
  const now          = new Date();
  const monthLabel   = now.toLocaleDateString("en-US", { month: "long", year: "numeric" });
  const todayDate    = now.getDate();
  const calendarDays = Array.from({ length: 10 }, (_, i) => i + 1);

  return (
    <div className="min-h-screen bg-[#f5f7fb] text-[#111827]">
      <main className="mx-auto max-w-[1280px] px-10 py-10">
        {/* TOP */}
        <div className="mb-6 flex items-start justify-between">
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-gray-900">
              Nhật ký sự cố
            </h2>
            <p className="mt-3 text-xl text-gray-500">
              Xem lại các cảnh báo hệ thống và sự kiện y tế trước đây
            </p>
          </div>
          <button className="flex h-[64px] items-center gap-3 rounded-[4px] border border-[#d1d5db] bg-white px-8 text-[18px] font-semibold shadow-sm transition hover:bg-gray-50">
            <Download className="h-5 w-5" />
            Xuất nhật ký
          </button>
        </div>

        {/* CONTENT */}
        <div className="grid grid-cols-[320px_1fr] gap-8">
          {/* SIDEBAR */}
          <div className="space-y-7">
            {/* DATE — visual */}
            <div className="rounded-2xl border border-[#dbe1ea] bg-white p-7 shadow-sm">
              <div className="mb-8 flex items-center gap-3">
                <CalendarDays className="h-6 w-6 text-[#4b5563]" />
                <h3 className="text-[20px] font-semibold">Date Range</h3>
              </div>
              <div className="mb-8 flex items-center justify-between">
                <ChevronLeft className="h-5 w-5 text-[#6b7280]" />
                <span className="text-[18px] font-medium">{monthLabel}</span>
                <ChevronRight className="h-5 w-5 text-[#6b7280]" />
              </div>
              <div className="grid grid-cols-7 gap-y-4 text-center">
                {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((d) => (
                  <div key={d} className="text-[14px] font-medium text-[#6b7280]">
                    {d}
                  </div>
                ))}
                {calendarDays.map((n) =>
                  n === todayDate ? (
                    <div
                      key={n}
                      className="mx-auto flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-[17px] font-medium text-white"
                    >
                      {n}
                    </div>
                  ) : (
                    <div key={n} className="text-[17px] text-[#111827]">
                      {n}
                    </div>
                  )
                )}
              </div>
              <p className="mt-8 text-[16px] text-[#6b7280]">
                Selected:{" "}
                <span className="ml-1 font-semibold text-[#111827]">
                  {now.toLocaleDateString("en-US", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  })}
                </span>
              </p>
            </div>

            {/* FILTER */}
            <div className="rounded-2xl border border-[#dbe1ea] bg-white p-7 shadow-sm">
              <div className="mb-8 flex items-center gap-3">
                <Filter className="h-5 w-5 text-[#4b5563]" />
                <h3 className="text-[20px] font-semibold">Event Type</h3>
              </div>
              <div className="space-y-5 text-[17px]">
                {FILTER_ITEMS.map(({ type, label }) => (
                  <label key={type} className="flex cursor-pointer items-center gap-4">
                    <input
                      type="checkbox"
                      checked={activeTypes.has(type)}
                      onChange={() => toggleType(type)}
                      className="h-5 w-5 accent-blue-600"
                    />
                    {label}
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* TABLE */}
          <div className="overflow-hidden rounded-2xl border border-[#dbe1ea] bg-white shadow-sm">
            {/* HEADER */}
            <div className="grid grid-cols-[110px_120px_150px_180px_110px_1fr] border-b border-[#e5e7eb] bg-[#f8fafc] px-7 py-5 text-[14px] font-bold uppercase tracking-wide text-[#6b7280]">
              <div>Preview</div>
              <div>Time</div>
              <div>Location</div>
              <div>Event Type</div>
              <div>Confidence</div>
              <div>Action Taken</div>
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
                  onClick={() => fetchEvents(page)}
                  className="mt-4 rounded-xl border border-[#d1d5db] px-6 py-3 text-[16px] font-semibold hover:bg-gray-50"
                >
                  Thử lại
                </button>
              </div>
            )}

            {/* EMPTY */}
            {!loading && !error && visible.length === 0 && (
              <div className="px-7 py-16 text-center text-[17px] text-[#6b7280]">
                Không có sự kiện nào
              </div>
            )}

            {/* ROWS */}
            {!loading &&
              !error &&
              visible.map((event, idx) => {
                const typeMeta =
                  TYPE_META[event.eventType] ?? {
                    label: event.eventType,
                    cls: "bg-gray-100 text-gray-600",
                    icon: "•",
                  };
                const isLast     = idx === visible.length - 1;
                const isExpanded = expandedId === event.eventId;

                return (
                  <div
                    key={event.eventId}
                    className={[
                      isExpanded ? "bg-[#f8fbff]" : "",
                      !isLast || isExpanded ? "border-b border-[#e5e7eb]" : "",
                    ].join(" ")}
                  >
                    {/* ROW */}
                    <div
                      className="grid cursor-pointer grid-cols-[110px_120px_150px_180px_110px_1fr] items-center px-7 py-5 hover:bg-[#f0f7ff]"
                      onClick={() =>
                        setExpandedId(isExpanded ? null : event.eventId)
                      }
                    >
                      <PreviewCell snapshotUrl={event.snapshotUrl} />

                      <div>
                        <div className="text-[17px] font-semibold">
                          {fmtTime(event.timestamp)}
                        </div>
                        <div className="mt-1 text-[14px] text-[#6b7280]">
                          {fmtDate(event.timestamp)}
                        </div>
                      </div>

                      <div className="text-[17px]">
                        {event.device?.displayName ?? "–"}
                      </div>

                      <div>
                        <span
                          className={`rounded-lg px-4 py-2 text-[14px] font-semibold ${typeMeta.cls}`}
                        >
                          {typeMeta.icon} {typeMeta.label}
                        </span>
                      </div>

                      <div className="text-[17px]">
                        {event.confidence != null
                          ? `${Math.round(event.confidence * 100)}%`
                          : "–"}
                      </div>

                      <div className="text-[17px]">
                        {STATUS_LABEL[event.status] ?? event.status}
                      </div>
                    </div>

                    {/* EXPANDED */}
                    {isExpanded && (
                      <ExpandedRow
                        event={event}
                        typeMeta={typeMeta}
                        onClose={() => setExpandedId(null)}
                      />
                    )}
                  </div>
                );
              })}

            {/* FOOTER */}
            <div className="flex items-center justify-between border-t border-[#e5e7eb] px-7 py-5">
              <div className="text-[16px] text-[#6b7280]">
                {meta.total > 0
                  ? `Hiển thị ${start} – ${end} trong số ${meta.total} sự kiện`
                  : "Không có sự kiện nào"}
              </div>
              <div className="flex gap-3">
                <button
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  disabled={page <= 1}
                  className="rounded-xl border border-[#e5e7eb] px-5 py-2 text-[#9ca3af] disabled:opacity-50"
                >
                  Prev
                </button>
                <button
                  onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                  disabled={page >= totalPages}
                  className="rounded-xl border border-[#e5e7eb] bg-white px-5 py-2 font-medium disabled:opacity-50"
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
