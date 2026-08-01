import { baseApi } from "@/redux/baseApi";

export const divisionApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    addDivision: builder.mutation({
      query: (divisionData) => ({
        url: "/division/create",
        method: "POST",
        data: divisionData,
      }),
      invalidatesTags: ["DIVISION"],
    }),
    getDivisions: builder.query({
      query: (params) => ({
        url: "/division",
        method: "GET",
        params,
      }),
      providesTags: ["DIVISION"],
      transformResponse: (response) => response.data,
    }),
    getSingleDivision: builder.query({
      query: (id) => ({
        url: `/division/${id}`,
        method: "GET",
      }),
      providesTags: ["DIVISION"],
      transformResponse: (res) => res.data,
    }),
    updateDivision: builder.mutation({
      query: ({ id, data }) => ({
        url: `/division/${id}`,
        method: "PATCH",
        data,
      }),
      invalidatesTags: ["DIVISION"],
    }),
    deleteDivision: builder.mutation({
      query: (id) => ({
        url: `/division/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["DIVISION"],
    }),
  }),
});

export const {
  useAddDivisionMutation,
  useGetDivisionsQuery,
  useDeleteDivisionMutation,
  useGetSingleDivisionQuery,
  useUpdateDivisionMutation,
} = divisionApi;
