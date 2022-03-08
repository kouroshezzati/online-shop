import React, { useState } from 'react';
import styled from 'styled-components';
import { Input, ProductGrid, Spinner } from '../../utils/widgets';
import { Product, useGetProductsQuery } from './products';
import weightedRandom from './weightedRandom';

const InputWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 2rem 0;
  gap: 2rem;
  > input {
    margin-bottom: 0;
  }
`;

export default function ProductList() {
  const { data, isLoading, isSuccess, isError } = useGetProductsQuery();
  const [product, setProduct] = useState<Product[]>([]);

  const onChangeHandler: React.ChangeEventHandler<HTMLInputElement> = ({
    target: { value },
  }) => {
    const weights: number[] = [];
    if (!data || data?.length < 2) {
      return null;
    }

    data.forEach((item: Product) => {
      weights.push(item.weight);
    });
    let products: Product[] = [];
    for (let i = 0; i < +value; ++i) {
      const product: Product | undefined = weightedRandom(data, weights);
      if (product) {
        products.push(product);
      }
    }
    setProduct(products);
  };
  // eslint-disable-next-line eqeqeq
  const _products = product.length == 0 ? data : product;

  return (
    <div>
      {isLoading && <Spinner />}
      {isError && <div>Error in fetching data, try again</div>}

      <InputWrapper>
        <div>Enter number of items</div>
        <Input
          placeholder='Number of items'
          type='number'
          onChange={onChangeHandler}
        />
      </InputWrapper>

      {isSuccess && _products && (
        <ProductGrid>
          <div className='header'>id</div>
          <div className='header'>name</div>
          <div className='header'>weight</div>
          <div className='header'>startDate</div>
          <div className='header'>endDate</div>
          <div className='header'>price</div>
          <div className='header'>number</div>
          {_products.map(
            (
              { id, name, weight, endDate, startDate, price, number }: Product,
              index: number
            ) => (
              <React.Fragment key={index}>
                <div>{id}</div>
                <div>{name}</div>
                <div>{weight}</div>
                <div>{startDate}</div>
                <div>{endDate}</div>
                <div>{price}</div>
                <div>{number}</div>
              </React.Fragment>
            )
          )}
        </ProductGrid>
      )}
    </div>
  );
}
