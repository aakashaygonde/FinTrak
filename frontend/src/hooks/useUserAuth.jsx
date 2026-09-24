import { useEffect, useContext } from "react";
import { UserContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../utils/axiosInstance";
import { API_PATHS } from "../utils/apiPaths";

export const useUserAuth = () => {
  const { user, updateUser, clearUser } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      clearUser();
      navigate("/login");
      return;
    }

    if (user) return; 

    let isMounted = true;

    const fetchUserInfo = async () => {
      try {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
          try {
            updateUser(JSON.parse(storedUser));
          } catch {
            localStorage.removeItem("user");
          }
        }

        // Fetch user data from API
        const response = await axiosInstance.get(API_PATHS.AUTH.GET_USER_INFO);
        
        if (isMounted && response.data) {
          updateUser(response.data);
          localStorage.setItem("user", JSON.stringify(response.data));
        }
      } catch (error) {
        console.error("Failed to fetch user info:", error);
        if (isMounted) {
          clearUser();
          localStorage.removeItem("token");
          localStorage.removeItem("user");
          navigate("/login");
        }
      }
    };

    fetchUserInfo();

    return () => {
      isMounted = false;
    };
  }, [user, updateUser, clearUser, navigate]);

  return user;
};
