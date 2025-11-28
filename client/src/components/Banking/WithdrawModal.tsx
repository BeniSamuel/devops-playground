import { useState } from 'react';
import { useBankingStore, Account } from '../../store/bankingStore';
import { X } from 'lucide-react';

interface WithdrawModalProps {
  account: Account;
  isOpen: boolean;
  onClose: () => void;
}

export default function WithdrawModal({ account, isOpen, onClose }: WithdrawModalProps) {
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const withdraw = useBankingStore((state) => state.withdraw);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const withdrawAmount = parseFloat(amount);
    if (isNaN(withdrawAmount) || withdrawAmount <= 0) {
      setError('Please enter a valid amount');
      return;
    }

    if (account.type === 'blocked') {
      setError('Cannot withdraw from a blocked account');
      return;
    }

    if (withdrawAmount > account.balance) {
      setError('Insufficient balance');
      return;
    }

    setLoading(true);
    const success = withdraw(account.id, withdrawAmount, description || 'Withdrawal');
    
    if (success) {
      setAmount('');
      setDescription('');
      onClose();
    } else {
      setError('Failed to process withdrawal');
    }
    setLoading(false);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-3xl font-bold text-gray-900">Withdraw Money</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition p-2 hover:bg-gray-100 rounded-lg"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="mb-6 p-5 bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl border border-gray-200">
          <p className="text-sm font-semibold text-gray-600 mb-1">Account</p>
          <p className="font-bold text-gray-900 text-lg">{account.accountNumber}</p>
          <p className="text-sm text-gray-600 mt-2">Available: <span className="font-semibold text-gray-900">RWF {account.balance.toLocaleString()}</span></p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <div className="bg-red-50 border-2 border-red-200 text-red-700 px-5 py-4 rounded-xl font-medium">
              {error}
            </div>
          )}

          <div>
            <label htmlFor="amount" className="block text-sm font-semibold text-gray-700 mb-3">
              Amount (RWF)
            </label>
            <input
              id="amount"
              type="number"
              step="0.01"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              required
              max={account.balance}
              className="w-full px-5 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none transition-all text-lg"
              placeholder="Enter amount"
            />
          </div>

          <div>
            <label htmlFor="description" className="block text-sm font-semibold text-gray-700 mb-3">
              Description (Optional)
            </label>
            <input
              id="description"
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-5 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none transition-all"
              placeholder="Transaction description"
            />
          </div>

          <div className="flex gap-4 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-6 py-4 border-2 border-gray-300 rounded-xl font-semibold text-gray-700 hover:bg-gray-50 transition-all shadow-sm hover:shadow-md"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 px-6 py-4 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-xl font-semibold hover:from-red-700 hover:to-red-800 transition-all disabled:opacity-50 shadow-lg hover:shadow-xl"
            >
              {loading ? 'Processing...' : 'Withdraw'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

