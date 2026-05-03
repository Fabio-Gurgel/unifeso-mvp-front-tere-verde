import React from "react";
import { FormError } from "../form-error/FormError";

export const FormField = React.forwardRef(({ label, error, ...props }, ref) => {
  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-neutral-700 mb-1">
          {label}
        </label>
      )}
      <input
        ref={ref}
        {...props}
        className={`w-full px-4 py-2 border rounded-lg outline-none transition-all
          ${
            error
              ? "border-red-500 focus:ring-2 focus:ring-red-200"
              : "border-neutral-300 focus:ring-2 focus:ring-green-600"
          } ${props.className}`}
      />
      <FormError error={error} />
    </div>
  );
});

FormField.displayName = "FormField";
