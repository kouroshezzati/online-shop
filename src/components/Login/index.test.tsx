import { screen, render, fireEvent } from '@testing-library/react';
import fetchMock from 'jest-fetch-mock';

import Login from '.';
import MockWrapper from '../../utils/mocked-wrapper';

const MockLogin = () => {
  return (
    <MockWrapper>
      <Login />
    </MockWrapper>
  );
};

describe('Login component', () => {
  beforeEach((): void => {
    fetchMock.resetMocks();
    fetchMock.doMock();
  });

  test('should render properly test', () => {
    render(<MockLogin />);
    const inputEmail = screen.getByPlaceholderText('Enter your email');
    const inputPassword = screen.getByPlaceholderText('Enter your password');
    expect(inputEmail).toBeVisible();
    expect(inputPassword).toBeVisible();
  });

  test('should show error for invalid data', async () => {
    fetchMock.mockReject(new Error('user not found'));
    render(<MockLogin />);
    const inputEmail = screen.getByPlaceholderText('Enter your email');
    fireEvent.change(inputEmail, { target: { value: 'aco@gmail.co' } });
    const inputPassword = screen.getByPlaceholderText('Enter your password');
    fireEvent.change(inputPassword, { target: { value: '1' } });
    const button = screen.getByRole('button');
    fireEvent.click(button);
    const error = await screen.findByTestId('error');
    expect(error).toBeVisible();
  });

  test('should show loding in button', () => {
    render(<MockLogin />);
    const inputEmail = screen.getByPlaceholderText('Enter your email');
    fireEvent.change(inputEmail, { target: { value: 'aco@gmail.com' } });
    const inputPassword = screen.getByPlaceholderText('Enter your password');
    fireEvent.change(inputPassword, { target: { value: '123' } });
    const button = screen.getByRole('button');
    fireEvent.click(button);
    const spinner = screen.getByTestId('spinner');
    expect(spinner).toBeVisible();
  });
});
