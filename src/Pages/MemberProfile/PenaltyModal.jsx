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
import { AlertCircle } from "lucide-react";
import { toast } from "sonner";
import { addTransaction } from "@/api/transactions";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import { useAuthUser } from "@/redux/auth/authAction";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

function PenaltyModal({ member, refetch }) {
  const [open, setOpen] = useState(false);
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [penaltyReason, setPenaltyReason] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const axiosSecure = useAxiosSecure();
  const user = useAuthUser();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!amount || Number.parseFloat(amount) <= 0) {
      toast.error("Please enter a valid penalty amount greater than 0");
      return;
    }
    if (!penaltyReason) {
      toast.error("Please select a penalty reason");
      return;
    }
    setIsSubmitting(true);

    try {
      const transaction = {
        memberName: member.name,
        memberEmail: member.email,
        memberId: member._id,
        amount: Number.parseFloat(amount),
        type: "Penalty",
        date,
        penaltyReason,
        approvedBy: user.displayName,
        approvedByEmail: user.email,
      };

      toast.promise(axiosSecure.post("/transactions", transaction), {
        loading: "Processing penalty...",
        success: () => {
          refetch();
          setOpen(false);
          setAmount("");
          setPenaltyReason("");
          return (
            <b>
              Successfully imposed penalty of{" "}
              {Number.parseFloat(amount).toLocaleString()}
            </b>
          );
        },
      });
    } catch (error) {
      toast.error("Failed to process penalty. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size={"sm"} disabled={!member?.isActive} className={"cursor-pointer"} variant="destructive">
          <AlertCircle className="mr-2 h-4 w-4" /> Penalty
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Impose a Penalty</DialogTitle>
          <DialogDescription>
            Fill out the form below to impose a penalty on the member's account.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-6 items-center gap-4">
              <Label htmlFor="date" className="text-right col-span-2">
                Date
              </Label>
              <Input
                id="date"
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="col-span-4"
                required
              />
            </div>
            <div className="grid grid-cols-6 items-center gap-4">
              <Label htmlFor="amount" className="text-right col-span-2">
                Amount (৳)
              </Label>
              <Input
                id="amount"
                type="number"
                inputMode="numeric"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="0.00"
                className="col-span-4"
                min="0"
                step="0.01"
                required
              />
            </div>
            <div className="flex items-center gap-4">
              <Label htmlFor="penaltyReason" className="text-right">
                Penalty Reason
              </Label>
              <Select
                id="penaltyReason"
                value={penaltyReason}
                onValueChange={setPenaltyReason}
                className="w-full"
                required
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select penalty reason" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Late Payment">Late Payment</SelectItem>
                  <SelectItem value="Rule Violation">Rule Violation</SelectItem>
                  <SelectItem value="Missed Meeting">Missed Meeting</SelectItem>
                  <SelectItem value="Other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button type="submit" variant="destructive" disabled={isSubmitting}>
              {isSubmitting ? "Processing..." : "Impose Penalty"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

PenaltyModal.propTypes = {
  member: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
  }).isRequired,
  refetch: PropTypes.func.isRequired,
};

export default PenaltyModal;
