interface User {
    id: string;
    username: string;
    email: string;
    name: string | null;
    last_name: string | null;
    image: string | null;
    is_active: boolean;
    is_staff: boolean;
}

export interface WeeklyControlEvent {
    id: string;
    created_at: string;
    updated_at: string;
    type: 'RECORD' | 'PAYMENT' | 'PRICE' | 'MANUAL';
    description: string | null;
    old_value: string | null;
    measure_unit: string | null;
    new_value: string | null;
    reference_day: string;
    supplier: string;
    weekly_control: string;
    created_by: User;
}
