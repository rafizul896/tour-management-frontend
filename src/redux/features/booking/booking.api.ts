import { baseApi } from "@/redux/baseApi";

export const bookingApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createBooking: builder.mutation({
      query: (bookingData) => ({
        url: "/booking",
        method: "POST",
        data: bookingData,
      }),
      invalidatesTags: ["BOOKING"],
    }),

    initPayment: builder.mutation({
      query: (id) => ({
        url: `/payment/init-payment/${id}`,
        method: "POST",
      }),
      invalidatesTags: ["BOOKING"],
    }),
    
    getAllBookings: builder.query({
      query: (params) => ({
        url: "/booking",
        method: "GET",
        params,
      }),
      providesTags: ["BOOKING"],
    }),

    // Get Single Booking
    getSingleBooking: builder.query({
      query: (id) => ({
        url: `/booking/${id}`,
        method: "GET",
      }),
      providesTags: ["BOOKING"],
      transformResponse: (response) => response.data,
    }),

    // Get My Bookings
    getMyBookings: builder.query({
      query: (params) => ({
        url: "/booking/my-bookings",
        method: "GET",
        params,
      }),
      providesTags: ["BOOKING"],
      transformResponse: (response) => response.data,
    }),

    // Update Booking Status
    updateBookingStatus: builder.mutation({
      query: ({ id, status }) => ({
        url: `/booking/${id}/status`,
        method: "PATCH",
        data: { status },
      }),
      invalidatesTags: ["BOOKING"],
    }),
  }),
});

export const {
  useCreateBookingMutation,
  useGetAllBookingsQuery,
  useGetSingleBookingQuery,
  useGetMyBookingsQuery,
  useUpdateBookingStatusMutation,
  useInitPaymentMutation,
} = bookingApi;
