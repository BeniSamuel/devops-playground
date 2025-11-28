import { useAuthStore } from '../../store/authStore';
import { useNavigate } from 'react-router-dom';
import { LogOut, Home } from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const getRoleBadgeColor = (role: string) => {
    switch (role) {
      case 'admin':
        return 'bg-red-100 text-red-700';
      case 'banker':
        return 'bg-blue-100 text-blue-700';
      case 'customer':
        return 'bg-green-100 text-green-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col gap-6">
      {/* Navbar */}
      <nav className="bg-white shadow-sm border-b border-gray-200">
          <div className="flex flex-row justify-between items-center h-20 px-12">
            <div className="flex items-center gap-4">
              <div className="bg-indigo-600 p-2 rounded-lg">
                <Home className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-lg font-bold text-gray-900">Nziza Banking</h1>
            </div>
            <div className="flex items-center gap-6">
              {user && (
                <>
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <p className="text-sm font-bold text-gray-900">{user.name}</p>
                      <p className="text-xs text-gray-600">{user.email}</p>
                    </div>
                    <span
                      className={`px-4 py-2 rounded-full text-xs font-bold capitalize shadow-sm ${getRoleBadgeColor(
                        user.role
                      )}`}
                    >
                      {user.role}
                    </span>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-2 px-5 py-2.5 text-gray-700 hover:bg-gray-100 rounded-xl transition-all duration-200 font-medium border border-gray-200 hover:border-gray-300"
                  >
                    <LogOut className="w-5 h-5" />
                    <span>Logout</span>
                  </button>
                </>
              )}
            </div>
          </div>
      </nav>

      {/* Main Content */}
      {children}
    </div>
  );
}

