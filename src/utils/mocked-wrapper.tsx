import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import { store } from '../store';

interface WrapperProps {
  children?: React.ReactNode;
}

export default function MockWrapper({ children }: WrapperProps) {
  return (
    <Provider store={store}>
      <BrowserRouter>{children}</BrowserRouter>
    </Provider>
  );
}
