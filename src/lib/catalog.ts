import { useEffect, useState } from "react";

const PRODUCT_LIST_COLUMNS = [
  "id",
  "slug",
  "name",
  "brand",
  "category",
  "category_slug",
  "type",
  "short_description",
  "thumbnail",
  "in_stock",
  "featured",
  "specs_summary",
].join(",");

const CATEGORY_ORDER = [
  "Adhesives & Tapes",
  "Chemicals & Sealants",
  "Civil Products",
  "Cutting Wheels",
  "Engineering Products",
  "Hand Tools",
  "Paints & Finishing",
  "Power Tools",
  "Safety Equipment",
  "Welding Equipment",
];

const PRODUCT_SLUG = /^[a-z0-9-]+$/;

export type Equipment = {
  id: string;
  name: string;
  image: string;
  brand: string;
  category: string;
  category_formated: string;
  description: string;
  rentalType: string;
  status: "available" | "rented";
  models: string[];
  can_show_in_home?: boolean;
};

export type Product = {
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
  inStock: boolean;
  featured: boolean;
  detailUrl: string;
  specsSummary: string;
};

export type ProductDetailData = Product & {
  overview: string;
  keyFeatures: string[];
  specifications: Record<string, string>;
  applications: string[];
  packageContents: string[];
  images: string[];
  sourceUrl?: string;
};

export type CategoryOption = {
  label: string;
  slug: string;
};

export type SteelProduct = {
  id: string;
  name: string;
  family: string;
  familyLabel: string;
  description: string;
  image: string;
  imageSm: string;
};

type EquipmentRow = {
  id: string;
  name: string;
  brand: string;
  category: string;
  category_label: string;
  description: string;
  rental_type: string;
  status: string;
  models: unknown;
  show_on_home: boolean;
  image_url: string | null;
};

type ProductListRow = {
  id: string;
  slug: string;
  name: string;
  brand: string;
  category: string;
  category_slug: string;
  type: string;
  short_description: string;
  thumbnail: string | null;
  in_stock: boolean;
  featured: boolean;
  specs_summary: string;
};

type ProductRow = ProductListRow & {
  overview: string;
  key_features: unknown;
  specifications: unknown;
  applications: unknown;
  package_contents: unknown;
  images: unknown;
};

type SteelRow = {
  id: string;
  name: string;
  family: string;
  family_label: string;
  description: string;
  image_url: string | null;
  image_sm_url: string | null;
};

export function isValidProductSlug(slug: string): boolean {
  return PRODUCT_SLUG.test(slug);
}

function strings(value: unknown): string[] {
  if (!Array.isArray(value)) return [];
  return value.filter((item): item is string => typeof item === "string" && item.length > 0);
}

function specRecord(value: unknown): Record<string, string> {
  if (!value || typeof value !== "object" || Array.isArray(value)) return {};
  const specs: Record<string, string> = {};
  for (const [key, entry] of Object.entries(value)) {
    if (entry == null) continue;
    specs[key] = typeof entry === "string" ? entry : String(entry);
  }
  return specs;
}

function mapEquipment(row: EquipmentRow): Equipment {
  return {
    id: row.id,
    name: row.name,
    image: row.image_url ?? "",
    brand: row.brand,
    category: row.category,
    category_formated: row.category_label,
    description: row.description,
    rentalType: row.rental_type,
    status: row.status === "rented" ? "rented" : "available",
    models: strings(row.models),
    can_show_in_home: row.show_on_home,
  };
}

function mapProduct(row: ProductListRow): Product {
  const image = row.thumbnail ?? "";
  return {
    id: row.id,
    slug: row.slug,
    name: row.name,
    brand: row.brand,
    category: row.category,
    categorySlug: row.category_slug,
    type: row.type,
    shortDescription: row.short_description,
    thumbnail: image,
    image,
    inStock: row.in_stock,
    featured: row.featured,
    detailUrl: `/products/${row.slug}`,
    specsSummary: row.specs_summary,
  };
}

function mapProductDetail(row: ProductRow): ProductDetailData {
  const images = strings(row.images);
  const list = mapProduct(row);
  return {
    ...list,
    image: images[0] || list.image,
    overview: row.overview ?? "",
    keyFeatures: strings(row.key_features),
    specifications: specRecord(row.specifications),
    applications: strings(row.applications),
    packageContents: strings(row.package_contents),
    images,
  };
}

function mapSteel(row: SteelRow): SteelProduct {
  const image = row.image_url ?? "";
  return {
    id: row.id,
    name: row.name,
    family: row.family,
    familyLabel: row.family_label,
    description: row.description,
    image,
    imageSm: row.image_sm_url ?? image,
  };
}

const inflight = new Map<string, Promise<unknown>>();

