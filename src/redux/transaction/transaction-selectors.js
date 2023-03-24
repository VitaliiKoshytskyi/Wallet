export const selectCategories = ({ transaction }) => transaction.categories;
export const selectAllTransactions = ({transaction}) => transaction.items;
export const selectBalance = ({transaction}) => transaction.balance;