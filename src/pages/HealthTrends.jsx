export default function HealthTrendsPage() {
  const activityData = [4, 4.5, 6, 5.5, 7, 8.2, 6.5];

  return (
    <div className="min-h-screen bg-[#f8fafc] text-gray-900">
      {/* Main */}
      <main className="mx-auto max-w-7xl px-6 py-10">
        {/* Top */}
        <div className="mb-10 flex flex-col justify-between gap-6 lg:flex-row lg:items-center">
          <div>
            <h2 className="text-5xl font-bold tracking-tight text-gray-900">
              Xu hướng Sức khỏe
            </h2>
            <p className="mt-3 text-xl text-gray-500">
              Trực quan hóa dữ liệu sinh trắc học bệnh nhân dài hạn
            </p>
          </div>

          {/* Time Filter */}
          <div className="flex items-center gap-2 rounded-2xl border border-gray-200 bg-white p-2 shadow-sm">
            <button className="rounded-xl px-5 py-2 font-medium text-gray-700 hover:bg-gray-100">
              1W
            </button>

            <button className="rounded-xl bg-blue-600 px-5 py-2 font-medium text-white shadow">
              1M
            </button>

            <button className="rounded-xl px-5 py-2 font-medium text-gray-700 hover:bg-gray-100">
              3M
            </button>

            <button className="rounded-xl px-5 py-2 font-medium text-gray-700 hover:bg-gray-100">
              YTD
            </button>

            <button className="rounded-xl px-5 py-2 font-medium text-gray-700 hover:bg-gray-100">
              📅 Custom
            </button>
          </div>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          {/* Activity Levels */}
          <div className="rounded-3xl bg-white p-8 shadow-sm">
            <div className="mb-8 flex items-start justify-between">
              <div>
                <h3 className="text-3xl font-bold text-gray-900">
                  Cấp độ hoạt động
                </h3>
                <p className="mt-2 text-lg text-gray-500">
                  Số giờ rời khỏi giường mỗi ngày
                </p>
              </div>

              <div className="text-right">
                <div className="text-6xl font-bold text-gray-900">6.5</div>
                <div className="mt-2 text-lg font-medium text-emerald-500">
                  ↗ +5% so với tháng trước
                </div>
              </div>
            </div>

            {/* Bar Chart */}
            <div className="mt-12 flex h-80 items-end justify-between border-b border-gray-200 pb-4">
              {activityData.map((value, index) => {
                const labels = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
                const isToday = index === 5;

                return (
                  <div
                    key={index}
                    className="flex flex-col items-center gap-3"
                  >
                    {isToday && (
                      <div className="rounded-xl bg-gray-900 px-3 py-1 text-sm font-medium text-white shadow">
                        Today: 8.2 hrs
                      </div>
                    )}

                    <div
                      className={`w-12 rounded-t-xl transition-all duration-300 ${
                        isToday ? "bg-blue-600" : "bg-blue-200"
                      }`}
                      style={{ height: `${value * 28}px` }}
                    />

                    <span className="text-base font-medium text-gray-500">
                      {labels[index]}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Heart Rate */}
          <div className="rounded-3xl bg-white p-8 shadow-sm">
            <div className="mb-8 flex items-start justify-between">
              <div>
                <h3 className="text-3xl font-bold text-gray-900">
                  Nhịp tim khi nghỉ ngơi
                </h3>
                <p className="mt-2 text-lg text-gray-500">
                  Trung bình xu hướng trong 30 ngày
                </p>
              </div>

              <div className="text-right">
                <div className="flex items-end gap-2">
                  <span className="text-6xl font-bold text-gray-900">
                    68
                  </span>
                  <span className="mb-2 text-2xl text-gray-500">bpm</span>
                </div>

                <div className="mt-2 text-lg font-medium text-emerald-500">
                  ↘ -2% so với tháng trước
                </div>
              </div>
            </div>

            {/* Fake Chart */}
            <div className="relative mt-10 h-80 overflow-hidden rounded-2xl bg-gradient-to-b from-gray-100 to-gray-50">
              <svg
                viewBox="0 0 500 200"
                className="absolute inset-0 h-full w-full"
                preserveAspectRatio="none"
              >
                <path
                  d="M0,120 C50,100 100,150 150,130 C200,110 250,40 300,90 C350,140 400,180 450,80 C475,40 490,70 500,120 L500,200 L0,200 Z"
                  fill="#dbeafe"
                />

                <path
                  d="M0,120 C50,100 100,150 150,130 C200,110 250,40 300,90 C350,140 400,180 450,80 C475,40 490,70 500,120"
                  fill="none"
                  stroke="#2563eb"
                  strokeWidth="4"
                />
              </svg>

              <div className="absolute right-20 top-16 rounded-xl bg-gray-900 px-3 py-1 text-sm font-medium text-white shadow">
                Oct 24: 71 bpm
              </div>
            </div>
          </div>

          {/* Sleep Quality */}
          <div className="rounded-3xl bg-white p-8 shadow-sm">
            <div className="mb-8 flex items-start justify-between">
              <div>
                <h3 className="text-3xl font-bold text-gray-900">
                  Chất lượng Giấc ngủ
                </h3>
                <p className="mt-2 text-lg text-gray-500">
                  Phân bố trung bình
                </p>
              </div>

              <div className="text-right">
                <div className="flex items-end gap-2">
                  <span className="text-6xl font-bold text-gray-900">
                    7.2
                  </span>
                  <span className="mb-2 text-2xl text-gray-500">hrs</span>
                </div>

                <div className="mt-2 text-lg font-medium text-emerald-500">
                  ↗ +12% so với tháng trước
                </div>
              </div>
            </div>

            <div className="mt-14 flex flex-col items-center justify-center gap-12 lg:flex-row">
              {/* Circle */}
              <div className="relative flex h-56 w-56 items-center justify-center rounded-full border-[18px] border-blue-500 border-r-blue-200">
                <div className="text-center">
                  <div className="text-5xl font-bold text-gray-900">85%</div>
                  <div className="mt-2 text-lg text-gray-500">Efficiency</div>
                </div>
              </div>

              {/* Legend */}
              <div className="space-y-8">
                <div className="flex items-start gap-4">
                  <div className="mt-2 h-4 w-4 rounded-full bg-blue-700" />

                  <div>
                    <div className="text-2xl font-semibold text-gray-900">
                      REM Sleep
                    </div>
                    <div className="text-lg text-gray-500">
                      1.8 hrs (25%)
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="mt-2 h-4 w-4 rounded-full bg-sky-400" />

                  <div>
                    <div className="text-2xl font-semibold text-gray-900">
                      Light Sleep
                    </div>
                    <div className="text-lg text-gray-500">
                      4.7 hrs (65%)
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="mt-2 h-4 w-4 rounded-full bg-gray-300" />

                  <div>
                    <div className="text-2xl font-semibold text-gray-900">
                      Awake
                    </div>
                    <div className="text-lg text-gray-500">
                      0.7 hrs (10%)
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Connect Device */}
          <div className="flex min-h-[500px] items-center justify-center rounded-3xl bg-gradient-to-br from-gray-50 to-gray-100 p-10 shadow-sm">
            <div className="text-center">
              <div className="mx-auto mb-8 flex h-24 w-24 items-center justify-center rounded-full bg-blue-100 text-4xl text-blue-600 shadow-inner">
                ⌚
              </div>

              <h3 className="text-4xl font-bold text-gray-900">
                Kết nối thiết bị đeo
              </h3>

              <p className="mx-auto mt-6 max-w-md text-xl leading-relaxed text-gray-500">
                Ghép nối một chiếc đồng hồ thông minh hoặc dây đeo Compatible để mở khóa các xu hướng chi tiết về HRV và oxy hóa máu.
              </p>

              <button className="mt-10 rounded-2xl bg-blue-600 px-10 py-4 text-xl font-semibold text-white shadow-lg transition hover:bg-blue-700 hover:scale-105">
                Thêm Thiết Bị
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
