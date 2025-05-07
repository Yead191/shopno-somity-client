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
import { ArrowDownCircle } from "lucide-react";
import { toast } from "sonner";
import { addTransaction } from "@/api/transactions";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import { useAuthUser } from "@/redux/auth/authAction";

function WithdrawModal({ member, refetch }) {
  const [open, setOpen] = useState(false);
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const axiosSecure = useAxiosSecure();
  const user = useAuthUser();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!amount || Number.parseFloat(amount) <= 0) {
      toast.error("Please enter a valid amount greater than 0");
      return;
    }

    setIsSubmitting(true);

    try {
      const transaction = {
        memberName: member.name,
        memberEmail: member.email,
        memberId: member._id,
        amount: Number.parseFloat(amount),
        type: "Withdraw",
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
              Successfully withdraw {Number.parseFloat(amount).toLocaleString()}
            </b>
          );
        },
      });
    } catch (error) {
      toast.error("Failed to process withdrawal. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className={"cursor-pointer"} variant="destructive">
          <ArrowDownCircle className="mr-2 h-4 w-4" /> Withdraw
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Make a Withdrawal</DialogTitle>
          <DialogDescription>
            Fill out the form below to withdraw money from the member's account.
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
                Amount ($)
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
            <Button type="submit" variant="destructive" disabled={isSubmitting}>
              {isSubmitting ? "Processing..." : "Withdraw"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

WithdrawModal.propTypes = {
  memberId: PropTypes.string.isRequired,
  onTransactionAdded: PropTypes.func,
};

export default WithdrawModal;
