import React from "react";
import { FcGoogle } from "react-icons/fc";
import { FaInstagram } from "react-icons/fa";

export const SocialAuth = () => {
  const handleGoogleSignIn = () => {
    console.log("Google sign in clicked");
  };

  const handleInstagramSignIn = () => {
    console.log("Instagram sign in clicked");
  };

  return (
    <div className="mt-6 grid grid-cols-2 gap-3">
      <button
        type="button"
        onClick={handleGoogleSignIn}
        className="w-full inline-flex items-center justify-center gap-2 py-2 px-4 border rounded-md bg-white text-sm text-gray-500 hover:bg-gray-50"
      >
        <FcGoogle className="w-5 h-5" />
        Google
      </button>

      <button
        type="button"
        onClick={handleInstagramSignIn}
        className="w-full inline-flex items-center justify-center gap-2 py-2 px-4 border rounded-md bg-white text-sm text-gray-500 hover:bg-gray-50"
      >
        <FaInstagram className="w-5 h-5 text-pink-500" />
        Instagram
      </button>
    </div>
  );
};
