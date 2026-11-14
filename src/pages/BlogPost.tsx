import { Link, useParams } from "react-router-dom";
import "../styles/pages/_blogs.scss";
import Button from "../components/ui/Button";
import SEO from "../components/seo/SEO";
import NotFound from "./NotFound";
import BlogTopicMenu from "../components/blog/BlogTopicMenu";
import { useBlog } from "../lib/catalog";

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const { item: post, list, status } = useBlog(slug);

  if (status === "loading") return <p className="container">Loading…</p>;
  if (status === "error") return <p className="container">Could not load this topic. Refresh the page to try again.</p>;
  if (!post) return <NotFound />;

  const index = list.findIndex((item) => item.slug === post.slug);
  const next = list[(index + 1) % list.length];
  const postUrl = `https://aerotechinfraequipment.com/blogs/${post.slug}`;

  const postSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.summary,
    image: `https://aerotechinfraequipment.com${post.image}`,
    datePublished: post.date,
    author: {
      "@type": "Organization",
      name: "AeroTech Infra Equipment",
      url: "https://aerotechinfraequipment.com/",
    },
    mainEntityOfPage: postUrl,
    breadcrumb: {
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: "https://aerotechinfraequipment.com/",
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Blogs",
          item: "https://aerotechinfraequipment.com/blogs",
        },
        {
          "@type": "ListItem",
          position: 3,
          name: post.title,
          item: postUrl,
        },
      ],
    },
  };

  return (
    <>
      <SEO
        title={post.seoTitle || post.title}
        description={post.seoDescription || post.summary}
        canonical={`/blogs/${post.slug}`}
        ogImage={post.image}
        ogImageAlt={post.imageAlt}
        ogTitle={post.ogTitle || undefined}
        ogDescription={post.ogDescription || undefined}
        ogType="article"
        keywords={post.keywords}
        schema={postSchema}
      />

      <div className="eq-detail-breadcrumb">
        <div className="container">
          <nav aria-label="Breadcrumb">
            <ol className="breadcrumb">
              <li><Link to="/">Home</Link></li>
              <li aria-hidden="true">/</li>
              <li><Link to="/blogs">Blogs</Link></li>
              <li aria-hidden="true">/</li>
              <li aria-current="page">{post.menuLabel}</li>
            </ol>
          </nav>
        </div>
      </div>

      <BlogTopicMenu />

      <article className="blog-post">
        <div className="container blog-post__layout">
          <nav className="blog-sections" aria-label="Sections in this topic">
            <p className="blog-sections__label">In this topic</p>
            <ul className="blog-sections__list">
              {post.sections.map((section) => (
                <li key={section.id}>
                  <a className="blog-sections__link" href={`#${section.id}`}>
                    {section.heading}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="blog-article">
            <figure className="blog-article__hero">
              <img
                src={post.image}
                alt={post.imageAlt}
                width={post.width}
                height={post.height}
                decoding="async"
              />
            </figure>
            <h1 className="blog-article__title">{post.title}</h1>
            <p className="blog-article__summary">{post.summary}</p>

            {post.sections.map((section) => (
              <section key={section.id} id={section.id} className="blog-article__section">
                <h2>{section.heading}</h2>
                {section.paragraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
                {section.points && (
                  <ul className="blog-article__points">
                    {section.points.map((point) => (
                      <li key={point}>{point}</li>
                    ))}
                  </ul>
                )}
              </section>
            ))}

            <aside className="blog-cta">
              <h2>Need a machine for a job like this?</h2>
              <p>
                AeroTech rents boom lifts, cranes and excavators from Sriperumbudur, and sells the tools and steel a site uses every day.
              </p>
              <div className="blog-cta__actions">
                <Button variant="accent" to="/contact#quote">Get a Quote</Button>
                <Button variant="outline" to="/equipment">See rental fleet</Button>
              </div>
            </aside>

            {next && next.slug !== post.slug && (
              <p className="blog-next">
                Next topic: <Link to={`/blogs/${next.slug}`}>{next.title}</Link>
              </p>
            )}
          </div>
        </div>
      </article>
    </>
  );
};

export default BlogPost;