async function rest<T>(path: string): Promise<T> {
  const current = inflight.get(path);
  if (current) return current as Promise<T>;

  const base = import.meta.env.VITE_SUPABASE_URL?.replace(/\/$/, "");
  const key = import.meta.env.VITE_SUPABASE_ANON_KEY;
  if (!base || !key) {
    throw new Error("Missing VITE_SUPABASE_URL or VITE_SUPABASE_ANON_KEY");
  }

  const request = fetch(`${base}/rest/v1/${path}`, {
    headers: {
      apikey: key,
      authorization: `Bearer ${key}`,
      accept: "application/json",
    },
    cache: "no-store",
  }).then(async (response) => {
    if (!response.ok) throw new Error("Catalog request failed");
    return response.json() as Promise<T>;
  });

  inflight.set(path, request);
  try {
    return await request;
  } finally {
    if (inflight.get(path) === request) inflight.delete(path);
  }
}

export async function listEquipment(): Promise<Equipment[]> {
  const rows = await rest<EquipmentRow[]>("equipment?select=*&archived_at=is.null&order=sort_order");
  return rows.map(mapEquipment);
}

export async function listHomeEquipment(): Promise<Equipment[]> {
  const rows = await rest<EquipmentRow[]>(
    "equipment?select=*&archived_at=is.null&show_on_home=eq.true&order=sort_order",
  );
  return rows.map(mapEquipment);
}

export async function getEquipment(id: string): Promise<Equipment | null> {
  const rows = await rest<EquipmentRow[]>(
    `equipment?select=*&id=eq.${encodeURIComponent(id)}&archived_at=is.null`,
  );
  return rows[0] ? mapEquipment(rows[0]) : null;
}

export async function listProducts(): Promise<Product[]> {
  const rows = await rest<ProductListRow[]>(
    `products?select=${PRODUCT_LIST_COLUMNS}&archived_at=is.null&order=name.asc`,
  );
  return rows.map(mapProduct);
}

export async function listHomeProducts(): Promise<Product[]> {
  const rows = await rest<ProductListRow[]>(
    `products?select=${PRODUCT_LIST_COLUMNS}&archived_at=is.null&featured=eq.true&in_stock=eq.true&order=name.asc&limit=4`,
  );
  return rows.map(mapProduct);
}

export async function getProduct(slug: string): Promise<ProductDetailData | null> {
  if (!isValidProductSlug(slug)) return null;
  const rows = await rest<ProductRow[]>(
    `products?select=*&slug=eq.${encodeURIComponent(slug)}&archived_at=is.null`,
  );
  return rows[0] ? mapProductDetail(rows[0]) : null;
}

export async function listSteel(): Promise<SteelProduct[]> {
  const rows = await rest<SteelRow[]>("steel_products?select=*&archived_at=is.null&order=sort_order");
  return rows.map(mapSteel);
}

export function productFilterOptions(products: Product[]) {
  const present = new Set(products.map((item) => item.category).filter(Boolean));
  const ordered = CATEGORY_ORDER.filter((label) => present.has(label));
  for (const label of present) {
    if (!ordered.includes(label)) ordered.push(label);
  }
  return {
    categories: [
      { label: "All Categories", slug: "" },
      ...ordered.map((label) => ({ label, slug: label })),
    ] satisfies CategoryOption[],
    brands: [...new Set(products.map((item) => item.brand).filter(Boolean))].sort((a, b) => a.localeCompare(b)),
    types: [...new Set(products.map((item) => item.type).filter(Boolean))].sort((a, b) => a.localeCompare(b)),
  };
}

export function useCatalog<T>(load: () => Promise<T>) {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let ignore = false;
    load().then(
      (rows) => {
        if (ignore) return;
        setData(rows);
        setLoading(false);
      },
      () => {
        if (ignore) return;
        setError("Could not load the catalogue. Refresh the page to try again.");
        setLoading(false);
      },
    );
    return () => {
      ignore = true;
    };
  }, [load]);

  return { data, error, loading };
}

export function useEquipmentList() {
  return useCatalog(listEquipment);
}

export function useHomeEquipment() {
  return useCatalog(listHomeEquipment);
}

export function useProducts() {
  return useCatalog(listProducts);
}

export function useHomeProducts() {
  return useCatalog(listHomeProducts);
}

export function useSteel() {
  return useCatalog(listSteel);
}

export function useEquipmentDetail(id: string | undefined) {
  const [item, setItem] = useState<Equipment | null>(null);
  const [similar, setSimilar] = useState<Equipment[]>([]);
  const [status, setStatus] = useState<"loading" | "missing" | "error" | "ready">(id ? "loading" : "missing");
  const [requestedId, setRequestedId] = useState(id);

  if (id !== requestedId) {
    setRequestedId(id);
    setItem(null);
    setSimilar([]);
    setStatus(id ? "loading" : "missing");
  }

  useEffect(() => {
    if (!id) return;
    let ignore = false;
    Promise.all([getEquipment(id), listEquipment()])
      .then(([row, all]) => {
        if (ignore) return;
        if (!row) {
          setItem(null);
          setSimilar([]);
          setStatus("missing");
          return;
        }
        setItem(row);
        setSimilar(all.filter((entry) => entry.id !== row.id && entry.category === row.category).slice(0, 4));
        setStatus("ready");
      })
      .catch(() => {
        if (!ignore) setStatus("error");
      });
    return () => {
      ignore = true;
    };
  }, [id]);

  return { item, similar, status };
}
