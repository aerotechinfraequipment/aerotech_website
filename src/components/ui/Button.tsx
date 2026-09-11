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
    return (
      <a
        href={href}
        className={cls}
        {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
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
