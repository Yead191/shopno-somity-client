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
import {
  Eye,
  Loader,
  MoreHorizontal,
  MoreVertical,
  Settings,
  ShieldCheck,
  Trash,
  User,
  UserCog,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import axios from "axios";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import SettingsModal from "./SettingsModal";

// Sample data based on the Excel sheet

const MembersTable = ({ members, isLoading, refetch }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [selectedMemberId, setSelectedMemberId] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedMember, setSelectedMember] = useState(null);
  const handleMemberDelete = async () => {
    setIsDeleting(true);
    try {
      const { data } = await axios.delete(
        `${import.meta.env.VITE_API_URL}/users/delete-user/${selectedMemberId}`
      );

      toast("Member Deleted", {
        description: `${selectedMemberId} Was Successfully Deleted!`,
        duration: 3000,
        position: "top-right",
      });
      refetch();
      setErrorMessage("");
      setIsOpen(false);
    } catch (error) {
      const message =
        error?.response?.data?.message ||
        "Something went wrong while deleting the member!";
      setErrorMessage(message);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <Card className="overflow-hidden border-none shadow-sm my-6 p-0">
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <Table>
            <TableCaption className="text-base font-medium mb-4">
              A List Of All Cooperative Society Members
            </TableCaption>
            <TableHeader>
              <TableRow className="bg-slate-50 dark:bg-slate-800/60 hover:bg-slate-50 dark:hover:bg-slate-800/60">
                <TableHead className="font-semibold text-slate-700 dark:text-slate-300">
                  Name
                </TableHead>
                <TableHead className="font-semibold text-slate-700 dark:text-slate-300">
                  Email
                </TableHead>
                <TableHead className="font-semibold text-slate-700 dark:text-slate-300">
                  Phone Number
                </TableHead>
                <TableHead className="font-semibold text-slate-700 dark:text-slate-300">
                  Role
                </TableHead>
                <TableHead className="font-semibold text-slate-700 dark:text-slate-300">
                  Join Date
                </TableHead>
                <TableHead className="font-semibold text-slate-700 dark:text-slate-300">
                  Total Contributions
                </TableHead>
                <TableHead className="font-semibold text-slate-700 dark:text-slate-300">
                  Actions
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading
                ? Array.from({ length: 5 }).map((_, i) => (
                    <TableRow key={i} className="animate-pulse">
                      {Array.from({ length: 7 }).map((_, j) => (
                        <TableCell key={j} className="py-3">
                          <div className="h-8 bg-slate-200 dark:bg-slate-700 rounded w-full"></div>
                        </TableCell>
                      ))}
                    </TableRow>
                  ))
                : members?.map((member, i) => (
                    <TableRow
                      key={i}
                      className={`
                        border-b border-slate-100 dark:border-slate-800 
                        ${
                          i % 2 === 0
                            ? "bg-white dark:bg-slate-950"
                            : "bg-slate-50/50 dark:bg-slate-900/30"
                        }
                        hover:bg-slate-100 dark:hover:bg-slate-800/50 transition-colors
                      `}
                    >
                      <TableCell className="py-3">
                        <div className="flex items-center gap-3">
                          <Avatar className="border-2 border-white dark:border-slate-800 shadow-sm h-16 w-16">
                            <AvatarImage
                              src={member?.photo || "/placeholder.svg"}
                              alt={member?.name || "Member"}
                              className="object-cover"
                            />
                            <AvatarFallback className="bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-700 dark:to-slate-800 text-slate-700 dark:text-slate-300 font-medium">
                              {member?.name
                                ? member.name
                                    .split(" ")
                                    .map((n) => n[0])
                                    .join("")
                                    .toUpperCase()
                                : "NA"}
                            </AvatarFallback>
                          </Avatar>
                          <span className="font-medium text-slate-800 dark:text-slate-200">
                            {member?.name}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell className="text-slate-600 dark:text-slate-400">
                        {member?.email}
                      </TableCell>
                      <TableCell className="text-slate-600 dark:text-slate-400">
                        {member?.phoneNumber}
                      </TableCell>
                      <TableCell>
                        {member?.role === "admin" ? (
                          <Badge
                            variant="outline"
                            className="flex items-center gap-1 bg-blue-50 dark:bg-blue-950/30 text-blue-600 dark:text-blue-400 border-blue-200 dark:border-blue-900 px-2 py-1"
                          >
                            <ShieldCheck className="h-3.5 w-3.5" />
                            Admin
                          </Badge>
                        ) : (
                          <Badge
                            variant="outline"
                            className="flex items-center gap-1 bg-green-50 dark:bg-green-950/30 text-green-600 dark:text-green-400 border-green-200 dark:border-green-900 px-2 py-1"
                          >
                            <User className="h-3.5 w-3.5" />
                            Member
                          </Badge>
                        )}
                      </TableCell>
                      <TableCell className="text-slate-600 dark:text-slate-400">
                        {member?.createdAt
                          ? format(new Date(member.createdAt), "dd MMM yyyy")
                          : "N/A"}
                      </TableCell>
                      <TableCell className="font-medium text-slate-700 dark:text-slate-300">
                        ৳{member?.totalContributions?.toLocaleString()}
                      </TableCell>
                      <TableCell>
                        <DropdownMenu modal={false}>
                          <DropdownMenuTrigger
                            asChild
                            className="cursor-pointer"
                          >
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800"
                            >
                              <MoreHorizontal className="h-4 w-4 text-slate-600 dark:text-slate-400" />
                              <span className="sr-only">Open menu</span>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent
                            align="end"
                            className="w-48 p-1.5"
                          >
                            <Link
                              to={`/dashboard/member-profile/${member._id}`}
                            >
                              <DropdownMenuItem className="flex items-center gap-2 py-2 cursor-pointer">
                                <Eye className="w-4 h-4 text-slate-500" />
                                <span>View Profile</span>
                              </DropdownMenuItem>
                            </Link>
                            <DropdownMenuItem
                              className="flex items-center gap-2 py-2 cursor-pointer"
                              onClick={() => {
                                setEditModalOpen(true);
                                setSelectedMember(member);
                              }}
                            >
                              <UserCog className="w-4 h-4 text-blue-500" />
                              <span>Settings</span>
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              className="flex items-center gap-2 py-2 cursor-pointer text-red-500 hover:text-red-600 focus:text-red-600"
                              onClick={() => {
                                setSelectedMemberId(member?.email);
                                setIsOpen(true);
                              }}
                            >
                              <Trash className="w-4 h-4" />
                              <span>Delete Member</span>
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>

      {/* Delete Member Modal */}
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-md [&_[data-dialog-close]]:hidden">
          <DialogHeader>
            {!errorMessage && (
              <>
                <DialogTitle className="text-xl">Are you sure?</DialogTitle>
                <p className="text-sm text-slate-600 dark:text-slate-400 mt-2">
                  This will permanently delete{" "}
                  <span className="font-semibold text-slate-800 dark:text-slate-200">
                    {selectedMemberId}
                  </span>{" "}
                  from the cooperative society
                </p>
              </>
            )}
          </DialogHeader>

          {errorMessage && (
            <div className="flex items-center gap-2 text-red-500 p-3 bg-red-50 dark:bg-red-950/30 rounded-md border border-red-100 dark:border-red-900 mt-2">
              <AlertCircle className="w-5 h-5 flex-shrink-0" />
              <span className="text-sm">{errorMessage}</span>
            </div>
          )}

          <DialogFooter className="flex justify-end gap-3 pt-4">
            <Button
              variant="outline"
              className="cursor-pointer"
              onClick={() => {
                setIsOpen(false);
                setSelectedMemberId("");
                setErrorMessage("");
              }}
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              className="cursor-pointer"
              onClick={handleMemberDelete}
              disabled={isDeleting}
            >
              {isDeleting ? (
                <>
                  <Loader className="w-4 h-4 mr-2 animate-spin" />
                  Deleting...
                </>
              ) : errorMessage ? (
                "Try Again"
              ) : (
                "Yes, Delete"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Settings Modal */}
      {selectedMember && (
        <SettingsModal
          open={editModalOpen}
          setOpen={setEditModalOpen}
          member={selectedMember}
          refetch={refetch}
        />
      )}
    </Card>
  );
};

export default MembersTable;
