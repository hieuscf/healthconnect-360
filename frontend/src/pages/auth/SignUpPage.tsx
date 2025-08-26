import React from "react";
import { Link } from "react-router-dom";
import  SignUpForm  from "../../features/auth/ui/SignUpForm";
import { SocialAuth } from "../../features/auth/ui/SocialAuth";
import { Divider } from "../../features/auth/ui/Divider";
import { Logo } from "../../shared/components/Logo";

export const SignUpPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center mb-8">
          <Link to="/">
            <Logo />
          </Link>
        </div>

        <h2 className="text-center text-2xl font-semibold text-gray-900 mb-8">
          Sign up to your account
        </h2>

        <div className="bg-white py-8 px-4 shadow-sm sm:rounded-lg sm:px-10 border border-gray-200">
          <SignUpForm />

          <Divider />

          <SocialAuth />

          <div className="mt-6 text-center text-sm text-gray-600">
            Already have an account?{" "}
            <Link
              to="/signin"
              className="font-medium text-blue-600 hover:text-blue-500"
            >
              Sign in here
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
