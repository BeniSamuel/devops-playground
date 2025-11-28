import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type AccountType = 'normal' | 'saving' | 'blocked';
export type TransactionType = 'deposit' | 'withdrawal';

export interface Account {
  id: string;
  userId: string;
  accountNumber: string;
  type: AccountType;
  balance: number;
  createdAt: string;
}

export interface Transaction {
  id: string;
  accountId: string;
  type: TransactionType;
  amount: number;
  description: string;
  timestamp: string;
}

interface BankingState {
  accounts: Account[];
  transactions: Transaction[];
  createAccount: (userId: string, type: AccountType) => Account;
  getAccount: (accountId: string) => Account | undefined;
  getUserAccounts: (userId: string) => Account[];
  deposit: (accountId: string, amount: number, description?: string) => boolean;
  withdraw: (accountId: string, amount: number, description?: string) => boolean;
  getAccountTransactions: (accountId: string) => Transaction[];
  getAllTransactions: () => Transaction[];
}

const generateAccountNumber = (): string => {
  return 'NZ' + Math.random().toString().slice(2, 10);
};

export const useBankingStore = create<BankingState>()(
  persist(
    (set, get) => ({
      accounts: [],
      transactions: [],
      createAccount: (userId: string, type: AccountType) => {
        const newAccount: Account = {
          id: Date.now().toString(),
          userId,
          accountNumber: generateAccountNumber(),
          type,
          balance: 0,
          createdAt: new Date().toISOString(),
        };
        set((state) => ({
          accounts: [...state.accounts, newAccount],
        }));
        return newAccount;
      },
      getAccount: (accountId: string) => {
        return get().accounts.find((acc) => acc.id === accountId);
      },
      getUserAccounts: (userId: string) => {
        return get().accounts.filter((acc) => acc.userId === userId);
      },
      deposit: (accountId: string, amount: number, description = 'Deposit') => {
        const account = get().getAccount(accountId);
        if (!account || account.type === 'blocked') {
          return false;
        }

        const newTransaction: Transaction = {
          id: Date.now().toString(),
          accountId,
          type: 'deposit',
          amount,
          description,
          timestamp: new Date().toISOString(),
        };

        set((state) => ({
          accounts: state.accounts.map((acc) =>
            acc.id === accountId
              ? { ...acc, balance: acc.balance + amount }
              : acc
          ),
          transactions: [newTransaction, ...state.transactions],
        }));
        return true;
      },
      withdraw: (accountId: string, amount: number, description = 'Withdrawal') => {
        const account = get().getAccount(accountId);
        if (!account || account.type === 'blocked' || account.balance < amount) {
          return false;
        }

        const newTransaction: Transaction = {
          id: Date.now().toString(),
          accountId,
          type: 'withdrawal',
          amount,
          description,
          timestamp: new Date().toISOString(),
        };

        set((state) => ({
          accounts: state.accounts.map((acc) =>
            acc.id === accountId
              ? { ...acc, balance: acc.balance - amount }
              : acc
          ),
          transactions: [newTransaction, ...state.transactions],
        }));
        return true;
      },
      getAccountTransactions: (accountId: string) => {
        return get()
          .transactions.filter((t) => t.accountId === accountId)
          .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
      },
      getAllTransactions: () => {
        return get()
          .transactions.sort(
            (a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
          );
      },
    }),
    {
      name: 'banking-storage',
    }
  )
);

