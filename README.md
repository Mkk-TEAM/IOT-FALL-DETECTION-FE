# IoT Fall Detection Frontend

Frontend React + Vite cho hệ thống phát hiện té ngã. Trang `live-monitor`
đã được nối sang MJPEG stream thật từ edge gateway.

## Cài đặt

```bash
npm install
```

## Cấu hình

Copy `.env.example` thành `.env.local` hoặc export biến môi trường trước khi
chạy:

```env
VITE_API_BASE_URL=http://192.168.1.10:3000/api/v1
VITE_GATEWAY_ID=gw_001
VITE_EDGE_STREAM_URL=http://192.168.1.10:8081/stream.mjpg
VITE_EDGE_HEALTH_URL=http://192.168.1.10:8081/health
VITE_EDGE_SNAPSHOT_URL=http://192.168.1.10:8081/snapshot.jpg
```

- `VITE_GATEWAY_ID`: frontend gọi backend `GET /api/v1/streams/:gatewayId` để
  lấy stream URL thật từ `gateway.ipAddress`.
- `VITE_EDGE_STREAM_URL`: bỏ qua backend discovery và mở MJPEG trực tiếp.

## Chạy dev server

```bash
npm run dev -- --host 0.0.0.0
```

Truy cập từ máy khác trong LAN:

```text
http://<FRONTEND_HOST_IP>:5173
```

## Ghi chú hiện trạng

- `live-monitor` dùng MJPEG stream thật từ edge gateway.
- `incident-log`, `notification`, `device-management` và một số health widget
  khác vẫn còn là UI demo nếu chưa nối sang API thật.
