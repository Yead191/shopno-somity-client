import { formatDistanceToNow } from "date-fns";
import {
  Award,
  Calendar,
  Mail,
  Medal,
  Phone,
  Trophy,
  Users,
} from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useQuery } from "@tanstack/react-query";
import { useAxiosPublic } from "@/hooks/useAxiosPublic";
import DashboardPagesHeader from "@/components/DashboardPagesHeader";
import { Link } from "react-router-dom";
import Spinner from "@/components/Spinner";

// Demo data
// const leaderboardData = [
//   {
//     name: "Md Asadur Rahaman Yead",
//     email: "yead191@gmail.com",
//     photo: "https://i.ibb.co/VYkshjjS/yead-dp.jpg",
//     phoneNumber: "01624343168",
//     totalDeposit: 5600,
//     totalWithdraw: 600,
//     totalPenalties: 50,
//     totalContribution: 5000,
//     rank: 1,
//     joinDate: "2025-03-29T00:34:03.000Z",
//   },
//   {
//     name: "Sharif Md Abdul Hafiz",
//     email: "Hafiz@kalu.com",
//     photo:
//       "https://i.ibb.co.com/60pFscCm/472778164-1866771823728846-2588711625832728825-n.jpg",
//     phoneNumber: "01536634563",
//     totalDeposit: 3900,
//     totalWithdraw: 900,
//     totalPenalties: 0,
//     totalContribution: 3000,
//     rank: 2,
//     joinDate: "2025-05-08T13:03:38.000Z",
//   },
//   {
//     name: "Oli ahmed Shoaib",
//     email: "oli@gmail.com",
//     photo:
//       "https://i.ibb.co/Wvdjf7mw/470174871-1269445434291827-8488320051007972735-n.jpg",
//     phoneNumber: "01310808413",
//     totalDeposit: 2900,
//     totalWithdraw: 1200,
//     totalPenalties: 100,
//     totalContribution: 1700,
//     rank: 3,
//     joinDate: "2025-05-07T11:50:25.000Z",
//   },
// ];

// Find the highest contribution for progress bar calculation

