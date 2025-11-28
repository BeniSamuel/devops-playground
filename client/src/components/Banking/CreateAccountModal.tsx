import { useState } from 'react';
import { useBankingStore, AccountType } from '../../store/bankingStore';
import { X } from 'lucide-react';

interface CreateAccountModalProps {
  userId: string;
  isOpen: boolean;
  onClose: () => void;
  onAccountCreated: () => void;
}

export default function CreateAccountModal({
  userId,
  isOpen,
  onClose,
  onAccountCreated,
}: CreateAccountModalProps) {
  const [accountType, setAccountType] = useState<AccountType>('normal');
  const createAccount = useBankingStore((state) => state.createAccount);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    createAccount(userId, accountType);
    onAccountCreated();
    onClose();
    setAccountType('normal');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-md w-full p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold text-gray-900">Create New Account</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="accountType" className="block text-sm font-medium text-gray-700 mb-2">
              Account Type
            </label>
            <select
              id="accountType"
              value={accountType}
              onChange={(e) => setAccountType(e.target.value as AccountType)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none"
            >
              <option value="normal">Normal Account</option>
              <option value="saving">Saving Account</option>
            </select>
            <p className="text-xs text-gray-500 mt-1">
              {accountType === 'saving'
                ? 'Saving accounts are designed for long-term savings'
                : 'Normal accounts for everyday banking'}
            </p>
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-3 border border-gray-300 rounded-lg font-semibold text-gray-700 hover:bg-gray-50 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-3 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition"
            >
              Create Account
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

