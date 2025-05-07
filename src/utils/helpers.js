export function calculateTotalContribution(transactions) {
  return transactions.reduce((total, transaction) => {
    return total + transaction.amount;
  }, 0);
}
