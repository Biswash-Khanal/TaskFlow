import clsx from "clsx";
import { forwardRef, type HTMLInputTypeAttribute } from "react";

type FormInputProps = {
  label: string;
  name: string;
  error?: string;
  type?: HTMLInputTypeAttribute;
  required?: boolean;
};

const FormInput = forwardRef<HTMLInputElement, FormInputProps>(
  ({ label, error, type = "text", required = true, ...props }, ref) => {
    return (
      <div className="mb-4">
        <label
          htmlFor={props.name}
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
        <input
          ref={ref}
          type={type}
          {...props}
          className={clsx(
            "block w-full rounded-md border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500",
            error ? "border-red-500" : "border-gray-300",
          )}
        />
        {error && (
          <p className="mt-1 text-xs text-red-600 font-medium">{error}</p>
        )}
      </div>
    );
  },
);

export default FormInput;
