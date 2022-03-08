import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BASE_URL } from '../../utils/constants';

export interface Product {
  id?: number;
  name: string;
  price: string;
  weight: number;
  startDate: string;
  endDate: string;
  number?: number;
}

const productsApi = createApi({
  reducerPath: 'products',
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
  }),
  tagTypes: ['Product'],
  endpoints: (builder) => ({
    getProducts: builder.query<Product[], void>({
      query: () => `products`,
      providesTags: ['Product'],
    }),
    getProduct: builder.query<Product, string>({
      query: (id) => `products/${id}`,
      providesTags: ['Product'],
    }),
    addProduct: builder.mutation<void, Product>({
      query: (product) => ({
        url: 'product',
        method: 'POST',
        body: product,
      }),
      invalidatesTags: ['Product'],
    }),
  }),
});

export const {
  useAddProductMutation,
  useGetProductsQuery,
  useGetProductQuery,
} = productsApi;
export default productsApi;
