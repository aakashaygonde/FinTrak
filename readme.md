# 💎 FinTrack — Personal Finance & Expense Management Platform

![MERN Stack](https://img.shields.io/badge/Stack-MERN-blue)
![Vite](https://img.shields.io/badge/Frontend-Vite%20%2B%20React%2019-646CFF)
![TailwindCSS](https://img.shields.io/badge/Styling-TailwindCSS%20v4-38B2AC)
![License](https://img.shields.io/badge/License-MIT-green)

A modern, high-performance personal finance platform built for professionals and individuals seeking complete control over their income, expenses, category budgets, and long-term financial clarity.

---

## 🌟 Key Features

### 1. Unified Financial Dashboard
- **Real-Time Cashflow Telemetry:** Immediate metrics for Total Balance, Inflow (Income), and Outflow (Expenses).
- **Interactive Visualizations:**
  - Cashflow balance breakdown (Finance Overview).
  - Income trend analytics by revenue stream.
  - 30-day expense velocity charts.
- **Recent Transactions Feed:** High-density activity logs with instant status badges.

### 2. Transaction Management
- Categorized expense logging with custom emoji icons.
- Multi-source income logging (salary, investments, freelancing, dividends).
- Full search, filter, and sorting across all transactions.
- In-memory buffered Excel report exports for both expenses and income.

### 3. Smart Monthly Budgets
- Dynamic category-level spending caps (Housing, Food, Transportation, Utilities, Entertainment, Health).
- Automatic real-time deficit and percentage threshold alerts (Safe, Warning, Over Budget).
- Remaining monthly allowance calculations.

### 4. Advanced Analytics & Health Score
- **Savings Rate KPI:** Calculation of percentage of income saved against standard financial benchmarks.
- **Algorithmic Financial Health Diagnosis:** Automated score evaluating savings efficiency and expense management.
- Multi-dimensional category breakdown charts.

### 5. Enterprise-Grade Security
- Secure JWT-based stateless authentication with password hashing via bcrypt.
- Enforced User ID scoping preventing Insecure Direct Object References (IDOR).
- Automatic input validation and email format checks.

---

## 🛠️ Technology Stack

- **Frontend:** React 19, Vite v6, Tailwind CSS v4, Recharts, Lucide Icons, React Router v7.
- **Backend:** Node.js, Express.js, MongoDB Atlas (Mongoose), JWT, Multer, ExcelJS.
- **Typography:** Plus Jakarta Sans (Google Fonts).

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18+)
- MongoDB Atlas or local MongoDB instance

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/aakashaygonde/FinTrak.git
   cd FinTrak
   ```

2. **Configure Environment Variables:**
   - **Backend:** Copy `backend/.env.example` to `backend/.env`:
     ```env
     PORT=8000
     MONGO_URI=your_mongodb_connection_string
     JWT_SECRET=your_jwt_secret_key
     CLIENT_URL=http://localhost:5173
     ```
   - **Frontend:** Copy `frontend/.env.example` to `frontend/.env`:
     ```env
     VITE_BASE_URL=http://localhost:8000
     ```

3. **Install Dependencies & Start Servers:**
   - **Backend:**
     ```bash
     cd backend
     npm install
     npm start
     ```
   - **Frontend:**
     ```bash
     cd frontend
     npm install
     npm run dev
     ```

4. **Access the Application:**
   Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## 📄 License

This project is licensed under the MIT License.

<p align="center">Crafted with precision by <b>Aakash Haygonde</b></p>
