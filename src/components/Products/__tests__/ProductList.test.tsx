import { render, screen, waitFor } from '@testing-library/react';
import fetchMock from 'jest-fetch-mock';
import MockWrapper from '../../../utils/mocked-wrapper';

import ProductList from '../ProductList';
import { Product } from '../products';

let products: Product[] = [
  {
    id: 1,
    name: 'TV',
    price: '1000',
    weight: 6,
    startDate: '10/10/2022',
    endDate: '10/10/2024',
    number: 10,
  },
  {
    id: 2,
    name: 'mic',
    price: '100',
    weight: 1,
    startDate: '10/10/2022',
    endDate: '10/10/2024',
    number: 50,
  },
  {
    id: 3,
    name: 'laptop Acer',
    price: '900',
    weight: 2,
    startDate: '10/10/2022',
    endDate: '10/10/2024',
    number: 20,
  },
];

describe('Admin page test', () => {
  beforeEach(() => {
    fetchMock.resetMocks();
    fetchMock.doMock();
  });

  test('should fetch data from server', async () => {
    fetchMock.mockResponse(JSON.stringify(products), { status: 200 });
    render(
      <MockWrapper>
        <ProductList />
      </MockWrapper>
    );
    await waitFor(() => expect(fetchMock).toHaveBeenCalledTimes(1));
    expect(await screen.findByText(/TV/i)).toBeInTheDocument();
    expect(await screen.findByText(/mic/i)).toBeInTheDocument();
    expect(await screen.findByText(/laptop/i)).toBeInTheDocument();
  });
});
