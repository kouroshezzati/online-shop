import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import fetchMock from 'jest-fetch-mock';

import MockWrapper from '../../../utils/mocked-wrapper';
import AddProduct from '../AddProduct';

describe('AddProduct test', () => {
  beforeEach(() => {
    fetchMock.resetMocks();
    fetchMock.doMock();
  });

  test('should render properly', async () => {
    render(
      <MockWrapper>
        <AddProduct />
      </MockWrapper>
    );
    expect(screen.getByPlaceholderText(/Name/i)).toBeInTheDocument();
  });

  test('should send request', async () => {
    fetchMock.mockResponses();
    render(
      <MockWrapper>
        <AddProduct />
      </MockWrapper>
    );
    const nameInput = screen.getByPlaceholderText('Name');
    const priceInput = screen.getByPlaceholderText('Price');
    const weightInput = screen.getByPlaceholderText('Weight');
    const startDateInput = screen.getByPlaceholderText('Start date');
    const EndDateInput = screen.getByPlaceholderText('End date');
    const button = screen.getByRole('button');
    fireEvent.change(nameInput, { target: { value: 'Mobile' } });
    fireEvent.change(priceInput, { target: { value: '1000' } });
    fireEvent.change(weightInput, { target: { value: 1 } });
    fireEvent.change(startDateInput, { target: { value: '10/10/2022' } });
    fireEvent.change(EndDateInput, { target: { value: '10/10/2024' } });
    fireEvent.click(button);
    await waitFor(() => expect(fetchMock).toHaveBeenCalledTimes(1));
  });
});
