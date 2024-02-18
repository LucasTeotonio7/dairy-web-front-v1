interface Purchase {
    reference_day: string;
    quantity: number;
    weekday: number;
}

interface Supplier {
    supplier: string;
    purchases: Purchase[];
    total_quantity: number;
}

export interface WeeklyControl {
    id: string;
    created_at: string;
    updated_at: string;
    start_date: string;
    end_date: string;
    is_closed: boolean;
    product: string;
    product_description: string;
    created_by: string;
    suppliers?: Supplier[];
}
