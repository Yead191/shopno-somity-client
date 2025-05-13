"use client";

import { ArrowDownCircle, ArrowUpCircle, ArrowRightCircle } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

// Mock data
// const transactions = [
//   {
//     id: 1,
//     memberName: "Ahmed Hasan",
//     memberImage: "/placeholder.svg?height=40&width=40",
//     memberInitials: "AH",
//     date: "February 7, 2025",
//     amount: 29400.0,
//     type: "deposit",
//     status: "Approved",
//   },
//   {
//     id: 2,
//     memberName: "Abu Taher",
//     memberImage: "/placeholder.svg?height=40&width=40",
//     memberInitials: "AT",
//     date: "February 4, 2025",
//     amount: 800.0,
//     type: "deposit",
//     status: "Approved",
//   },
//   {
//     id: 3,
//     memberName: "Abu Taher",
//     memberImage: "/placeholder.svg?height=40&width=40",
//     memberInitials: "AT",
//     date: "February 4, 2025",
//     amount: 20.0,
//     type: "deposit",
//     status: "Approved",
//   },
//   {
//     id: 4,
//     memberName: "Abu Taher",
//     memberImage: "/placeholder.svg?height=40&width=40",
//     memberInitials: "AT",
//     date: "February 4, 2025",
//     amount: 20.0,
//     type: "deposit",
//     status: "Approved",
//   },
//   {
//     id: 5,
//     memberName: "Mufijul Islam",
//     memberImage: "/placeholder.svg?height=40&width=40",
//     memberInitials: "MI",
//     date: "February 4, 2025",
//     amount: 1000.0,
//     type: "withdrawal",
//     status: "Approved",
//   },
//   {
//     id: 6,
//     memberName: "Mufijul Islam",
//     memberImage: "/placeholder.svg?height=40&width=40",
//     memberInitials: "MI",
//     date: "February 4, 2025",
//     amount: 270.0,
//     type: "deposit",
//     status: "Approved",
//   },
//   {
//     id: 7,
//     memberName: "Mufijul Islam",
//     memberImage: "/placeholder.svg?height=40&width=40",
//     memberInitials: "MI",
//     date: "February 4, 2025",
//     amount: 100.0,
//     type: "deposit",
//     status: "Approved",
//   },
//   {
//     id: 8,
//     memberName: "Abu Taher",
//     memberImage: "/placeholder.svg?height=40&width=40",
//     memberInitials: "AT",
//     date: "February 4, 2025",
//     amount: 300.0,
//     type: "deposit",
//     status: "Approved",
//   },
// ];

export function RecentTransactions({ transactions }) {
  const getTransactionIcon = (type) => {
    switch (type) {
      case "Deposit":
        return <ArrowUpCircle className="h-4 w-4 text-green-500" />;
      case "Withdraw":
        return <ArrowDownCircle className="h-4 w-4 text-red-500" />;
      default:
        return <ArrowRightCircle className="h-4 w-4 text-blue-500" />;
    }
  };

  return (
    <div className="space-y-4">
      {transactions?.slice(0, 10).map((transaction) => (
        <div
          key={transaction._id}
          className="flex items-center justify-between py-2"
        >
          <div className="flex items-center gap-3">
            <Avatar className="h-10 w-10">
              <AvatarImage
                src={transaction?.photo || "/placeholder.svg"}
                alt={transaction.memberName}
              />
              <AvatarFallback>
                {transaction?.memberName
                  .split(" ")
                  .map((n) => n[0])
                  .join("")
                  .toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div>
              <div className="flex items-center">
                <p className="font-medium">{transaction.memberName}</p>
                <span className="mx-2">•</span>
                <span className="text-sm text-muted-foreground">
                  {transaction.date}
                </span>
              </div>
              <div className="flex items-center text-sm">
                {getTransactionIcon(transaction.type)}
                <span className="ml-1 capitalize">{transaction.type}</span>
              </div>
            </div>
          </div>
          <div className="text-right">
            <p
              className={`font-medium ${
                transaction.type === "Deposit"
                  ? "text-green-600"
                  : "text-red-600"
              }`}
            >
              ৳{transaction.amount.toLocaleString()}
            </p>
            <Badge variant="outline" className="mt-1">
              Approved
            </Badge>
          </div>
        </div>
      ))}
    </div>
  );
}
