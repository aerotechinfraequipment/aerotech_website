import { useEffect, useState } from "react";
import { useParams, Link, Navigate } from "react-router-dom";
import Button from "../components/ui/Button";
import SEO from "../components/seo/SEO";
import type { ProductDetail as ProductDetailType } from "../data/products/index";

const ProductDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const [product, setProduct] = useState<ProductDetailType | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeImage, setActiveImage] = useState<string>("");

  useEffect(() => {
    if (!slug) return;
    let ignore = false;

    // Sanitize slug parameter to prevent directory traversal or malformed requests
    const cleanSlug = slug.replace(/[^a-zA-Z0-9_-]/g, "");

    // Fetch detail json from public directory
    fetch(`/data/products/${cleanSlug}.json`)
      .then((res) => {
        if (!res.ok) throw new Error("Product not found");
        return res.json();
      })
      .then((data: ProductDetailType) => {
        if (ignore) return;
        setProduct(data);
        setActiveImage(data.image || data.thumbnail || `/images/products/${cleanSlug}.jpg`);
        setLoading(false);
      })
      .catch((err) => {
        if (ignore) return;
        console.error("Failed to load product detail:", err);
        setLoading(false);
      });

    return () => {
      ignore = true;
    };
  }, [slug]);

  if (loading) {
    return (
      <div className="container" style={{ padding: "6rem 0", textAlign: "center" }}>
        <p style={{ fontSize: "1.2rem", color: "var(--muted-foreground)" }}>
          Loading product specifications…
        </p>
      </div>
    );
  }

  if (!product) {
    return <Navigate to="/products" replace />;
  }

  const currentDisplayImage =
    activeImage ||
    product.image ||
    product.thumbnail ||
    `/images/products/${product.slug}.jpg`;

  const whatsappMsg = encodeURIComponent(
    `Hello AeroTech, I am interested in ${product.name} (Brand: ${product.brand}). Please share pricing, availability, and technical documentation.`
  );

  const productSchema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Product",
        "@id": `https://aerotechinfra.com/products/${product.slug}#product`,
        "name": product.name,
        "description": product.shortDescription || product.overview,
        "image": currentDisplayImage.startsWith("http")
          ? currentDisplayImage
          : `https://aerotechinfra.com${currentDisplayImage}`,
        "brand": {
          "@type": "Brand",
          "name": product.brand
        },
        "category": product.category,
        "offers": {
          "@type": "Offer",
          "url": `https://aerotechinfra.com/products/${product.slug}`,
          "priceCurrency": "INR",
          "price": "0.00",
          "priceSpecification": {
            "@type": "PriceSpecification",
            "priceCurrency": "INR",
            "valueAddedTaxIncluded": true
          },
          "availability": product.inStock
            ? "https://schema.org/InStock"
            : "https://schema.org/OutOfStock",
          "itemCondition": "https://schema.org/NewCondition",
          "seller": {
            "@type": "Organization",
            "name": "AeroTech Infra Equipment Private Limited"
          }
        }
      },
      {
        "@type": "BreadcrumbList",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Home",
            "item": "https://aerotechinfra.com/"
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": "Industrial Products",
            "item": "https://aerotechinfra.com/products"
          },
          {
            "@type": "ListItem",
            "position": 3,
            "name": product.name,
            "item": `https://aerotechinfra.com/products/${product.slug}`
          }
        ]
      }
    ]
  };

  return (
    <>
      <SEO
        title={`${product.name} (${product.brand}) | Buy in Sriperumbudur & Chennai`}
        description={`${product.name} by ${product.brand}. ${product.shortDescription || product.overview.slice(0, 140)} Ready stock, prompt dispatch across Tamil Nadu.`}
        canonical={`/products/${product.slug}`}
        keywords={`${product.name}, ${product.brand}, ${product.category}, ${product.type}, industrial hardware Tamil Nadu`}
        ogType="product"
        ogImage={currentDisplayImage}
        schema={productSchema}
      />

      {/* ── Breadcrumb ──────────────────────────────── */}
      <div className="eq-detail-breadcrumb">
        <div className="container">
          <nav aria-label="Breadcrumb">
            <ol className="breadcrumb">
              <li><Link to="/">Home</Link></li>
              <li aria-hidden="true">/</li>
              <li><Link to="/products">Industrial Products</Link></li>
              <li aria-hidden="true">/</li>
              <li>
                <Link to={`/products?category=${encodeURIComponent(product.category)}`}>
                  {product.category}
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li aria-current="page">{product.name}</li>
            </ol>
          </nav>
        </div>
      </div>

      {/* ── Main Detail Section ─────────────────────── */}
      <section className="eq-detail" aria-label={product.name}>
        <div className="container eq-detail__grid">

          {/* ── Left: Images Panel ──────────────────── */}
          <div className="eq-detail__image-panel">
            <div className="eq-detail__img-wrap" style={{ background: "#ffffff", padding: "1.5rem", borderRadius: "0.75rem", textAlign: "center", border: "1px solid var(--border)" }}>
              <img
                src={currentDisplayImage}
                alt={`${product.name} - ${product.brand}`}
                className="eq-detail__img"
                style={{ objectFit: "contain", maxHeight: "380px", width: "100%" }}
                onError={(e) => {
                  const target = e.currentTarget;
                  if (!target.src.includes("product-placeholder.png")) {
                    target.src = "/images/product-placeholder.png";
                  }
                }}
              />
              <span className="eq-detail__badge eq-detail__badge--available">
                <span className="eq-detail__badge-dot" />
                In Stock &amp; Ready for Dispatch
              </span>
            </div>

            {/* Gallery Thumbnails */}
            {product.images && product.images.length > 1 && (
              <div
                style={{
                  display: "flex",
                  gap: "0.75rem",
                  marginTop: "1rem",
                  overflowX: "auto",
                }}
              >
                {product.images.map((imgUrl, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setActiveImage(imgUrl)}
                    aria-label={`View ${product.name} image ${idx + 1}`}
                    style={{
                      border:
                        currentDisplayImage === imgUrl
                          ? "2px solid var(--accent)"
                          : "1px solid var(--border)",
                      borderRadius: "0.5rem",
                      padding: "0.25rem",
                      background: "#fff",
                      cursor: "pointer",
                      width: "64px",
                      height: "64px",
                      flexShrink: 0,
                    }}
                  >
                    <img
                      src={imgUrl}
                      alt={`${product.name} thumbnail ${idx + 1}`}
                      style={{ width: "100%", height: "100%", objectFit: "contain" }}
                      onError={(e) => {
                        const target = e.currentTarget;
                        if (!target.src.includes("product-placeholder.png")) {
                          target.src = "/images/product-placeholder.png";
                        }
                      }}
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* ── Right: Product Info ─────────────────── */}
          <div className="eq-detail__info">
            {/* Brand + Category */}
            <div className="eq-detail__meta">
              <span className="eq-detail__brand">{product.brand}</span>
              <span className="eq-detail__sep">·</span>
              <span className="eq-detail__cat">{product.category}</span>
              <span className="eq-detail__sep">·</span>
              <span style={{ fontSize: "0.8rem", color: "var(--muted-foreground)", fontWeight: 500 }}>
                {product.type}
              </span>
            </div>

            {/* Product Name */}
            <h1 className="eq-detail__name">{product.name}</h1>

            {/* Specs Summary Tag */}
            {product.specsSummary && (
              <p className="eq-detail__rental-tag">
                <span className="eq-detail__rental-icon">⚙️</span>
                {product.specsSummary}
              </p>
            )}

            <hr className="eq-detail__divider" />

            {/* Short Description */}
            <p style={{ fontSize: "1rem", lineHeight: 1.6, color: "var(--foreground)", fontWeight: 500 }}>
              {product.shortDescription}
            </p>

            {/* Key Features */}
            {product.keyFeatures && product.keyFeatures.length > 0 && (
              <div className="eq-detail__models">
                <h2 className="eq-detail__section-title">Key Technical Highlights</h2>
                <ul className="eq-detail__model-list">
                  {product.keyFeatures.map((feat, idx) => (
                    <li key={idx} className="eq-detail__model-item" style={{ alignItems: "flex-start" }}>
                      <span className="eq-detail__model-dot" style={{ marginTop: "0.45rem" }} />
                      <span style={{ fontWeight: 400, color: "var(--foreground)" }}>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Technical Specifications Table */}
            {product.specifications && Object.keys(product.specifications).length > 0 && (
              <div>
                <h2 className="eq-detail__section-title">Detailed Specifications</h2>
                <div
                  style={{
                    border: "1px solid var(--border)",
                    borderRadius: "0.5rem",
                    overflow: "hidden",
                    fontSize: "0.85rem",
                  }}
                >
                  <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left" }}>
                    <tbody>
                      {Object.entries(product.specifications).map(([key, val], idx) => (
                        <tr
                          key={key}
                          style={{
                            background: idx % 2 === 0 ? "var(--secondary)" : "transparent",
                            borderBottom: "1px solid var(--border)",
                          }}
                        >
                          <th
                            style={{
                              padding: "0.6rem 0.85rem",
                              width: "40%",
                              fontWeight: 600,
                              color: "var(--foreground)",
                            }}
                          >
                            {key}
                          </th>
                          <td
                            style={{
                              padding: "0.6rem 0.85rem",
                              color: "var(--muted-foreground)",
                            }}
                          >
                            {val}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Full Overview Description */}
            <div className="eq-detail__desc">
              <h2 className="eq-detail__section-title">Product Overview &amp; Build Quality</h2>
              <p>{product.overview}</p>
            </div>

            {/* Applications */}
            {product.applications && product.applications.length > 0 && (
              <div>
                <h2 className="eq-detail__section-title">Recommended Applications</h2>
                <ul
                  style={{
                    listStyle: "disc",
                    paddingLeft: "1.25rem",
                    color: "var(--muted-foreground)",
                    fontSize: "0.9rem",
                    lineHeight: 1.6,
                  }}
                >
                  {product.applications.map((app, idx) => (
                    <li key={idx}>{app}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* Package Contents */}
            {product.packageContents && product.packageContents.length > 0 && (
              <div>
                <h2 className="eq-detail__section-title">What's in the Box</h2>
                <ul
                  style={{
                    listStyle: "circle",
                    paddingLeft: "1.25rem",
                    color: "var(--muted-foreground)",
                    fontSize: "0.9rem",
                    lineHeight: 1.6,
                  }}
                >
                  {product.packageContents.map((item, idx) => (
                    <li key={idx}>{item}</li>
                  ))}
                </ul>
              </div>
            )}

            <hr className="eq-detail__divider" />

            {/* Call To Actions */}
            <div className="eq-detail__ctas">
              <Button
                variant="accent"
                href={`https://wa.me/919791890636?text=${whatsappMsg}`}
                external
              >
                Enquire on WhatsApp
              </Button>
              <Button variant="dark" href="tel:+919791890636">
                Call: +91 97918 90636
              </Button>
              {product.sourceUrl && (
                <Button variant="outline-dark" href={product.sourceUrl} external>
                  Source Reference ↗
                </Button>
              )}
            </div>

            {/* Back link */}
            <Link to="/products" className="eq-detail__back">
              ← Back to All Industrial Products
            </Link>

          </div>
        </div>
      </section>

      {/* ── Trust Information Strip ─────────────────── */}
      <section className="eq-detail-strip">
        <div className="container eq-detail-strip__grid">
          <div className="eq-detail-strip__card">
            <span className="eq-detail-strip__icon">🛡️</span>
            <h3>100% Genuine Brands</h3>
            <p>Direct sourcing from authorized manufacturers with genuine brand warranties.</p>
          </div>
          <div className="eq-detail-strip__card">
            <span className="eq-detail-strip__icon">⚡</span>
            <h3>Prompt Dispatch</h3>
            <p>Ready stock maintained at our Chennai warehouse for fast dispatch across South India.</p>
          </div>
          <div className="eq-detail-strip__card">
            <span className="eq-detail-strip__icon">📄</span>
            <h3>GST Invoicing &amp; Mill TCs</h3>
            <p>100% compliant tax invoicing with batch test certificates for industrial compliance.</p>
          </div>
          <div className="eq-detail-strip__card">
            <span className="eq-detail-strip__icon">🤝</span>
            <h3>Engineering Support</h3>
            <p>Our technical team helps you select the exact grade, specification, and tooling for your job.</p>
          </div>
        </div>
      </section>
    </>
  );
};

export default ProductDetail;
