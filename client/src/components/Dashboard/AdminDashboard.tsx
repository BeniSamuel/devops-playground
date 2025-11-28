import { useBankingStore } from '../../store/bankingStore';
import { Users, Wallet, TrendingUp, FileText } from 'lucide-react';
import TransactionChart from '../Banking/TransactionChart';

export default function AdminDashboard() {
  const accounts = useBankingStore((state) => state.accounts);
  const transactions = useBankingStore((state) => state.getAllTransactions());

  const totalBalance = accounts.reduce((sum, acc) => sum + acc.balance, 0);
  const totalDeposits = transactions
    .filter((t) => t.type === 'deposit')
    .reduce((sum, t) => sum + t.amount, 0);
  const totalWithdrawals = transactions
    .filter((t) => t.type === 'withdrawal')
    .reduce((sum, t) => sum + t.amount, 0);

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 via-red-50/40 to-orange-50/30">
      <div className="bg-white/80 backdrop-blur-sm shadow-sm border-b border-gray-200/50">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-10">
          <div className="flex items-center gap-4 mb-3">
            <div className="w-14 h-14 bg-linear-to-br from-red-600 to-orange-600 rounded-2xl flex items-center justify-center shadow-md">
              <Users className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-extrabold text-gray-900 mb-2">Admin Dashboard</h1>
              <p className="text-gray-600 text-mg font-medium">Overview of all banking operations</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-10">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          <div className="bg-linear-to-br from-red-500 via-red-600 to-pink-600 rounded-2xl p-8 text-white shadow-xl hover:shadow-2xl transition-shadow duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-red-100 text-sm font-medium mb-2">Total Accounts</p>
                <p className="text-4xl font-bold">{accounts.length}</p>
              </div>
              <div className="bg-white/20 p-4 rounded-xl">
                <Users className="w-10 h-10 opacity-90" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium mb-2">Total Balance</p>
                <p className="text-4xl font-bold text-gray-900">
                  RWF {totalBalance.toLocaleString()}
                </p>
              </div>
              <div className="bg-indigo-50 p-4 rounded-xl">
                <Wallet className="w-10 h-10 text-indigo-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium mb-2">Total Deposits</p>
                <p className="text-4xl font-bold text-green-600">
                  RWF {totalDeposits.toLocaleString()}
                </p>
              </div>
              <div className="bg-green-50 p-4 rounded-xl">
                <TrendingUp className="w-10 h-10 text-green-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium mb-2">Total Withdrawals</p>
                <p className="text-4xl font-bold text-red-600">
                  RWF {totalWithdrawals.toLocaleString()}
                </p>
              </div>
              <div className="bg-red-50 p-4 rounded-xl">
                <FileText className="w-10 h-10 text-red-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Accounts Overview */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10">
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 hover:shadow-xl transition-shadow duration-300">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Accounts by Type</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-5 bg-linear-to-r from-gray-50 to-gray-100 rounded-xl border border-gray-200">
                <span className="font-semibold text-gray-700 text-lg">Normal Accounts</span>
                <span className="font-bold text-gray-900 text-xl">
                  {accounts.filter((a) => a.type === 'normal').length}
                </span>
              </div>
              <div className="flex items-center justify-between p-5 bg-linear-to-r from-blue-50 to-blue-100 rounded-xl border border-blue-200">
                <span className="font-semibold text-gray-700 text-lg">Saving Accounts</span>
                <span className="font-bold text-gray-900 text-xl">
                  {accounts.filter((a) => a.type === 'saving').length}
                </span>
              </div>
              <div className="flex items-center justify-between p-5 bg-linear-to-r from-red-50 to-red-100 rounded-xl border border-red-200">
                <span className="font-semibold text-gray-700 text-lg">Blocked Accounts</span>
                <span className="font-bold text-gray-900 text-xl">
                  {accounts.filter((a) => a.type === 'blocked').length}
                </span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 hover:shadow-xl transition-shadow duration-300">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Recent Transactions</h2>
            <div className="space-y-3 max-h-80 overflow-y-auto pr-2">
              {transactions.slice(0, 10).map((transaction) => (
                <div
                  key={transaction.id}
                  className="flex items-center justify-between p-4 bg-gray-50 rounded-xl border border-gray-200 hover:bg-gray-100 transition-colors"
                >
                  <div>
                    <p className="text-sm font-semibold text-gray-900 capitalize">
                      {transaction.type}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      {new Date(transaction.timestamp).toLocaleString()}
                    </p>
                  </div>
                  <p
                    className={`font-bold text-lg ${
                      transaction.type === 'deposit' ? 'text-green-600' : 'text-red-600'
                    }`}
                  >
                    {transaction.type === 'deposit' ? '+' : '-'}RWF{' '}
                    {transaction.amount.toLocaleString()}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Transaction Chart */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 hover:shadow-xl transition-shadow duration-300">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">All Transactions Overview</h2>
          <div className="h-80 pt-4">
            {transactions.length > 0 ? (
              <TransactionChart accountId={undefined} />
            ) : (
              <div className="text-center py-16 text-gray-500">
                <p className="text-lg">No transaction data available</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

