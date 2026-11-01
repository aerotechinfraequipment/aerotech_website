import { useEffect } from "react";

export interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  canonical?: string;
  ogType?: "website" | "article" | "product";
  ogImage?: string;
  noindex?: boolean;
  schema?: Record<string, unknown> | Array<Record<string, unknown>>;
}

const BASE_URL = "https://aerotechinfra.com";
const DEFAULT_TITLE = "Construction Equipment Rental & Industrial Products | AeroTech Infra Equipment";
const DEFAULT_DESC =
  "AeroTech Infra Equipment — boom lifts, scissor lifts, excavators, and cranes for daily or monthly rental, plus genuine pneumatics, power tools, steel, and industrial hardware in Sriperumbudur, Tamil Nadu.";
const DEFAULT_OG_IMAGE = `${BASE_URL}/android-chrome-512x512.png`;

function setMetaTag(selector: string, attr: "name" | "property", key: string, content: string) {
  let element = document.querySelector(selector) as HTMLMetaElement | null;
  if (!element) {
    element = document.createElement("meta");
    element.setAttribute(attr, key);
    document.head.appendChild(element);
  }
  element.setAttribute("content", content);
}

function setCanonicalTag(url: string) {
  let link = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
  if (!link) {
    link = document.createElement("link");
    link.setAttribute("rel", "canonical");
    document.head.appendChild(link);
  }
  link.setAttribute("href", url);
}

const SCHEMA_SCRIPT_ID = "dynamic-seo-schema";

function setStructuredData(schema?: Record<string, unknown> | Array<Record<string, unknown>>) {
  const existing = document.getElementById(SCHEMA_SCRIPT_ID);
  if (existing) {
    existing.remove();
  }

  if (!schema) return;

  const script = document.createElement("script");
  script.id = SCHEMA_SCRIPT_ID;
  script.type = "application/ld+json";
  script.text = JSON.stringify(schema);
  document.head.appendChild(script);
}

const SEO = ({
  title,
  description,
  keywords,
  canonical,
  ogType = "website",
  ogImage,
  noindex = false,
  schema,
}: SEOProps) => {
  useEffect(() => {
    // 1. Page Title
    const formattedTitle = title
      ? title.includes("AeroTech")
        ? title
        : `${title} | AeroTech Infra Equipment`
      : DEFAULT_TITLE;
    document.title = formattedTitle;

    // 2. Meta Description & Keywords
    const metaDesc = description || DEFAULT_DESC;
    setMetaTag('meta[name="description"]', "name", "description", metaDesc);

    if (keywords) {
      setMetaTag('meta[name="keywords"]', "name", "keywords", keywords);
    }

    // 3. Robots
    const robots = noindex ? "noindex, nofollow" : "index, follow, max-image-preview:large";
    setMetaTag('meta[name="robots"]', "name", "robots", robots);

    // 4. Canonical URL
    const canonicalUrl = canonical
      ? canonical.startsWith("http")
        ? canonical
        : `${BASE_URL}${canonical.startsWith("/") ? canonical : `/${canonical}`}`
      : window.location.href;
    setCanonicalTag(canonicalUrl);

    // 5. OpenGraph
    const finalOgImage = ogImage
      ? ogImage.startsWith("http")
        ? ogImage
        : `${BASE_URL}${ogImage.startsWith("/") ? ogImage : `/${ogImage}`}`
      : DEFAULT_OG_IMAGE;

    setMetaTag('meta[property="og:title"]', "property", "og:title", formattedTitle);
    setMetaTag('meta[property="og:description"]', "property", "og:description", metaDesc);
    setMetaTag('meta[property="og:url"]', "property", "og:url", canonicalUrl);
    setMetaTag('meta[property="og:type"]', "property", "og:type", ogType);
    setMetaTag('meta[property="og:image"]', "property", "og:image", finalOgImage);

    // 6. Twitter Card
    setMetaTag('meta[name="twitter:title"]', "name", "twitter:title", formattedTitle);
    setMetaTag('meta[name="twitter:description"]', "name", "twitter:description", metaDesc);
    setMetaTag('meta[name="twitter:image"]', "name", "twitter:image", finalOgImage);

    // 7. JSON-LD Schema
    setStructuredData(schema);

    return () => {
      // Clean up dynamic route schema on unmount
      const s = document.getElementById(SCHEMA_SCRIPT_ID);
      if (s) s.remove();
    };
  }, [title, description, keywords, canonical, ogType, ogImage, noindex, schema]);

  return null;
};

export default SEO;

