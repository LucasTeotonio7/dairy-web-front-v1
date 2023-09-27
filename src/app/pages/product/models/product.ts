export interface Product {
  id: string;
  description: string | null;
  brand: string;
  category: string;
  measure_unit: string;
  unit_quantity: number;
  created_by: string;
  image: string | null;
}
