export interface Price {
    id: string; 
    created_at: string;
    updated_at: string;
    value: number;
    description?: string;
    default?: boolean;
    product: string;
    created_by: string;
}
