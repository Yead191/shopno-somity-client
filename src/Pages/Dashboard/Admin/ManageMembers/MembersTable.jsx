import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
// import { Avatar, AvatarImage } from "@radix-ui/react-avatar";
import { format } from "date-fns";
import { Loader, MoreVertical, Trash } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import axios from "axios";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

// Sample data based on the Excel sheet

const MembersTable = ({ members, isLoading }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [selectedMemberId, setSelectedMemberId] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  // const handleMemberDelete = async () => {
  //   setIsDeleting(true);
  //   try {
  //     const { data } = await axios.delete(
  //       `${
  //         import.meta.env.VITE_API_URL
  //       }/cooperative/members/${selectedMemberId}`
  //     );

  //     if (data?.deletedCount) {
  //       refetch();
  //       setIsOpen(false);
  //       setErrorMessage("");
  //       toast("Member Deleted", {
  //         description: `${selectedMemberId} Was Successfully Deleted!`,
  //         duration: 3000,
  //         position: "top-right",
  //       });
  //     } else {
  //       setErrorMessage("Member could not be deleted, Please try again!");
  //     }
  //   } catch (error) {
  //     const message =
  //       error?.response?.data?.message ||
  //       "Something went wrong while deleting the member!";
  //     setErrorMessage(message);
  //   } finally {
  //     setIsDeleting(false);
  //   }
  // };

  return (
    <Table className={"mt-6"}>
      <TableCaption>A List Of All Cooperative Society Members</TableCaption>
      <TableHeader>
        <TableRow className={"bg-gray-50 hover:bg-gray-50"}>
          <TableHead>Name</TableHead>
          <TableHead>Member ID</TableHead>
          <TableHead>Phone Number</TableHead>
          <TableHead>Join Date</TableHead>
          <TableHead>Total Contributions</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {isLoading
          ? Array.from({ length: 5 }).map((_, i) => (
              <TableRow key={i}>
                {Array.from({ length: 6 }).map((_, j) => (
                  <TableCell key={j}>
                    <div className="skeleton h-8 rounded w-full"></div>
                  </TableCell>
                ))}
              </TableRow>
            ))
          : members?.map((member, i) => (
              <TableRow key={i}>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarImage
                        src={member?.photo}
                        alt="Member Image"
                        className="min-w-10 max-w-10 rounded-full h-10 object-cover"
                      />
                      <AvatarFallback className="min-w-10 max-w-10 rounded-full h-10 object-cover">
                        {member?.name
                          ? member.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")
                              .toUpperCase()
                          : "NA"}
                      </AvatarFallback>
                    </Avatar>
                    <span>{member?.name}</span>
                  </div>
                </TableCell>
                <TableCell>{member?.memberId}</TableCell>
                <TableCell>{member?.phoneNumber}</TableCell>
                <TableCell>
                  {member?.joinDate
                    ? format(new Date(member.joinDate), "dd MMM yyyy")
                    : "N/A"}
                </TableCell>
                <TableCell>
                  ৳{member?.totalContributions.toLocaleString()}
                </TableCell>
                <TableCell>
                  <DropdownMenu modal={false}>
                    <DropdownMenuTrigger asChild className={"cursor-pointer"}>
                      <div
                        className={
                          "bg-base-200 p-2 rounded border border-border w-fit"
                        }
                      >
                        <MoreVertical className="cursor-pointer text-gray-700" />
                      </div>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuItem
                        onClick={() => {
                          setSelectedMemberId(member?.memberId);
                          setIsOpen(true);
                        }}
                        className="cursor-pointer"
                      >
                        <Trash className="w-4 h-4 mt-[0.9px] text-red-500" />
                        Delete Member
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
      </TableBody>

      {/* Delete Member Modal */}
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-md [&_[data-dialog-close]]:hidden">
          <DialogHeader>
            {!errorMessage && (
              <>
                <DialogTitle>Are you sure?</DialogTitle>
                <p className="text-sm text-gray-600">
                  This will permanently delete{" "}
                  <span className="font-semibold text-gray-700">
                    {selectedMemberId}
                  </span>{" "}
                  from the cooperative society
                </p>
              </>
            )}
          </DialogHeader>

          {errorMessage && (
            <div className="flex items-center gap-2 text-red-500 mt-2">
              <Loader className="w-4 h-4" />
              <span>{errorMessage}</span>
            </div>
          )}

          <DialogFooter className="flex justify-end gap-2 pt-4">
            <Button
              variant="destructive"
              className="cursor-pointer"
              // onClick={handleMemberDelete}
              disabled={isDeleting}
            >
              {isDeleting ? (
                <>
                  <Loader className="w-4 h-4 mr-2 animate-spin" />
                  Deleting...
                </>
              ) : errorMessage ? (
                "Try Again!"
              ) : (
                "Yes, Delete"
              )}
            </Button>
            <Button
              variant="outline"
              className={"cursor-pointer"}
              onClick={() => {
                setIsOpen(false);
                setSelectedMemberId("");
                setErrorMessage("");
              }}
            >
              Cancel
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Table>
  );
};

export default MembersTable;
