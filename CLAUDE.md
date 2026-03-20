# Project: Main-Offline-App

## Overview
Offline-first business management app (inventory, orders, invoicing, courier shipping) hosted on GitHub Pages at `tha2kyanamtumharaalgorithms-javascript.github.io/Main-Offline-App/`.

## Architecture
- **Frontend**: Vanilla HTML/JS/CSS in `aa34/` directory. No build tools, no frameworks.
- **Data**: Firebase Realtime Database (`offline-app-e9b72-default-rtdb.asia-southeast1.firebasedatabase.app`)
- **Lambda Proxy**: Single AWS Lambda (`courier-proxy/index.mjs`) handles all courier API calls (CORS blocks direct browser calls)
  - Lambda URL: `https://anlof6ho4kmtewslnyk34ip2f40pedjp.lambda-url.ap-south-1.on.aws`
  - Node.js 20.x, no npm dependencies (uses native `https`), 30s timeout
  - Function name on AWS: `ExtractcourierShiprockDelhivery3accoLTL-MadeByKetu`

## Key Files
- `aa34/awb.html` — Standalone AWB Courier Dashboard (ShipRocket/Delhivery/RocketBox)
- `aa34/awb.js` — Older AWB dashboard JS (embedded in main app, has pagination logic)
- `aa34/myy.js` — Main app JS (courier booking, pricing, inventory)
- `aa34/my.js` — Core app logic
- `lambda/courier-proxy/index.mjs` — Lambda proxy for all courier APIs

## Courier APIs (via Lambda proxy)
### ShipRocket
- Auth: email/password login → Bearer token
- `/orders?page=X&per_page=Y` — paginated orders list
- `/cancel` — cancel orders (POST with `{ids: [...]]}`)
- `/weight-discrepancies?page=X&per_page=Y` — weight discrepancy charges
- `/shp/{courierId}` — book shipment (creates order + AWB + pickup)
- `/token` — get fresh auth token
- Status codes are NUMERIC (1=AWB Assigned, 3=In Transit, 4=Delivered, 6=Cancelled, 7=OFD, 8=Not Picked, 19=OFD, etc.)
- `customer_phone` is MASKED ("xxxxxxxxx") in orders list API

### Delhivery
- Auth: Token-based (3 accounts: DL_TOKEN_A/B/C)
- `/del/shipments` — fetch from all 3 accounts
- `/del/cancel` — cancel by waybill
- `/del/dl0|dl1|dl2` — book shipment
- `/price` or `/?o_pin=&d_pin=&cgm=` — pricing (Delhivery + RocketBox)
- `/pin/{code}` — pincode lookup

### RocketBox
- Via Google Apps Script (not Lambda): `https://script.google.com/macros/s/AKfycbx.../exec`
- POST with FormData: `t=list` for shipment list, `t=cancel` for cancel

## Lambda Environment Variables
```
DL_TOKEN_A — Delhivery DUSHIRTS01 SURFACE (→ dl0)
DL_TOKEN_B — Delhivery 10KG DUSURFACE (→ dl2)
DL_TOKEN_C — Delhivery DUSHIRTSEXPRESS (→ dl1)
SHP_EMAIL — ShipRocket login email
SHP_PASS — ShipRocket login password
RKB_TOKEN — RocketBox Bearer token
```

## Important Notes
- Never edit Lambda directly on AWS without also updating `lambda/courier-proxy/index.mjs` in this repo
- The Lambda file in this repo is the source of truth — copy-paste to AWS console after changes
- `awb.html` is a standalone page (separate from the main app's awb.js integration)
- ShipRocket numeric status codes must be mapped in `awbNormalizeStatus()` — string statuses alone are insufficient
- Weight discrepancy data comes from a separate ShipRocket API endpoint, not from the orders list
