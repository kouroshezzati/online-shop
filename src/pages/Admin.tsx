import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import AddProduct from '../components/Products/AddProduct';
import ProductList from '../components/Products/ProductList';

const Wrapper = styled.div`
  display: flex;
  > div {
    flex-grow: 3;
    &:first-child {
      flex-grow: 1;
    }
  }
`;

const LinkWrapper = styled.div`
  text-align: center;
`;

export default function AdminPage() {
  useEffect(() => {
    document.title = 'Admin';
  }, []);

  return (
    <div>
      <Wrapper>
        <AddProduct />
        <ProductList theme='grid' />
      </Wrapper>
      <LinkWrapper>
        <Link to='/shop'>Go to shop page</Link>
      </LinkWrapper>
    </div>
  );
}
