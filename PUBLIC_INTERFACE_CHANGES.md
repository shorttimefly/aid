# Public Interface Changes

## 2026-07-13

- Changed the default LibreChat local port from `3080` to `53180`.
- Added the default admin panel local port `53181`.
- Changed `DOMAIN_CLIENT` examples to `http://localhost:53180`.
- Changed `docker-compose.yml` so the admin panel is built from the vendored source at `vendor/librechat-admin-panel` and tagged as `shorttimefly-aid-admin-panel:local`.
- Reserved the `53180-53189` range for aid/LibreChat local development to avoid conflicts with AIP, P1, AIHub, sub2api, and common local frontend ports.
