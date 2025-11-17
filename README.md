# LisBridge - Device Status Dashboard

A full-stack device monitoring dashboard built with Next.js, TypeScript, and Tailwind CSS for managing laboratory devices and viewing test results. Available as both a web application and a cross-platform desktop app.

**Repository**: [https://github.com/naimjeem/lisbridge-next-rust](https://github.com/naimjeem/lisbridge-next-rust)

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
- **Desktop App**: Cross-platform desktop application built with Tauri (Windows, macOS, Linux)
- **Shared Codebase**: Desktop app uses the same Next.js components and API as the web app

## Tech Stack

### Web Application
- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Form Handling**: React Hook Form
- **Validation**: Zod
- **State Management**: React Hooks
- **Charts**: Recharts

### Desktop Application
- **Framework**: Tauri 2.0
- **Frontend**: Next.js (shared with web app)
- **Backend**: Rust
- **API**: Next.js API routes (shared with web app)

## Getting Started

### Prerequisites

**For Web Application:**
- Node.js 18+ 
- npm, yarn, pnpm, or bun

**For Desktop Application:**
- Node.js 18+
- Rust (latest stable version)
- System dependencies for Tauri (see [Tauri prerequisites](https://tauri.app/v1/guides/getting-started/prerequisites))

### Installation

1. Clone the repository:
```bash
git clone https://github.com/naimjeem/lisbridge-next-rust.git
cd lisbridge-next-rust
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

### Desktop Application

1. **Install Rust** (if not already installed):
   ```bash
   curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
   ```

2. **Install Tauri CLI dependencies**:
   ```bash
   cd desktop-app
   npm install
   ```

3. **Run the desktop app**:
   ```bash
   npm run tauri:dev
   ```

   This will automatically:
   - Start the Next.js dev server (from parent directory)
   - Build and run the Tauri app
   - Open the desktop window pointing to the Next.js dashboard

   **Note**: The desktop app uses the same Next.js components and API as the web app. All code is shared.

See [desktop-app/README.md](./desktop-app/README.md) for more detailed desktop app documentation.

## Project Structure

```
lisbridge/
├── app/                                # Next.js app directory
│   ├── api/
│   │   ├── auth/
│   │   │   └── logout/route.ts        # POST /api/auth/logout
│   │   └── devices/
│   │       ├── register/route.ts       # POST /api/devices/register
│   │       ├── route.ts                # GET /api/devices
│   │       └── [uuid]/
│   │           ├── status/route.ts    # PATCH /api/devices/:uuid/status
│   │           └── data/route.ts      # GET /api/devices/:uuid/data
│   ├── dashboard/
│   │   └── devices/
│   │       └── page.tsx                # Main dashboard page
│   ├── login/
│   │   └── page.tsx                    # Login page
│   ├── layout.tsx
│   └── page.tsx                        # Home page (redirects to login)
├── components/                         # React components (shared)
│   ├── AddDeviceForm.tsx               # Form to register new devices
│   ├── AuthGuard.tsx                   # Authentication guard component
│   ├── DeviceDetailsModal.tsx          # Modal showing device details and test results
│   ├── DeviceList.tsx                  # Table displaying all devices
│   └── TestResultsChart.tsx           # Chart component for test results
├── desktop-app/                        # Tauri desktop application
│   ├── src-tauri/                     # Rust backend
│   │   ├── src/
│   │   │   └── main.rs                # Rust entry point
│   │   ├── Cargo.toml                 # Rust dependencies
│   │   └── tauri.conf.json            # Tauri configuration
│   └── package.json                   # Tauri CLI dependencies
├── lib/
│   ├── api.ts                         # API client functions
│   ├── cors.ts                        # CORS configuration for desktop app
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
- Desktop app requires Next.js server to be running (connects to `http://localhost:3000`)
- CORS is configured to allow desktop app access (see `lib/cors.ts`)

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
- ✅ **Desktop Application**: Cross-platform desktop app using Tauri
- ✅ **CORS Support**: Configured for desktop app API access
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

1. Push your code to GitHub: [https://github.com/naimjeem/lisbridge-next-rust](https://github.com/naimjeem/lisbridge-next-rust)
2. Import the repository in [Vercel](https://vercel.com)
3. Vercel will automatically detect Next.js and configure the build
4. Deploy!

The application will be available at `https://your-project.vercel.app`

### Deploy to Railway

1. Push your code to GitHub: [https://github.com/naimjeem/lisbridge-next-rust](https://github.com/naimjeem/lisbridge-next-rust)
2. Create a new project in [Railway](https://railway.app)
3. Connect your GitHub repository
4. Railway will auto-detect Next.js
5. Deploy!

### Environment Variables

No environment variables are required for this demo application.

**For Desktop App:**
- The desktop app connects to `http://localhost:3000` by default
- CORS is configured to allow requests from the desktop app
- See `lib/cors.ts` for CORS configuration

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
