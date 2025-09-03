import { useEffect, useState } from "react";
import { registerUser, loginUser } from "../api/auth";
import Swal from "sweetalert2";
import { AuthContext } from "./AuthContext";

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Load user from localStorage when app starts
  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    const token = localStorage.getItem("token");

    if (savedUser && token) {
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  // ✅ Register Function
  const register = async (formData) => {
    try {
      const data = await registerUser(formData);
      setUser(data.user);
      localStorage.setItem("user", JSON.stringify(data.user));
      localStorage.setItem("token", data.token);
      Swal.fire("Success!", "Account created successfully!", "success");
      return data;
    } catch (err) {
      Swal.fire(
        "Error",
        err.response?.data?.msg || "Something went wrong",
        "error"
      );
      throw err;
    }
  };

  // ✅ Login Function
  const login = async (formData) => {
    try {
      const data = await loginUser(formData);
      setUser(data.user);
      localStorage.setItem("user", JSON.stringify(data.user));
      localStorage.setItem("token", data.token);
      Swal.fire("Welcome!", "Logged in successfully!", "success");
      return data;
    } catch (err) {
      Swal.fire(
        "Error",
        err.response?.data?.msg || "Invalid credentials",
        "error"
      );
      throw err;
    }
  };

  // ✅ Logout Function
  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    Swal.fire("Logged out!", "See you soon!", "info");
  };

  return (
    <AuthContext.Provider value={{ user, loading, register, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