export default function LeaderboardPage() {
  const axiosPublic = useAxiosPublic();
  const { data: leaderboardData = [], isLoading: leaderboardLoading } =
    useQuery({
      queryKey: ["leaderboardData"],
      queryFn: async () => {
        const { data } = await axiosPublic.get("/leaderboard");
        return data.data;
      },
    });

  const {
    data: overviewStats = {},
    isLoading: statsLoading,
    refetch,
  } = useQuery({
    queryKey: ["overviewStats"],
    queryFn: async () => {
      const { data } = await axiosPublic.get("/statistics");
      return data;
    },
  });
  const maxContribution = Math.max(
    ...leaderboardData?.map((user) => user.totalContribution)
  );

  if (leaderboardLoading || statsLoading) {
    return <Spinner />;
  }
  return (
    <div className="container mx-auto max-w-6xl px-2 md:px-6">
      <DashboardPagesHeader
        icon={Trophy}
        title={"Contribution Leaderboard"}
        subtitle={
          "Track top contributors and their financial activities. Leaders are ranked based on their total contributions."
        }
      />

      {/* Overview Section */}
      <div className="grid grid-cols-1 gap-6 mt-8">
        <Card className="md:col-span-1">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium flex items-center">
              <Users className="mr-2 h-5 w-5" /> Overview
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
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
              <div className="bg-yellow-50 rounded-lg p-4 ">
                <p className="text-sm text-muted-foreground">Total Penalties</p>
                <p className="text-xl font-bold">
                  ৳{overviewStats?.totalPenalties?.toLocaleString()}
                </p>
              </div>
              <div className="bg-green-50 rounded-lg p-4 ">
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
      </div>

      <Tabs
        defaultValue="leaderboard"
        className="w-full max-w-6xl mx-auto mt-8"
      >
        <TabsList className="grid w-full grid-cols-2 mb-8">
          <TabsTrigger value="leaderboard">Leaderboard</TabsTrigger>
          <TabsTrigger value="details">Detailed Stats</TabsTrigger>
        </TabsList>

        <TabsContent value="leaderboard">
          <div className="grid gap-6">
            {/* Top 3 Podium */}
            <div className="flex flex-row justify-center items-end gap-4 mb-8 overflow-x-auto">
              {leaderboardData?.slice(0, 3).map((user, rank) => (
                <Link
                  to={`/dashboard/member-profile/${user.uid}`}
                  key={user?.email}
                  className={`flex flex-col items-center ${
                    rank === 0
                      ? "order-2 md:order-2 z-10"
                      : rank === 1
                      ? "order-1 md:order-1"
                      : "order-3 md:order-3"
                  }`}
                >
                  <div
                    className={`relative ${
                      rank === 0
                        ? "h-32 w-32 md:h-40 md:w-40"
                        : "h-24 w-24 md:h-32 md:w-32"
                    }`}
                  >
                    <div className="absolute inset-0 rounded-full overflow-hidden border-4 border-white shadow-lg">
                      <Avatar className="h-full w-full">
                        <AvatarImage
                          src={user.photo || "/placeholder.svg"}
                          alt={user.name}
                        />
                        <AvatarFallback>
                          {user.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                    </div>
                    <div className="absolute -bottom-3 -right-3 bg-white rounded-full p-1 shadow-md">
                      {rank === 0 ? (
                        <Trophy className="h-8 w-8 text-yellow-500" />
                      ) : rank === 1 ? (
                        <Medal className="h-7 w-7 text-gray-400" />
                      ) : (
                        <Award className="h-7 w-7 text-amber-700" />
                      )}
                    </div>
                  </div>
                  <div
                    className={`mt-4 text-center ${
                      rank === 0 ? "scale-110" : ""
                    }`}
                  >
                    <div className="font-bold truncate max-w-[150px]">
                      {user.name}
                    </div>
                    <div
                      className={`text-sm font-medium ${
                        rank === 0
                          ? "text-yellow-500"
                          : rank === 1
                          ? "text-gray-400"
                          : "text-amber-700"
                      }`}
                    >
                      ৳ {user.totalContribution.toLocaleString()}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {formatDistanceToNow(new Date(user.joinDate), {
                        addSuffix: true,
                      })}
                    </div>
                  </div>
                  <div
                    className={`h-${
                      user.rank === 1 ? 24 : user.rank === 2 ? 16 : 12
                    } w-full mt-4 rounded-t-lg ${
                      user.rank === 1
                        ? "bg-gradient-to-t from-yellow-500 to-yellow-300"
                        : user.rank === 2
                        ? "bg-gradient-to-t from-gray-400 to-gray-300"
                        : "bg-gradient-to-t from-amber-700 to-amber-500"
                    }`}
                  ></div>
                </Link>
              ))}
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Leaderboard Rankings</CardTitle>
                <CardDescription>
                  Based on total contributions as of{" "}
                  {new Date().toLocaleDateString()}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {leaderboardData?.map((user, index) => (
                    <Link
                      to={`/dashboard/member-profile/${user.uid}`}
                      key={user.email}
                      className="flex items-center gap-4"
                    >
                      <div className="flex-shrink-0 w-8 text-center font-bold">
                        {index + 1}
                      </div>
                      <Avatar className="h-12 w-12 border-2 border-white shadow">
                        <AvatarImage
                          src={user?.photo || "/placeholder.svg"}
                          alt={user.name}
                        />
                        <AvatarFallback>
                          {user.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
                          <div>
                            <p className="font-medium truncate">{user.name}</p>
                            <p className="text-xs text-muted-foreground truncate">
                              Joined{" "}
                              {new Date(user.joinDate).toLocaleDateString()}
                            </p>
                          </div>
                          <div className="mt-1 sm:mt-0 text-sm font-medium">
                            ৳ {user.totalContribution.toLocaleString()}
                          </div>
                        </div>
                        <div className="mt-2">
                          <Progress
                            value={
                              (user.totalContribution / maxContribution) *
                                100 || 0
                            }
                            className={`h-2 ${
                              index === 0
                                ? "bg-yellow-100"
                                : index === 1
                                ? "bg-gray-100"
                                : index === 2
                                ? "bg-gray-100"
                                : "bg-slate-100"
                            }`}
                            indicatorClassName={
                              index === 0
                                ? "bg-yellow-500"
                                : index === 1
                                ? "bg-gray-400"
                                : index === 2
                                ? "bg-amber-700"
                                : "bg-slate-600"
                            }
                          />
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        <TabsContent value="details">
          <div className="grid gap-6">
            {leaderboardData?.map((user, rank) => (
              <Link
                key={user.email}
                to={`/dashboard/member-profile/${user.uid}`}
                className="hover:transition hover:scale-105 hover:duration-700 "
              >
                <Card className={"hover:border-blue-400"}>
                  <CardHeader className="pb-2 flex flex-col md:flex-row gap-4 md:items-center justify-between">
                    <div className="flex items-center gap-4">
                      <Avatar className="h-12 w-12 border-2 border-white shadow">
                        <AvatarImage
                          src={user.photo || "/placeholder.svg"}
                          alt={user.name}
                        />
                        <AvatarFallback>
                          {user.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <CardTitle className="flex items-center gap-2">
                          {user.name}
                          {rank === 0 && (
                            <Trophy className="h-5 w-5 text-yellow-500" />
                          )}
                        </CardTitle>
                        <CardDescription>Rank #{rank + 1}</CardDescription>
                      </div>
                    </div>
                    <div className=" text-sm">
                      <div className="flex gap-2 items-center">
                        <span className="text-xs font-medium text-muted-foreground bg-muted px-2 py-1 rounded">
                          <Mail size={15} />
                        </span>
                        <span className="font-medium">{user.email}</span>
                      </div>
                      <div className="flex gap-2 items-center mt-1">
                        <span className="text-xs font-medium text-muted-foreground bg-muted px-2 py-1 rounded">
                          <Phone size={15} />
                        </span>
                        <span className="font-medium">{user.phoneNumber}</span>
                      </div>
                      <div className="flex gap-2 items-center mt-1">
                        <span className="text-xs font-medium text-muted-foreground bg-muted px-2 py-1 rounded">
                          <Calendar size={15} />
                        </span>
                        <span className="font-medium">
                          {new Date(user.joinDate).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 ">
                      <div className="bg-green-50 p-3 rounded-lg">
                        <div className="text-xs text-green-700 font-medium">
                          Total Deposit
                        </div>
                        <div className="text-lg font-bold text-green-800">
                          ৳ {user.totalDeposit.toLocaleString()}
                        </div>
                      </div>
                      <div className="bg-red-50 p-3 rounded-lg">
                        <div className="text-xs text-red-700 font-medium">
                          Total Withdraw
                        </div>
                        <div className="text-lg font-bold text-red-800">
                          ৳ {user.totalWithdraw.toLocaleString()}
                        </div>
                      </div>
                      <div className="bg-orange-50 p-3 rounded-lg">
                        <div className="text-xs text-orange-700 font-medium">
                          Total Penalties
                        </div>
                        <div className="text-lg font-bold text-orange-800">
                          ৳ {user.totalPenalties.toLocaleString()}
                        </div>
                      </div>
                      <div className="bg-blue-50 p-3 rounded-lg">
                        <div className="text-xs text-blue-700 font-medium">
                          Total Contribution
                        </div>
                        <div className="text-lg font-bold text-blue-800">
                          ৳ {user.totalContribution.toLocaleString()}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
