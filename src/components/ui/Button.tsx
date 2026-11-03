import { Link } from "react-router-dom";
import type { ReactNode } from "react";

type ButtonVariant = "accent" | "dark" | "outline" | "outline-dark" | "whatsapp" | "ghost";

interface ButtonProps {
  children: ReactNode;
  variant?: ButtonVariant;
  href?: string;
  to?: string;
  external?: boolean;
  className?: string;
  type?: "button" | "submit";
  fullWidth?: boolean;
  onClick?: () => void;
}

const variantClasses: Record<ButtonVariant, string> = {
  accent: "btn btn--accent",
  dark: "btn btn--dark",
  outline: "btn btn--outline",
  "outline-dark": "btn btn--outline-dark",
  whatsapp: "btn btn--whatsapp",
  ghost: "btn btn--ghost",
};

/**
 * Validates that an href does not execute arbitrary script
 */
function isSafeHref(href: string): boolean {
  const trimmed = href.trim().toLowerCase();
  if (trimmed.startsWith("javascript:") || trimmed.startsWith("vbscript:") || trimmed.startsWith("data:text/html")) {
    return false;
  }
  return true;
}

const Button = ({
  children,
  variant = "accent",
  href,
  to,
  external = false,
  className = "",
  type = "button",
  fullWidth = false,
  onClick,
}: ButtonProps) => {
  const cls = `${variantClasses[variant]}${fullWidth ? " btn--full" : ""} ${className}`.trim();

  if (to) {
    return <Link to={to} className={cls}>{children}</Link>;
  }

  if (href) {
    if (!isSafeHref(href)) {
      if (import.meta.env.DEV) {
        console.warn("Blocked potentially unsafe href:", href);
      }
      return <button type="button" className={cls}>{children}</button>;
    }

    const isExternal = external || href.startsWith("http://") || href.startsWith("https://");

    return (
      <a
        href={href}
        className={cls}
        {...(isExternal ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      >
        {children}
      </a>
    );
  }

  return (
    <button type={type} className={cls} onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;
