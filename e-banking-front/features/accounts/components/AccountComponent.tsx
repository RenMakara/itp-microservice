"use client";

import React, { useState, useEffect } from "react";
import {
  User,
  Mail,
  Phone,
  Calendar,
  Edit2,
  Camera,
} from "lucide-react";

/* =======================
   Backend-aligned DTO
======================= */
interface ProfileData {
  uuid: string;
  username: string;
  email: string;
  givenName: string;
  familyName: string;
  phoneNumber?: string;
  gender?: string;
  dob?: string; // yyyy-MM-dd
  profileImage?: string;
  coverImage?: string;
}

/* =======================
   Reusable Info Item
======================= */
interface InfoItemProps {
  icon: React.ReactNode;
  label: string;
  value: string;
  editable: boolean;
}

const InfoItem: React.FC<InfoItemProps> = ({
  icon,
  label,
  value,
  editable,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [inputValue, setInputValue] = useState(value);

  return (
    <div className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50">
      <div className="text-gray-400 mt-1">{icon}</div>
      <div className="flex-1">
        <p className="text-sm text-gray-500 font-medium">{label}</p>

        {editable && isEditing ? (
          <input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onBlur={() => setIsEditing(false)}
            autoFocus
            className="mt-1 w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
          />
        ) : (
          <p
            className={`mt-1 font-medium ${
              editable ? "cursor-pointer hover:text-blue-600" : ""
            }`}
            onClick={() => editable && setIsEditing(true)}
          >
            {value}
          </p>
        )}
      </div>

      {editable && !isEditing && (
        <button onClick={() => setIsEditing(true)}>
          <Edit2 className="w-4 h-4 text-gray-400 hover:text-blue-500" />
        </button>
      )}
    </div>
  );
};

/* =======================
   Page Component
======================= */
export default function Page() {
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      setLoading(true);

      const response = await fetch("http://localhost:9990/auth/me", {
        credentials: "include",
        headers: { Accept: "application/json" },
      });

      if (response.status === 401) {
        window.location.href = "/logout";
        return;
      }

      if (!response.ok) {
        throw new Error(`Server error: ${response.status}`);
      }

      const data: ProfileData = await response.json();
      setProfile(data);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Unknown error");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full" />
      </div>
    );
  }

  if (!profile || error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-500 mb-4">Failed to load profile</p>
          <button
            onClick={fetchProfile}
            className="px-4 py-2 bg-blue-500 text-white rounded"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  const fullName = `${profile.givenName} ${profile.familyName}`;
  const initials = `${profile.givenName ?? ""}${profile.familyName ?? ""}`;

  return (
    <div className="min-h-screen bg-white py-8 px-4">
      <div className="max-w-5xl mx-auto">

        {/* Cover */}
        <div className="relative h-64 bg-gray-200 rounded-t-3xl overflow-hidden">
          {profile.coverImage && (
            <img src={profile.coverImage} className="w-full h-full object-cover" />
          )}
          <button className="absolute bottom-4 right-4 bg-white px-4 py-2 rounded-lg shadow">
            <Camera className="w-4 h-4 inline mr-2" />
            Change Cover
          </button>
        </div>

        {/* Header */}
        <div className="relative px-8 pb-8 -mt-20">
          <div className="flex justify-between items-end">
            <div className="w-36 h-36 rounded-full border-4 bg-blue-500 text-white flex items-center justify-center text-4xl font-bold">
              {profile.profileImage ? (
                <img src={profile.profileImage} className="w-full h-full rounded-full object-cover" />
              ) : (
                initials
              )}
            </div>

            <button
              onClick={() => setIsEditing(!isEditing)}
              className="bg-blue-500 text-white px-6 py-3 rounded-xl"
            >
              <Edit2 className="inline w-4 h-4 mr-2" />
              {isEditing ? "Cancel" : "Edit Profile"}
            </button>
          </div>

          <h1 className="text-4xl font-bold mt-6">{fullName}</h1>
          <p className="text-blue-600">@{profile.username}</p>
        </div>

        {/* Info Cards */}
        <div className="grid md:grid-cols-2 gap-6 mt-6">
          <div className="bg-white shadow rounded-2xl p-6">
            <h2 className="font-bold text-xl mb-4">Personal Info</h2>

            <InfoItem icon={<User />} label="Email" value={profile.email} editable={isEditing} />
            <InfoItem icon={<Phone />} label="Phone" value={profile.phoneNumber ?? "Not set"} editable={isEditing} />
          </div>

          <div className="bg-white shadow rounded-2xl p-6">
            <h2 className="font-bold text-xl mb-4">Additional</h2>

            <InfoItem icon={<User />} label="Gender" value={profile.gender ?? "Not set"} editable={isEditing} />
            <InfoItem
              icon={<Calendar />}
              label="Date of Birth"
              value={
                profile.dob
                  ? new Date(profile.dob).toLocaleDateString()
                  : "Not set"
              }
              editable={false}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
