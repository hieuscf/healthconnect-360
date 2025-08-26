import React from "react";
import { useFormik } from "formik";
import { signInSchema } from "../lib/validate";
import { signUp } from "../lib/api";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";


export default function SignUpForm() {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: signInSchema,
    onSubmit: async (values, { resetForm }) => {
      try {
        const res = await signUp(values);
        if (res.success) {
          toast.success("Tạo tài khoản thành công!");
          resetForm(); // Clear 
          console.log("Tạo tài khoản thành công!")
          navigate("/signin");
        } else {
          toast.error("Tạo tài khoản thất bại!");
        }
      } catch (err: unknown) {
        console.log(err);
        if (err && typeof err === "object" && "response" in err) {
          const axiosError = err as {
            response?: { data?: { message?: string } };
          };
          toast.error(axiosError.response?.data?.message || "Đã xảy ra lỗi.");
        } else {
          toast.error("Lỗi không xác định.");
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
          className="block text-sm font-medium text-gray-700"
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
          className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm border-gray-300"
        />
        {formik.touched.email && formik.errors.email && (
          <p className="text-sm text-red-600 mt-1">{formik.errors.email}</p>
        )}
      </div>

      {/* Password */}
      <div>
        <label
          htmlFor="password"
          className="block text-sm font-medium text-gray-700"
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
          className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm border-gray-300"
        />
        {formik.touched.password && formik.errors.password && (
          <p className="text-sm text-red-600 mt-1">{formik.errors.password}</p>
        )}
      </div>

      {/* Submit */}
      <div>
        <button
          type="submit"
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
        >
          Create account
        </button>
      </div>
    </form>
  );
}
