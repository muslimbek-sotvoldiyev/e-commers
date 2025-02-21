import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:4000/",
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("accessToken");
      headers.set("Authorization", `Bearer ${token}`);
      headers.set("Content-Type", "application/json");
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getCategories: builder.query({
      query: () => `categories/`,
    }),

    getCategoriesId: builder.query({
      query: ({ id }) => `categories/${id}/`,
    }),

    getProducts: builder.query({
      query: () => `products/`,
    }),

    getProductId: builder.query({
      query: ({ id }) => `products/${id}/`,
    }),

    getWishlist: builder.query({
      query: () => "wishlist",
    }),
    toggleWishlist: builder.mutation({
      query: (productId) => ({
        url: `wishlist/toggle/${productId}`,
        method: "POST",
      }),
    }),

    addEmployee: builder.mutation({
      query: (newEmployee) => ({
        url: "/employees/",
        method: "POST",
        body: newEmployee,
      }),
    }),
  }),
});

export const {
  useGetCategoriesQuery,
  useGetCategoriesIdQuery,
  useGetProductsQuery,
  useGetProductIdQuery,
  useGetWishlistQuery,
  useToggleWishlistMutation,
} = api;

export default api;
