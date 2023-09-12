export interface ClientItem {
  name: string;
  id: number;
}

export type AddClientPayload = Omit<ClientItem, "id">;
