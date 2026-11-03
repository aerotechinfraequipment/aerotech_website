// Auto-generated Product Catalog Module
import productsListJson from './products-list.json';

export interface ProductListItem {
  id: string;
  slug: string;
  name: string;
  brand: string;
  category: string;
  categorySlug: string;
  type: string;
  shortDescription: string;
  thumbnail: string;
  image: string;
  categoryImage?: string;
  inStock: boolean;
  featured: boolean;
  detailUrl: string;
  specsSummary: string;
  enquiryWhatsappUrl: string;
}

export interface ProductDetail extends ProductListItem {
  overview: string;
  keyFeatures: string[];
  specifications: Record<string, string>;
  applications: string[];
  packageContents: string[];
  sourceUrl: string;
  images: string[];
  enquiryWhatsappMessage: string;
}

export interface CategoryItem {
  label: string;
  slug: string;
  categorySlug?: string;
}

export const productsCatalog: ProductListItem[] = productsListJson.products;
export const productCategories: CategoryItem[] = productsListJson.categories;
export const productBrands: string[] = productsListJson.brands;
export const productTypes: string[] = productsListJson.types;

const PRODUCT_SLUG = /^[a-z0-9-]+$/;

export function isValidProductSlug(slug: string): boolean {
  return PRODUCT_SLUG.test(slug);
}

export async function getProductDetail(slug: string): Promise<ProductDetail | null> {
  if (!isValidProductSlug(slug)) return null;
  try {
    const response = await fetch(`/data/products/${slug}.json`);
    if (!response.ok) return null;
    return await response.json();
  } catch (error) {
    if (import.meta.env.DEV) {
      console.error(`Failed to load product detail for ${slug}:`, error);
    }
    return null;
  }
}
