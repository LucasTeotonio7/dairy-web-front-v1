export interface Supplier {
    id: string;
    address: {
      street: string;
      number: string;
      zone: string;
      city: string;
      state: string;
      postal_code: string;
      complement: string;
    };
    created_at: string;
    updated_at: string;
    name: string;
    cellphone: string;
    active: boolean;
    created_by: string;
}