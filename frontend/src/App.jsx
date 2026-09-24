import React from "react";

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Home from "./pages/Dashboard/Home";
import Login from "./pages/Auth/Login";
import SignUp from "./pages/Auth/SignUp";
import Income from "./pages/Dashboard/Income";
import Expense from "./pages/Dashboard/Expense";
import Transactions from "./pages/Dashboard/Transactions";
import Budgets from "./pages/Dashboard/Budgets";
import Analytics from "./pages/Dashboard/Analytics";
import Settings from "./pages/Dashboard/Settings";
import UserProvider from "./context/UserContext";
import ProtectedRoute from "./components/layouts/ProtectedRoute";
import PublicRoute from "./components/layouts/PublicRoute";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <UserProvider>
      <div>
        <Router>
          <Routes>
            <Route path="/" element={<Root />} />

            {/* Public routes */}
            <Route element={<PublicRoute />}>
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/signUp" element={<SignUp />} />
            </Route>

            {/* Protected dashboard routes */}
            <Route element={<ProtectedRoute />}>
              <Route path="/dashboard" element={<Home />} />
              <Route path="/income" element={<Income />} />
              <Route path="/expense" element={<Expense />} />
              <Route path="/transactions" element={<Transactions />} />
              <Route path="/budgets" element={<Budgets />} />
              <Route path="/analytics" element={<Analytics />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/profile" element={<Settings />} />
            </Route>

            <Route path="/logout" element={<Navigate to="/login" replace />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Router>
      </div>

      <Toaster
        position="top-right"
        toastOptions={{
          className: "",
          style: {
            fontSize: "13px",
            borderRadius: "10px",
            border: "1px solid #e2e8f0",
            boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.07), 0 2px 4px -2px rgb(0 0 0 / 0.07)",
            padding: "10px 14px",
            color: "#0f172a",
          },
        }}
      />
    </UserProvider>
  );
}

export default App;

const Root = () => {
  // Check if token exists in local storage
  const isAuthenticated = !!localStorage.getItem("token");
  return isAuthenticated ? (
    <Navigate to="/dashboard" />
  ) : (
    <Navigate to="/login" />
  );
};
