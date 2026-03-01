import API_BASE_URL from "../apiConfig";
import React, { useEffect, useState } from "react";
import UserProfile from "../layouts/UserProfile";
import UserForm from "../layouts/UserForm";

const ProfilePage = () => {
  const [userProfile, setUserProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);

  const fetchProfile = async () => {
    try {
      const token = localStorage.getItem("token");
      const userId = localStorage.getItem("userid");
      if (!userId) return;

      const response = await fetch(`${API_BASE_URL}/auth/${userId}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const data = await response.json();
        setUserProfile(data);
      }
    } catch (error) {
      console.error("Error fetching profile:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const handleProfileUpdate = () => {
    setIsEditing(false);
    fetchProfile(); // Refresh after update
  };

  if (loading) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center animate-pulse">
        <div className="w-24 h-24 rounded-full bg-pink-100 dark:bg-slate-800 flex items-center justify-center mb-6">
          <div className="w-12 h-12 rounded-full border-4 border-pink-500 border-t-transparent animate-spin"></div>
        </div>
        <p className="text-xs font-black text-pink-500 uppercase tracking-[0.3em] animate-bounce">Syncing Profile...</p>
      </div>
    );
  }

  if (isEditing) {
    return <UserForm existingData={userProfile} onCancel={() => setIsEditing(false)} onSuccess={handleProfileUpdate} />;
  }

  return (
    <div className="py-6 transition-all duration-500">
      <UserProfile user={userProfile} onEdit={userProfile ? () => setIsEditing(true) : () => setIsEditing(true)} />
    </div>
  );
};

export default ProfilePage;
