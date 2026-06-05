import {
  CalendarDays,
  ChevronLeft,
  ChevronRight,
  Download,
  Filter,
  CheckCircle2,
} from "lucide-react";

export default function IncidentLogPage() {
  return (
    <div className="min-h-screen bg-[#f5f7fb] text-[#111827]">
      {/* BODY */}
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
            {/* DATE */}
            <div className="rounded-2xl border border-[#dbe1ea] bg-white p-7 shadow-sm">
              <div className="mb-8 flex items-center gap-3">
                <CalendarDays className="h-6 w-6 text-[#4b5563]" />

                <h3 className="text-[20px] font-semibold">Date Range</h3>
              </div>

              <div className="mb-8 flex items-center justify-between">
                <ChevronLeft className="h-5 w-5 text-[#6b7280]" />

                <span className="text-[18px] font-medium">
                  October 2023
                </span>

                <ChevronRight className="h-5 w-5 text-[#6b7280]" />
              </div>

              {/* DAYS */}
              <div className="grid grid-cols-7 gap-y-4 text-center">
                {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map((d) => (
                  <div
                    key={d}
                    className="text-[14px] font-medium text-[#6b7280]"
                  >
                    {d}
                  </div>
                ))}

                {[1, 2, 3, 4, 5, 6, 7].map((n) => (
                  <div
                    key={n}
                    className="text-[17px] text-[#111827]"
                  >
                    {n}
                  </div>
                ))}

                <div className="text-[17px]">8</div>

                <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-[17px] font-medium text-white">
                  9
                </div>

                <div className="text-[17px]">10</div>
              </div>

              <p className="mt-8 text-[16px] text-[#6b7280]">
                Selected:
                <span className="ml-1 font-semibold text-[#111827]">
                  Oct 9, 2023
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
                {[
                  'Fall Detected',
                  'Irregular Heartbeat',
                  'Disconnection',
                ].map((item) => (
                  <label key={item} className="flex items-center gap-4">
                    <input
                      type="checkbox"
                      defaultChecked
                      className="h-5 w-5 accent-blue-600"
                    />

                    {item}
                  </label>
                ))}

                <label className="flex items-center gap-4 text-[#6b7280]">
                  <input type="checkbox" className="h-5 w-5" />
                  Low Battery
                </label>
              </div>
            </div>
          </div>

          {/* TABLE */}
          <div className="overflow-hidden rounded-2xl border border-[#dbe1ea] bg-white shadow-sm">
            {/* HEADER */}
            <div className="grid grid-cols-[110px_120px_120px_180px_110px_1fr] border-b border-[#e5e7eb] bg-[#f8fafc] px-7 py-5 text-[14px] font-bold uppercase tracking-wide text-[#6b7280]">
              <div>Preview</div>
              <div>Time</div>
              <div>Location</div>
              <div>Event Type</div>
              <div>Duration</div>
              <div>Action Taken</div>
            </div>

            {/* ROW 1 */}
            <div className="grid grid-cols-[110px_120px_120px_180px_110px_1fr] items-center border-b border-[#e5e7eb] px-7 py-5">
              <img
                src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=300&auto=format&fit=crop"
                className="h-[54px] w-[70px] rounded-lg object-cover"
              />

              <div>
                <div className="text-[17px] font-semibold">14:32:05</div>
                <div className="mt-1 text-[14px] text-[#6b7280]">
                  Oct 9, 2023
                </div>
              </div>

              <div className="text-[17px] leading-[28px]">
                Living
                <br />
                Room
              </div>

              <div>
                <span className="rounded-lg bg-red-100 px-4 py-2 text-[14px] font-semibold text-red-600">
                  ⚠ Fall Detected
                </span>
              </div>

              <div className="text-[17px]">32s</div>

              <div className="text-[17px] leading-[28px]">
                Dispatched
                <br />
                EMS
              </div>
            </div>

            {/* ROW 2 */}
            <div className="border-b border-[#e5e7eb] bg-[#f8fbff]">
              {/* TOP */}
              <div className="grid grid-cols-[110px_120px_120px_180px_110px_1fr] items-center px-7 py-5">
                <img
                  src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=300&auto=format&fit=crop"
                  className="h-[54px] w-[70px] rounded-lg object-cover"
                />

                <div>
                  <div className="text-[17px] font-semibold">09:15:22</div>
                  <div className="mt-1 text-[14px] text-[#6b7280]">
                    Oct 9, 2023
                  </div>
                </div>

                <div className="text-[17px] leading-[28px]">
                  Hallway
                  <br />
                  Cam 2
                </div>

                <div>
                  <span className="rounded-lg bg-yellow-100 px-4 py-2 text-[14px] font-semibold text-yellow-700">
                    ⌁ Irregular HR
                  </span>
                </div>

                <div className="text-[17px]">1m 15s</div>

                <div className="text-[17px]">Acknowledged</div>
              </div>

              {/* EXPANDED */}
              <div className="border-t border-[#dbe1ea] px-7 py-6">
                <div className="grid grid-cols-[1fr_250px] gap-6">
                  {/* VIDEO */}
                  <div className="overflow-hidden rounded-2xl border-l-4 border-blue-600 bg-black">
                    <div className="relative">
                      <img
                        src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=1200&auto=format&fit=crop"
                        className="h-[350px] w-full object-cover opacity-80"
                      />

                      {/* REC */}
                      <div className="absolute left-5 top-5 rounded-lg bg-black/70 px-4 py-1 text-[13px] font-medium text-white">
                        REC • Hallway Cam 2
                      </div>

                      {/* CONTROLS */}
                      <div className="absolute bottom-0 left-0 right-0 flex items-center justify-between bg-black/60 px-5 py-4 text-white">
                        <div className="flex items-center gap-4">
                          <div className="text-[22px]">❚❚</div>

                          <div className="h-[4px] w-[280px] rounded-full bg-white/30">
                            <div className="h-full w-[35%] rounded-full bg-blue-500" />
                          </div>
                        </div>

                        <div className="text-[14px]">
                          00:10 / 00:30
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* NOTES */}
                  <div>
                    <div className="text-[13px] font-bold uppercase tracking-wide text-[#6b7280]">
                      Event Notes
                    </div>

                    <div className="mt-3 rounded-xl bg-[#f3f4f6] p-5 text-[16px] leading-[30px] text-[#374151]">
                      Patient showed signs of dizziness. Heart rate
                      spiked to 140bpm then dropped rapidly.
                      Caregiver Sarah dispatched to room for immediate
                      check.
                    </div>

                    {/* BOTTOM */}
                    <div className="mt-6 grid grid-cols-2 gap-5">
                      <div>
                        <div className="text-[13px] font-bold uppercase tracking-wide text-[#6b7280]">
                          Resolved By
                        </div>

                        <div className="mt-3 flex items-center gap-3">
                          <img
                            src="https://i.pravatar.cc/80"
                            className="h-10 w-10 rounded-full"
                          />

                          <div className="text-[16px] font-medium leading-[26px]">
                            Sarah
                            <br />
                            Jenkins
                          </div>
                        </div>
                      </div>

                      <div>
                        <div className="text-[13px] font-bold uppercase tracking-wide text-[#6b7280]">
                          Status
                        </div>

                        <div className="mt-3 flex items-center gap-2 text-[16px] font-semibold text-emerald-500">
                          <CheckCircle2 className="h-5 w-5" />
                          Patient Stable
                        </div>
                      </div>
                    </div>

                    {/* BUTTONS */}
                    <div className="mt-7 flex gap-4">
                      <button className="text-[16px] font-semibold text-blue-600">
                        Download Clip
                      </button>

                      <button className="rounded-xl border border-[#d1d5db] bg-white px-5 py-3 text-[16px] font-semibold transition hover:bg-gray-50">
                        Edit Notes
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* ROW 3 */}
            <div className="grid grid-cols-[110px_120px_120px_180px_110px_1fr] items-center border-b border-[#e5e7eb] px-7 py-5">
              <div className="flex h-[54px] w-[70px] items-center justify-center rounded-lg bg-[#1f2937] text-white">
                📷
              </div>

              <div>
                <div className="text-[17px] font-semibold">02:10:00</div>
                <div className="mt-1 text-[14px] text-[#6b7280]">
                  Oct 9, 2023
                </div>
              </div>

              <div className="text-[17px] leading-[28px]">
                Kitchen
                <br />
                Cam
              </div>

              <div>
                <span className="rounded-lg bg-gray-100 px-4 py-2 text-[14px] font-semibold text-gray-600">
                  ⌁ Disconnection
                </span>
              </div>

              <div className="text-[17px]">2m 05s</div>

              <div className="text-[17px] leading-[28px]">
                Auto-
                <br />
                reconnected
              </div>
            </div>

            {/* ROW 4 */}
            <div className="grid grid-cols-[110px_120px_120px_180px_110px_1fr] items-center px-7 py-5">
              <img
                src="https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?q=80&w=300&auto=format&fit=crop"
                className="h-[54px] w-[70px] rounded-lg object-cover"
              />

              <div>
                <div className="text-[17px] font-semibold">23:45:12</div>
                <div className="mt-1 text-[14px] text-[#6b7280]">
                  Oct 8, 2023
                </div>
              </div>

              <div className="text-[17px]">Bedroom</div>

              <div>
                <span className="rounded-lg bg-yellow-100 px-4 py-2 text-[14px] font-semibold text-yellow-700">
                  ⌁ Irregular HR
                </span>
              </div>

              <div className="text-[17px]">45s</div>

              <div className="text-[17px] leading-[28px]">
                Logged, no
                <br />
                action req.
              </div>
            </div>

            {/* FOOTER */}
            <div className="flex items-center justify-between border-t border-[#e5e7eb] px-7 py-5">
              <div className="text-[16px] text-[#6b7280]">
                Showing 1 to 4 of 24 incidents
              </div>

              <div className="flex gap-3">
                <button className="rounded-xl border border-[#e5e7eb] px-5 py-2 text-[#9ca3af]">
                  Prev
                </button>

                <button className="rounded-xl border border-[#e5e7eb] bg-white px-5 py-2 font-medium">
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
