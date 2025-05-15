import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import PropTypes from "prop-types";
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  ArrowDownIcon,
  ArrowUpIcon,
  BanIcon,
  CalendarIcon,
  CopyIcon,
  Edit,
  MailIcon,
  PhoneIcon,
  UserIcon,
  WalletIcon,
} from "lucide-react";
import TransactionHistory from "./TransactionHistory";
import DepositModal from "./DepositModal";
import WithdrawModal from "./WithdrawModal";

import useAxiosSecure from "@/hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { format, formatDate } from "date-fns";
import Spinner from "@/components/Spinner";
import PenaltyModal from "./PenaltyModal";
import { calculateTransactionSummary } from "@/utils/helpers";
import { toast } from "sonner";

function MemberProfilePage() {
  const { id } = useParams();
  // const [member, setMember] = useState(null);
  const [loading, setLoading] = useState(true);
  const [refreshData, setRefreshData] = useState(0);
  const axiosSecure = useAxiosSecure();
  // console.log(id);
  const {
    data: member = {},
    isLoading: memberLoading,
    refetch,
  } = useQuery({
    queryKey: ["member", id],
    queryFn: async () => {
      const { data } = await axiosSecure(`/users/profile/${id}`);
      return data;
    },
  });
  // console.log(member.result);

  const { result = {}, transactions = [], message = "" } = member || {};
  // console.log(result);
  // useEffect(() => {
  //   // Simulate API call
  //   const fetchData = async () => {
  //     setLoading(true);
  //     try {
  //       // In a real app, this would be an API call
  //       const data = getMemberData(id);
  //       setMember(data);
  //     } catch (error) {
  //       console.error("Error fetching member data:", error);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchData();
  // }, [id, refreshData]);

  // const transactions = [
  //   {
  //     id: 1,
  //     date: "2024-02-09",
  //     type: "Investment Profit",
  //     amount: 910.8,
  //     status: "Approved",
  //     isDeposit: true,
  //   },
  //   {
  //     id: 2,
  //     date: "2024-12-18",
  //     type: "Investment Deposit",
  //     amount: 3000,
  //     status: "Approved",
  //     isDeposit: true,
  //   },
  //   {
  //     id: 3,
  //     date: "2024-12-18",
  //     type: "Investment Deposit",
  //     amount: 1297.0,
  //     status: "Approved",
  //     isDeposit: true,
  //   },
  //   {
  //     id: 4,
  //     date: "2024-12-18",
  //     type: "Investment Withdrawal",
  //     amount: -31209.0,
  //     status: "Approved",
  //     isDeposit: false,
  //   },
  //   {
  //     id: 5,
  //     date: "2024-11-23",
  //     type: "Investment Profit",
  //     amount: 28039.0,
  //     status: "Approved",
  //     isDeposit: true,
  //   },
  //   {
  //     id: 6,
  //     date: "2024-11-23",
  //     type: "Investment Profit",
  //     amount: 2470.0,
  //     status: "Approved",
  //     isDeposit: true,
  //   },
  //   {
  //     id: 7,
  //     date: "2024-10-29",
  //     type: "Investment Withdrawal",
  //     amount: -300.0,
  //     status: "Approved",
  //     isDeposit: false,
  //   },
  //   {
  //     id: 8,
  //     date: "2024-10-29",
  //     type: "Investment Withdrawal",
  //     amount: -300.0,
  //     status: "Approved",
  //     isDeposit: false,
  //   },
  //   {
  //     id: 9,
  //     date: "2024-08-21",
  //     type: "Investment Withdrawal",
  //     amount: -20000.0,
  //     status: "Approved",
  //     isDeposit: false,
  //   },
  //   {
  //     id: 10,
  //     date: "2024-07-02",
  //     type: "Investment Withdrawal",
  //     amount: -300.0,
  //     status: "Approved",
  //     isDeposit: false,
  //   },
  // ];
  const handleTransactionAdded = () => {
    // Refresh data when a transaction is added
    setRefreshData((prev) => prev + 1);
  };

  if (memberLoading) {
    return <Spinner />;
  }

  if (!member) {
    return <div className="container mx-auto py-6">Member not found</div>;
  }

  const totalContribution = calculateTransactionSummary(transactions);
  // console.log(totalContribution);

  const copyToClipboard = (text) => {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        toast.success("Copied to clipboard", { duration: 2000 });
      })
      .catch((err) => {
        toast.error("Failed to copy", { duration: 2000 });
        console.error("Clipboard error:", err);
      });
  };

  return (
    <div className="container mx-auto py-6 space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Left Column - Member Information */}
        <div className="md:col-span-1 space-y-6">
          <Card className="overflow-hidden border shadow-md py-0">
            {/* Header with avatar and name */}
            <CardHeader className="py-2  bg-gradient-to-r from-slate-50 to-slate-100">
              <div className="flex gap-2 items-center">
                <Avatar className="h-24 w-24 border-4 border-primary/10 ">
                  <img
                    src={result?.photo || "/placeholder.svg?height=96&width=96"}
                    alt={result.name}
                    className="object-cover object-center"
                  />
                </Avatar>
                <div className="mt-4 text-left">
                  <h2 className="text-xl font-bold">{result.name}</h2>
                  <Badge variant="outline" className="mt-1 font-normal">
                    {result?.role.toUpperCase()}
                  </Badge>
                </div>
              </div>
            </CardHeader>

            <CardContent className="pt-2">
              {/* Financial Information */}
              <div className="grid grid-cols-2 gap-3 mb-6">
                <div className="flex items-center p-3 rounded-lg bg-green-50 border border-green-100">
                  <ArrowDownIcon className="h-5 w-5 mr-2 text-green-600" />
                  <div>
                    <p className="text-xs text-muted-foreground font-medium">
                      Total Deposits
                    </p>
                    <p className="font-bold text-green-700">
                      ৳ {totalContribution?.deposits?.toLocaleString()}
                    </p>
                  </div>
                </div>

                <div className="flex items-center p-3 rounded-lg bg-red-50 border border-red-100">
                  <ArrowUpIcon className="h-5 w-5 mr-2 text-red-600" />
                  <div>
                    <p className="text-xs text-muted-foreground font-medium">
                      Total Withdrawals
                    </p>
                    <p className="font-bold text-red-700">
                      ৳ {totalContribution?.withdrawals?.toLocaleString()}
                    </p>
                  </div>
                </div>

                <div className="flex items-center p-3 rounded-lg bg-amber-50 border border-amber-100">
                  <BanIcon className="h-5 w-5 mr-2 text-amber-600" />
                  <div>
                    <p className="text-xs text-muted-foreground font-medium">
                      Total Penalties
                    </p>
                    <p className="font-bold text-amber-700">
                      ৳ {totalContribution?.penalties?.toLocaleString()}
                    </p>
                  </div>
                </div>

                <div className="flex items-center p-3 rounded-lg bg-blue-50 border border-blue-100">
                  <WalletIcon className="h-5 w-5 mr-2 text-blue-600" />
                  <div>
                    <p className="text-xs text-muted-foreground font-medium">
                      Current Balance
                    </p>
                    <p className="font-bold text-blue-700">
                      ৳ {totalContribution?.balance?.toLocaleString()}
                    </p>
                  </div>
                </div>
              </div>

              {/* User Information */}
              <div className="space-y-2 mb-6">
                <h3 className="text-lg font-semibold flex items-center">
                  <UserIcon className="h-4 w-4 mr-2" /> User Information
                </h3>
                <Card className="border-dashed">
                  <CardContent className="p-4">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between py-1 group">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-medium text-muted-foreground bg-muted px-2 py-1 rounded">
                            UID
                          </span>
                          <span className="text-sm truncate max-w-[180px]">
                            {result?._id}
                          </span>
                        </div>
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity"
                                onClick={() => copyToClipboard(result?._id)}
                              >
                                <CopyIcon className="h-3.5 w-3.5" />
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>Copy ID</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </div>

                      <div className="flex items-center justify-between py-1 group">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-medium text-muted-foreground bg-muted px-2 py-1 rounded">
                            Name
                          </span>
                          <span className="text-sm">{result?.name}</span>
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <Edit className="h-3.5 w-3.5" />
                        </Button>
                      </div>

                      <div className="flex items-center justify-between py-1 group">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-medium text-muted-foreground bg-muted px-2 py-1 rounded">
                            <MailIcon className="h-3 w-3 inline mr-1" />
                          </span>
                          <span className="text-sm">{result?.email}</span>
                        </div>
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity"
                                onClick={() => copyToClipboard(result?.email)}
                              >
                                <CopyIcon className="h-3.5 w-3.5" />
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>Copy Email</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </div>

                      <div className="flex items-center justify-between py-1 group">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-medium text-muted-foreground bg-muted px-2 py-1 rounded">
                            <PhoneIcon className="h-3 w-3 inline mr-1" />
                          </span>
                          <span className="text-sm">{result?.phoneNumber}</span>
                        </div>
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity"
                              >
                                <Edit className="h-3.5 w-3.5" />
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>Edit Phone Number</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </div>

                      <Separator className="my-1" />

                      <div className="flex items-center justify-between py-1 group">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-medium text-muted-foreground bg-muted px-2 py-1 rounded">
                            <CalendarIcon className="h-3 w-3 inline mr-1" />{" "}
                            Last Login
                          </span>
                          <span className="text-sm">
                            {result?.lastLoginAt
                              ? format(
                                  new Date(result.lastLoginAt),
                                  "dd MMM yyyy"
                                )
                              : "N/A"}
                          </span>
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <Edit className="h-3.5 w-3.5" />
                        </Button>
                      </div>

                      <div className="flex items-center justify-between py-1 group">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-medium text-muted-foreground bg-muted px-2 py-1 rounded">
                            <CalendarIcon className="h-3 w-3 inline mr-1" />{" "}
                            Join Date
                          </span>
                          <span className="text-sm">
                            {result?.createdAt
                              ? format(
                                  new Date(result.createdAt),
                                  "dd MMM yyyy"
                                )
                              : "N/A"}
                          </span>
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <Edit className="h-3.5 w-3.5" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Action Buttons */}
              <div className="flex justify-center space-x-2 md:space-x-4 my-6">
                <DepositModal member={result} refetch={refetch} />
                <WithdrawModal
                  member={result}
                  refetch={refetch}
                  totalContribution={totalContribution}
                />
                <PenaltyModal member={result} refetch={refetch} />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column - Transaction History */}
        <div className="md:col-span-2">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-xl flex items-center">
                <span className="mr-2">Latest Transactions</span>
                <Badge variant="outline" className="ml-auto">
                  Total: ৳ {totalContribution?.balance?.toLocaleString()}
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <TransactionHistory transactions={transactions} />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

MemberProfilePage.propTypes = {
  match: PropTypes.object,
};

export default MemberProfilePage;
