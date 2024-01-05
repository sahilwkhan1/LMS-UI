import { apiSlice } from "../api/apiSlice";

export const layoutApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getHeroData: builder.query({
      query: (type) => ({
        url: `get-layout/${type}`,
        method: "GET",
        credentials: "include" as const,
      }),
    }),
    createLayout: builder.mutation({
      query: ({ type, image, title, subTitle, faq, categories }) => ({
        url: `create-layout`,
        body: {
          type,
          image,
          title,
          subTitle,
          faq,
          categories,
        },
        method: "POST",
        credentials: "include" as const,
      }),
    }),
  }),
});

export const { useGetHeroDataQuery, useCreateLayoutMutation } = layoutApi;
