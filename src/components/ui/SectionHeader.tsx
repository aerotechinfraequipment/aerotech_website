import { Link } from "react-router-dom";
import type { ReactNode } from "react";

interface SectionHeaderProps {
  title: string;
  description?: string;
  linkText?: string;
  linkTo?: string;
  align?: "left" | "center";
  theme?: "light" | "dark";
  as?: "h1" | "h2" | "h3";
  children?: ReactNode;
}

const SectionHeader = ({
  title,
  description,
  linkText,
  linkTo,
  align = "left",
  theme = "light",
  as = "h2",
}: SectionHeaderProps) => {
  const isDark = theme === "dark";
  const isCenter = align === "center";
  const HeadingTag = as;

  return (
    <div className={`section-header ${isCenter ? "section-header--center" : ""} ${linkText ? "section-header--with-link" : ""}`}>
      <div>
        <HeadingTag className={`section-header__title ${isDark ? "section-header__title--dark" : ""}`}>
          {title}
        </HeadingTag>
        {description && (
          <p className={`section-header__desc ${isDark ? "section-header__desc--dark" : ""}`}>
            {description}
          </p>
        )}
      </div>
      {linkText && linkTo && (
        <div>
          <Link to={linkTo} className="section-header__link">
            {linkText}
          </Link>
        </div>
      )}
    </div>
  );
};

export default SectionHeader;
