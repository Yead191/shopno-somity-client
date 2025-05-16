"use client";

import { useState } from "react";
import PropTypes from "prop-types";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Upload, User } from "lucide-react";
import { imgUpload } from "@/components/imgUpload";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import { toast } from "sonner";
import { useAuthUser } from "@/redux/auth/authAction";
import { updateProfile } from "firebase/auth";
import auth from "@/firebase/firebase.init";

export function UpdateProfileModal({
  isOpen,
  onClose,
  defaultValues = {},
  refetch,
}) {
  const axiosSecure = useAxiosSecure();
  const user = useAuthUser();
  const [name, setName] = useState(defaultValues.name || "");
  const [number, setNumber] = useState(defaultValues.phoneNumber || "");
  const [photoUrl, setPhotoUrl] = useState(defaultValues.photo || "");
  const [previewUrl, setPreviewUrl] = useState(defaultValues.photo || "");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handlePhotoChange = async (e) => {
    const file = e.target.files?.[0];
    if (file) {
      // Create a preview URL for the selected image
      const url = await imgUpload(file);
      setPreviewUrl(url);
      // In a real app, you would upload the file to a server here
      // and then set the photoUrl to the URL returned by the server
      // For this example, we'll just use the preview URL
      setPhotoUrl(url);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    const updateData = {
      name,
      phoneNumber: number,
      photo: photoUrl,
    };
    console.log(updateData);
    try {
      //   await onSubmit({ name, number, photoUrl });
      //   onClose();
      await updateProfile(auth.currentUser, {
        displayName: name,
        photoURL: photoUrl,
      });

      toast.promise(
        axiosSecure.patch(
          `/users/update-profile?email=${user.email}`,
          updateData
        ),
        {
          loading: "Updating Profile...",
          success: (res) => {
            console.log(res);
            refetch();
            setIsSubmitting(false);
            onClose();
            return <b>Profile Updated Successfully!</b>;
          },
          error: (err) => err.message,
        }
      );
    } catch (error) {
      console.error("Error updating profile:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Update Profile</DialogTitle>
          <DialogDescription>
            Make changes to your profile information here.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-6 py-4">
            <div className="flex flex-col items-center gap-4">
              <Avatar className="h-24 w-24">
                <AvatarImage
                  src={previewUrl || "/placeholder.svg"}
                  alt="Profile"
                />
                <AvatarFallback>
                  <User className="h-12 w-12 text-muted-foreground" />
                </AvatarFallback>
              </Avatar>
              <div className="flex items-center gap-2">
                <Label
                  htmlFor="photo-upload"
                  className="cursor-pointer inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2"
                >
                  <Upload className="mr-2 h-4 w-4" />
                  Upload Photo
                </Label>
                <Input
                  id="photo-upload"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handlePhotoChange}
                />
              </div>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your name"
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="number">Phone Number</Label>
              <Input
                id="number"
                value={number}
                onChange={(e) => setNumber(e.target.value)}
                placeholder="Enter your phone number"
                type="tel"
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Saving..." : "Save changes"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

UpdateProfileModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  defaultValues: PropTypes.shape({
    name: PropTypes.string,
    number: PropTypes.string,
    photoUrl: PropTypes.string,
  }),
  onSubmit: PropTypes.func.isRequired,
};
