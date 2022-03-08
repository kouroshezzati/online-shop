import { useEffect } from 'react';
import AddProduct from '../components/Products/AddProduct';
import ProductList from '../components/Products/ProductList';

export default function AdminPage() {
  useEffect(() => {
    document.title = 'Admin';
  }, []);

  return (
    <div>
      <AddProduct />
      <ProductList />
    </div>
  );
}
