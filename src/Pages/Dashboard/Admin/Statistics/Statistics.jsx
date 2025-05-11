import { useState } from "react";
import {
  Search,
  Plus,
  Users,
  DollarSign,
  CreditCard,
  Mail,
  Calendar,
  Package,
  User,
  ChartArea,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MemberList } from "./MemberList";
import { RecentTransactions } from "./RecentTransactions";
import { StatCard } from "./StatCard";
import { StatisticsHeader } from "./StatisticsHeader";
import AssignUserForm from "../ManageMembers/AddMemberForm";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Spinner from "@/components/Spinner";

// Mock data
// const overviewStats = {
//   totalInvestment: 9876542,
//   totalMembers: 57,
// };

const transactionSummary = [
  { id: 1, label: "Deposits", count: 32, color: "bg-green-100 text-green-800" },
  {
    id: 2,
    label: "Withdrawals",
    count: 15,
    color: "bg-orange-100 text-orange-800",
  },
  { id: 3, label: "Loans", count: 8, color: "bg-red-100 text-red-800" },
  { id: 4, label: "Profits", count: 12, color: "bg-blue-100 text-blue-800" },
  {
    id: 5,
    label: "Penalties",
    count: 3,
    color: "bg-purple-100 text-purple-800",
  },
  {
    id: 6,
    label: "Total Transactions",
    count: 70,
    color: "bg-gray-100 text-gray-800",
  },
];

const memberStats = {
  totalMembers: 57,
  totalShares: 120,
  activeMembers: 45,
  newThisMonth: 7,
};

const packageStats = {
  packageName: "Premium",
  memberLimit: 100,
  smsCredits: 457,
  renewalDate: "January 31, 2026",
};

const userStats = {
  totalUsers: 10,
  administrators: 2,
  managers: 5,
  operators: 3,
};

