"use client";

import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/app/hooks/hooks";
import { fetchUserData } from "@/app/redux/slices/authSlice";
import Navbar from "@/component/navbar";

export default function ProfilePage() {
  const dispatch = useAppDispatch();
  const { userData, loading, error } = useAppSelector((state) => state.auth);

  useEffect(() => {
    dispatch(fetchUserData());
  }, [dispatch]);

  console.log(userData);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="flex items-center justify-center h-[calc(100vh-64px)]">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="flex items-center justify-center h-[calc(100vh-64px)]">
          <div className="text-red-600 text-lg">Error: {error}</div>
        </div>
      </div>
    );
  }

  if (!userData) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="flex items-center justify-center h-[calc(100vh-64px)]">
          <div className="text-gray-600 text-lg">
            Please log in to view your profile
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">Profile</h1>

          <div className="space-y-4">
            <div className="border-b pb-4">
              <h2 className="text-sm font-medium text-gray-500">Name</h2>
              <p className="mt-1 text-lg text-gray-900">{userData.data.name}</p>
            </div>

            <div className="border-b pb-4">
              <h2 className="text-sm font-medium text-gray-500">Email</h2>
              <p className="mt-1 text-lg text-gray-900">
                {userData.data.email}
              </p>
            </div>

            <div className="border-b pb-4">
              <h2 className="text-sm font-medium text-gray-500">User ID</h2>
              <p className="mt-1 text-lg text-gray-900">
                {userData.data.userId}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
