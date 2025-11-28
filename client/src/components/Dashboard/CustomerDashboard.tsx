import { useState, useEffect } from 'react';
import { useAuthStore } from '../../store/authStore';
import { useBankingStore, Account } from '../../store/bankingStore';
import { Wallet, TrendingUp, TrendingDown, History, Plus } from 'lucide-react';
import DepositModal from '../Banking/DepositModal';
import WithdrawModal from '../Banking/WithdrawModal';
import TransactionHistory from '../Banking/TransactionHistory';
import TransactionChart from '../Banking/TransactionChart';
import CreateAccountModal from '../Banking/CreateAccountModal';

export default function CustomerDashboard() {
  const user = useAuthStore((state) => state.user);
  const getUserAccounts = useBankingStore((state) => state.getUserAccounts);
  const getAccountTransactions = useBankingStore((state) => state.getAccountTransactions);
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [selectedAccount, setSelectedAccount] = useState<Account | null>(null);
  const [showDeposit, setShowDeposit] = useState(false);
  const [showWithdraw, setShowWithdraw] = useState(false);
  const [showCreateAccount, setShowCreateAccount] = useState(false);

  useEffect(() => {
    if (user) {
      const userAccounts = getUserAccounts(user.id);
      setAccounts(userAccounts);
      if (userAccounts.length > 0 && !selectedAccount) {
        setSelectedAccount(userAccounts[0]);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, getUserAccounts]);

  const handleAccountCreated = () => {
    if (user) {
      const userAccounts = getUserAccounts(user.id);
      setAccounts(userAccounts);
      if (userAccounts.length > 0) {
        setSelectedAccount(userAccounts[userAccounts.length - 1]);
      }
    }
  };

  const totalBalance = accounts.reduce((sum, acc) => sum + acc.balance, 0);

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 via-indigo-50/40 to-purple-50/30">
      <div className="bg-white/80 backdrop-blur-sm shadow-sm border-b border-gray-200/50">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-10">
          <div className="flex items-center gap-4 mb-3">
            <div className="w-14 h-14 bg-linear-to-br from-indigo-600 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
              <Wallet className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-extrabold text-gray-900 mb-2">Welcome, {user?.name}</h1>
              <p className="text-gray-600 text-md font-medium">Manage your accounts and transactions</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-10">
        {/* Balance Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <div className="bg-linear-to-br from-indigo-500 via-indigo-600 to-purple-600 rounded-2xl p-8 text-white shadow-xl hover:shadow-2xl transition-shadow duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-indigo-100 text-sm font-medium mb-2">Total Balance</p>
                <p className="text-4xl font-bold">RWF {totalBalance.toLocaleString()}</p>
              </div>
              <div className="bg-white/20 p-4 rounded-xl">
                <Wallet className="w-10 h-10 opacity-90" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium mb-2">Active Accounts</p>
                <p className="text-4xl font-bold text-gray-900">{accounts.length}</p>
              </div>
              <div className="bg-green-50 p-4 rounded-xl">
                <TrendingUp className="w-10 h-10 text-green-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium mb-2">Transactions</p>
                <p className="text-4xl font-bold text-gray-900">
                  {selectedAccount
                    ? getAccountTransactions(selectedAccount.id).length
                    : 0}
                </p>
              </div>
              <div className="bg-blue-50 p-4 rounded-xl">
                <History className="w-10 h-10 text-blue-600" />
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Accounts Section */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 hover:shadow-xl transition-shadow duration-300">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">My Accounts</h2>
                <button
                  onClick={() => setShowCreateAccount(true)}
                  className="bg-indigo-600 text-white p-3 rounded-xl hover:bg-indigo-700 transition-all duration-200 shadow-md hover:shadow-lg"
                >
                  <Plus className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-4">
                {accounts.length === 0 ? (
                  <div className="text-center py-12">
                    <p className="text-gray-500 mb-4">No accounts yet.</p>
                    <button
                      onClick={() => setShowCreateAccount(true)}
                      className="text-indigo-600 font-semibold hover:underline"
                    >
                      Create one!
                    </button>
                  </div>
                ) : (
                  accounts.map((account) => (
                    <div
                      key={account.id}
                      onClick={() => setSelectedAccount(account)}
                      className={`p-5 rounded-xl border-2 cursor-pointer transition-all duration-200 ${
                        selectedAccount?.id === account.id
                          ? 'border-indigo-500 bg-indigo-50 shadow-md'
                          : 'border-gray-200 hover:border-indigo-300 hover:bg-indigo-50/50'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-bold text-gray-900 text-lg">{account.accountNumber}</p>
                          <p className="text-sm text-gray-600 capitalize mt-1">{account.type}</p>
                        </div>
                        <p className="text-xl font-bold text-gray-900">
                          RWF {account.balance.toLocaleString()}
                        </p>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Quick Actions */}
            {selectedAccount && (
              <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 hover:shadow-xl transition-shadow duration-300">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Quick Actions</h2>
                <div className="space-y-4">
                  <button
                    onClick={() => setShowDeposit(true)}
                    className="w-full bg-linear-to-r from-green-600 to-green-700 text-white py-4 rounded-xl font-semibold hover:from-green-700 hover:to-green-800 transition-all duration-200 flex items-center justify-center gap-3 shadow-md hover:shadow-lg"
                  >
                    <TrendingUp className="w-5 h-5" />
                    Deposit
                  </button>
                  <button
                    onClick={() => setShowWithdraw(true)}
                    className="w-full bg-linear-to-r from-red-600 to-red-700 text-white py-4 rounded-xl font-semibold hover:from-red-700 hover:to-red-800 transition-all duration-200 flex items-center justify-center gap-3 shadow-md hover:shadow-lg"
                  >
                    <TrendingDown className="w-5 h-5" />
                    Withdraw
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {selectedAccount ? (
              <>
                <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 hover:shadow-xl transition-shadow duration-300">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Transaction Chart</h2>
                  <div className="pt-4">
                    <TransactionChart accountId={selectedAccount.id} />
                  </div>
                </div>

                <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 hover:shadow-xl transition-shadow duration-300">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Transaction History</h2>
                  <TransactionHistory accountId={selectedAccount.id} />
                </div>
              </>
            ) : (
              <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-12">
                <div className="text-center py-16">
                  <Wallet className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-500 text-lg font-medium">
                    Select an account to view transactions
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {user && (
        <CreateAccountModal
          userId={user.id}
          isOpen={showCreateAccount}
          onClose={() => setShowCreateAccount(false)}
          onAccountCreated={handleAccountCreated}
        />
      )}

      {selectedAccount && (
        <>
          <DepositModal
            account={selectedAccount}
            isOpen={showDeposit}
            onClose={() => setShowDeposit(false)}
          />
          <WithdrawModal
            account={selectedAccount}
            isOpen={showWithdraw}
            onClose={() => setShowWithdraw(false)}
          />
        </>
      )}
    </div>
  );
}

