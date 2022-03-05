import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';
import { RootState } from '../../store';
import { User } from '../../User';

export interface LoginRequest {
  email: string;
  password: string;
}

export interface UserResponse {
  user: User;
  token: string;
}

export const api = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://reqres.in/api/',
    prepareHeaders: (headers, { getState }) => {
      const { token } = (getState() as RootState).auth;
      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    login: builder.mutation<UserResponse, LoginRequest>({
      query: (credentials) => ({
        url: 'login',
        method: 'POST',
        body: credentials,
      }),
    }),
  }),
});

export const { useLoginMutation } = api;
