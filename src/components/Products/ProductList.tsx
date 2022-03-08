import React from 'react';
import { ProductGrid, Spinner } from '../../utils/widgets';
import { Product, useGetProductsQuery } from './products';

export default function ProductList() {
  const { data, isLoading, isSuccess, isError, error } = useGetProductsQuery();
  console.log('aaaaaaaaaaaaaaa', { error, data });
  return (
    <div>
      {isLoading && <Spinner />}
      {isError && <div>Error in fetching data, try again</div>}

      {isSuccess && data && (
        <ProductGrid>
          <div className='header'>id</div>
          <div className='header'>name</div>
          <div className='header'>weight</div>
          <div className='header'>startDate</div>
          <div className='header'>endDate</div>
          <div className='header'>price</div>
          <div className='header'>number</div>
          {data.map(
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
