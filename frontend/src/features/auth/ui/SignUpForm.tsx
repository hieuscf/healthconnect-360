import React ,{ useState } from "react";
import { useFormik } from "formik";
import { Eye, EyeOff } from "lucide-react";

import { signInSchema } from "../lib/validate";
import { signUp } from "../lib/api";
import { notify } from "../../../shared/lib/Notifications/Notification";
import { useNavigate } from "react-router-dom";


export default function SignUpForm() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
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
          notify.success("Tạo tài khoản thành công!");
          resetForm(); // Clear 
          console.log("Tạo tài khoản thành công!")
          navigate("/signin");
        } else {
          notify.error("Tạo tài khoản thất bại!");
        }
      } catch (err: unknown) {
        console.log(err);
        if (err && typeof err === "object" && "response" in err) {
          const axiosError = err as {
            response?: { data?: { message?: string } };
          };
          notify.error(axiosError.response?.data?.message || "Đã xảy ra lỗi.");
        } else {
          notify.error("Lỗi không xác định.");
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
          tabIndex={1} 
          className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm border-gray-300"
        />
        {formik.touched.email && formik.errors.email && (
          <p className="text-sm text-red-600 mt-1">{formik.errors.email}</p>
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

      {/* Submit */}
      <div>
        <button
          type="submit"
          tabIndex={1} 
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
        >
          Create account
        </button>
      </div>
    </form>
  );
}
