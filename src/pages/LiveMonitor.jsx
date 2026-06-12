import {
  Wifi,
  CheckCircle,
  Heart,
  Wind,
  Activity,
} from "lucide-react";
import LiveCameraStream from "../components/LiveCameraStream";

export default function LiveMonitorPage() {
  return (
    <div className="flex min-h-screen bg-[#f5f7fb]">
      {/* MAIN */}
      <main className="flex-1">
        {/* TOPBAR */}
        <header className="flex h-[78px] items-center justify-between border-b border-[#e5e7eb] bg-white px-10">
          <h2 className="text-[20px] font-semibold text-[#111827]">
            Room 402 - Eleanor Rigby
          </h2>

          <div className="flex items-center gap-8">

            <div className="flex items-center gap-3 text-[18px] text-[#4b5563]">
              <Wifi className="h-5 w-5 text-emerald-500" />
              System Online
            </div>
          </div>
        </header>

        {/* CONTENT */}
        <div className="grid grid-cols-[160px_1fr_240px] gap-8 p-8">
          {/* LEFT INFO */}
          <div className="space-y-6">
            {/* Stable Card */}
            <div className="rounded-3xl bg-[#16c784] p-6 text-white shadow-sm">
              <div className="mb-5 flex justify-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white">
                  <CheckCircle className="h-7 w-7 text-[#16c784]" />
                </div>
              </div>

              <div className="text-center">
                <div className="text-[24px] font-bold">Stable</div>

                <div className="mt-4 text-[17px] leading-[30px] text-white/90">
                  Last alert: 12 hrs ago
                </div>
              </div>
            </div>

            {/* Patient Info */}
            <div className="rounded-3xl border border-[#e5e7eb] bg-white p-6 shadow-sm">
              <div className="flex gap-4">
                <img
                  src="https://i.pravatar.cc/100?img=12"
                  alt="patient"
                  className="h-16 w-16 rounded-full object-cover"
                />

                <div>
                  <h3 className="text-[22px] font-bold leading-[34px] text-[#111827]">
                    Eleanor
                    <br />
                    Rigby
                  </h3>

                  <div className="mt-2 text-[16px] leading-[28px] text-[#6b7280]">
                    Age 82 •
                    <br />
                    Fall Risk:
                    <span className="font-medium text-[#111827]">
                      {" "}
                      High
                    </span>
                  </div>
                </div>
              </div>

              <div className="my-6 border-t border-[#e5e7eb]" />

              <div className="space-y-5 text-[17px]">
                <div className="flex justify-between">
                  <span className="text-[#6b7280]">Device ID</span>
                  <span className="font-medium text-[#111827]">
                    SENS-0824
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="text-[#6b7280]">Camera</span>
                  <span className="font-medium text-[#111827]">
                    CAM-LIVING
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="text-[#6b7280]">Battery</span>
                  <span className="font-semibold text-emerald-500">
                    84%
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* CAMERA */}
          <div className="overflow-hidden rounded-3xl bg-black shadow-sm">
            <div className="relative h-full">
              <LiveCameraStream />

              {/* LIVE */}
              <div className="absolute left-6 top-6 rounded-2xl bg-[#111827]/90 px-5 py-3 text-[18px] font-semibold text-white">
                🔴 Phòng khách - Live
              </div>
            </div>
          </div>

          {/* RIGHT STATUS */}
          <div className="space-y-6">
            {/* Heart */}
            <div className="rounded-3xl border border-[#e5e7eb] bg-white p-6 shadow-sm">
              <div className="mb-5 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Heart className="h-6 w-6 text-pink-500" />

                  <span className="text-[18px] font-semibold text-[#111827]">
                    Heart Rate
                  </span>
                </div>

                <span className="rounded-xl bg-gray-100 px-3 py-1 text-[14px] text-[#6b7280]">
                  Live
                </span>
              </div>

              <div className="flex items-end gap-3">
                <div className="text-[68px] font-bold leading-none text-[#111827]">
                  72
                </div>

                <div className="pb-3 text-[24px] text-[#6b7280]">
                  bpm
                </div>
              </div>

              {/* Wave */}
              <svg
                viewBox="0 0 300 70"
                className="mt-6 h-[70px] w-full"
                fill="none"
              >
                <path
                  d="M0 40 Q 30 55 60 40 T 120 40 T 180 45 T 240 30 T 300 40"
                  stroke="#2563eb"
                  strokeWidth="4"
                  fill="none"
                  strokeLinecap="round"
                />
              </svg>
            </div>

            {/* Respiration */}
            <div className="rounded-3xl border border-[#e5e7eb] bg-white p-6 shadow-sm">
              <div className="mb-5 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Wind className="h-6 w-6 text-sky-500" />

                  <span className="text-[18px] font-semibold text-[#111827]">
                    Respiration
                  </span>
                </div>

                <span className="rounded-xl bg-gray-100 px-3 py-1 text-[14px] text-[#6b7280]">
                  Live
                </span>
              </div>

              <div className="flex items-end gap-3">
                <div className="text-[68px] font-bold leading-none text-[#111827]">
                  16
                </div>

                <div className="pb-3 text-[24px] text-[#6b7280]">
                  rpm
                </div>
              </div>

              <svg
                viewBox="0 0 300 70"
                className="mt-6 h-[70px] w-full"
                fill="none"
              >
                <path
                  d="M0 45 Q 50 20 100 45 T 200 45 T 300 35"
                  stroke="#0ea5e9"
                  strokeWidth="4"
                  fill="none"
                  strokeLinecap="round"
                />
              </svg>
            </div>

            {/* Activity */}
            <div className="rounded-3xl border border-[#e5e7eb] bg-white p-6 shadow-sm">
              <div className="flex items-center gap-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#eef4ff]">
                  <Activity className="h-7 w-7 text-blue-600" />
                </div>

                <div className="flex-1">
                  <div className="text-[18px] font-semibold text-[#111827]">
                    Activity
                  </div>

                  <div className="text-[15px] text-[#6b7280]">
                    Resting in Chair
                  </div>
                </div>

                <div className="text-[24px] font-bold text-[#111827]">
                  Low
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