function Statistics() {
  const [searchTerm, setSearchTerm] = useState("");
  const [isFormOpen, setIsFormOpen] = useState(false);
  const axiosSecure = useAxiosSecure();
  const {
    data: overviewStats = {},
    isLoading: statsLoading,
    refetch,
  } = useQuery({
    queryKey: ["overviewStats"],
    queryFn: async () => {
      const { data } = await axiosSecure.get("/statistics");
      return data;
    },
  });

  const { data: adminReport = {}, isLoading: reportLoading } = useQuery({
    queryKey: ["admin-report"],
    queryFn: async () => {
      const { data } = await axiosSecure.get("/statistics/admin-report");
      return data.admins;
    },
  });

  if (statsLoading || reportLoading) {
    return <Spinner />;
  }

  return (
    <div className="container mx-auto py-6 space-y-8">
      {/* <StatisticsHeader /> */}
      {/* Header with search and add button */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
        <div className="relative w-full sm:w-64">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search members..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Button
          onClick={() => setIsFormOpen(!isFormOpen)}
          variant={`${isFormOpen ? "outline" : ""}`}
          className="w-full sm:w-auto cursor-pointer "
        >
          <Plus className="mr-2 h-4 w-4" /> Add Member
        </Button>
      </div>
      {/* Add Member Form */}
      {isFormOpen && (
        <div className={`${isFormOpen ? "visible" : "hidden"} mt-4`}>
          <AssignUserForm refetch={refetch} setIsFormOpen={setIsFormOpen} />
        </div>
      )}

      {/* Overview Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="md:col-span-1">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium flex items-center">
              <Users className="mr-2 h-5 w-5" /> Overview
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-blue-50 rounded-lg p-4">
                <p className="text-sm text-muted-foreground">Total Deposits</p>
                <p className="text-xl font-bold">
                  ৳{overviewStats?.totalDeposits?.toLocaleString()}
                </p>
              </div>
              <div className="bg-red-100 text-red-800 rounded-lg p-4">
                <p className="text-sm text-muted-foreground">Total Withdraw</p>
                <p className="text-xl font-bold">
                  ৳{overviewStats?.totalWithdrawals?.toLocaleString()}
                </p>
              </div>
              <div className="bg-green-50 rounded-lg p-4 col-span-2">
                <p className="text-sm text-muted-foreground">Total Balance</p>
                <p className="text-xl font-bold">
                  ৳{overviewStats?.currentBalance?.toLocaleString()}
                </p>
              </div>
              <div className="bg-purple-50 rounded-lg p-4">
                <p className="text-sm text-muted-foreground">Total Admins</p>
                <p className="text-xl font-bold">
                  {overviewStats?.totalAdmins}
                </p>
              </div>
              <div className="bg-gray-50 rounded-lg p-4">
                <p className="text-sm text-muted-foreground">Total Members</p>
                <p className="text-xl font-bold">
                  {overviewStats?.totalMembers}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="md:col-span-2">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium flex items-center">
              <ChartArea className="mr-2 h-5 w-5" /> Admin Reports
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {adminReport?.map((admin, index) => (
                <div
                  key={index}
                  className="flex justify-between items-center p-4 border rounded-lg shadow-sm mb-4"
                >
                  <div className="flex items-center gap-3">
                    <Avatar className="h-12 w-12">
                      <AvatarImage
                        src={admin.adminImage}
                        alt={admin.adminName}
                      />
                      <AvatarFallback>
                        {admin.adminName
                          .split(" ")
                          .map((n) => n[0])
                          .join("")
                          .toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">{admin.adminName}</p>
                      <p className="text-sm text-muted-foreground">
                        {admin.adminEmail}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm">
                      <span className="font-semibold">Deposits:</span> ৳
                      {admin.totalDeposits.toLocaleString()}
                    </p>
                    <p className="text-sm">
                      <span className="font-semibold">Withdrawals:</span> ৳
                      {admin.totalWithdrawals.toLocaleString()}
                    </p>
                    <Badge variant="outline" className="mt-1">
                      Admin
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Active Members Section */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg font-medium flex items-center">
            <Users className="mr-2 h-5 w-5" /> Active Members
          </CardTitle>
        </CardHeader>
        <CardContent>
          <MemberList />
        </CardContent>
      </Card>

      {/* Transaction Summary */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg font-medium flex items-center">
            <Calendar className="mr-2 h-5 w-5" /> Transaction Summary
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
            {transactionSummary.map((item) => (
              <div key={item.id} className={`rounded-lg p-4 ${item.color}`}>
                <p className="text-2xl font-bold">{item.count}</p>
                <p className="text-sm">{item.label}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Recent Transactions */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg font-medium flex items-center">
            <CreditCard className="mr-2 h-5 w-5" /> Recent Transactions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <RecentTransactions />
        </CardContent>
      </Card>

      {/* Reports Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Member Report */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium flex items-center">
              <Users className="mr-2 h-5 w-5" /> Member Report
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="flex items-center">
                  <Users className="h-4 w-4 mr-2" /> Total Members
                </span>
                <span className="font-bold">{memberStats.totalMembers}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="flex items-center">
                  <CreditCard className="h-4 w-4 mr-2" /> Total Shares
                </span>
                <span className="font-bold">{memberStats.totalShares}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="flex items-center">
                  <Users className="h-4 w-4 mr-2" /> Active Members
                </span>
                <span className="font-bold">{memberStats.activeMembers}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="flex items-center">
                  <Users className="h-4 w-4 mr-2" /> New This Month
                </span>
                <span className="font-bold">{memberStats.newThisMonth}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Package Report */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium flex items-center">
              <Package className="mr-2 h-5 w-5" /> Package Report
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="flex items-center">
                  <Package className="h-4 w-4 mr-2" /> Package Name
                </span>
                <span className="font-bold">{packageStats.packageName}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="flex items-center">
                  <Users className="h-4 w-4 mr-2" /> Member Limit
                </span>
                <span className="font-bold">{packageStats.memberLimit}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="flex items-center">
                  <Mail className="h-4 w-4 mr-2" /> SMS Credits
                </span>
                <span className="font-bold">{packageStats.smsCredits}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="flex items-center">
                  <Calendar className="h-4 w-4 mr-2" /> Renewal Date
                </span>
                <span className="font-bold">{packageStats.renewalDate}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* User Report */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium flex items-center">
              <User className="mr-2 h-5 w-5" /> User Report
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="flex items-center">
                  <Users className="h-4 w-4 mr-2" /> Total Users
                </span>
                <span className="font-bold">{userStats.totalUsers}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="flex items-center">
                  <User className="h-4 w-4 mr-2" /> Administrators
                </span>
                <span className="font-bold">{userStats.administrators}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="flex items-center">
                  <User className="h-4 w-4 mr-2" /> Managers
                </span>
                <span className="font-bold">{userStats.managers}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="flex items-center">
                  <User className="h-4 w-4 mr-2" /> Operators
                </span>
                <span className="font-bold">{userStats.operators}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Statistics Tabs */}
      <Card>
        <CardContent className="p-6">
          <Tabs defaultValue="members">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="members">Members</TabsTrigger>
              <TabsTrigger value="transactions">Transactions</TabsTrigger>
              <TabsTrigger value="performance">Performance</TabsTrigger>
            </TabsList>
            <TabsContent value="members" className="pt-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <StatCard
                  title="Total Members"
                  value={memberStats.totalMembers}
                  icon={<Users className="h-4 w-4" />}
                />
                <StatCard
                  title="Active Members"
                  value={memberStats.activeMembers}
                  icon={<Users className="h-4 w-4" />}
                />
                <StatCard
                  title="Inactive Members"
                  value={memberStats.totalMembers - memberStats.activeMembers}
                  icon={<Users className="h-4 w-4" />}
                />
              </div>
            </TabsContent>
            <TabsContent value="transactions" className="pt-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <StatCard
                  title="Total Transactions"
                  value={transactionSummary[5].count}
                  icon={<CreditCard className="h-4 w-4" />}
                />
                <StatCard
                  title="Total Deposits"
                  value={transactionSummary[0].count}
                  icon={<DollarSign className="h-4 w-4" />}
                />
                <StatCard
                  title="Total Withdrawals"
                  value={transactionSummary[1].count}
                  icon={<DollarSign className="h-4 w-4" />}
                />
              </div>
            </TabsContent>
            <TabsContent value="performance" className="pt-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <StatCard
                  title="Growth Rate"
                  value="12%"
                  trend="up"
                  icon={<DollarSign className="h-4 w-4" />}
                />
                <StatCard
                  title="Retention Rate"
                  value="95%"
                  trend="up"
                  icon={<Users className="h-4 w-4" />}
                />
                <StatCard
                  title="Default Rate"
                  value="2%"
                  trend="down"
                  icon={<CreditCard className="h-4 w-4" />}
                />
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}

export default Statistics;
