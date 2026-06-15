import { baseQuery } from "@/07.shared/lib";
import { createApi } from "@reduxjs/toolkit/query/react";

import type { SwapPreviewPayload, SwapPreviewResponse } from "../model";

export const swapPreviewApi = createApi({
  reducerPath: "swapPreviewApi",
  baseQuery,
  endpoints: (builder) => ({
    previewSwap: builder.mutation<SwapPreviewResponse, SwapPreviewPayload>({
      query: (body) => ({
        url: "/api/swap/preview",
        method: "POST",
        body,
      }),
    }),
  }),
});

export const { usePreviewSwapMutation } = swapPreviewApi;
