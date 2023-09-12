import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "../constants";
import { AddClientPayload, ClientItem } from "./interfaces";

export const clients = createApi({
  reducerPath: "clients",
  tagTypes: ["Clients"],
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  endpoints: (build) => ({
    getClients: build.query<ClientItem[], string | undefined>({
      query: (search) => `clients?${search && `q=${search}`}`,
      providesTags: ["Clients"],
    }),
    addClient: build.mutation<ClientItem, AddClientPayload>({
      query: (body) => ({
        url: "clients",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Clients"],
    }),
    deleteClient: build.mutation({
      query: (id: number) => ({
        url: `clients/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Clients"],
    }),
  }),
});

export const {
  useGetClientsQuery,
  useAddClientMutation,
  useDeleteClientMutation,
} = clients;
