import PropTypes from "prop-types";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ArrowDownCircle, ArrowUpCircle } from "lucide-react";

function TransactionHistory({ transactions }) {
  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Transaction Date</TableHead>
            <TableHead>Transaction Type</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead>Approval</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {transactions?.map((transaction) => (
            <TableRow key={transaction._id}>
              <TableCell className="font-medium">{transaction.date}</TableCell>
              <TableCell>{transaction.type}</TableCell>
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
