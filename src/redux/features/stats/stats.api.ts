import { baseApi } from "@/redux/baseApi";

export const statsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    bookingStats: builder.query({
      query: () => ({
        url: "/stats/booking",
        method: "GET",
      }),
      transformResponse: (res) => res.data,
    }),
    paymentStats: builder.query({
      query: () => ({
        url: "/stats/payment",
        method: "GET",
      }),
      transformResponse: (res) => res.data,
    }),
    userStats: builder.query({
      query: () => ({
        url: "/stats/user",
        method: "GET",
      }),
      transformResponse: (res) => res.data,
    }),
    tourStats: builder.query({
      query: () => ({
        url: "/stats/tour",
        method: "GET",
      }),
      transformResponse: (res) => res.data,
    }),
  }),
});

export const {
  useBookingStatsQuery,
  usePaymentStatsQuery,
  useUserStatsQuery,
  useTourStatsQuery,
} = statsApi;
