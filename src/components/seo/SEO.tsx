import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export interface SEOProps {
  title?: string;
  description?: string;
  canonical?: string;
  ogImage?: string;
  ogImageAlt?: string;
  noindex?: boolean;
  schema?: Record<string, unknown> | Array<Record<string, unknown>>;
}

const BASE_URL = "https://aerotechinfraequipment.com";
const DEFAULT_TITLE = "Construction Equipment Rental & Sales | AeroTech Infra Equipment";
const DEFAULT_DESC =
  "Reliable construction equipment rental and product sales in Tamil Nadu. Hire boom lifts and cranes, or buy tools, steel, and hardware in Sriperumbudur.";
const DEFAULT_OG_IMAGE = `${BASE_URL}/og-image.png`;
const DEFAULT_OG_ALT = "AeroTech share image with a yellow boom lift";

function setMetaTag(selector: string, attr: "name" | "property", key: string, content: string) {
  let element = document.querySelector(selector) as HTMLMetaElement | null;
  if (!element) {
    element = document.createElement("meta");
    element.setAttribute(attr, key);
    document.head.appendChild(element);
  }
  element.setAttribute("content", content);
}

function removeMetaTag(selector: string) {
  document.querySelector(selector)?.remove();
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

function toCanonical(path: string): string {
  let pathname = path;
  if (path.startsWith("http://") || path.startsWith("https://")) {
    pathname = new URL(path).pathname;
  } else {
    pathname = path.split("?")[0].split("#")[0];
  }
  if (!pathname.startsWith("/")) pathname = `/${pathname}`;
  if (pathname !== "/" && pathname.endsWith("/")) pathname = pathname.slice(0, -1);
  return `${BASE_URL}${pathname}`;
}

function toAbsoluteAsset(src: string): string {
  if (src.startsWith("http://") || src.startsWith("https://")) return src;
  return `${BASE_URL}${src.startsWith("/") ? src : `/${src}`}`;
}

const SCHEMA_SCRIPT_ID = "dynamic-seo-schema";

function setStructuredData(schemaJson: string) {
  const existing = document.getElementById(SCHEMA_SCRIPT_ID);
  if (existing) existing.remove();
  if (!schemaJson) return;

  const script = document.createElement("script");
  script.id = SCHEMA_SCRIPT_ID;
  script.type = "application/ld+json";
  script.text = schemaJson;
  document.head.appendChild(script);
}

const SEO = ({
  title,
  description,
  canonical,
  ogImage,
  ogImageAlt,
  noindex = false,
  schema,
}: SEOProps) => {
  const { pathname } = useLocation();
  const schemaJson = schema ? JSON.stringify(schema).replace(/</g, "\\u003c") : "";

  useEffect(() => {
    const formattedTitle = title
      ? title.includes("AeroTech")
        ? title
        : `${title} | AeroTech Infra Equipment`
      : DEFAULT_TITLE;
    document.title = formattedTitle;

    const metaDesc = description || DEFAULT_DESC;
    setMetaTag('meta[name="title"]', "name", "title", formattedTitle);
    setMetaTag('meta[name="description"]', "name", "description", metaDesc);
    removeMetaTag('meta[name="keywords"]');

    const robots = noindex ? "noindex, nofollow" : "index, follow, max-image-preview:large";
    setMetaTag('meta[name="robots"]', "name", "robots", robots);

    const canonicalUrl = toCanonical(canonical || pathname);
    if (noindex) {
      document.querySelector('link[rel="canonical"]')?.remove();
    } else {
      setCanonicalTag(canonicalUrl);
    }

    const finalOgImage = ogImage ? toAbsoluteAsset(ogImage) : DEFAULT_OG_IMAGE;
    const imageAlt = ogImageAlt || formattedTitle || DEFAULT_OG_ALT;

    setMetaTag('meta[property="og:title"]', "property", "og:title", formattedTitle);
    setMetaTag('meta[property="og:description"]', "property", "og:description", metaDesc);
    setMetaTag('meta[property="og:url"]', "property", "og:url", canonicalUrl);
    setMetaTag('meta[property="og:type"]', "property", "og:type", "website");
    setMetaTag('meta[property="og:image"]', "property", "og:image", finalOgImage);
    setMetaTag('meta[property="og:image:alt"]', "property", "og:image:alt", imageAlt);

    if (finalOgImage === DEFAULT_OG_IMAGE) {
      setMetaTag('meta[property="og:image:width"]', "property", "og:image:width", "1200");
      setMetaTag('meta[property="og:image:height"]', "property", "og:image:height", "630");
    } else {
      removeMetaTag('meta[property="og:image:width"]');
      removeMetaTag('meta[property="og:image:height"]');
    }

    setMetaTag('meta[name="twitter:title"]', "name", "twitter:title", formattedTitle);
    setMetaTag('meta[name="twitter:description"]', "name", "twitter:description", metaDesc);
    setMetaTag('meta[name="twitter:url"]', "name", "twitter:url", canonicalUrl);
    setMetaTag('meta[name="twitter:image"]', "name", "twitter:image", finalOgImage);

    setStructuredData(schemaJson);

    return () => {
      document.getElementById(SCHEMA_SCRIPT_ID)?.remove();
    };
  }, [title, description, canonical, ogImage, ogImageAlt, noindex, schemaJson, pathname]);

  return null;
};

export default SEO;
