# SysPulse Dashboard 🚀

A real-time system monitoring web application featuring a C-backend bridge, Flask API server, and a responsive frontend with interactive Chart.js visualizations.

## Features ✨

* **Real-Time Hardware Tracking**: Monitors CPU Load (%), RAM Usage (MB), and System Temperature (°C).
* **Dynamic Line Charts**: Interactive rolling time-series graph powered by Chart.js.
* **REST API Endpoint**: Standardized JSON endpoint `/api/metrics` serving live system stats.
* **Responsive Dark UI**: Clean, dark-themed interface built with standard CSS Grid.

## Project Architecture 🛠️

```text
sys-pulse-dashboard/
├── backend/
│   ├── app.py         # Flask API server & static route router
│   └── bridge.py      # Hardware engine interface (psutil integration)
├── c_engine/          # Low-level performance hardware engine module
├── frontend/
│   ├── index.html     # Main dashboard HTML structure
│   ├── app.js         # Fetch polling logic & Chart.js rendering engine
│   └── style.css      # Custom dark mode styles
└── README.md