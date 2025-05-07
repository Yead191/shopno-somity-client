import { useState } from "react";
import PropTypes from "prop-types";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowUpCircle } from "lucide-react";
import { toast } from "sonner";
import { addTransaction } from "@/api/transactions";
import { useAuthUser } from "@/redux/auth/authAction";
import useAxiosSecure from "@/hooks/useAxiosSecure";
// import { addTransaction } from "../api/transactions"

function DepositModal({ member, refetch }) {
  const user = useAuthUser();
  const [open, setOpen] = useState(false);
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const axiosSecure = useAxiosSecure();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!amount || Number.parseFloat(amount) <= 0) {
      toast.error("Please enter a valid amount greater than 0");
      return;
    }

    setIsSubmitting(true);
    try {
      // await addTransaction({
      //   amount: Number.parseFloat(amount),
      //   date,
      //   type: "Deposit",
      //   isDeposit: true,
      // });
      const transaction = {
        memberName: member.name,
        memberEmail: member.email,
        memberId: member._id,
        amount: Number.parseFloat(amount),
        type: "Deposit",
        date,
        approvedBy: user.displayName,
        approvedByEmail: user.email,
      };

      toast.promise(axiosSecure.post("/transactions", transaction), {
        loading: "Loading transaction...",
        success: () => {
          refetch();
          setOpen(false);
          setAmount("");
          return (
            <b>
              Successfully deposited{" "}
              {Number.parseFloat(amount).toLocaleString()}
            </b>
          );
        },
      });
    } catch (error) {
      toast.error("Failed to process deposit. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-green-600 hover:bg-green-700 cursor-pointer">
          <ArrowUpCircle className="mr-2 h-4 w-4" /> Deposit
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Make a Deposit</DialogTitle>
          <DialogDescription>
            Fill out the form below to deposit money into the member's account.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="date" className="text-right">
                Date
              </Label>
              <Input
                id="date"
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="col-span-3"
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="amount" className="text-right">
                Amount (৳)
              </Label>
              <Input
                id="amount"
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="0.00"
                className="col-span-3"
                min="0"
                step="0.01"
                required
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Processing..." : "Deposit"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

DepositModal.propTypes = {
  memberId: PropTypes.string.isRequired,
  onTransactionAdded: PropTypes.func,
};

export default DepositModal;
