import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { useEffect, useState } from "react";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import { Upload } from "lucide-react";
import { imgUpload } from "@/components/imgUpload";

const SettingsModal = ({ open, setOpen, member, refetch }) => {
  const [role, setRole] = useState("");
  const [isActive, setIsActive] = useState("");
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [photo, setPhoto] = useState(null);
  const [preview, setPreview] = useState(null);
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    setRole(member?.role || "user");
    setIsActive(member?.isActive ?? true);
    setName(member?.name || "");
    setPhoneNumber(member?.phoneNumber || "");
    setPhoto(null);
    setPreview(member?.photoURL || null);
  }, [member?._id]);

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPhoto(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUpdate = async () => {
    let photoURL = member?.photoURL;
    if (photo) {
      try {
        photoURL = await imgUpload(photo);
        console.log(await photoURL);
      } catch (error) {
        toast.error("Failed to upload photo");
        return;
      }
    }

    const updateData = {
      role,
      isActive,
      name,
      phoneNumber,
      ...(photoURL && { photoURL }),
    };

    toast.promise(
      axiosSecure.patch(`/users/update-status/${member._id}`, updateData),
      {
        loading: "Updating Status...",
        success: (response) => {
          if (response.data.modifiedCount > 0) {
            setOpen(false);
            refetch();
            return <b>Member updated successfully!</b>;
          }
          return "No changes made.";
        },
        error: (error) => {
          console.error(error);
          return error.response?.data?.error || "Failed to update member";
        },
      }
    );
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Member Settings</DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col gap-2">
            <Label>Name</Label>
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter name"
            />
          </div>

          <div className="flex flex-col gap-2">
            <Label>Phone Number</Label>
            <Input
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              placeholder="Enter phone number"
              type="tel"
            />
          </div>

          <div className="flex flex-col gap-2">
            <Label>Change Role</Label>
            <Select value={role} onValueChange={setRole}>
              <SelectTrigger>
                <SelectValue placeholder="Select Role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="admin">Admin</SelectItem>
                <SelectItem value="user">Member</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex flex-col gap-2">
            <Label>Change Status</Label>
            <Select
              value={isActive.toString()}
              onValueChange={(val) => setIsActive(val === "true")}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="true">Active</SelectItem>
                <SelectItem value="false">Inactive</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex flex-col gap-2 col-span-2 w-full">
            {/* <Label>Profile Photo</Label> */}
            <div className="flex items-center gap-2">
              {preview && (
                <img
                  src={preview}
                  alt="Profile preview"
                  className="w-16 h-16 rounded-full object-cover"
                />
              )}
              <div className="relative w-full">
                <Input
                  type="file"
                  accept="image/*"
                  onChange={handlePhotoChange}
                  className="hidden w-full"
                  id="photo-upload"
                />
                <Label
                  htmlFor="photo-upload"
                  className="cursor-pointer flex items-center gap-2 bg-secondary text-secondary-foreground px-4 py-2 rounded-md justify-center"
                >
                  <Upload className="w-4 h-4" />
                  Upload Photo
                </Label>
              </div>
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button
            onClick={handleUpdate}
            className="w-full bg-primary text-white"
          >
            Save Changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default SettingsModal;
