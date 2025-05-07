export function calculateTotalContribution(transactions) {
  return transactions.reduce((total, transaction) => {
    // Ensure transaction has valid type and amount
    if (!transaction?.type || typeof transaction.amount !== "number") {
      return total;
    }

    // Add for Deposit, subtract for Withdraw
    if (transaction.type.toLowerCase() === "deposit") {
      return total + transaction.amount;
    } else if (transaction.type.toLowerCase() === "withdraw") {
      return total - transaction.amount;
    }

    // Ignore other transaction types
    return total;
  }, 0);
}
