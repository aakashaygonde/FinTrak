import React, { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import AuthLayout from "../../components/layouts/AuthLayout";
import { Button, Input } from "../../components/ui";
import { validateEmail } from "../../utils/helper";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import { UserContext } from "../../context/UserContext";
import { LuMail, LuLock, LuArrowRight } from "react-icons/lu";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const { updateUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!validateEmail(email)) {
      setError("Please enter a valid email address");
      return;
    }
    if (!password) {
      setError("Please enter your password");
      return;
    }

    setError(null);
    setLoading(true);

    try {
      const response = await axiosInstance.post(API_PATHS.AUTH.LOGIN, {
        email,
        password,
      });

      const { token, user } = response.data;
      if (token) {
        localStorage.setItem("token", token);
        updateUser(user);
        navigate("/dashboard");
      }
    } catch (err) {
      if (err.response && err.response.data.message) {
        setError(err.response.data.message);
      } else {
        setError("Something went wrong. Please check your connection and try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout>
      <div className="w-full">
        {/* Heading */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold tracking-tight text-slate-900">
            Welcome back to FinTrack
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1.5">
            Log in to manage your finances, expenses, and wealth goals.
          </p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleLogin} className="space-y-4">
          <Input
            value={email}
            onChange={({ target }) => setEmail(target.value)}
            label="Email Address"
            placeholder="you@example.com"
            type="email"
            autoComplete="email"
            icon={LuMail}
            required
          />

          <Input
            value={password}
            onChange={({ target }) => setPassword(target.value)}
            label="Password"
            placeholder="Enter your password"
            type="password"
            autoComplete="current-password"
            icon={LuLock}
            required
          />

          {error && (
            <div className="p-3 rounded-lg bg-rose-50 border border-rose-200/80 text-xs text-rose-700 font-medium">
              {error}
            </div>
          )}

          <Button
            type="submit"
            variant="primary"
            size="md"
            isLoading={loading}
            className="w-full mt-2"
            icon={LuArrowRight}
            iconPosition="right"
          >
            Sign In to FinTrack
          </Button>

          <p className="text-xs text-center text-slate-600 pt-3">
            Don't have an account?{" "}
            <Link
              to="/signup"
              className="font-semibold text-indigo-600 hover:text-indigo-700 underline underline-offset-2"
            >
              Create free account
            </Link>
          </p>
        </form>
      </div>
    </AuthLayout>
  );
};

export default Login;
