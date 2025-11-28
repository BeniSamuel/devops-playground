import { useState } from 'react';
import { useBankingStore, Account, AccountType } from '../../store/bankingStore';
import { Search, Users, Wallet, Lock, Unlock } from 'lucide-react';

export default function BankerDashboard() {
  const accounts = useBankingStore((state) => state.accounts);
  const getAllTransactions = useBankingStore((state) => state.getAllTransactions);
  const getAccountTransactions = useBankingStore((state) => state.getAccountTransactions);
  const transactions = getAllTransactions();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedAccount, setSelectedAccount] = useState<Account | null>(null);

  const filteredAccounts = accounts.filter(
    (acc) =>
      acc.accountNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      acc.userId.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const toggleAccountBlock = (accountId: string) => {
    const account = accounts.find((a) => a.id === accountId);
    if (account) {
      const newType: AccountType = account.type === 'blocked' ? 'normal' : 'blocked';
      useBankingStore.setState((state) => ({
        accounts: state.accounts.map((a) =>
          a.id === accountId ? { ...a, type: newType } : a
        ),
      }));
    }
  };

  const totalBalance = accounts.reduce((sum, acc) => sum + acc.balance, 0);

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-50 via-blue-50/30 to-cyan-50/20">
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Banker Dashboard</h1>
          <p className="text-gray-600 text-md">Manage customer accounts and transactions</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-10">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <div className="bg-linear-to-br from-blue-500 via-blue-600 to-cyan-600 rounded-2xl p-8 text-white shadow-xl hover:shadow-2xl transition-shadow duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-100 text-sm font-medium mb-2">Total Accounts</p>
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
              <div className="bg-blue-50 p-4 rounded-xl">
                <Wallet className="w-10 h-10 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium mb-2">Total Transactions</p>
                <p className="text-4xl font-bold text-gray-900">{transactions.length}</p>
              </div>
              <div className="bg-green-50 p-4 rounded-xl">
                <Wallet className="w-10 h-10 text-green-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Search and Accounts List */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 hover:shadow-xl transition-shadow duration-300">
          <div className="flex items-center gap-4 mb-8">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search by account number or user ID..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
              />
            </div>
          </div>

          <h2 className="text-2xl font-bold text-gray-900 mb-6">All Accounts</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b-2 border-gray-200">
                  <th className="text-left py-4 px-6 font-bold text-gray-700">Account Number</th>
                  <th className="text-left py-4 px-6 font-bold text-gray-700">User ID</th>
                  <th className="text-left py-4 px-6 font-bold text-gray-700">Type</th>
                  <th className="text-left py-4 px-6 font-bold text-gray-700">Balance</th>
                  <th className="text-left py-4 px-6 font-bold text-gray-700">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredAccounts.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="text-center py-12 text-gray-500">
                      <p className="text-lg">No accounts found</p>
                    </td>
                  </tr>
                ) : (
                  filteredAccounts.map((account) => (
                    <tr
                      key={account.id}
                      className="border-b border-gray-100 hover:bg-blue-50/50 cursor-pointer transition-colors"
                      onClick={() => setSelectedAccount(account)}
                    >
                      <td className="py-4 px-6 font-semibold text-gray-900">
                        {account.accountNumber}
                      </td>
                      <td className="py-4 px-6 text-gray-600">{account.userId}</td>
                      <td className="py-4 px-6">
                        <span
                          className={`px-4 py-2 rounded-full text-xs font-bold capitalize shadow-sm ${
                            account.type === 'blocked'
                              ? 'bg-red-100 text-red-700'
                              : account.type === 'saving'
                              ? 'bg-blue-100 text-blue-700'
                              : 'bg-gray-100 text-gray-700'
                          }`}
                        >
                          {account.type}
                        </span>
                      </td>
                      <td className="py-4 px-6 font-bold text-gray-900 text-lg">
                        RWF {account.balance.toLocaleString()}
                      </td>
                      <td className="py-4 px-6">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleAccountBlock(account.id);
                          }}
                          className={`px-5 py-2.5 rounded-xl font-semibold text-sm transition-all duration-200 flex items-center gap-2 shadow-md hover:shadow-lg ${
                            account.type === 'blocked'
                              ? 'bg-green-100 text-green-700 hover:bg-green-200'
                              : 'bg-red-100 text-red-700 hover:bg-red-200'
                          }`}
                        >
                          {account.type === 'blocked' ? (
                            <>
                              <Unlock className="w-4 h-4" />
                              Unblock
                            </>
                          ) : (
                            <>
                              <Lock className="w-4 h-4" />
                              Block
                            </>
                          )}
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Account Details Modal */}
        {selectedAccount && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full p-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Account Details</h2>
              <div className="space-y-6">
                <div>
                  <p className="text-sm text-gray-600">Account Number</p>
                  <p className="font-semibold text-gray-900">{selectedAccount.accountNumber}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">User ID</p>
                  <p className="font-semibold text-gray-900">{selectedAccount.userId}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Type</p>
                  <p className="font-semibold text-gray-900 capitalize">{selectedAccount.type}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Balance</p>
                  <p className="font-semibold text-gray-900">
                    RWF {selectedAccount.balance.toLocaleString()}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Created At</p>
                  <p className="font-semibold text-gray-900">
                    {new Date(selectedAccount.createdAt).toLocaleString()}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-600 mb-4">Transactions</p>
                  <div className="max-h-64 overflow-y-auto space-y-3 pr-2">
                    {getAccountTransactions(selectedAccount.id)
                      .slice(0, 10)
                      .map((transaction) => (
                        <div
                          key={transaction.id}
                          className="flex items-center justify-between p-4 bg-gray-50 rounded-xl border border-gray-200 hover:bg-gray-100 transition-colors"
                        >
                          <div>
                            <p className="text-sm font-semibold capitalize text-gray-900">{transaction.type}</p>
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
              <button
                onClick={() => setSelectedAccount(null)}
                className="mt-8 w-full px-6 py-4 bg-gray-200 text-gray-700 rounded-xl font-semibold hover:bg-gray-300 transition-all duration-200 shadow-md hover:shadow-lg"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

