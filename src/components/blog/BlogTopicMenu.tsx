import { NavLink } from "react-router-dom";
import { blogs } from "../../data/blogs";

const BlogTopicMenu = () => {
  return (
    <nav className="blog-topics" aria-label="Blog topics">
      <div className="container blog-topics__inner">
        <p className="blog-topics__label">Topics</p>
        <ul className="blog-topics__list">
          <li>
            <NavLink
              to="/blogs"
              end
              className={({ isActive }) => `blog-topics__link${isActive ? " is-active" : ""}`}
            >
              All topics
            </NavLink>
          </li>
          {blogs.map((blog) => (
            <li key={blog.slug}>
              <NavLink
                to={`/blogs/${blog.slug}`}
                className={({ isActive }) => `blog-topics__link${isActive ? " is-active" : ""}`}
              >
                {blog.menuLabel}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default BlogTopicMenu;
