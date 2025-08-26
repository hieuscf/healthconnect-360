import React from "react";
import { useFormik } from "formik";
import { signInSchema } from "../lib/validate";
import { signIn } from "../lib/api";
import { toast } from "react-toastify";
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

        toast.success("Đăng nhập thành công!");
        localStorage.setItem("accessToken", result.token.accessToken);

        login(result.token.accessToken);
        console.log("User data:", result.token); //log test user data

        // Điều hướng dựa vào vai trò
        const role = result.token.user.role;
        if (role === "admin") {
          navigate("/admin/dashboard");
        } else if (role === "doctor") {
          navigate("/doctor/home");
        } else {
          navigate("/home"); 
        }

        // navigate("/dashboard");
      } catch (error: unknown) {
        if (error instanceof Error) {
          toast.error(error.message);
        } else {
          toast.error("Đăng nhập thất bại.");
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
          className="block w-full px-3 py-2 border rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
        />
        {formik.touched.email && formik.errors.email && (
          <p className="text-sm text-red-500 mt-1">{formik.errors.email}</p>
        )}
      </div>

      {/* Password */}
      <div>
        <label
          htmlFor="password"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Password
        </label>
        <input
          id="password"
          name="password"
          type="password"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.password}
          className="block w-full px-3 py-2 border rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
        />
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
          className="w-full py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
        >
          Sign in
        </button>
      </div>
    </form>
  );
}
