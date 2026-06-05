import { useState } from "react";
import {
  Bell,
  AlertTriangle,
  HeartPulse,
  WifiOff,
  Pill,
  CheckCircle,
} from "lucide-react";

export default function NotificationPage() {
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: "fall",
      title: "Fall Detection Alert",
      message:
        "Resident Nguyen Van A may have fallen in Room 203.",
      time: "2 minutes ago",
      read: false,
    },
    {
      id: 2,
      type: "heart",
      title: "Abnormal Heart Rate",
      message:
        "Heart rate exceeded safe threshold.",
      time: "10 minutes ago",
      read: false,
    },
    {
      id: 3,
      type: "medicine",
      title: "Medication Reminder",
      message:
        "Time to take blood pressure medication.",
      time: "30 minutes ago",
      read: true,
    },
    {
      id: 4,
      type: "device",
      title: "Device Offline",
      message:
        "Bedroom Sensor #02 lost connection.",
      time: "1 hour ago",
      read: true,
    },
  ]);

  const markAsRead = (id) => {
    setNotifications((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, read: true }
          : item
      )
    );
  };

  const markAllRead = () => {
    setNotifications((prev) =>
      prev.map((item) => ({
        ...item,
        read: true,
      }))
    );
  };

  const unreadCount = notifications.filter(
    (item) => !item.read
  ).length;

  const getIcon = (type) => {
    switch (type) {
      case "fall":
        return (
          <AlertTriangle className="h-6 w-6 text-red-500" />
        );

      case "heart":
        return (
          <HeartPulse className="h-6 w-6 text-pink-500" />
        );

      case "device":
        return (
          <WifiOff className="h-6 w-6 text-orange-500" />
        );

      case "medicine":
        return (
          <Pill className="h-6 w-6 text-blue-500" />
        );

      default:
        return (
          <Bell className="h-6 w-6 text-gray-500" />
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 px-6 py-8">
      <div className="mx-auto max-w-5xl">
        {/* HEADER */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-gray-900">
              Thông báo
            </h1>

            <p className="mt-3 text-xl text-gray-500">
              Theo dõi cảnh báo hệ thống và hoạt động của cư dân
            </p>
          </div>

          <button
            onClick={markAllRead}
            className="rounded-xl bg-blue-700 px-5 py-3 font-medium text-white hover:bg-blue-800"
          >
            Đánh dấu tất cả đã đọc
          </button>
        </div>

        {/* SUMMARY */}
        <div className="mb-6 rounded-2xl bg-white p-6 shadow">
          <div className="flex items-center gap-3">
            <Bell className="h-8 w-8 text-blue-700" />

            <div>
              <h2 className="text-xl font-semibold">
                {unreadCount} Unread Notifications
              </h2>

              <p className="text-gray-500">
                Stay updated with resident health
                and device status.
              </p>
            </div>
          </div>
        </div>

        {/* LIST */}
        <div className="space-y-4">
          {notifications.map((item) => (
            <div
              key={item.id}
              className={`rounded-2xl border bg-white p-5 shadow-sm transition hover:shadow-md ${
                !item.read
                  ? "border-blue-300"
                  : "border-gray-200"
              }`}
            >
              <div className="flex items-start gap-4">
                {getIcon(item.type)}

                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold">
                      {item.title}
                    </h3>

                    <span className="text-sm text-gray-500">
                      {item.time}
                    </span>
                  </div>

                  <p className="mt-2 text-gray-600">
                    {item.message}
                  </p>

                  {!item.read && (
                    <button
                      onClick={() =>
                        markAsRead(item.id)
                      }
                      className="mt-4 flex items-center gap-2 text-sm font-medium text-blue-700 hover:underline"
                    >
                      <CheckCircle className="h-4 w-4" />
                      Đã đọc
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}