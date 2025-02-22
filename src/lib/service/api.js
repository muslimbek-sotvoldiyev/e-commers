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

    toggleWishlist: builder.mutation({
      query: (productId) => ({
        url: `wishlist/toggle/${productId}`,
        method: "POST",
      }),
    }),

    deleteWishlist: builder.mutation({
      query: (productId) => ({
        url: `wishlist/${productId}`,
        method: "DELETE",
      }),
    }),

    clearWishlist: builder.mutation({
      query: () => ({
        url: `wishlist/clear`,
        method: "DELETE",
      }),
    }),

    getWishlist: builder.query({
      query: () => "wishlist",
    }),

    searchProducts: builder.query({
      query: (searchTerm) =>
        `products/search?query=${encodeURIComponent(searchTerm)}`,
    }),

    AddCardItem: builder.mutation({
      query: (data) => ({
        url: `/cart-item/`,
        method: "POST",
        body: data,
      }),
    }),

    getCartItem: builder.query({
      query: () => `cart-item`,
    }),

    updateCartItem: builder.mutation({
      query: ({ id, quantity }) => ({
        url: `cart-item/${id}`,
        method: "PUT",
        body: { quantity },
      }),
    }),
    deleteCartItem: builder.mutation({
      query: ({ id }) => ({
        url: `cart-item/${id}`,
        method: "DELETE",
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
  useDeleteWishlistMutation,
  useClearWishlistMutation,
  useGetCartItemQuery,
  useSearchProductsQuery,
  useAddCardItemMutation,
  useDeleteCartItemMutation,
  useUpdateCartItemMutation,
} = api;

export default api;
