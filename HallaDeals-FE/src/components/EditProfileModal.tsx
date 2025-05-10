/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/UI/Dialog";
import { Edit } from "lucide-react";
import { useForm } from "react-hook-form";
import Button from "./UI/Button";
import { Input } from "./UI/input";
import { toast } from "sonner";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "./UI/form";
import { Textarea } from "./UI/textarea";

interface EditProfileModalProps {
  profileType: "buyer" | "seller";
  userData: any; // Replace with proper type when available
  onSave: (data: any) => void;
}

export const EditProfileModal = ({ profileType, userData, onSave }: EditProfileModalProps) => {
  const [open, setOpen] = useState(false);
  
  const form = useForm({
    defaultValues: {
      name: userData.name || "",
      location: userData.location || "",
      avatarUrl: userData.avatarUrl || "",
      bio: userData.bio || "",
      email: userData.email || "",
    }
  });

  const handleSubmit = (data: any) => {
    onSave(data);
    toast.success(
       "Profile Updated", {
        description: "Your profile changes have been saved.",
       }
    );
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="sm" className="bg-green-70 hover:bg-green-80 text-white flex items-center gap-1">
          <Edit className="h-4 w-4" /> 
          Edit Profile
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit {profileType === "buyer" ? "Buyer" : "Seller"} Profile</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you&rsquo;re done.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Your name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="location"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Location</FormLabel>
                  <FormControl>
                    <Input placeholder="City, State" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="avatarUrl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Profile Image URL</FormLabel>
                  <FormControl>
                    <Input placeholder="https://example.com/image.jpg" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="bio"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Bio</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Tell us about yourself" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input type="email" placeholder="your@email.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            {profileType === "seller" && (
              <div className="pt-4 border-t">
                <h4 className="text-sm font-medium mb-2">Seller Information</h4>
                <div className="text-xs text-gray-500">
                  Note: Statistics like total sales, average rating, and reviews are calculated automatically and cannot be edited.
                </div>
              </div>
            )}
            
            {profileType === "buyer" && (
              <div className="pt-4 border-t">
                <h4 className="text-sm font-medium mb-2">Buyer Information</h4>
                <div className="text-xs text-gray-500">
                  Note: Purchase history and favorite items are updated automatically and cannot be edited here.
                </div>
              </div>
            )}
            
            <DialogFooter>
              <Button type="submit">Save changes</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};