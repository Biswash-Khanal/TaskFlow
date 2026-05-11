import clsx from "clsx";
import React, {
  forwardRef,
  type ComponentPropsWithoutRef,
  type InputHTMLAttributes,
} from "react";

// 1. Extend the standard HTML input props
interface FormInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  // name, type, required, and placeholder are now inherited automatically!
}

const FormInput = forwardRef<HTMLInputElement, FormInputProps>(
  ({ label, error, required = true, className, ...props }, ref) => {
    return (
      <div className="mb-4 w-full">
        <label htmlFor={props.name} className="block text-sm mb-1">
          {label}
          {required && <span className="text-danger ml-1">*</span>}
        </label>

        <input
          ref={ref}
          id={props.name}
          {...props} // 2. Spread all other props (name, type, placeholder, etc.)
          className={clsx(
            "w-full placeholder:font-extralight placeholder:text-sm placeholder:opacity-50 bg-bg-surface border rounded-md h-9 px-3 focus:border-accent focus:shadow-glow focus:outline-none",
            error
              ? "border-danger focus:border-danger focus:shadow-2xl shadow-danger"
              : "border-border-default",
            className, // 3. Allow passing custom classes from the parent
          )}
        />

        {error && (
          <p className="mt-1 text-xs text-red-600 font-extralight">{error}</p>
        )}
      </div>
    );
  },
);

FormInput.displayName = "FormInput";

export default FormInput;
