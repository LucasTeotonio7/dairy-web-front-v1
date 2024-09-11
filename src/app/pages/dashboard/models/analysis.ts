export interface MonthlyPayment {
    month: string;
    total: number;
}

export interface MainSuppliers {
    name: string;
    value: number;
}

export interface AnalysisData {
    amount_paid_weekly: number;
    amount_paid_monthly: number;
    pending_payments: number;
    percentage: number;
    month_to_month: MonthlyPayment[];
    main_suppliers: MainSuppliers[];
}
