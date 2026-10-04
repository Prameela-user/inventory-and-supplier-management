# StockSync — AI-Powered Inventory & Supplier Management System

A modern, responsive, and feature-rich Web Application designed for managing inventory, tracking supplier relationships, handling purchase and sales orders, and monitoring real-time business analytics.

![StockSync Banner](https://img.shields.io/badge/StockSync-v1.0.0-6366f1?style=for-the-badge)
![Vite](https://img.shields.io/badge/Vite-6.x-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![Chart.js](https://img.shields.io/badge/Chart.js-4.x-FF6384?style=for-the-badge&logo=chartdotjs&logoColor=white)

---

## 🚀 Overview

**StockSync** provides businesses with full end-to-end visibility into their supply chain and stock movement. Built with vanilla JavaScript, modern CSS design tokens, Chart.js, and powered by Vite, StockSync delivers a fast, desktop and mobile-responsive management dashboard.

---

## ✨ Features

### 1. 📊 Executive Dashboard
- **Key Performance Indicators (KPIs)**: Total inventory valuation, total items in stock, low-stock warnings, and pending purchase orders.
- **Interactive Analytics**: Real-time sales trends, stock distribution by category, and supplier fulfillment rate powered by Chart.js.
- **Activity Feed**: Live updates of recent stock movements, sales, and shipments.

### 2. 📦 Inventory Management
- **Full Item Catalog**: Track items with SKU, category, current quantity, safety reorder thresholds, and unit costs.
- **Automated Alerts**: Visual warnings for low stock and out-of-stock items.
- **Add & Edit Modals**: Add new items or modify existing inventory data with immediate local updates.
- **Search & Filter**: Real-time filtering by category and status.

### 3. 👥 Supplier Management
- **Supplier Directory**: Contact persons, email addresses, phone numbers, lead times, and performance ratings.
- **Vendor History**: View tied purchase orders and active supply shipments per vendor.

### 4. 🛒 Purchase Orders (PO)
- **Order Lifecycle**: Manage orders from `Draft` ➔ `Ordered` ➔ `Received` / `Cancelled`.
- **Auto-Restock Integration**: Marking purchase orders as "Received" automatically increments inventory levels.

### 5. 💰 Sales & Invoicing
- **Sales Transactions**: Record sales with customer information, items sold, and automatic inventory deduction.
- **Revenue Tracking**: Live profit and revenue calculation.

### 6. 🔄 Stock Movement & Audit Logs
- Complete transaction log tracking every inbound (`IN`), outbound (`OUT`), and manual adjustment (`ADJUSTMENT`) with date, SKU, and user action.

### 7. 📈 Reports & Analytics
- Comprehensive inventory valuation reports.
- Category breakdown and supplier lead-time comparisons.
- **Exporting**: Quick export capabilities to CSV and printable report formats.

### 8. ⚙️ Settings & Configuration
- Customization for currency symbols, default safety stock thresholds, and company profile.
- Demo data reset option for testing and showcase.

---

## 🛠️ Tech Stack

- **Frontend Core**: Vanilla HTML5, Modern CSS (Glassmorphism & Dark Mode), ES6+ JavaScript modules
- **Build Tool**: [Vite](https://vitejs.dev/)
- **Charts & Visualizations**: [Chart.js](https://www.chartjs.org/)
- **Icons**: [Lucide Icons](https://lucide.dev/) / SVG Vector Icons
- **State Management**: Reactive in-memory state store with `localStorage` persistence

---

## 🏁 Getting Started

### Prerequisites

Ensure you have [Node.js](https://nodejs.org/) installed (version 18 or higher recommended).

### Installation

1. **Clone the repository or navigate to the project directory**:
   ```bash
   cd "inventory and supplier management"
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the local development server**:
   ```bash
   npm run dev
   ```

4. **Open in browser**:
   Navigate to the local URL displayed in the terminal:
   ```
   http://localhost:5173/
   ```

---

## 🔐 Default Demo Login

The application includes an authentication guard with pre-configured demo credentials:

| Field | Value |
|-------|-------|
| **Email** | `admin@stocksync.ai` |
| **Password** | `password123` |

*(You can simply click **Log In** as fields are pre-filled for demo convenience).*

---

## 📁 Project Structure

```text
├── index.html              # Main HTML entry file & modals
├── package.json            # Project dependencies and npm scripts
├── README.md               # Documentation
└── src/
    ├── app.js              # Application router, auth flow, and event listeners
    ├── state.js            # Central reactive state, seed data, and storage
    ├── charts.js           # Chart.js initialization and updates
    ├── style.css           # Design tokens, layout, glassmorphism, responsive styles
    └── screens/
        ├── dashboard.js       # Dashboard screen UI and metrics
        ├── inventory.js       # Inventory catalog and stock actions
        ├── suppliers.js       # Supplier management screen
        ├── purchaseOrders.js  # Purchase orders and receiving workflows
        ├── sales.js           # Sales entries and customer orders
        ├── stockMovement.js   # Audit logs and movement history
        ├── reports.js         # Analytics, summary cards, and data export
        └── settings.js        # App preferences and data resets
```

---

## 📦 Production Build

To build the project for production deployment:

```bash
npm run build
```

To preview the built static files locally:

```bash
npm run preview
```

---

## 📄 License

This project is licensed under the MIT License.
