export function calculateTransactionSummary(transactions) {
  return transactions.reduce(
    (summary, transaction) => {
      // Ensure transaction has valid type and amount
      if (!transaction?.type || typeof transaction.amount !== "number") {
        return summary;
      }

      const type = transaction.type.toLowerCase();

      // Update amounts based on transaction type
      if (type === "deposit") {
        summary.deposits += transaction.amount;
        summary.balance += transaction.amount;
      } else if (type === "withdraw") {
        summary.withdrawals += transaction.amount;
        summary.balance -= transaction.amount;
      } else if (type === "penalty") {
        summary.penalties += transaction.amount;
        // Penalty not added or subtracted from balance as per request
      }

      return summary;
    },
    {
      deposits: 0,
      withdrawals: 0,
      penalties: 0,
      balance: 0,
    }
  );
}