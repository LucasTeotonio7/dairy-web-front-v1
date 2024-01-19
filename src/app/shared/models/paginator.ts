export interface Paginator<Type> {
    count: number;
    next: string | null;
    page_number: number;
    page_size: number;
    previous: string | null;
    quantity_displayed: number;
    results: Type[];
    total_pages: number;
}
