import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '../../utils/hooks';
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
