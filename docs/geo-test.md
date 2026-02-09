# Geo Test Guide

## iOS Safari
- Requires HTTPS in production.
- In development, `localhost` is allowed. If you access via IP on the same network, some iOS versions may require HTTPS.
- If you hit permission issues, use a HTTPS tunnel (ngrok/cloudflared) or local HTTPS via mkcert.

## Android (Chrome)
- Allow location permission when prompted.
- If permission was denied before, reset it in browser site settings.
- HTTPS is recommended; local network HTTP often works with permissions, but it depends on browser/security settings.

## Windows (Chrome/Edge) - Simulate Location
- Open DevTools (F12)
- More tools -> Sensors
- In Geolocation, choose a preset or input custom Lat/Lng
- Keep the tab active while testing

## Test On Phone Over Local Network
1. Start dev server with host:
   npm run dev -- --host
2. Find your machine IP (e.g. 192.168.x.x)
3. On phone, open: http://YOUR_IP:5173
4. Accept location permissions when prompted

If the phone browser blocks location over HTTP, use HTTPS:

## Option A (Recommended): Vite HTTPS with mkcert
1. Install:
   npm i -D vite-plugin-mkcert
2. Add to `vite.config.js`:
   import mkcert from 'vite-plugin-mkcert'
   export default defineConfig({
     server: { https: true },
     plugins: [mkcert()]
   })
3. Run: npm run dev -- --host

## Option B: HTTPS Tunnel
- ngrok: run `ngrok http 5173`
- cloudflared: run `cloudflared tunnel --url http://localhost:5173`

Use the generated HTTPS URL on your phone.
