import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ArrowDownCircle,
  ArrowUpCircle,
  Users,
  CreditCard,
} from "lucide-react";

// This would come from your API in a real application
const summaryData = {
  totalDeposits: 5700,
  totalWithdrawals: 1800,
  balance: 3900,
  memberCount: 4,
  depositsByCategory: [
    { category: "Membership Fee", amount: 2700 },
    { category: "Investment", amount: 3000 },
    { category: "Penalty", amount: 250 },
  ],
  withdrawalsByCategory: [
    { category: "Withdrawal", amount: 300 },
    { category: "Loan", amount: 1500 },
  ],
  depositsByMethod: [
    { method: "Cash", amount: 800 },
    { method: "Bank Transfer", amount: 3000 },
    { method: "Mobile Banking", amount: 1000 },
    { method: "Check", amount: 1200 },
  ],
  monthlyTotals: [
    { month: "January", deposits: 0, withdrawals: 0 },
    { month: "February", deposits: 0, withdrawals: 0 },
    { month: "March", deposits: 0, withdrawals: 0 },
    { month: "April", deposits: 1250, withdrawals: 1500 },
    { month: "May", deposits: 4700, withdrawals: 300 },
  ],
};

function TransactionSummary() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Deposits</p>
                <h3 className="text-2xl font-bold text-green-600">
                  ${summaryData.totalDeposits.toLocaleString()}
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
                  ${summaryData.totalWithdrawals.toLocaleString()}
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
                  ${summaryData.balance.toLocaleString()}
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
                  {summaryData.memberCount}
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
            <CardTitle>Deposits by Category</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {summaryData.depositsByCategory.map((item, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
                    <span>{item.category}</span>
                  </div>
                  <span className="font-medium">
                    ${item.amount.toLocaleString()}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Withdrawals by Category</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {summaryData.withdrawalsByCategory.map((item, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-3 h-3 rounded-full bg-red-500 mr-2"></div>
                    <span>{item.category}</span>
                  </div>
                  <span className="font-medium">
                    ${item.amount.toLocaleString()}
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
            {summaryData.depositsByMethod.map((item, index) => (
              <div key={index} className="bg-muted rounded-lg p-4">
                <p className="text-sm text-muted-foreground">{item.method}</p>
                <p className="text-xl font-bold mt-1">
                  ${item.amount.toLocaleString()}
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
            {summaryData.monthlyTotals.map((item, index) => (
              <div key={index} className="flex items-center">
                <div className="w-24 flex-shrink-0">{item.month}</div>
                <div className="flex-1 h-4 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-green-500"
                    style={{
                      width: `${
                        (item.deposits / summaryData.totalDeposits) * 100
                      }%`,
                    }}
                  ></div>
                </div>
                <div className="w-24 text-right">
                  ${item.deposits.toLocaleString()}
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
