import { Link } from "react-router-dom";
import "../styles/pages/_blogs.scss";
import SectionHeader from "../components/ui/SectionHeader";
import SEO from "../components/seo/SEO";
import BlogTopicMenu from "../components/blog/BlogTopicMenu";
import { useBlogs } from "../lib/catalog";

const blogsSchema = {
  "@context": "https://schema.org",
  "@type": "Blog",
  name: "AeroTech site guides",
  description:
    "Plain-language guides to roads, bridges, railways, buildings and the machines that build them.",
  url: "https://aerotechinfraequipment.com/blogs",
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
    ],
  },
};

const Blogs = () => {
  const { data, error, loading } = useBlogs();
  const blogs = data ?? [];
  return (
    <>
      <SEO
        title="Simple Guides to Construction Sites"
        description="Plain-language guides to roads, bridges, railways, buildings and the machines that build them."
        canonical="/blogs"
        schema={blogsSchema}
      />

      <section className="page-hero page-hero--dark" aria-label="Blogs">
        <div className="container">
          <SectionHeader
            title="Blogs"
            description="Short guides, in plain words, to the work you see on roads, bridges, railways and building sites."
            theme="dark"
            as="h1"
          />
        </div>
      </section>

      <BlogTopicMenu />

      <section className="blogs-page" aria-label="Blog topics">
        <div className="container">
          {loading ? <p>Loading topics…</p> : null}
          {error ? <p>{error}</p> : null}
          <ul className="blog-grid">
            {blogs.map((blog) => (
              <li key={blog.slug}>
                <article className="blog-card">
                  <Link to={`/blogs/${blog.slug}`} className="blog-card__link" aria-labelledby={`blog-${blog.slug}-title`}>
                    <img
                      src={blog.image}
                      alt=""
                      width={blog.width}
                      height={blog.height}
                      loading="lazy"
                      decoding="async"
                    />
                    <div className="blog-card__body">
                      <p className="blog-card__topic">{blog.menuLabel}</p>
                      <h2 id={`blog-${blog.slug}-title`} className="blog-card__title">
                        {blog.title}
                      </h2>
                      <p className="blog-card__summary">{blog.summary}</p>
                    </div>
                  </Link>
                </article>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
};

export default Blogs;
