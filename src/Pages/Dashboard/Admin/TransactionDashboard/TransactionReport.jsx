import { Separator } from "@/components/ui/separator";

import { useState, useEffect } from "react";
import {
  ArrowDownCircle,
  ArrowUpCircle,
  Calendar,
  Download,
  Filter,
  Search,
  SlidersHorizontal,
  FileText,
  Printer,
  Eye,
  BanIcon,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import Spinner from "@/components/Spinner";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

// Enhanced transaction data with additional fields
// const transactionData = [
//   {
//     _id: "681bba248b8e06c9bdc5e58a",
//     memberName: "Oli Ahmed",
//     memberEmail: "oli@gmail.com",
//     memberId: "681b49027b2fab13d3e841f8",
//     amount: 500,
//     type: "Deposit",
//     date: "2025-05-07",
//     approvedBy: "Md Asadur Rahaman Yead",
//     approvedByEmail: "yead191@gmail.com",
//     status: "Completed",
//     description: "Monthly contribution",
//     category: "Membership Fee",
//     reference: "REF-2025-05-001",
//     method: "Cash",
//   },
//   {
//     _id: "681bbaf28b8e06c9bdc5e58b",
//     memberName: "Oli Ahmed",
//     memberEmail: "oli@gmail.com",
//     memberId: "681b49027b2fab13d3e841f8",
//     amount: 1000,
//     type: "Deposit",
//     date: "2025-04-01",
//     approvedBy: "Md Asadur Rahaman Yead",
//     approvedByEmail: "yead191@gmail.com",
//     status: "Completed",
//     description: "Investment contribution",
//     category: "Investment",
//     reference: "REF-2025-04-002",
//     method: "Bank Transfer",
//   },
//   {
//     _id: "681bbaf28b8e06c9bdc5e58c",
//     memberName: "Sarah Johnson",
//     memberEmail: "sarah@example.com",
//     memberId: "681b49027b2fab13d3e841f9",
//     amount: 750,
//     type: "Deposit",
//     date: "2025-05-05",
//     approvedBy: "Md Asadur Rahaman Yead",
//     approvedByEmail: "yead191@gmail.com",
//     status: "Completed",
//     description: "Monthly contribution",
//     category: "Membership Fee",
//     reference: "REF-2025-05-003",
//     method: "Mobile Banking",
//   },
//   {
//     _id: "681bbaf28b8e06c9bdc5e58d",
//     memberName: "John Smith",
//     memberEmail: "john@example.com",
//     memberId: "681b49027b2fab13d3e841fa",
//     amount: 2000,
//     type: "Deposit",
//     date: "2025-05-02",
//     approvedBy: "Md Asadur Rahaman Yead",
//     approvedByEmail: "yead191@gmail.com",
//     status: "Completed",
//     description: "Investment contribution",
//     category: "Investment",
//     reference: "REF-2025-05-004",
//     method: "Bank Transfer",
//   },
//   {
//     _id: "681bbaf28b8e06c9bdc5e58e",
//     memberName: "Oli Ahmed",
//     memberEmail: "oli@gmail.com",
//     memberId: "681b49027b2fab13d3e841f8",
//     amount: 300,
//     type: "Withdrawal",
//     date: "2025-05-10",
//     approvedBy: "Md Asadur Rahaman Yead",
//     approvedByEmail: "yead191@gmail.com",
//     status: "Completed",
//     description: "Emergency withdrawal",
//     category: "Withdrawal",
//     reference: "REF-2025-05-005",
//     method: "Cash",
//   },
//   {
//     _id: "681bbaf28b8e06c9bdc5e58f",
//     memberName: "Sarah Johnson",
//     memberEmail: "sarah@example.com",
//     memberId: "681b49027b2fab13d3e841f9",
//     amount: 1500,
//     type: "Withdrawal",
//     date: "2025-04-28",
//     approvedBy: "Md Asadur Rahaman Yead",
//     approvedByEmail: "yead191@gmail.com",
//     status: "Completed",
//     description: "Loan disbursement",
//     category: "Loan",
//     reference: "REF-2025-04-006",
//     method: "Bank Transfer",
//   },
//   {
//     _id: "681bbaf28b8e06c9bdc5e590",
//     memberName: "John Smith",
//     memberEmail: "john@example.com",
//     memberId: "681b49027b2fab13d3e841fa",
//     amount: 250,
//     type: "Deposit",
//     date: "2025-04-15",
//     approvedBy: "Md Asadur Rahaman Yead",
//     approvedByEmail: "yead191@gmail.com",
//     status: "Completed",
//     description: "Late fee payment",
//     category: "Penalty",
//     reference: "REF-2025-04-007",
//     method: "Mobile Banking",
//   },
//   {
//     _id: "681bbaf28b8e06c9bdc5e591",
//     memberName: "Michael Brown",
//     memberEmail: "michael@example.com",
//     memberId: "681b49027b2fab13d3e841fb",
//     amount: 1200,
//     type: "Deposit",
//     date: "2025-05-01",
//     approvedBy: "Md Asadur Rahaman Yead",
//     approvedByEmail: "yead191@gmail.com",
//     status: "Pending",
//     description: "Initial membership deposit",
//     category: "Membership Fee",
//     reference: "REF-2025-05-008",
//     method: "Check",
//   },
// ];

function TransactionReport() {
  // const [transactions, setTransactions] = useState([]);
  const [filteredTransactions, setFilteredTransactions] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [typeFilter, setTypeFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [sortBy, setSortBy] = useState("date");
  const [sortOrder, setSortOrder] = useState("desc");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const [isConfirming, setIsConfirming] = useState(false);
  const axiosSecure = useAxiosSecure();
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  // useEffect(() => {
  //   // In a real app, this would be an API call
  //   setTransactions(transactionData);
  //   setFilteredTransactions(transactionData);
  // }, []);
  const {
    data: transactions = [],
    isLoading: transactionLoading,
    refetch,
  } = useQuery({
    queryKey: [
      "transactions",
      searchTerm,
      typeFilter,
      statusFilter,
      startDate,
      endDate,
      page,
      limit,
    ],
    queryFn: async () => {
      const { data } = await axiosSecure.get(
        `/transactions?search=${searchTerm}&type=${typeFilter}&method=${statusFilter}&startDate=${startDate}&endDate=${endDate}&page=${page}&limit=${limit}`
      );
      return data;
    },
  });
  // console.log(transactions);
  // useEffect(() => {
  //   let result = [...transactions];

  //   // Apply search filter
  //   if (searchTerm) {
  //     result = result.filter(
  //       (transaction) =>
  //         transaction.memberName
  //           .toLowerCase()
  //           .includes(searchTerm.toLowerCase()) ||
  //         transaction.reference
  //           .toLowerCase()
  //           .includes(searchTerm.toLowerCase()) ||
  //         transaction.description
  //           .toLowerCase()
  //           .includes(searchTerm.toLowerCase())
  //     );
  //   }

  //   // Apply type filter
  //   if (typeFilter !== "all") {
  //     result = result.filter((transaction) => transaction.type === typeFilter);
  //   }

  //   // Apply status filter
  //   if (statusFilter !== "all") {
  //     result = result.filter(
  //       (transaction) => transaction.status === statusFilter
  //     );
  //   }

  //   // Apply category filter
  //   if (categoryFilter !== "all") {
  //     result = result.filter(
  //       (transaction) => transaction.category === categoryFilter
  //     );
  //   }

  //   // Apply date range filter
  //   if (startDate && endDate) {
  //     result = result.filter(
  //       (transaction) =>
  //         new Date(transaction.date) >= new Date(startDate) &&
  //         new Date(transaction.date) <= new Date(endDate)
  //     );
  //   }

  //   // Apply sorting
  //   result.sort((a, b) => {
  //     if (sortBy === "date") {
  //       return sortOrder === "asc"
  //         ? new Date(a.date) - new Date(b.date)
  //         : new Date(b.date) - new Date(a.date);
  //     } else if (sortBy === "amount") {
  //       return sortOrder === "asc" ? a.amount - b.amount : b.amount - a.amount;
  //     } else if (sortBy === "memberName") {
  //       return sortOrder === "asc"
  //         ? a.memberName.localeCompare(b.memberName)
  //         : b.memberName.localeCompare(a.memberName);
  //     }
  //     return 0;
  //   });

  //   setFilteredTransactions(result);
  // }, [
  //   transactions,
  //   searchTerm,
  //   typeFilter,
  //   statusFilter,
  //   categoryFilter,
  //   sortBy,
  //   sortOrder,
  //   startDate,
  //   endDate,
  // ]);

  const totalDeposits = transactions?.transactions
    ?.filter((t) => t.type === "Deposit")
    .reduce((sum, t) => sum + t.amount, 0);

  const totalWithdrawals = transactions?.transactions
    ?.filter((t) => t.type === "Withdraw")
    .reduce((sum, t) => sum + t.amount, 0);
  const totalPenalties = transactions.transactions
    ?.filter((t) => t.type === "Penalty")
    .reduce((sum, t) => sum + t.amount, 0);

  const balance = totalDeposits - totalWithdrawals;

  const resetFilters = () => {
    setSearchTerm("");
    setTypeFilter("");
    setStatusFilter("all");
    setCategoryFilter("all");
    setStartDate("");
    setEndDate("");
    setSortBy("date");
    setSortOrder("desc");
    setPage(1);
  };

  const handleExport = (format) => {
    // In a real app, this would generate and download a file
    console.log(`Exporting transactions in ${format} format`);
  };

  const handlePrint = () => {
    window.print();
  };

  const viewTransactionDetails = (transaction) => {
    setSelectedTransaction(transaction);
  };

  const getStatusBadgeColor = (status) => {
    switch (status) {
      case "Cash":
        return "bg-green-100 text-green-800";
      case "Bank Transfer":
        return "bg-yellow-100 text-yellow-800";
      case "Failed":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const handleDelete = async (id) => {
    console.log(id);
    // Show confirmation toast
    setIsConfirming(true);
    const toastId = toast(
      <div>
        <p>Are you sure you want to delete this transaction?</p>
        <div className="flex gap-2 items-center mt-2">
          <Button
            size={"sm"}
            onClick={() => {
              toast.dismiss(toastId);
              setIsConfirming(false);
            }}
          >
            Cancel
          </Button>
          <Button
            variant="destructive"
            size="sm"
            onClick={async () => {
              try {
                // await axiosSecure.delete(`/transactions/${transactionId}`);
                // toast.success("Transaction deleted successfully");
                toast.promise(
                  axiosSecure.delete(`/transactions/delete/${id}`),
                  {
                    loading: "Deleting Transaction...",
                    success: () => {
                      refetch();
                      toast.dismiss(toastId);
                      return <b>Transaction deleted successfully!</b>;
                    },
                  }
                );
              } catch (error) {
                toast.error("Failed to delete transaction. Please try again.");
              } finally {
                setIsConfirming(false);
              }
            }}
          >
            Confirm Delete
          </Button>
        </div>
      </div>,
      {
        duration: 4000,
        onDismiss: () => setIsConfirming(false),
        onAutoClose: () => setIsConfirming(false),
      }
    );
  };

  // Pagination Functions
  const handlePageChange = (pageNumber) => {
    setPage(pageNumber);
  };
  const handlePrevPage = () => setPage((prev) => Math.max(prev - 1, 1));
  const handleNextPage = () => {
    setPage((prev) => (prev < transactions.totalPages ? prev + 1 : prev));
  };

  // Handle limit change
  const handleLimitChange = (newLimit) => {
    const parsedLimit = parseInt(newLimit, 10);
    setLimit(parsedLimit);
    setPage(1);
  };

  return (
    <div className="container mx-auto py-6 space-y-6 print:py-0">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 print:hidden">
        <h1 className="text-2xl font-bold">Transaction Report</h1>
        <div className="flex flex-wrap gap-2 print:hidden">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="flex items-center gap-2">
                <Download className="h-4 w-4" />
                Export
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className={"print:hidden"}>
              <DropdownMenuItem onClick={() => handleExport("csv")}>
                <FileText className="h-4 w-4 mr-2" />
                Export as CSV
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleExport("pdf")}>
                <FileText className="h-4 w-4 mr-2" />
                Export as PDF
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handlePrint}>
                <Printer className="h-4 w-4 mr-2" />
                Print Report
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Deposits</p>
                <h3 className="text-2xl font-bold text-green-600">
                  ৳{totalDeposits?.toLocaleString()}
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
                  ৳{totalWithdrawals?.toLocaleString()}
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
                <p className="text-sm text-muted-foreground">Total Penalties</p>
                <h3 className="text-2xl font-bold text-purple-500">
                  ৳{totalPenalties?.toLocaleString()}
                </h3>
              </div>
              <div className="p-3 rounded-full bg-purple-50">
                <BanIcon className="h-6 w-6 text-purple-600" />
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
                  ৳{balance?.toLocaleString()}
                </h3>
              </div>
              <div className="p-3 rounded-full bg-blue-100">
                <SlidersHorizontal className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card className="print:hidden">
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div>
              <label className="text-sm font-medium mb-1 block">Search</label>
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Search by name, reference..."
                  className="pl-8"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            <div>
              <label className="text-sm font-medium mb-1 block">
                Transaction Type
              </label>
              <Select value={typeFilter} onValueChange={setTypeFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="All Types" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Deposit">Deposit</SelectItem>
                  <SelectItem value="Withdraw">Withdrawal</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="text-sm font-medium mb-1 block">
                Payment Method
              </label>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="All Method" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Payment</SelectItem>
                  <SelectItem value="Cash">Cash</SelectItem>
                  <SelectItem value="Mobile Banking">Mobile Banking</SelectItem>
                  <SelectItem value="Bank Transfer">Bank Transfer</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
            <div>
              <label className="text-sm font-medium mb-1 block">
                Start Date
              </label>
              <div className="relative">
                <Calendar className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="date"
                  className="pl-8"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                />
              </div>
            </div>
            <div>
              <label className="text-sm font-medium mb-1 block">End Date</label>
              <div className="relative">
                <Calendar className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="date"
                  className="pl-8"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                />
              </div>
            </div>
            <div>
              <label className="text-sm font-medium mb-1 block">
                Sort Order
              </label>
              <Select value={sortOrder} onValueChange={setSortOrder}>
                <SelectTrigger>
                  <SelectValue placeholder="Sort Order" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="desc">Newest First</SelectItem>
                  <SelectItem value="asc">Oldest First</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex justify-end mt-4">
            <Button
              variant="outline"
              onClick={resetFilters}
              className="flex items-center gap-2"
            >
              <Filter className="h-4 w-4" />
              Reset Filters
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Transactions Table */}
      <Card>
        <CardHeader className="pb-0">
          <CardTitle>Transactions</CardTitle>
        </CardHeader>
        {transactionLoading ? (
          <Spinner />
        ) : (
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-4">Date</th>
                    <th className="text-left p-4">Member</th>
                    <th className="text-left p-4">Type</th>
                    <th className="text-left p-4">Amount</th>
                    <th className="text-left p-4">P. Method</th>
                    <th className="text-left p-4 print:hidden">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {transactions.transactions.length === 0 ? (
                    <tr>
                      <td colSpan="8" className="text-center p-4">
                        No transactions found
                      </td>
                    </tr>
                  ) : (
                    transactions?.transactions?.map((transaction) => (
                      <tr
                        key={transaction._id}
                        className="border-b hover:bg-muted/50"
                      >
                        <td className="p-4">{transaction?.date}</td>
                        <td className="p-4">{transaction?.memberName}</td>
                        <td className="p-4">{transaction?.type}</td>
                        <td className="p-4">
                          <div className="flex items-center">
                            {transaction.type === "Deposit" ? (
                              <ArrowUpCircle className="h-4 w-4 mr-2 text-green-500" />
                            ) : (
                              <ArrowDownCircle className="h-4 w-4 mr-2 text-red-500" />
                            )}
                            <span
                              className={
                                transaction.type === "Deposit"
                                  ? "text-green-600"
                                  : "text-red-600"
                              }
                            >
                              ৳{transaction.amount.toLocaleString()}
                            </span>
                          </div>
                        </td>
                        <td className="p-4">
                          <Badge
                            className={getStatusBadgeColor(
                              transaction?.paymentMethod
                            )}
                          >
                            {transaction?.paymentMethod
                              ? transaction?.paymentMethod
                              : transaction?.penaltyReason}
                          </Badge>
                        </td>
                        {/* <td className="p-4 print:hidden">
                        <Link
                          to={`/dashboard/member-profile/${transaction.memberId}`}
                        >
                          <Button variant="ghost" size="icon">
                            <Eye className="h-4 w-4" />
                          </Button>
                        </Link>
                      </td> */}
                        <td className="p-4 print:hidden">
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() =>
                                  viewTransactionDetails(transaction)
                                }
                              >
                                <Eye className="h-4 w-4" />
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="sm:max-w-[500px]">
                              <DialogHeader>
                                <DialogTitle>Transaction Details</DialogTitle>
                              </DialogHeader>
                              {selectedTransaction && (
                                <div className="grid gap-4 py-4">
                                  <div className="flex justify-between items-center">
                                    <h3 className="text-lg font-medium">
                                      {selectedTransaction.type}
                                    </h3>
                                    <Badge
                                      className={getStatusBadgeColor(
                                        selectedTransaction.paymentMethod
                                      )}
                                    >
                                      {transaction?.paymentMethod
                                        ? transaction?.paymentMethod
                                        : transaction?.penaltyReason}
                                    </Badge>
                                  </div>
                                  <div className="text-center my-2">
                                    <p className="text-sm text-muted-foreground">
                                      Amount
                                    </p>
                                    <p
                                      className={`text-2xl font-bold ${
                                        selectedTransaction.type === "Deposit"
                                          ? "text-green-600"
                                          : "text-red-600"
                                      }`}
                                    >
                                      ৳
                                      {selectedTransaction.amount.toLocaleString()}
                                    </p>
                                  </div>
                                  <Separator />
                                  <div className="grid grid-cols-2 gap-2">
                                    <div>
                                      <p className="text-sm text-muted-foreground">
                                        Date
                                      </p>
                                      <p>{selectedTransaction?.date}</p>
                                    </div>
                                  </div>
                                  <div>
                                    <p className="text-sm text-muted-foreground">
                                      Type
                                    </p>
                                    <p>{selectedTransaction?.type}</p>
                                  </div>
                                  <div>
                                    <p className="text-sm text-muted-foreground">
                                      Payment Method
                                    </p>
                                    <p>{selectedTransaction.paymentMethod}</p>
                                  </div>
                                  <Separator />
                                  <div>
                                    <p className="text-sm text-muted-foreground">
                                      Member
                                    </p>
                                    <p>{selectedTransaction?.memberName}</p>
                                    <p className="text-sm text-muted-foreground">
                                      {selectedTransaction.memberEmail}
                                    </p>
                                  </div>
                                  <div>
                                    <p className="text-sm text-muted-foreground">
                                      Approved By
                                    </p>
                                    <p>{selectedTransaction.approvedBy}</p>
                                    <p className="text-sm text-muted-foreground">
                                      {selectedTransaction.approvedByEmail}
                                    </p>
                                  </div>
                                  <DialogFooter
                                    className={
                                      "flex items-center flex-col md:flex-row"
                                    }
                                  >
                                    <Link
                                      className={"w-full md:w-auto"}
                                      to={`/dashboard/member-profile/${selectedTransaction.memberId}`}
                                    >
                                      <Button variant={"outline"} 
                                      className={"w-full md:w-auto"}
                                      >
                                        View Profile
                                      </Button>
                                    </Link>
                                    <Button
                                      className={"w-full md:w-auto"}
                                      onClick={() =>
                                        handleDelete(selectedTransaction._id)
                                      }
                                      variant={"destructive"}
                                    >
                                      Delete
                                    </Button>
                                  </DialogFooter>
                                </div>
                              )}
                            </DialogContent>
                          </Dialog>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
            {/* Pagination */}

            <Pagination className="mt-4 flex flex-wrap">
              <PaginationContent>
                {/* Previous */}
                <PaginationItem>
                  <PaginationPrevious
                    className="cursor-pointer"
                    onClick={handlePrevPage}
                  />
                </PaginationItem>

                {/* Page Numbers */}
                {transactionLoading ? (
                  Array.from({ length: 5 }).map((_, i) => (
                    <PaginationItem key={i}>
                      <div className="w-8 h-8 skeleton rounded-md"></div>
                    </PaginationItem>
                  ))
                ) : (
                  <>
                    {/* Always show page 1 */}
                    <PaginationItem>
                      <PaginationLink
                        className="cursor-pointer"
                        isActive={page === 1}
                        onClick={(e) => {
                          e.preventDefault();
                          handlePageChange(1);
                        }}
                      >
                        1
                      </PaginationLink>
                    </PaginationItem>

                    {/* Show left ellipsis if needed */}
                    {page > 3 && (
                      <PaginationItem>
                        <PaginationEllipsis />
                      </PaginationItem>
                    )}

                    {/* Show pages around current */}
                    {Array.from(
                      { length: transactions.totalPages },
                      (_, i) => i + 1
                    )
                      .filter(
                        (p) =>
                          p !== 1 &&
                          p !== transactions.totalPages &&
                          Math.abs(p - page) <= 1
                      )
                      .map((pageNumber) => (
                        <PaginationItem key={pageNumber}>
                          <PaginationLink
                            className="cursor-pointer"
                            isActive={pageNumber === page}
                            onClick={(e) => {
                              e.preventDefault();
                              handlePageChange(pageNumber);
                            }}
                          >
                            {pageNumber}
                          </PaginationLink>
                        </PaginationItem>
                      ))}

                    {/* Show right ellipsis if needed */}
                    {page < transactions.totalPages - 2 && (
                      <PaginationItem>
                        <PaginationEllipsis />
                      </PaginationItem>
                    )}

                    {/* Always show last page */}
                    {transactions.totalPages > 1 && (
                      <PaginationItem>
                        <PaginationLink
                          className="cursor-pointer"
                          isActive={page === transactions.totalPages}
                          onClick={(e) => {
                            e.preventDefault();
                            handlePageChange(transactions.totalPages);
                          }}
                        >
                          {transactions.totalPages}
                        </PaginationLink>
                      </PaginationItem>
                    )}
                  </>
                )}

                {/* Next */}
                <PaginationItem>
                  <PaginationNext
                    className="cursor-pointer"
                    onClick={handleNextPage}
                  />
                </PaginationItem>
                <Select
                  id="limit"
                  value={limit.toString()}
                  onValueChange={handleLimitChange}
                >
                  <SelectTrigger className="w-24">
                    <SelectValue placeholder="Select limit" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="10">10</SelectItem>
                    <SelectItem value="20">20</SelectItem>
                    <SelectItem value="50">50</SelectItem>
                  </SelectContent>
                </Select>
              </PaginationContent>
            </Pagination>
          </CardContent>
        )}
      </Card>
    </div>
  );
}

export default TransactionReport;
