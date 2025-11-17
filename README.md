# Device Status Dashboard

A full-stack device monitoring dashboard built with Next.js, TypeScript, and Tailwind CSS for managing laboratory devices and viewing test results.

## Features

- **Device Management**: Register, view, and manage laboratory devices
- **Status Monitoring**: Track device status (online/offline) with real-time updates
- **Test Results**: View mock laboratory test results for each device with interactive charts
- **Filtering**: Filter devices by status (online/offline)
- **Responsive Design**: Modern, mobile-friendly UI built with Tailwind CSS
- **Form Validation**: Client and server-side validation using React Hook Form and Zod
- **Authentication**: Basic authentication with login page (demo credentials: admin/admin123)
- **Optimistic Updates**: Instant UI updates when changing device status
- **Data Visualization**: Interactive charts showing test results over time

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Form Handling**: React Hook Form
- **Validation**: Zod
- **State Management**: React Hooks
- **Charts**: Recharts

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm, yarn, pnpm, or bun

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd device-monitor
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

The application will automatically redirect to `/login`. Use the following credentials:
- **Username**: `admin`
- **Password**: `admin123`

## Project Structure

```
device-monitor/
├── app/
│   ├── api/
│   │   └── devices/
│   │       ├── register/route.ts      # POST /api/devices/register
│   │       ├── route.ts               # GET /api/devices
│   │       └── [uuid]/
│   │           ├── status/route.ts    # PATCH /api/devices/:uuid/status
│   │           └── data/route.ts      # GET /api/devices/:uuid/data
│   ├── dashboard/
│   │   └── devices/
│   │       └── page.tsx               # Main dashboard page
│   ├── layout.tsx
│   └── page.tsx                       # Home page (redirects to dashboard)
├── components/
│   ├── AddDeviceForm.tsx              # Form to register new devices
│   ├── DeviceDetailsModal.tsx         # Modal showing device details and test results
│   └── DeviceList.tsx                 # Table displaying all devices
├── lib/
│   ├── api.ts                         # API client functions
│   ├── mock-data.ts                   # Mock test result generator
│   └── store.ts                       # In-memory device store
└── types/
    └── device.ts                      # TypeScript type definitions
```

## API Endpoints

### POST `/api/devices/register`
Register a new device.

**Request Body:**
```json
{
  "deviceName": "string",
  "deviceType": "string",
  "status": "online" | "offline"
}
```

**Note**: `deviceId` is auto-generated as a UUID by the server.

**Response:** Returns the registered device with generated `uuid` and `lastUpdated` timestamp.

### GET `/api/devices`
Get all registered devices.

**Query Parameters:**
- `status` (optional): Filter by status (`online` or `offline`)

**Response:** Array of device objects.

### PATCH `/api/devices/:uuid/status`
Update device status.

**Request Body:**
```json
{
  "status": "online" | "offline"
}
```

**Response:** Returns the updated device.

### GET `/api/devices/:uuid/data`
Get mock test results for a device.

**Response:** Array of 5-10 mock test results with `timestamp`, `testType`, `value`, `unit`, and `status`.

## Usage

1. **View Devices**: Navigate to `/dashboard/devices` to see all registered devices
2. **Add Device**: Click the "Add Device" button to register a new device
3. **Filter Devices**: Use the status filter dropdown to filter devices by status
4. **View Details**: Click on any device row to view detailed information and test results
5. **Update Status**: Click "Set Online" or "Set Offline" to change device status

## Assumptions

- Devices are stored in-memory (data is lost on server restart)
- Basic authentication is implemented with hardcoded credentials (for demo purposes)
- Mock test results are generated randomly for demonstration purposes
- Device IDs are auto-generated as UUIDs

## Authentication

The application includes basic authentication:
- Login page at `/login`
- Demo credentials: `admin` / `admin123`
- Session-based authentication (stored in sessionStorage)
- Protected dashboard routes require authentication

## Bonus Features

- ✅ **Charts**: Interactive line charts showing test results over time
- ✅ **Optimistic Updates**: Instant UI feedback when changing device status
- ✅ **Basic Authentication**: Login page with session management
- ✅ **Device-to-Server Security**: See NOTES.md for detailed security approach

## Development

### Build for Production

```bash
npm run build
npm start
```

### Linting

```bash
npm run lint
```

## Notes

See [NOTES.md](./NOTES.md) for detailed information about:
- Design decisions and approach
- Production considerations
- Challenges faced
- Future enhancements

## Deployment

### Deploy to Vercel

1. Push your code to GitHub
2. Import the repository in [Vercel](https://vercel.com)
3. Vercel will automatically detect Next.js and configure the build
4. Deploy!

The application will be available at `https://your-project.vercel.app`

### Deploy to Railway

1. Push your code to GitHub
2. Create a new project in [Railway](https://railway.app)
3. Connect your GitHub repository
4. Railway will auto-detect Next.js
5. Deploy!

### Environment Variables

No environment variables are required for this demo application.

### Build Command

```bash
npm run build
```

### Start Command

```bash
npm start
```

## License

This project was created as a technical assessment.
