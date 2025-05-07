import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import PropTypes from "prop-types";
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Edit, MapPin } from "lucide-react";
import TransactionHistory from "./TransactionHistory";
import DepositModal from "./DepositModal";
import WithdrawModal from "./WithdrawModal";
import { calculateTotalContribution } from "@/utils/helpers";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";

// Mock data - replace with actual data fetching
// const getMemberData = (id) => {
//   return {
//     id,
//     name: "Altaf Husain",
//     nameLocal: "Altaf Husain",
//     position: "Investment Officer",
//     investmentAmount: 9100.8,
//     father: "Robiul",
//     mother: "Jorina",
//     dateOfBirth: "1998-07-23",
//     gender: "Male",
//     mobile: "01782237547",
//     joinDate: "2024-02-01",
//     presentAddress: "Dhaka Mirpur",
//     permanentAddress: "Dhaka Mirpur",
//     profileImage: "/placeholder.jpg",
//     transactions: [
//       {
//         id: 1,
//         date: "2024-02-09",
//         type: "Investment Profit",
//         amount: 910.8,
//         status: "Approved",
//         isDeposit: true,
//       },
//       {
//         id: 2,
//         date: "2024-12-18",
//         type: "Investment Deposit",
//         amount: 3000,
//         status: "Approved",
//         isDeposit: true,
//       },
//       {
//         id: 3,
//         date: "2024-12-18",
//         type: "Investment Deposit",
//         amount: 1297.0,
//         status: "Approved",
//         isDeposit: true,
//       },
//       {
//         id: 4,
//         date: "2024-12-18",
//         type: "Investment Withdrawal",
//         amount: -31209.0,
//         status: "Approved",
//         isDeposit: false,
//       },
//       {
//         id: 5,
//         date: "2024-11-23",
//         type: "Investment Profit",
//         amount: 28039.0,
//         status: "Approved",
//         isDeposit: true,
//       },
//       {
//         id: 6,
//         date: "2024-11-23",
//         type: "Investment Profit",
//         amount: 2470.0,
//         status: "Approved",
//         isDeposit: true,
//       },
//       {
//         id: 7,
//         date: "2024-10-29",
//         type: "Investment Withdrawal",
//         amount: -300.0,
//         status: "Approved",
//         isDeposit: false,
//       },
//       {
//         id: 8,
//         date: "2024-10-29",
//         type: "Investment Withdrawal",
//         amount: -300.0,
//         status: "Approved",
//         isDeposit: false,
//       },
//       {
//         id: 9,
//         date: "2024-08-21",
//         type: "Investment Withdrawal",
//         amount: -20000.0,
//         status: "Approved",
//         isDeposit: false,
//       },
//       {
//         id: 10,
//         date: "2024-07-02",
//         type: "Investment Withdrawal",
//         amount: -300.0,
//         status: "Approved",
//         isDeposit: false,
//       },
//     ],
//   };
// };

