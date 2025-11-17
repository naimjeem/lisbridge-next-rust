# Setup Guide for LisBridge Desktop App

The desktop app uses Tauri to wrap the Next.js web application, sharing the same components and API.

## Quick Start

1. **Install Rust** (if not already installed):
   ```bash
   curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
   source $HOME/.cargo/env
   ```

2. **Install Tauri CLI dependencies**:
   ```bash
   cd desktop-app
   npm install
   ```

3. **Install Next.js dependencies** (in parent directory):
   ```bash
   cd ..
   npm install
   ```

4. **Run the desktop app**:
   ```bash
   cd desktop-app
   npm run tauri:dev
   ```

   This will automatically:
   - Start the Next.js dev server (from parent directory)
   - Build and run the Tauri app
   - Open the desktop window pointing to the Next.js dashboard

## How It Works

- The desktop app uses Tauri to wrap the Next.js application
- All components, API routes, and logic are shared with the web app
- Tauri loads `http://localhost:3000/dashboard/devices` in a webview
- No separate frontend code needed - everything comes from Next.js

## First Time Setup

On first run, Tauri will:
- Download and compile Rust dependencies (this may take several minutes)
- Start the Next.js dev server automatically
- Build and open the desktop application

## Troubleshooting

### Rust not found
- Make sure Rust is installed: `rustc --version`
- Add Rust to your PATH: `source $HOME/.cargo/env`

### Build errors
- Update Rust: `rustup update`
- Clean build: `cd src-tauri && cargo clean && cd ..`

### Next.js server not found
- Make sure Next.js dependencies are installed in the parent directory
- Verify Next.js is running on `http://localhost:3000`
- Check that port 3000 is available

### API connection issues
- Verify Next.js backend is running
- Check CORS configuration in `lib/cors.ts`
- Look for errors in the console

## Building for Production

```bash
npm run tauri:build
```

**Note**: For production builds, Next.js needs to be built and running. The desktop app connects to the Next.js server.

This creates platform-specific installers in `src-tauri/target/release/bundle/`.

