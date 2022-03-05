import { configureStore } from '@reduxjs/toolkit';
import { api } from './components/Login/auth.service';
import authReducer from './components/Login/authSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    [api.reducerPath]: api.reducer
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
