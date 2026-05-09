import clsx from "clsx";
import { forwardRef, type HTMLInputTypeAttribute } from "react";

type FormInputProps = {
  label: string;
  name: string;
  error?: string;
  type?: HTMLInputTypeAttribute;
  required?: boolean;
  placeholder: string;
};

const FormInput = forwardRef<HTMLInputElement, FormInputProps>(
  (
    { label, error, type = "text", required = true, placeholder, ...props },
    ref,
  ) => {
    return (
      <div className="mb-4">
        <label htmlFor={props.name} className="block text-sm mb-1">
          {label}
          {required && <span className="text-danger ml-1">*</span>}
        </label>
        <input
          ref={ref}
          type={type}
          {...props}
          placeholder={placeholder}
          className={clsx(
            "placeholder:font-extralight placeholder:text-sm placeholder:opacity-50 bg-bg-surface border rounded-md h-9 px-3 focus:border-accent focus:shadow-glow focus:outline-none",
            error
              ? "border-danger focus:border-danger focus:shadow-2xl shadow-danger"
              : "border-border-default",
          )}
        />

        {error && (
          <p className="mt-1 text-xs text-red-600 font-extralight">{error}</p>
        )}
      </div>
    );
  },
);

export default FormInput;
