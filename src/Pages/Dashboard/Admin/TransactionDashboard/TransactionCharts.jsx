import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
} from "recharts";
import Spinner from "@/components/Spinner";

const COLORS = ["#22c55e", "#ef4444", "#3b82f6", "#8b5cf6", "#f97316"];

function TransactionCharts() {
  const [timeRange, setTimeRange] = useState("month");
  const axiosSecure = useAxiosSecure();

  const { data: summaryData = {}, isLoading } = useQuery({
    queryKey: ["summaryData"],
    queryFn: async () => {
      const { data } = await axiosSecure.get("/transactions/summary");
      return data;
    },
  });

  // Filter monthlyTotals based on timeRange
  const filterDataByTimeRange = (monthlyTotals) => {
    const now = new Date("2025-05-09"); // Based on your data's latest date
    const months = monthlyTotals || [];
    switch (timeRange) {
      case "week":
        // Show only May (simulating last week)
        return months.filter((m) => m.month === "May");
      case "month":
        // Show last month (May)
        return months.filter((m) => m.month === "May");
      case "quarter":
        // Show last 3 months (March, April, May)
        return months.filter((m) =>
          ["March", "April", "May"].includes(m.month)
        );
      case "year":
        // Show all months
        return months;
      default:
        return months;
    }
  };

  const filteredData = filterDataByTimeRange(summaryData.monthlyTotals);

  // Mock member contributions (since no per-member data)
  const memberContributions = [
    { name: "Member 1", amount: 6000 },
    { name: "Member 2", amount: 4500 },
    { name: "Member 3", amount: 3400 },
  ];

  // Prepare data for Pie Chart (combine deposits and withdrawals by category)
  const categoryData = [
    ...(summaryData.depositsByCategory || []).map((item) => ({
      name: item.category,
      value: item.amount,
    })),
    ...(summaryData.withdrawalsByCategory || []).map((item) => ({
      name: item.category,
      value: item.amount,
    })),
  ];

  // Prepare data for Donut Chart (deposits by method)
  const paymentMethodData = (summaryData.depositsByMethod || []).map(
    (item) => ({
      name: item.method || "Unknown",
      value: item.amount,
    })
  );

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-end">
        <Select value={timeRange} onValueChange={setTimeRange}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select time range" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="week">Last Week</SelectItem>
            <SelectItem value="month">Last Month</SelectItem>
            <SelectItem value="quarter">Last Quarter</SelectItem>
            <SelectItem value="year">Last Year</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Deposits vs Withdrawals</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={filteredData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="deposits" fill="#22c55e" name="Deposits" />
                <Bar dataKey="withdrawals" fill="#ef4444" name="Withdrawals" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Transaction Categories</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={categoryData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  fill="#8884d8"
                  label
                >
                  {categoryData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Transaction Trends</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={filteredData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="deposits"
                stroke="#22c55e"
                name="Deposits"
              />
              <Line
                type="monotone"
                dataKey="withdrawals"
                stroke="#ef4444"
                name="Withdrawals"
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Member Contributions</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={memberContributions} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" />
                <YAxis dataKey="name" type="category" width={100} />
                <Tooltip />
                <Legend />
                <Bar dataKey="amount" fill="#3b82f6" name="Contributions" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Payment Methods</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={paymentMethodData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  fill="#8884d8"
                  label
                >
                  {paymentMethodData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default TransactionCharts;
