# FinTrack

Personal Finance & Expense Management Platform

FinTrack is a full-stack personal finance web application designed to help individuals monitor income, track daily expenditures, establish category budgets, and analyze spending habits through interactive visualizations and automated telemetry.

---

## Features

- **User Authentication & Authorization**
  - Secure account registration and login with JSON Web Tokens (JWT).
  - Password hashing using bcrypt.
  - User-scoped database access ensuring data isolation.
  - Avatar image upload support via Multer.

- **Financial Dashboard**
  - Real-time balance, total income, and total expense metrics.
  - Visual financial overview charts showing cashflow breakdown.
  - 30-day expense velocity line chart and 60-day income stream bar charts.
  - Recent transactions activity feed with instant status indicators.

- **Income & Expense Tracking**
  - Log, edit, and delete expense entries categorized with custom icons.
  - Log and manage revenue streams across multiple income sources.
  - Confirmation modals for destructive actions.

- **Unified Transaction Management**
  - Centralized ledger consolidating all inflows and outflows.
  - Real-time text search by title, source, or amount.
  - Filtering by transaction type (All, Expenses, Income) and sorting by date or amount.

- **Category Budgeting**
  - Set and monitor monthly spending caps across key spending categories.
  - Real-time threshold calculations with visual progress indicators and status badges (Safe, Warning, Over Budget).
  - Automatic computation of remaining monthly allowances.

- **Financial Analytics & Telemetry**
  - Savings rate percentage calculation comparing total inflows against outflows.
  - Interactive multi-segment expense and income distribution charts powered by Recharts.
  - Automated financial telemetry summary and KPI tracking.

- **Data Export**
  - Export transaction logs, expense reports, and income data to Microsoft Excel (`.xlsx`) or Comma-Separated Values (`.csv`).
  - Filter-aware export allowing users to export either the full dataset or currently active filtered subsets.

- **User Experience & Responsive Design**
  - Fully responsive layout optimized for mobile, tablet, and desktop screens.
  - Clean design system with consistent spacing, typography, and Lucide icons.
  - Real-time toast notifications for user actions and inline form validation.

---

## Tech Stack

### Frontend
- **Framework:** React 19
- **Build Tool:** Vite 6
- **Styling:** Tailwind CSS 4
- **Routing:** React Router 7
- **Charts:** Recharts
- **Icons:** React Icons (Lucide)
- **HTTP Client:** Axios
- **Dates & Utility:** Moment.js
- **Notifications:** React Hot Toast

### Backend
- **Runtime:** Node.js
- **Framework:** Express.js
- **Authentication:** JSON Web Tokens (JWT), bcryptjs
- **File Uploads:** Multer
- **Spreadsheet Generation:** SheetJS (xlsx)
- **CORS & Environment:** cors, dotenv

### Database
- **Database:** MongoDB (MongoDB Atlas)
- **ODM:** Mongoose

### Tools & Deployment
- **Version Control:** Git, GitHub
- **Deployment Support:** Vercel configuration included (`vercel.json`)

---

## Screenshots

<p align="center">
  <img src="./snapshots/dashboard.png" width="850" alt="FinTrack Financial Dashboard" />
</p>

| Dashboard Activity & Cashflow | Transaction Ledger & Filtered Export |
| :---: | :---: |
| <img src="./snapshots/dashboard(2).png" width="420" alt="Dashboard Activity" /> | <img src="./snapshots/Transactions.png" width="420" alt="Transaction Ledger" /> |

| Smart Monthly Spending Caps | Financial Analytics & Health Score |
| :---: | :---: |
| <img src="./snapshots/budget.png" width="420" alt="Smart Budgets" /> | <img src="./snapshots/analytics.png" width="420" alt="Financial Analytics" /> |

| Multi-Segment Analytics Breakdown | Categorized Expense Overview |
| :---: | :---: |
| <img src="./snapshots/analytics(2).png" width="420" alt="Analytics Breakdown" /> | <img src="./snapshots/Expense.png" width="420" alt="Expense Overview" /> |

| Expense Logging Modal Flow | Revenue Streams Management |
| :---: | :---: |
| <img src="./snapshots/expense(form).png" width="420" alt="Add Expense Modal" /> | <img src="./snapshots/income.png" width="420" alt="Income Streams" /> |

---

## Project Structure

