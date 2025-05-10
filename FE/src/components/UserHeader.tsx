/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { Check, Edit } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import Image from "next/image";
import { EditProfileModal } from "./EditProfileModal";

type UserHeaderProps = {
  userId: string;
  name: string;
  avatarUrl: string;
  joinDate: string;
  isVerified: boolean;
  location: string;
  profileType?: "buyer" | "seller";
}

export const UserHeader = ({ 
  userId, 
  name, 
  avatarUrl, 
  joinDate, 
  isVerified, 
  location,
  profileType = "seller" 
}: UserHeaderProps) => {
  const { user } = useAuth();
  const isOwner = user?.userId === String(userId);

  // Mock function to save profile data
  const handleSaveProfile = (data: any) => {
    console.log("Saving profile data:", data);
  };

  return (
    <div className="flex flex-col md:flex-row items-center md:items-start gap-6 mb-8">
      <div className="relative">
        <div className="w-24 h-24 rounded-full overflow-hidden bg-green-20 border-4 border-white shadow-md">
          {avatarUrl ? (
            <Image 
              src={avatarUrl} 
              alt={name} 
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-2xl font-bold text-green-70">
              {name.substring(0, 1).toUpperCase()}
            </div>
          )}
        </div>
        {isVerified && (
          <div className="absolute bottom-0 right-0 bg-green-50 rounded-full p-1 border-2 border-white">
            <Check className="h-3 w-3 text-white" />
          </div>
        )}
        
        {isOwner && (
          <div className="absolute top-0 right-0 bg-white rounded-full p-1 border border-green-20 shadow-sm cursor-pointer">
            <Edit className="h-3 w-3 text-green-70" />
          </div>
        )}
      </div>
      
      <div className="text-center md:text-left">
        <div className="flex flex-col md:flex-row md:items-center gap-2 mb-1">
          <h1 className="text-2xl font-bold text-green-90">{name}</h1>
          {isVerified && (
            <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-20 text-green-80">
              <Check className="h-3 w-3 mr-1" />
              Verified
            </span>
          )}
        </div>
        <div className="text-sm text-gray-500 mb-3">
          <span>Member since {joinDate}</span>
          {location && (
            <>
              <span className="mx-2">•</span>
              <span>{location}</span>
            </>
          )}
        </div>
        <div className="flex flex-wrap justify-center md:justify-start gap-2">
          {/* {!isOwner && (
            <Button size="sm" variant="btn-primary" className="border-green-10 bg-green-10 hover:bg-green-50">
              Message
            </Button>
          )} */}
          
          {isOwner ? (
            <EditProfileModal 
              profileType={profileType} 
              userData={{ name, avatarUrl, location, joinDate }}
              onSave={handleSaveProfile}
            />
          ) : <></>
          // (
          //   <Button size="sm" className="bg-green-60 hover:bg-green-70">
          //     Follow
          //   </Button>
          // )
          }
        </div>
      </div>
    </div>
  );
};
