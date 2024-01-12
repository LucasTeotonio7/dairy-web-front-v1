import { Brand, Category, MeasureUnit } from "./general_models";

export interface Product {
  id?: string;
  description: string;
  brand: Brand;
  category: Category;
  measure_unit: MeasureUnit;
  unit_quantity: number;
  created_by?: string;
  active: boolean;
  image?: string;
}
