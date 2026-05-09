import { forwardRef } from "react";
import clsx from "clsx";

type ButtonProps = {
  variant?: "primary" | "secondary" | "ghost" | "danger";
  size?: "sm" | "md" | "lg";
  loading?: boolean;
  disabled?: boolean;
  label: string;
  className?: string;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = "primary",
      size = "md",
      loading = false,
      disabled = false,
      label,
      className,
      ...props
    },
    ref,
  ) => {
    const baseStyles =
      "rounded-md focus:outline-none transition-colors hover:cursor-pointer focus:ring-2 ring-white";

    const variantStyles: Record<string, string> = {
      primary: "bg-accent text-white  hover:bg-accent-hover",
      secondary: "bg-bg-surface border text-primary  hover:bg-bg-hover  ",
      ghost:
        "bg-transparent border border-text-primary text-primary hover:bg-bg-hover ",
      danger: "bg-red-600 text-white hover:bg-red-700 ",
    };
    const sizeStyles: Record<string, string> = {
      sm: "h-7 px-3 text-xs",
      md: "h-8 px-4 text-sm ",
      lg: "h-10 px-5 text-base",
    };

    return (
      <button
        ref={ref}
        className={clsx(
          baseStyles,
          variantStyles[variant],
          sizeStyles[size],
          className,
        )}
        // className=""
        {...props}
      >
        {label}
      </button>
    );
  },
);

Button.displayName = "Button";

export default Button;
