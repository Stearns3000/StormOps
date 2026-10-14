STORM OPS — phone-only starter PWA

WHAT THIS VERSION DOES
- Loads NWS point/hourly forecast and nearby latest observation for Big Piney, WY.
- Loads active NWS alerts intersecting the chosen point.
- Shows simple filming-condition indicators from current observation + next 6 forecast periods.
- Links to NWS live radar and MRMS.
- Refreshes every 5 minutes while open.
- Requests notification permission; service-worker periodic sync is best effort and browser-controlled.

IMPORTANT LIMITATIONS
- A downloaded HTML file opened as file:// is NOT installable as a PWA. It must be hosted over HTTPS.
- This app does not guarantee 24/7 background alerts. Chrome/Android can defer background sync, and the user must install the PWA and permit notifications.
- The first version does not calculate vertical wind shear, storm rotation, hail size, road surface temperature, or topographic wind flow.
- The readiness score is a simple indicator, not a safety guarantee. Check WYDOT road conditions and official NWS alerts before driving.

PHONE-ONLY SETUP (FREE, USING GITHUB PAGES)
1. Open github.com in Chrome on your S24 and sign in/create an account.
2. Create a new public repository named storm-ops.
3. Upload all files from this ZIP to the repository root (index.html, manifest.webmanifest, sw.js, icon-192.png, icon-512.png).
4. In the repository, open Settings → Pages. Choose Deploy from a branch, branch main, folder /(root), then Save.
5. Wait for GitHub Pages to publish the site. Open the published https://...github.io/storm-ops/ link in Chrome on the phone.
6. Chrome menu ⋮ → Install app (or Add to Home screen) → Install.
7. Open STORM OPS from the home screen and tap Enable Notifications. Keep app notifications allowed in Android Settings.
8. Test the dashboard by tapping Refresh Now.

No API key is required for the NWS API. It is public and free, subject to reasonable usage limits.