function MemberProfilePage() {
  const { id } = useParams();
  // const [member, setMember] = useState(null);
  const [loading, setLoading] = useState(true);
  const [refreshData, setRefreshData] = useState(0);
  const axiosSecure = useAxiosSecure();
  // console.log(id);
  const {
    data: member,
    isLoading: memberLoading,
    refetch,
  } = useQuery({
    queryKey: ["member", id],
    queryFn: async () => {
      const { data } = await axiosSecure(`/users/profile/${id}`);
      return data;
    },
  });
  console.log(member);

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

  const transactions = [
    {
      id: 1,
      date: "2024-02-09",
      type: "Investment Profit",
      amount: 910.8,
      status: "Approved",
      isDeposit: true,
    },
    {
      id: 2,
      date: "2024-12-18",
      type: "Investment Deposit",
      amount: 3000,
      status: "Approved",
      isDeposit: true,
    },
    {
      id: 3,
      date: "2024-12-18",
      type: "Investment Deposit",
      amount: 1297.0,
      status: "Approved",
      isDeposit: true,
    },
    {
      id: 4,
      date: "2024-12-18",
      type: "Investment Withdrawal",
      amount: -31209.0,
      status: "Approved",
      isDeposit: false,
    },
    {
      id: 5,
      date: "2024-11-23",
      type: "Investment Profit",
      amount: 28039.0,
      status: "Approved",
      isDeposit: true,
    },
    {
      id: 6,
      date: "2024-11-23",
      type: "Investment Profit",
      amount: 2470.0,
      status: "Approved",
      isDeposit: true,
    },
    {
      id: 7,
      date: "2024-10-29",
      type: "Investment Withdrawal",
      amount: -300.0,
      status: "Approved",
      isDeposit: false,
    },
    {
      id: 8,
      date: "2024-10-29",
      type: "Investment Withdrawal",
      amount: -300.0,
      status: "Approved",
      isDeposit: false,
    },
    {
      id: 9,
      date: "2024-08-21",
      type: "Investment Withdrawal",
      amount: -20000.0,
      status: "Approved",
      isDeposit: false,
    },
    {
      id: 10,
      date: "2024-07-02",
      type: "Investment Withdrawal",
      amount: -300.0,
      status: "Approved",
      isDeposit: false,
    },
  ];
  const handleTransactionAdded = () => {
    // Refresh data when a transaction is added
    setRefreshData((prev) => prev + 1);
  };

  if (memberLoading) {
    return <div className="container mx-auto py-6">Loading...</div>;
  }

  if (!member) {
    return <div className="container mx-auto py-6">Member not found</div>;
  }

  const totalContribution = calculateTotalContribution(transactions);

  return (
    <div className="container mx-auto py-6 space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Left Column - Member Information */}
        <div className="md:col-span-1 space-y-6">
          <Card>
            <CardContent className="pt-6">
              <div className="flex flex-col items-center space-y-4 mb-6">
                <Avatar className="h-24 w-24 border-4 border-primary/10 object-cover">
                  <img
                    src={member?.photo || "/placeholder.jpg"}
                    alt={member.name}
                  />
                </Avatar>
                <div className="text-center">
                  <h2 className="text-xl font-bold">{member.name}</h2>
                  <p className="text-muted-foreground">{member.role}</p>
                  <p className="text-sm font-medium mt-1">
                    Investment Amount:{" "}
                    {/* <span className="font-bold">
                      $ {member.investmentAmount.toLocaleString()}
                    </span> */}
                  </p>
                </div>
              </div>

              <div className="space-y-2 mb-6">
                <h3 className="text-lg font-semibold">User Information</h3>
                <div className="grid grid-cols-3 gap-2 py-2">
                  <span className="text-muted-foreground">Uid</span>
                  <span className="col-span-2 flex justify-between">
                    {member?._id}
                    {/* <Button variant="ghost" size="icon" className="h-5 w-5">
                      <Edit className="h-3.5 w-3.5" />
                    </Button> */}
                  </span>
                </div>
                <div className="grid grid-cols-3 gap-2 py-2">
                  <span className="text-muted-foreground">Name</span>
                  <span className="col-span-2 flex justify-between">
                    {member?.name}
                    <Button variant="ghost" size="icon" className="h-5 w-5">
                      <Edit className="h-3.5 w-3.5" />
                    </Button>
                  </span>
                </div>
                <div className="grid grid-cols-3 gap-2 py-2">
                  <span className="text-muted-foreground">Email</span>
                  <span className="col-span-2 flex justify-between">
                    {member?.email}
                  </span>
                </div>
                {/* <div className="grid grid-cols-3 gap-2 py-2">
                  <span className="text-muted-foreground">Date of Birth</span>
                  <span className="col-span-2 flex justify-between">
                    {member?.dateOfBirth}
                    <Button variant="ghost" size="icon" className="h-5 w-5">
                      <Edit className="h-3.5 w-3.5" />
                    </Button>
                  </span>
                </div>
                <div className="grid grid-cols-3 gap-2 py-2">
                  <span className="text-muted-foreground">Gender</span>
                  <span className="col-span-2 flex justify-between">
                    {member?.gender}
                    <Button variant="ghost" size="icon" className="h-5 w-5">
                      <Edit className="h-3.5 w-3.5" />
                    </Button>
                  </span>
                </div> */}
                <div className="grid grid-cols-3 gap-2 py-2">
                  <span className="text-muted-foreground">Mobile</span>
                  <span className="col-span-2 flex justify-between">
                    {member?.phoneNumber}
                    <Button variant="ghost" size="icon" className="h-5 w-5">
                      <Edit className="h-3.5 w-3.5" />
                    </Button>
                  </span>
                </div>
                <div className="grid grid-cols-3 gap-2 py-2">
                  <span className="text-muted-foreground">Last Login Date</span>
                  <span className="col-span-2 flex justify-between">
                    {member?.lastLoginAt
                      ? format(new Date(member.lastLoginAt), "dd MMM yyyy")
                      : "N/A"}
                    <Button variant="ghost" size="icon" className="h-5 w-5">
                      <Edit className="h-3.5 w-3.5" />
                    </Button>
                  </span>
                </div>
                <div className="grid grid-cols-3 gap-2 py-2">
                  <span className="text-muted-foreground">Join Date</span>
                  <span className="col-span-2 flex justify-between">
                    {member?.createdAt
                      ? format(new Date(member.createdAt), "dd MMM yyyy")
                      : "N/A"}
                    <Button variant="ghost" size="icon" className="h-5 w-5">
                      <Edit className="h-3.5 w-3.5" />
                    </Button>
                  </span>
                </div>
              </div>

              <div className="flex justify-center space-x-4 my-6">
                <DepositModal
                  member={member}
                  refetch={refetch}
                  onTransactionAdded={handleTransactionAdded}
                />
                <WithdrawModal
                  member={member}
                  onTransactionAdded={handleTransactionAdded}
                />
              </div>
            </CardContent>
          </Card>

          {/* <Card>
            <CardContent className="pt-6">
              <div className="space-y-4">
                <div>
                  <h3 className="text-md font-semibold flex items-center">
                    <MapPin className="h-4 w-4 mr-2" /> Present Address
                  </h3>
                  <p className="text-sm mt-1 flex justify-between">
                    {member.presentAddress}
                    <Button variant="ghost" size="icon" className="h-5 w-5">
                      <Edit className="h-3.5 w-3.5" />
                    </Button>
                  </p>
                </div>
                <Separator />
                <div>
                  <h3 className="text-md font-semibold flex items-center">
                    <MapPin className="h-4 w-4 mr-2" /> Permanent Address
                  </h3>
                  <p className="text-sm mt-1 flex justify-between">
                    {member.permanentAddress}
                    <Button variant="ghost" size="icon" className="h-5 w-5">
                      <Edit className="h-3.5 w-3.5" />
                    </Button>
                  </p>
                </div>
              </div>
            </CardContent>
          </Card> */}
        </div>

        {/* Right Column - Transaction History */}
        <div className="md:col-span-2">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-xl flex items-center">
                <span className="mr-2">Latest Transactions</span>
                <Badge variant="outline" className="ml-auto">
                  Total: ৳ {totalContribution.toLocaleString()}
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
