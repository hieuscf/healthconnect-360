import React from "react";
import ProfileHeader from "../../features/Users/profile/ui/ProfileHeader";
import { Edit, Facebook, Twitter, Linkedin, Instagram } from "lucide-react";
import PersionalInfomation from "../../features/Users/profile/ui/PersionalInfomation";
import ProfileAddress from "../../features/Users/profile/ui/ProfileAddress";

const Profile = () => {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 space-y-6">
      <ProfileHeader />
      <PersionalInfomation />
      <ProfileAddress />
    </div>
  );
};

export default Profile;
