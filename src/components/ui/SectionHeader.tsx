import { Link } from "react-router-dom";
import type { ReactNode } from "react";

interface SectionHeaderProps {
  subtitle: string;
  title: string;
  description?: string;
  linkText?: string;
  linkTo?: string;
  align?: "left" | "center";
  theme?: "light" | "dark";
  children?: ReactNode;
}

const SectionHeader = ({
  subtitle,
  title,
  description,
  linkText,
  linkTo,
  align = "left",
  theme = "light",
}: SectionHeaderProps) => {
  const isDark = theme === "dark";
  const isCenter = align === "center";

  return (
    <div className={`section-header ${isCenter ? "section-header--center" : ""} ${linkText ? "section-header--with-link" : ""}`}>
      <div>
        <p className={`section-header__subtitle ${isDark ? "section-header__subtitle--dark" : ""}`}>
          {subtitle}
        </p>
        <h2 className={`section-header__title ${isDark ? "section-header__title--dark" : ""}`}>
          {title}
        </h2>
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
