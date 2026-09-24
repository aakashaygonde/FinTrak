import React, { useContext, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import AuthLayout from "../../components/layouts/AuthLayout";
import { Button, Input } from "../../components/ui";
import ProfilePhotoSelector from "../../components/Inputs/ProfilePhotoSelector";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import { UserContext } from "../../context/UserContext";
import { validateEmail } from "../../utils/helper";
import uploadImage from "../../utils/uploadImage";
import { LuUser, LuMail, LuLock, LuArrowRight } from "react-icons/lu";

const SignUp = () => {
  const [profilePic, setProfilePic] = useState(null);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const { updateUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();

    if (!fullName.trim()) {
      setError("Please enter your full name");
      return;
    }
    if (!validateEmail(email)) {
      setError("Please enter a valid email address");
      return;
    }
    if (!password || password.length < 8) {
      setError("Password must be at least 8 characters");
      return;
    }

    setError(null);
    setLoading(true);

    try {
      let profileImageUrl = "";

      if (profilePic) {
        const imgUploadRes = await uploadImage(profilePic);
        profileImageUrl = imgUploadRes.imageUrl || "";
      }

      const response = await axiosInstance.post(API_PATHS.AUTH.REGISTER, {
        fullName,
        email,
        password,
        profileImageUrl,
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
        setError("An error occurred during account creation. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout>
      <div className="w-full">
        {/* Heading */}
        <div className="mb-5">
          <h2 className="text-2xl font-bold tracking-tight text-slate-900">
            Create your FinTrack account
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1.5">
            Join thousands tracking their wealth and managing expenses effortlessly.
          </p>
        </div>

        <form onSubmit={handleSignUp} className="space-y-4">
          <div className="flex justify-center pb-1">
            <ProfilePhotoSelector image={profilePic} setImage={setProfilePic} />
          </div>

          <Input
            value={fullName}
            onChange={({ target }) => setFullName(target.value)}
            label="Full Name"
            placeholder="John Doe"
            type="text"
            icon={LuUser}
            required
          />

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
            placeholder="Minimum 8 characters"
            type="password"
            autoComplete="new-password"
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
            Get Started with FinTrack
          </Button>

          <p className="text-xs text-center text-slate-600 pt-2">
            Already have an account?{" "}
            <Link
              to="/login"
              className="font-semibold text-indigo-600 hover:text-indigo-700 underline underline-offset-2"
            >
              Sign In
            </Link>
          </p>
        </form>
      </div>
    </AuthLayout>
  );
};

export default SignUp;
