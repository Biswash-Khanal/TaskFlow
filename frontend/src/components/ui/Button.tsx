import { forwardRef } from "react";
import clsx from "clsx";

type ButtonProps = {
  variant?: "default" | "primary" | "secondary" | "danger";
  label?: string;
  className?: string;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = "default", label, className, ...props }, ref) => {
    const baseStyles =
      "px-4 py-2 rounded-md font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors hover:cursor-pointer";

    const variantStyles: Record<string, string> = {
      default:
        "bg-gray-200 text-gray-800 hover:bg-gray-300 focus:ring-gray-400",
      primary: "bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500",
      secondary:
        "bg-purple-600 text-white hover:bg-purple-700 focus:ring-purple-500",
      danger: "bg-red-600 text-white hover:bg-red-700 focus:ring-red-500",
    };

    return (
      <button
        ref={ref}
        className={clsx(baseStyles, variantStyles[variant], className)}
        {...props}
      >
        {label}
      </button>
    );
  },
);

Button.displayName = "Button";

export default Button;
