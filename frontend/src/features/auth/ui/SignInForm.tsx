import React from "react";
import { useState } from "react";
import { useFormik } from "formik";
import { Eye, EyeOff } from "lucide-react";


import { signInSchema } from "../lib/validate";
import { signIn } from "../lib/api";
import { notify } from "../../../shared/lib/Notifications"
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../model/authStore";

interface SignInFormValues {
  email: string;
  password: string;
  rememberMe: boolean;
}

export default function SignInForm() {
  const navigate = useNavigate();
  const { login } = useAuthStore();
  const [showPassword, setShowPassword] = useState(false);
  const formik = useFormik<SignInFormValues>({
    initialValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
    validationSchema: signInSchema,
    onSubmit: async (values) => {
    try {
      const result = await signIn({
        email: values.email,
        password: values.password,
      });

      // Backend trả về: { accessToken, refreshToken, user }
      console.log("User data:", result.user);

      notify.success("Sign in success!");

      // Lưu accessToken vào localStorage
      localStorage.setItem("accessToken", result.accessToken);

      // Cập nhật Zustand store
      login(result.accessToken);

      // Điều hướng theo role
      const role = result.user.role;
      if (role === "admin") {
        navigate("/admin/dashboard");
      } else if (role === "doctor") {
        navigate("/doctor/home");
      } else {
        navigate("/");
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        notify.error(error.message);
      } else {
        notify.error("Sign in error.");
      }
    }
  },

  });

  return (
    <form onSubmit={formik.handleSubmit} className="space-y-6">
      {/* Email */}
      <div>
        <label
          htmlFor="email"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Email address
        </label>
        <input
          id="email"
          name="email"
          type="email"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.email}
          tabIndex={1} 
          className="block w-full px-3 py-2 border rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
        />
        {formik.touched.email && formik.errors.email && (
          <p className="text-sm text-red-500 mt-1">{formik.errors.email}</p>
        )}
      </div>

      {/* Password */}
      <div className="relative">
        <label
          htmlFor="password"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Password
        </label>
        <input
          id="password"
          name="password"
          type={showPassword ? "text" : "password"}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.password}
          tabIndex={2}
          className="block w-full px-3 py-2 border rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 pr-10"
        />
        <button
          type="button"
          className="absolute right-3 top-9 text-gray-500 hover:text-gray-700"
          onClick={() => setShowPassword((prev) => !prev)}
        >
          {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
        </button>
        {formik.touched.password && formik.errors.password && (
          <p className="text-sm text-red-500 mt-1">{formik.errors.password}</p>
        )}
      </div>

      {/* Remember Me */}
      <div className="flex items-center justify-between">
        <label className="flex items-center text-sm text-gray-700">
          <input
            id="rememberMe"
            name="rememberMe"
            type="checkbox"
            onChange={formik.handleChange}
            checked={formik.values.rememberMe}
            className="h-4 w-4 text-blue-600 border-gray-300 rounded"
          />
          <span className="ml-2">Remember me</span>
        </label>

        <a href="#" className="text-sm text-blue-600 hover:underline">
          Forgot password?
        </a>
      </div>

      {/* Submit */}
      <div>
        <button
          type="submit"
          tabIndex={3} 
          className="w-full py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
        >
          Sign in
        </button>
      </div>
    </form>
  );
}
