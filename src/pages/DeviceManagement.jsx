import {
  Camera,
  Watch,
  Wifi,
  Bluetooth,
  RotateCcw,
  Plus,
  Signal,
  Battery,
} from "lucide-react";

export default function DeviceManagementPage() {
  const devices = [
    {
      name: "Living Room Camera",
      id: "CAM-9021",
      status: "Online",
      battery: "100%",
      batteryType: "AC Power",
      signal: "Excellent",
      firmware: "2.1.0",
      icon: <Camera className="h-6 w-6 text-blue-600" />,
      statusColor: "bg-green-100 text-green-600",
      signalIcon: <Wifi className="h-5 w-5 text-black" />,

    },
    {
      name: "Patient Wristband",
      id: "WB-1104",
      status: "Online",
      battery: "84%",
      batteryType: "",
      signal: "Good",
      firmware: "1.4.2",
      icon: <Watch className="h-6 w-6 text-blue-600" />,
      statusColor: "bg-green-100 text-green-600",
      signalIcon: <Bluetooth className="h-5 w-5 text-black" />,

    },
    {
      name: "Bathroom Fall Sensor",
      id: "FS-4002",
      status: "Offline",
      battery: "12%",
      batteryType: "",
      signal: "Weak",
      firmware: "1.1.0",
      icon: <Signal className="h-6 w-6 text-red-500" />,
      statusColor: "bg-red-100 text-red-500",
      signalIcon: <Wifi className="h-5 w-5 text-red-500" />,

    },
  ];

  return (
    <div className="min-h-screen bg-[#f5f7fb]">
      {/* Main */}
      <main className="mx-auto max-w-7xl px-6 py-10">
        
        {/* Top */}
        <div className="mb-8 flex items-start justify-between">
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-gray-900">
              Các thiết bị đã kết nối
            </h2>

            <p className="mt-3 text-xl text-gray-500">
              Quản lý và giám sát các cảm biến phần cứng và camera.
            </p>
          </div>

          {/* Add Device */}
          <button className="flex items-center gap-2 rounded-2xl bg-blue-600 px-6 py-4 text-lg font-semibold text-white shadow-md transition hover:bg-blue-700">
            <Plus className="h-5 w-5" />
            Thêm Thiết Bị
          </button>
        </div>

        {/* Table */}
        <div className="overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm">
          
          {/* Header */}
          <div className="grid grid-cols-6 border-b border-gray-200 bg-gray-50 px-8 py-5 text-sm font-bold uppercase tracking-wide text-gray-500">
            <div className="col-span-2">Thiết bị</div>
            <div>Trạng thái</div>
            <div>Pin</div>
            <div>Tín hiệu</div>
            <div>
              Firmware
            </div>
          </div>

          {/* Rows */}
          {devices.map((device, index) => (
            <div
              key={index}
              className="grid grid-cols-6 items-center border-b border-gray-100 px-8 py-6 last:border-none"
            >
              
              {/* Device */}
              <div className="col-span-2 flex items-center gap-5">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gray-100">
                  {device.icon}
                </div>

                <div>
                  <h3 className="text-1xl font-semibold text-gray-900">
                    {device.name}
                  </h3>

                  <p className="mt-1 text-lg text-gray-500">
                    ID: {device.id}
                  </p>
                </div>
              </div>

              {/* Status */}
              <div>
                <span
                  className={`rounded-xl px-4 py-2 text-sm font-semibold ${device.statusColor}`}
                >
                  ● {device.status}
                </span>
              </div>

              {/* Battery */}
              <div>
                <div className="flex items-center gap-2">
                  <Battery
                    className={`h-5 w-5 ${
                      device.battery === "12%"
                        ? "text-red-500"
                        : "text-green-500"
                    }`}
                  />

                  <span
                    className={`text-2xl font-semibold ${
                      device.battery === "12%"
                        ? "text-red-500"
                        : "text-gray-900"
                    }`}
                  >
                    {device.battery}
                  </span>
                </div>

                <div className="mt-1 text-gray-500">
                  {device.batteryType}
                </div>

                {/* Battery Bar */}
                <div className="mt-2 h-1.5 w-16 overflow-hidden rounded-full bg-gray-200">
                  <div
                    className={`h-full rounded-full ${
                      device.battery === "12%"
                        ? "bg-red-500"
                        : "bg-blue-600"
                    }`}
                    style={{
                      width: device.battery,
                    }}
                  />
                </div>
              </div>

              {/* Signal */}
              <div className="flex items-center gap-3">
                {device.signalIcon}

                <span
                  className={`text-xl font-medium ${
                    device.signal === "Weak"
                      ? "text-red-500"
                      : "text-gray-900"
                  }`}
                >
                  {device.signal}
                </span>
              </div>

              {/* Firmware + Action */}
              <div className="flex items-center justify-between">
                <span className="text-xl text-gray-500">
                  {device.firmware}
                </span>

                
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}