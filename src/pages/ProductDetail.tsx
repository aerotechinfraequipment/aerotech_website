import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import "../styles/pages/_equipment-detail.scss";
import Button from "../components/ui/Button";
import ProductCard from "../components/ui/ProductCard";
import SEO from "../components/seo/SEO";
import NotFound from "./NotFound";
import { productsData } from "../data/products";
import { getProductDetail, isValidProductSlug } from "../data/products/index";
import type { ProductDetail as ProductDetailType } from "../data/products/index";

const ProductDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const [product, setProduct] = useState<ProductDetailType | null>(null);
  const [missingSlug, setMissingSlug] = useState<string | null>(null);
  const [activeImage, setActiveImage] = useState<string>("");
  const slugValid = Boolean(slug && isValidProductSlug(slug));

  useEffect(() => {
    if (!slug || !isValidProductSlug(slug)) return;
    let ignore = false;

    getProductDetail(slug).then((data) => {
      if (ignore) return;
      if (!data) {
        setMissingSlug(slug);
        setProduct(null);
        return;
      }
      setMissingSlug(null);
      setProduct(data);
      setActiveImage(data.image || data.thumbnail || `/images/products/${slug}.jpg`);
    });

    return () => {
      ignore = true;
    };
  }, [slug]);

  if (!slugValid || missingSlug === slug) {
    return <NotFound />;
  }

  if (!product || product.slug !== slug) {
    return (
      <div className="container" style={{ padding: "6rem 0", textAlign: "center" }}>
        <p style={{ fontSize: "1.2rem", color: "var(--muted-foreground)" }}>
          Loading product specifications…
        </p>
      </div>
    );
  }

  const currentDisplayImage =
    activeImage ||
    product.image ||
    product.thumbnail ||
    `/images/products/${product.slug}.jpg`;

  const similar = productsData
    .filter((item) => item.slug !== product.slug && item.category === product.category)
    .slice(0, 4);

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
        "category": product.category
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
        ogImage={currentDisplayImage}
        ogImageAlt={`${product.name} by ${product.brand}`}
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
            <div className="eq-detail__img-wrap">
              <img
                src={currentDisplayImage}
                alt={`${product.name} - ${product.brand}`}
                className="eq-detail__img"
                width={850}
                height={850}
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
              <div className="eq-detail__thumbs">
                {product.images.map((imgUrl, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setActiveImage(imgUrl)}
                    aria-label={`View ${product.name} image ${idx + 1}`}
                    className={`eq-detail__thumb${currentDisplayImage === imgUrl ? " is-active" : ""}`}
                  >
                    <img
                      src={imgUrl}
                      alt={`${product.name} thumbnail ${idx + 1}`}
                      width={64}
                      height={64}
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

            {product.specifications && Object.keys(product.specifications).length > 0 && (
              <details className="detail-accordion" open>
                <summary className="detail-accordion__summary">Detailed Specifications</summary>
                <div className="detail-accordion__body">
                  <div className="eq-detail__specs">
                    <table>
                      <tbody>
                        {Object.entries(product.specifications).map(([key, val]) => (
                          <tr key={key}>
                            <th>{key}</th>
                            <td>{val}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </details>
            )}

            <details className="detail-accordion">
              <summary className="detail-accordion__summary">Product Overview &amp; Build Quality</summary>
              <div className="detail-accordion__body eq-detail__desc">
                <p>{product.overview}</p>
              </div>
            </details>

            {product.applications && product.applications.length > 0 && (
              <details className="detail-accordion">
                <summary className="detail-accordion__summary">Recommended Applications</summary>
                <div className="detail-accordion__body">
                  <ul className="detail-accordion__list">
                    {product.applications.map((app, idx) => (
                      <li key={idx}>{app}</li>
                    ))}
                  </ul>
                </div>
              </details>
            )}

            {product.packageContents && product.packageContents.length > 0 && (
              <details className="detail-accordion">
                <summary className="detail-accordion__summary">What's in the Box</summary>
                <div className="detail-accordion__body">
                  <ul className="detail-accordion__list">
                    {product.packageContents.map((item, idx) => (
                      <li key={idx}>{item}</li>
                    ))}
                  </ul>
                </div>
              </details>
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

      {similar.length > 0 && (
        <section className="similar-section" aria-label="Similar products">
          <div className="container">
            <div className="similar-section__head">
              <div>
                <h2 className="similar-section__title">Similar products</h2>
                <p className="similar-section__desc">
                  More {product.category.toLowerCase()} from the same category.
                </p>
              </div>
              <Link
                to={`/products?category=${encodeURIComponent(product.category)}`}
                className="similar-section__link"
              >
                View all
              </Link>
            </div>
            <div className="catalogue-grid">
              {similar.map((item) => (
                <ProductCard key={item.id} item={item} />
              ))}
            </div>
          </div>
        </section>
      )}

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
