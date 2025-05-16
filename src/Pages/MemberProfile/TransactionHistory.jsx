import PropTypes from "prop-types";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  ArrowDownCircle,
  ArrowDownUp,
  ArrowUpCircle,
  CreditCard,
} from "lucide-react";

function TransactionHistory({ transactions }) {
  console.log(transactions);
  return (
    <div className="overflow-x-auto">
      {transactions.length < 1 ? (
        <div className="w-full py-12 flex flex-col items-center justify-center text-center px-4">
          <div className="relative mb-4">
            <div className="h-20 w-20 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
              <CreditCard className="h-10 w-10 text-slate-400 dark:text-slate-500" />
            </div>
            <div className="absolute -bottom-1 -right-1 bg-slate-200 dark:bg-slate-700 rounded-full p-1.5">
              <ArrowDownUp className="h-5 w-5 text-slate-500 dark:text-slate-400" />
            </div>
          </div>

          <h3 className="text-xl font-semibold text-slate-800 dark:text-slate-200 mt-4">
            No transaction history
          </h3>

          <p className="text-slate-500 dark:text-slate-400 mt-2 max-w-sm">
            You don't have any transaction records yet
          </p>

          {/* {showAddButton && (
                <Button
                  onClick={onAddClick}
                  className="mt-6 flex items-center gap-2"
                  variant="outline"
                >
                  <PlusCircle className="h-4 w-4" />
                  Add Transaction
                </Button>
              )} */}
        </div>
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Transaction Date</TableHead>
              <TableHead>Transaction Type</TableHead>
              <TableHead>Method</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Approval</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {transactions?.map((transaction) => (
              <TableRow key={transaction._id}>
                <TableCell className="font-medium">
                  {transaction.date}
                </TableCell>

                <TableCell
                  className={
                    transaction?.type === "Deposit"
                      ? "text-green-500"
                      : "text-red-500"
                  }
                >
                  {transaction?.type}
                </TableCell>
                <TableCell>
                  {transaction?.paymentMethod
                    ? transaction.paymentMethod
                    : transaction?.penaltyReason}
                </TableCell>
                <TableCell>
                  <div className="flex items-center">
                    {transaction?.type === "Deposit" ? (
                      <ArrowUpCircle className="h-4 w-4 mr-2 text-green-500" />
                    ) : (
                      <ArrowDownCircle className="h-4 w-4 mr-2 text-red-500" />
                    )}
                    <span
                      className={
                        transaction?.type === "Deposit"
                          ? "text-green-600"
                          : "text-red-600"
                      }
                    >
                      ৳ {Math.abs(transaction.amount).toLocaleString()}
                    </span>
                  </div>
                </TableCell>
                <TableCell>
                  <span className="text-green-600">
                    {transaction?.approvedBy}
                  </span>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </div>
  );
}

TransactionHistory.propTypes = {
  transactions: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      date: PropTypes.string.isRequired,
      type: PropTypes.string.isRequired,
      amount: PropTypes.number.isRequired,
      status: PropTypes.string.isRequired,
      isDeposit: PropTypes.bool.isRequired,
    })
  ).isRequired,
};

export default TransactionHistory;
