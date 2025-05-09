import Spinner from "@/components/Spinner";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import {
  ArrowDownCircle,
  ArrowUpCircle,
  Users,
  CreditCard,
} from "lucide-react";

function TransactionSummary() {
  const axiosSecure = useAxiosSecure();
  const { data: summaryData = {}, isLoading } = useQuery({
    queryKey: ["summaryData"],
    queryFn: async () => {
      const { data } = await axiosSecure.get("/transactions/summary");
      return data;
    },
  });

  // Helper to safely format numbers
  const formatNumber = (value) => {
    return typeof value === "number" ? value.toLocaleString() : "0";
  };

  // Helper to calculate progress bar width safely
  const getProgressWidth = (value, total) => {
    if (!total || total === 0) return "0%";
    return `${(value / total) * 100}%`;
  };

  if (isLoading) {
    return <Spinner />
  }
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Deposits</p>
                <h3 className="text-2xl font-bold text-green-600">
                  ৳{formatNumber(summaryData.totalDeposits)}
                </h3>
              </div>
              <div className="p-3 rounded-full bg-green-100">
                <ArrowUpCircle className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">
                  Total Withdrawals
                </p>
                <h3 className="text-2xl font-bold text-red-600">
                  ৳{formatNumber(summaryData.totalWithdrawals)}
                </h3>
              </div>
              <div className="p-3 rounded-full bg-red-100">
                <ArrowDownCircle className="h-6 w-6 text-red-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Current Balance</p>
                <h3 className="text-2xl font-bold">
                  ৳{formatNumber(summaryData.balance)}
                </h3>
              </div>
              <div className="p-3 rounded-full bg-blue-100">
                <CreditCard className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Active Members</p>
                <h3 className="text-2xl font-bold">
                  {formatNumber(summaryData.memberCount)}
                </h3>
              </div>
              <div className="p-3 rounded-full bg-purple-100">
                <Users className="h-6 w-6 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Deposits by Payment Method</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {(summaryData.depositsByCategory || []).map((item, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
                    <span>{item.category ? item.category : "N/A"}</span>
                  </div>
                  <span className="font-medium">
                    ৳{formatNumber(item.amount)}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Withdrawals by Payment Method</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {(summaryData.withdrawalsByCategory || []).map((item, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-3 h-3 rounded-full bg-red-500 mr-2"></div>
                    <span>{item.category ? item.category : "N/A" }</span>
                  </div>
                  <span className="font-medium">
                    ৳{formatNumber(item.amount)}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Payment Methods</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            {(summaryData.depositsByMethod || []).map((item, index) => (
              <div key={index} className="bg-muted rounded-lg p-4">
                <p className="text-sm text-muted-foreground">
                  {item.method || "Unknown"}
                </p>
                <p className="text-xl font-bold mt-1">
                  ৳{formatNumber(item.amount)}
                </p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Monthly Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {(summaryData.monthlyTotals || []).map((item, index) => (
              <div key={index} className="space-y-2">
                <div className="flex items-center">
                  <div className="w-24 flex-shrink-0">{item.month}</div>
                  <div className="flex-1 space-y-1">
                    <div className="h-4 bg-gray-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-green-500"
                        style={{
                          width: getProgressWidth(
                            item.deposits,
                            summaryData.totalDeposits
                          ),
                        }}
                      ></div>
                    </div>
                    <div className="h-4 bg-gray-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-red-500"
                        style={{
                          width: getProgressWidth(
                            item.withdrawals,
                            summaryData.totalWithdrawals
                          ),
                        }}
                      ></div>
                    </div>
                  </div>
                  <div className="w-24 text-right">
                    <div>৳{formatNumber(item.deposits)}</div>
                    <div>৳{formatNumber(item.withdrawals)}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default TransactionSummary;
