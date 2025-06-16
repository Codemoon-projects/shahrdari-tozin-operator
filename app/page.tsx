"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import fetcher from "@/lib/axios";
import { useAuth } from "@/hooks/common/useAuth";
import Image from "next/image";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { loginUser, error, loading } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    loginUser({ username, password });
  };

  return (
    <main
      className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100"
      style={{ fontFamily: "IRANSans, Tahoma, Arial, sans-serif" }}
    >
      <div className="w-full max-w-md mx-4">
        {/* Government Header */}
        <div className="text-center mb-8 justify-cneter flex flex-col items-center space-y-2">
          <Image
            src="/logo.png"
            alt="Logo"
            className="w-40 h-40"
            width={160}
            height={160}
          />
          <h1 className="text-2xl font-bold text-slate-800 mb-2">
            سامانه توزین شهرداری اردبیل
          </h1>
          <p className="text-slate-600 text-sm">ورود به پنل اپراتور</p>
        </div>

        {/* Login Card */}
        <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-8">
          {error && (
            <div className="bg-red-50 border border-red-200 p-4 rounded-md text-red-700 text-sm mb-6 text-right">
              <div className="flex items-center">
                <svg
                  className="w-4 h-4 ml-2 flex-shrink-0"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                    clipRule="evenodd"
                  />
                </svg>
                <span>{error}</span>
              </div>
            </div>
          )}

          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="username"
                className="block text-sm font-medium text-slate-700 mb-2 text-right"
              >
                نام کاربری
              </label>
              <input
                id="username"
                name="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-4 py-3 text-right border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                placeholder="نام کاربری خود را وارد کنید"
                dir="rtl"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-slate-700 mb-2 text-right"
              >
                رمز عبور
              </label>
              <input
                id="password"
                name="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 text-right border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                placeholder="رمز عبور خود را وارد کنید"
                dir="rtl"
              />
            </div>

            <div className="pt-4">
              <button
                type="submit"
                disabled={loading}
                className="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {loading ? (
                  <>
                    <svg
                      className="animate-spin -ml-1 mr-3 h-4 w-4 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    در حال ورود...
                  </>
                ) : (
                  "ورود"
                )}
              </button>
            </div>
          </form>

          {/* Footer */}
          <div className="mt-8 pt-6 border-t border-slate-200">
            <p className="text-center text-xs text-slate-500">
              © ۱۴۰۳ سامانه مدیریت شهرداری - تمامی حقوق محفوظ است
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
