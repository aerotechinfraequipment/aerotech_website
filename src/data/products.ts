export type { ProductListItem as Product, ProductDetail, CategoryItem } from "./products/index";
import {
  productsCatalog,
  productCategories,
  productBrands,
  productTypes,
} from "./products/index";

export const productsData = productsCatalog;
export { productCategories, productBrands, productTypes };
