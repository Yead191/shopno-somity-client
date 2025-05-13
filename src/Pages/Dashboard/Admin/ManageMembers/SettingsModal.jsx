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
import { toast } from "sonner";
import { useEffect, useState } from "react";
import useAxiosSecure from "@/hooks/useAxiosSecure";

const SettingsModal = ({ open, setOpen, member, refetch }) => {
  //   console.log(member);
  const [role, setRole] = useState("");
  const [isActive, setIsActive] = useState("");
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    setRole(member.role);
    setIsActive(member.isActive ?? true);
  }, [member._id]);

  const handleUpdate = () => {
    toast.promise(
      axiosSecure.patch(`/users/update-status/${member._id}`, {
        role,
        isActive,
      }),
      {
        loading: "Updating Status...",
        success: () => {
          setOpen(false);
          refetch();
          return <b>Member updated successfully!</b>;
        },
        error: (error) => {
          console.error(error);
          return "Failed to update member";
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

        <div className="flex justify-between items-center">
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
