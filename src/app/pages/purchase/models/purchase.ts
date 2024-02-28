export interface Purchase {
    id: string;
    created_at: string;
    updated_at: string;
    quantity: number;
    is_closed: boolean;
    reference_day: string;
    product: string;
    supplier: string;
    weekly_control: string;
    created_by: string;
}
