import { configureStore } from '@reduxjs/toolkit';
import { api } from './components/Login/auth.service';
import authReducer from './components/Login/authSlice';
import productsApi from './components/Products/products';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    [api.reducerPath]: api.reducer,
    [productsApi.reducerPath]: productsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(productsApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
