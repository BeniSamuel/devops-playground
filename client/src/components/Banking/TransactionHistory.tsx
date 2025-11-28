import { useBankingStore } from '../../store/bankingStore';
import { ArrowUpCircle, ArrowDownCircle } from 'lucide-react';

interface TransactionHistoryProps {
  accountId: string;
}

export default function TransactionHistory({ accountId }: TransactionHistoryProps) {
  const getAccountTransactions = useBankingStore((state) => state.getAccountTransactions);
  const transactions = getAccountTransactions(accountId);

  if (transactions.length === 0) {
    return (
      <div className="text-center py-12 text-gray-500">
        <p className="text-lg">No transactions yet</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {transactions.map((transaction) => (
        <div
          key={transaction.id}
          className="flex items-center justify-between p-5 bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl border border-gray-200 hover:bg-gray-200 transition-all duration-200 shadow-sm hover:shadow-md"
        >
          <div className="flex items-center gap-5">
            {transaction.type === 'deposit' ? (
              <div className="bg-green-100 p-3 rounded-xl shadow-sm">
                <ArrowUpCircle className="w-6 h-6 text-green-600" />
              </div>
            ) : (
              <div className="bg-red-100 p-3 rounded-xl shadow-sm">
                <ArrowDownCircle className="w-6 h-6 text-red-600" />
              </div>
            )}
            <div>
              <p className="font-bold text-gray-900 capitalize text-lg">{transaction.type}</p>
              <p className="text-sm text-gray-600 mt-1">{transaction.description}</p>
              <p className="text-xs text-gray-500 mt-1">
                {new Date(transaction.timestamp).toLocaleString()}
              </p>
            </div>
          </div>
          <div className="text-right">
            <p
              className={`font-bold text-2xl ${
                transaction.type === 'deposit' ? 'text-green-600' : 'text-red-600'
              }`}
            >
              {transaction.type === 'deposit' ? '+' : '-'}RWF {transaction.amount.toLocaleString()}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}

