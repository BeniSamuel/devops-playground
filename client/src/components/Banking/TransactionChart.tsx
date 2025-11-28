import { useMemo } from 'react';
import { useBankingStore } from '../../store/bankingStore';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface TransactionChartProps {
  accountId?: string;
}

export default function TransactionChart({ accountId }: TransactionChartProps) {
  const getAccountTransactions = useBankingStore((state) => state.getAccountTransactions);
  const getAllTransactions = useBankingStore((state) => state.getAllTransactions);
  const transactions = accountId ? getAccountTransactions(accountId) : getAllTransactions();

  const chartData = useMemo(() => {
    if (transactions.length === 0) return [];

    // Group transactions by date and calculate running balance
    const sortedTransactions = [...transactions].sort(
      (a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
    );

    const dateMap = new Map<string, { deposits: number; withdrawals: number }>();

    sortedTransactions.forEach((transaction) => {
      const date = new Date(transaction.timestamp).toLocaleDateString();
      if (!dateMap.has(date)) {
        dateMap.set(date, { deposits: 0, withdrawals: 0 });
      }
      const data = dateMap.get(date)!;
      if (transaction.type === 'deposit') {
        data.deposits += transaction.amount;
      } else {
        data.withdrawals += transaction.amount;
      }
    });

    return Array.from(dateMap.entries())
      .map(([date, data]) => ({
        date,
        deposits: data.deposits,
        withdrawals: data.withdrawals,
      }))
      .slice(-10); // Last 10 days
  }, [transactions]);

  if (chartData.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        <p>No transaction data to display</p>
      </div>
    );
  }

  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={chartData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line
          type="monotone"
          dataKey="deposits"
          stroke="#10b981"
          strokeWidth={2}
          name="Deposits"
        />
        <Line
          type="monotone"
          dataKey="withdrawals"
          stroke="#ef4444"
          strokeWidth={2}
          name="Withdrawals"
        />
      </LineChart>
    </ResponsiveContainer>
  );
}

