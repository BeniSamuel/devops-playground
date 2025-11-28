import { useAuthStore } from '../../store/authStore';
import CustomerDashboard from './CustomerDashboard';
import AdminDashboard from './AdminDashboard';
import BankerDashboard from './BankerDashboard';
import Layout from './Layout';

export default function Dashboard() {
  const user = useAuthStore((state) => state.user);

  if (!user) {
    return null;
  }

  return (
    <Layout>
      {user.role === 'admin' && <AdminDashboard />}
      {user.role === 'banker' && <BankerDashboard />}
      {user.role === 'customer' && <CustomerDashboard />}
    </Layout>
  );
}

