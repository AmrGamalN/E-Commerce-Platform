"use client";

import { Stats } from "@/components/Stats";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/UI/card";
import { UserHeader } from "@/components/UserHeader";
import { EyeOff } from "lucide-react";
import { useParams } from "next/navigation";
import { ReviewCard } from "@/components/ReviewCard";

// Mock data
const mockUser = {
  id: "123",
  name: "Alex Johnson",
  avatarUrl: "",
  joinDate: "Jan 2023",
  isVerified: true,
  location: "Portland, OR",
  stats: {
    purchases: 27,
    followingSellers: 14,
    favoriteItems: 45
  },
  purchases: [
    { id: "1", title: "Vintage Denim Jacket", date: "2023-04-15", status: "completed", price: 34.99 },
    { id: "2", title: "Retro Polaroid Camera", date: "2023-03-22", status: "completed", price: 55.00 },
    { id: "3", title: "Mid-Century Coffee Table", date: "2023-02-05", status: "completed", price: 120.50 }
  ],
  reviews: [
    { 
      id: "1", 
      reviewer: "VintageSeller42", 
      rating: 5, 
      comment: "Great buyer! Quick payment and excellent communication.", 
      date: "2023-04-17", 
      productTitle: "Vintage Denim Jacket" 
    },
    { 
      id: "2", 
      reviewer: "RetroFinds", 
      rating: 5, 
      comment: "Smooth transaction, would definitely sell to again!", 
      date: "2023-03-24", 
      productTitle: "Retro Polaroid Camera" 
    },
    { 
      id: "3", 
      reviewer: "ModernVintage", 
      rating: 4, 
      comment: "Reliable buyer, paid promptly.", 
      date: "2023-02-07", 
      productTitle: "Mid-Century Coffee Table" 
    }
  ]
};

const BuyerProfile = () => {
  const { id: userId } = useParams<{ id: string }>();
  // const { user } = useAuth();
    
  return (
    <div className="container py-8 max-w-5xl">
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center gap-2">
          <EyeOff className="h-5 w-5 text-green-70" />
          <span className="text-sm font-medium bg-green-20 text-green-80 px-2 py-1 rounded">Private Profile</span>
        </div>
      </div>
      
      <UserHeader 
        userId={userId || mockUser.id}
        name={mockUser.name}
        avatarUrl={mockUser.avatarUrl}
        joinDate={mockUser.joinDate}
        isVerified={mockUser.isVerified}
        location={mockUser.location}
        profileType="buyer"
      />
            
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Stats title="Total Purchases" value={mockUser.stats.purchases} />
        <Stats title="Following Sellers" value={mockUser.stats.followingSellers} />
        <Stats title="Favorite Items" value={mockUser.stats.favoriteItems} />
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2 border-green-20">
          <CardHeader className="bg-green-10/50 flex flex-row justify-between items-center">
            <div>
              <CardTitle className="text-green-80">Reviews as Buyer</CardTitle>
              <CardDescription>What sellers are saying about {mockUser.name}</CardDescription>
            </div>
          </CardHeader>
          <CardContent className="pt-6">
            {mockUser.reviews.map(review => (
              <ReviewCard key={review.id} review={review} type="buyer" />
            ))}
          </CardContent>
        </Card>
        
        <Card className="border-green-20">
          <CardHeader className="bg-green-10/50 flex flex-row justify-between items-center">
            <div>
              <CardTitle className="text-green-80">Recent Purchases</CardTitle>
              <CardDescription>Items bought recently</CardDescription>
            </div>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="space-y-4">
              {mockUser.purchases.map(purchase => (
                <div key={purchase.id} className="flex justify-between items-start border-b border-green-30 pb-3 last:border-0">
                  <div>
                    <p className="font-medium">{purchase.title}</p>
                    <p className="text-sm text-gray-50">{purchase.date}</p>
                  </div>
                  <span className="font-semibold text-green-70">${purchase.price.toFixed(2)}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default BuyerProfile;