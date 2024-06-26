interface Purchase {
    id: string;
    reference_day: string;
    quantity: number;
    weekday: number;
}

interface Price {
    id: string,
    value: number,
    default: boolean
    price_product_supplier_id?: string,
}

export interface Supplier {
    id: string;
    paid_supplier: boolean;
    paid_at: string;
    name: string;
    price: Price,
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
    purchase_exists: boolean;
    suppliers?: Supplier[];
}
