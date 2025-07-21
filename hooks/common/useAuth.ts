"use client";

import { useState } from "react";
import Cookies from "js-cookie";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { logoutUser, setUser } from "@/store/core/auth";
import { useRouter } from "next/navigation";
import fetcher, { axiosNoUser } from "@/lib/axios";

export function useAuth() {
  const [loading, loadingHandler] = useState(false);
  const [error, errorHandler] = useState<string | null>(null);
  const user_data = useAppSelector((store) => store.auth.data);
  const dispatch = useAppDispatch();
  const router = useRouter();

  const loginUser = async (params: { username: string; password: string }) => {
    if (!params.username || !params.password) {
      errorHandler("لطفا نام کاربری و رمز عبور را به طور صحیح وارد کنید");
      return;
    }
    loadingHandler(true);
    errorHandler("");

    try {
      const response = await axiosNoUser.post("login/", params);

      console.log("status", response.status);
      console.log("OKOKOOKOKOKOKO");

      console.log("-->>", response.data);
      if (response.status !== 200) {
        throw new Error(response.data.error || "Login failed");
      }

      const { access, refresh, user } = response.data;

      // Store tokens in cookies (for middleware auth check)
      Cookies.set("accessToken", access, { expires: 7 }); // 7 days expiry
      Cookies.set("refreshToken", refresh, { expires: 14 });

      // Also store in localStorage as backup
      localStorage.setItem("accessToken", access);
      localStorage.setItem("refreshToken", refresh);
      localStorage.setItem("user", JSON.stringify(user));

      console.log("Login successful, redirecting to Dashboard...");

      // // Force page reload to trigger middleware for redirection
      window.location.href = "/Dashboard";
    } catch (err: any) {
      console.error("Login error:", err);
      errorHandler(err.message || "An error occurred during login");
    } finally {
      loadingHandler(false);
    }
  };

  const logout = async () => {
    dispatch(logoutUser());
    router.push("/");
    const response = await fetcher.get("/auth/logout");
  };

  return {
    loginUser,
    user_data,
    loading,
    error,
    logout,
  };
}
