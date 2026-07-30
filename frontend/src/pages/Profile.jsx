import React from "react";
import { FaUserCircle, FaEnvelope, FaIdBadge } from "react-icons/fa";

const Profile = () => {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <div className="min-h-screen flex justify-center items-center bg-[#030712] px-4">
      <div className="bg-slate-900 border border-blue-500/20 rounded-3xl p-10 shadow-xl max-w-lg w-full">

        <div className="flex flex-col items-center">

          <FaUserCircle className="text-8xl text-blue-400 mb-4"/>

          <h1 className="text-3xl font-bold text-white">
            {user?.name || "User"}
          </h1>

          <p className="text-slate-400">
            AI Resume Maker Member
          </p>

        </div>

        <div className="mt-10 space-y-5">

          <div className="flex items-center gap-4">
            <FaEnvelope className="text-blue-400"/>
            <span>{user?.email}</span>
          </div>

          <div className="flex items-center gap-4">
            <FaIdBadge className="text-blue-400"/>
            <span>{user?.id}</span>
          </div>

        </div>

      </div>
    </div>
  );
};

export default Profile;