```
FinTrack/
├── backend/
│   ├── config/
│   │   └── db.js                 # MongoDB connection setup
│   ├── controllers/
│   │   ├── authController.js     # User registration, login, profile logic
│   │   ├── dashboardController.js# Aggregated metrics and telemetry
│   │   ├── expenseController.js  # Expense CRUD and export handlers
│   │   └── incomeController.js   # Income CRUD and export handlers
│   ├── middleware/
│   │   ├── authMiddleware.js     # JWT token verification
│   │   └── uploadMiddleware.js   # Multer file upload handling
│   ├── models/
│   │   ├── Expense.js            # Expense schema definition
│   │   ├── Income.js             # Income schema definition
│   │   └── User.js               # User credentials and profile schema
│   ├── routes/
│   │   ├── authRoutes.js         # Authentication routes
│   │   ├── dashboardRoutes.js    # Dashboard telemetry routes
│   │   ├── expenseRoutes.js      # Expense management routes
│   │   └── incomeRoutes.js       # Income management routes
│   ├── uploads/                  # Uploaded profile avatars
│   ├── .env.example              # Sample environment template
│   ├── package.json              # Backend dependencies and scripts
│   └── server.js                 # Express application entry point
├── frontend/
│   ├── public/                   # Static assets, favicon, redirects
│   ├── src/
│   │   ├── components/
│   │   │   ├── Cards/            # Stat cards and transaction tiles
│   │   │   ├── Charts/           # Custom Recharts visualizers
│   │   │   ├── Dashboard/        # Dashboard widgets and feeds
│   │   │   ├── Expense/          # Expense list and form modals
│   │   │   ├── Income/           # Income list and form modals
│   │   │   ├── Inputs/           # Form inputs and photo selectors
│   │   │   ├── layouts/          # Navbar, SideMenu, DashboardLayout
│   │   │   └── ui/               # Design system components (Button, Modal, Badge, ExportMenu)
│   │   ├── context/              # React Context for user state
│   │   ├── hooks/                # Custom React authentication hooks
│   │   ├── pages/
│   │   │   ├── Auth/             # Login and SignUp pages
│   │   │   └── Dashboard/        # Dashboard, Transactions, Budgets, Analytics, Settings
│   │   ├── utils/                # API paths, Axios client, export utilities, helpers
│   │   ├── App.jsx               # Application routes and providers
│   │   ├── index.css             # Tailwind CSS entry file
│   │   └── main.jsx              # React DOM mounting
│   ├── .env.example              # Frontend environment template
│   ├── package.json              # Frontend dependencies and scripts
│   └── vite.config.js            # Vite configuration
├── snapshots/                    # Application UI screenshots
├── .gitignore                    # Root git ignore rules
├── package-lock.json             # Root lockfile
├── readme.md                     # Project documentation
└── vercel.json                   # Deployment routing configuration
```

---

## Getting Started

### Prerequisites
- Node.js (version 18 or later)
- npm (version 9 or later)
- MongoDB Atlas cluster or a running local MongoDB instance

### Installation & Setup

1. **Clone the repository:**
   ```bash
   git clone https://github.com/aakashaygonde/FinTrak.git
   cd FinTrak
   ```

2. **Configure Environment Variables:**
   - Create a `.env` file in the `backend/` directory based on `backend/.env.example`.
   - Create a `.env` file in the `frontend/` directory based on `frontend/.env.example`.

3. **Install Dependencies and Run the Backend:**
   ```bash
   cd backend
   npm install
   npm start
   ```
   The backend API will initialize on `http://localhost:8000` (or your configured `PORT`).

4. **Install Dependencies and Run the Frontend:**
   Open a separate terminal window:
   ```bash
   cd frontend
   npm install
   npm run dev
   ```
   The frontend application will be accessible at `http://localhost:5173`.

---

## Environment Variables

### Backend (`backend/.env`)
| Variable | Description |
| :--- | :--- |
| `PORT` | Port number on which the Express server listens (default: `8000`) |
| `MONGO_URI` | MongoDB connection string (URI) |
| `JWT_SECRET` | Secret key used to sign and verify JSON Web Tokens |
| `CLIENT_URL` | Frontend client URL allowed by CORS (e.g. `http://localhost:5173`) |

### Frontend (`frontend/.env`)
| Variable | Description |
| :--- | :--- |
| `VITE_BASE_URL` | Base URL of the backend API (e.g. `http://localhost:8000`) |

---

## API Overview

All protected endpoints require an `Authorization: Bearer <token>` header.

| Method | Endpoint | Description | Auth Required |
| :--- | :--- | :--- | :---: |
| `POST` | `/api/v1/auth/register` | Register a new user account | No |
| `POST` | `/api/v1/auth/login` | Authenticate user and obtain JWT token | No |
| `GET` | `/api/v1/auth/getUser` | Retrieve logged-in user profile | Yes |
| `POST` | `/api/v1/auth/upload-image` | Upload user profile picture | No |
| `GET` | `/api/v1/dashboard` | Fetch aggregated totals, charts, and recent activity | Yes |
| `GET` | `/api/v1/income/get` | Retrieve all income entries for the user | Yes |
| `POST` | `/api/v1/income/add` | Create a new income record | Yes |
| `DELETE` | `/api/v1/income/:id` | Delete an income record | Yes |
| `GET` | `/api/v1/income/downloadexcel` | Export income records to Excel (.xlsx) or CSV (`?format=csv`) | Yes |
| `GET` | `/api/v1/expense/get` | Retrieve all expense entries for the user | Yes |
| `POST` | `/api/v1/expense/add` | Create a new expense record | Yes |
| `DELETE` | `/api/v1/expense/:id` | Delete an expense record | Yes |
| `GET` | `/api/v1/expense/downloadexcel` | Export expense records to Excel (.xlsx) or CSV (`?format=csv`) | Yes |

---

## Future Improvements

- Recurring transaction automation for subscriptions and periodic earnings.
- Multi-currency support with dynamic foreign exchange rate conversion.
- Automated monthly PDF statement generation.
- Bank statement file import (CSV/OFX).

---

## License

This project is licensed under the MIT License.

---

## Author

**Aakash Haygonde**  
GitHub: [https://github.com/aakashaygonde](https://github.com/aakashaygonde)
