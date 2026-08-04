import { baseApi } from "@/redux/baseApi";

export const guideApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // POST /guide/apply
    applyForGuide: builder.mutation({
      query: (formData) => ({
        url: "/guide/apply",
        method: "POST",
        data: formData,
      }),
      invalidatesTags: ["GUIDE"],
    }),

    // PATCH /guide/approve/:id
    updateApplicationStatus: builder.mutation({
      query: ({ id, status }) => {
        return {
          url: `/guide/approve/${id}`,
          method: "PATCH",
          data: {
            status,
          },
        };
      },
      invalidatesTags: ["GUIDE"],
    }),

    // GET /guide
    getAllGuideApplications: builder.query({
      query: (params) => ({
        url: "/guide",
        method: "GET",
        params,
      }),
      providesTags: ["GUIDE"],
    }),

    // GET /guide/:id
    getMyGuideApplication: builder.query({
      query: () => ({
        url: `/guide/my-application`,
        method: "GET",
      }),
      providesTags: ["GUIDE"],
      transformResponse: (res) => res.data,
    }),

    // DELETE /guide/:id
    deleteGuide: builder.mutation({
      query: (id: string) => ({
        url: `/guide/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["GUIDE"],
    }),
  }),
});

export const {
  useApplyForGuideMutation,
  useUpdateApplicationStatusMutation,
  useGetAllGuideApplicationsQuery,
  useGetMyGuideApplicationQuery,
  useDeleteGuideMutation,
} = guideApi;
