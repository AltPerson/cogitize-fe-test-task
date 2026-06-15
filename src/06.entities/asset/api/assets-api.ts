import { baseQuery } from "@/07.shared/lib";
import { createApi } from "@reduxjs/toolkit/query/react";

import type { AssetsQueryParams, AssetsResponse } from "../model";

export const assetsApi = createApi({
  reducerPath: "assetsApi",
  baseQuery,
  endpoints: (builder) => ({
    getAssets: builder.query<AssetsResponse, AssetsQueryParams>({
      query: ({ search = "", page = 1 }) => ({
        url: "/api/assets",
        params: {
          search,
          page,
        },
      }),
      serializeQueryArgs: ({ endpointName, queryArgs }) => {
        return `${endpointName}-${queryArgs.search ?? ""}`;
      },
      merge: (currentCache, newCache, { arg }) => {
        const page = arg.page ?? 1;

        currentCache.currentPage = newCache.currentPage;
        currentCache.hasNextPage = newCache.hasNextPage;
        currentCache.maximumPages = newCache.maximumPages;

        if (page === 1) {
          currentCache.data = newCache.data;
          return;
        }

        const assetIds = new Set(currentCache.data.map((asset) => asset.id));

        newCache.data.forEach((asset) => {
          if (!assetIds.has(asset.id)) {
            currentCache.data.push(asset);
          }
        });
      },
      forceRefetch: ({ currentArg, previousArg }) => {
        return (
          currentArg?.page !== previousArg?.page ||
          currentArg?.search !== previousArg?.search
        );
      },
    }),
  }),
});

export const { useGetAssetsQuery } = assetsApi;
