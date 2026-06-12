import { useState } from "react";
import { AlertCircle, RefreshCw } from "lucide-react";

const STREAM_URL = import.meta.env.VITE_EDGE_STREAM_URL || "";

export default function LiveCameraStream({
  className = "h-full w-full object-cover opacity-80",
}) {
  const [error, setError] = useState(false);
  const [key, setKey] = useState(0);

  const retry = () => {
    setError(false);
    setKey((k) => k + 1);
  };

  if (!STREAM_URL) {
    return (
      <div className="flex h-full w-full flex-col items-center justify-center gap-2 text-white/60">
        <AlertCircle className="h-8 w-8" />
        <span className="text-center text-sm">
          VITE_EDGE_STREAM_URL chưa được cấu hình
        </span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex h-full w-full flex-col items-center justify-center gap-3 text-white">
        <AlertCircle className="h-8 w-8 text-red-400" />
        <span className="text-sm">Không tải được stream</span>
        <button
          onClick={retry}
          className="flex items-center gap-2 rounded-lg bg-white/10 px-3 py-2 text-sm hover:bg-white/20"
        >
          <RefreshCw className="h-4 w-4" />
          Thử lại
        </button>
      </div>
    );
  }

  return (
    <img
      key={key}
      src={STREAM_URL}
      alt="Live MJPEG camera stream"
      className={className}
      onError={() => setError(true)}
    />
  );
}
