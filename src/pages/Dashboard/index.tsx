import { useEffect } from 'react';
import Header from '../../components/Header';

export default function DashboardPage() {
  useEffect(() => {
    document.title = 'Dashboard';
  }, []);

  return (
    <div>
      <Header />
      dashboard
    </div>
  );
}
