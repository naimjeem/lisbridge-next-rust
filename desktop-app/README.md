# LisBridge Desktop App

A desktop application for the LisBridge device monitoring system, built with Tauri and Next.js.

## Features

- **Device Management**: Register, view, and manage laboratory devices
- **Status Monitoring**: Track device status (online/offline) with real-time updates
- **Test Results**: View mock laboratory test results for each device with interactive charts
- **Filtering**: Filter devices by status (online/offline)
- **Native Desktop Experience**: Cross-platform desktop app with native performance
- **Shared Codebase**: Uses the same Next.js components and API as the web app

## Tech Stack

- **Framework**: Tauri 2.0
- **Frontend**: Next.js (shared with web app)
- **Backend**: Next.js API routes (shared with web app)
- **Styling**: Tailwind CSS
- **Form Handling**: React Hook Form
- **Validation**: Zod
- **Charts**: Recharts

## Prerequisites

- Node.js 18+
- Rust (latest stable version)
- System dependencies for Tauri (see [Tauri prerequisites](https://tauri.app/v1/guides/getting-started/prerequisites))

### Installing Rust

If you don't have Rust installed:

```bash
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
```

### Installing Tauri CLI

```bash
npm install -g @tauri-apps/cli
```

Or use it via npx (no global install needed).

## Getting Started

1. **Install dependencies** (in the main project directory):

```bash
cd ..
npm install
```

2. **Run the desktop app**:

```bash
cd desktop-app
npm run tauri:dev
```

This will:
- Start the Next.js dev server (from parent directory)
- Build and run the Tauri app
- Open the desktop window pointing to the Next.js dashboard

3. **Build for production**:

```bash
npm run tauri:build
```

**Note**: For production builds, the Next.js server needs to be running. The desktop app connects to `http://localhost:3000`.

## How It Works

The desktop app uses Tauri to wrap the Next.js web application:
- **Development**: Tauri loads `http://localhost:3000/dashboard/devices` in a webview
- **Production**: Next.js needs to be built and running (or use static export)
- **Shared Code**: All components, API routes, and logic are shared with the web app

## Configuration

The Tauri app is configured to:
- Point to the Next.js dev server at `http://localhost:3000`
- Load the dashboard directly at `/dashboard/devices`
- Use the same API endpoints as the web app

## Project Structure

```
desktop-app/
├── src-tauri/          # Tauri Rust backend
│   ├── src/
│   │   └── main.rs     # Rust entry point
│   ├── Cargo.toml      # Rust dependencies
│   └── tauri.conf.json # Tauri configuration
└── package.json        # Minimal package.json for Tauri CLI

../                      # Main Next.js app (parent directory)
├── app/                 # Next.js app directory (shared)
├── components/          # React components (shared)
├── lib/                 # Utilities (shared)
└── types/               # TypeScript types (shared)
```

## Development

### Running the App

```bash
cd desktop-app
npm run tauri:dev
```

This automatically starts the Next.js dev server and opens the Tauri window.

### Building

```bash
npm run tauri:build
```

**Important**: Make sure Next.js is built and running before building the Tauri app for production.

## Notes

- The desktop app requires the Next.js backend to be running
- All API calls use the same endpoints as the web app
- Components are shared between web and desktop versions
- CORS is configured to allow requests from the desktop app

## Troubleshooting

### Next.js Server Not Found

- Make sure Next.js is running: `cd .. && npm run dev`
- Check that port 3000 is available
- Verify the `devUrl` in `tauri.conf.json` points to the correct URL

### Build Errors

- Make sure Rust is properly installed: `rustc --version`
- Update Rust: `rustup update`
- Clean and rebuild: `cd src-tauri && cargo clean && cd .. && npm run tauri:build`

## License

This project was created as a technical assessment.
