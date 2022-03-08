/* eslint-disable eqeqeq */
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

const Cards = styled.div`
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  padding: 10px;
`;

const Card = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px solid gray;
  box-shadow: 1px 1px 4px gray;
  gap: 0.4rem;
  padding: 10px;
  .card-item-wrapper {
    .title {
      font-weight: 500;
      margin-right: 1rem;
    }
  }
`;

export default function ProductList({
  theme = 'grid',
}: {
  theme: 'grid' | 'card';
}) {
  const { data, isLoading, isSuccess, isError } = useGetProductsQuery();
  const [product, setProduct] = useState<Product[]>([]);

  const onChangeHandler: React.ChangeEventHandler<HTMLInputElement> = ({
    target: { value, max },
  }) => {
    const weights: number[] = [];
    if (!data || data?.length < 2 || +value > +max) {
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
  let maxProductNumber = 0;
  if (data?.length) {
    data.forEach((product) => (maxProductNumber += +product.number));
  }
  return (
    <div>
      {isLoading && <Spinner />}
      {isError && <div>Error in fetching data, try again</div>}

      <InputWrapper>
        <div>Enter number of items</div>
        <Input
          placeholder='Number of items'
          type='number'
          max={maxProductNumber}
          onChange={onChangeHandler}
        />
        <div>total products is: {maxProductNumber}</div>
      </InputWrapper>
      {isSuccess &&
        _products &&
        (theme == 'grid' ? (
          <Grid products={_products} />
        ) : (
          <CardList products={_products} />
        ))}
    </div>
  );
}

function CardList({ products }: { products: Product[] }) {
  return (
    <Cards>
      {products.map(
        (
          { name, weight, endDate, startDate, price }: Product,
          index: number
        ) => (
          <Card key={index}>
            <CardItem title='Name' value={name} />
            <CardItem title='Weight' value={weight} />
            <CardItem title='Start date' value={startDate} />
            <CardItem title='End date' value={endDate} />
            <CardItem title='Price' value={price} />
          </Card>
        )
      )}
    </Cards>
  );
}

function CardItem({ title, value }: { title: string; value: string | number }) {
  return (
    <div className='card-item-wrapper'>
      <span className='title'>{title}:</span>
      <span className='value'>{value}</span>
    </div>
  );
}

function Grid({ products }: { products: Product[] }) {
  return (
    <ProductGrid>
      <div className='header'>id</div>
      <div className='header'>name</div>
      <div className='header'>weight</div>
      <div className='header'>startDate</div>
      <div className='header'>endDate</div>
      <div className='header'>price</div>
      <div className='header'>number</div>
      {products.map(
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
  );
}
