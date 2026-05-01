import React from "react";
import { FormError } from "../form-error/FormError";

export const FormTextArea = React.forwardRef(
  ({ label, error, ...props }, ref) => {
    return (
      <div className="w-full">
        {label && (
          <label className="block text-sm font-medium text-neutral-700 mb-1">
            {label}
          </label>
        )}
        <textarea
          ref={ref}
          {...props}
          className={`w-full px-4 py-2 border rounded-lg outline-none transition-all min-h-[100px]
          ${error ? "border-red-500 focus:ring-red-200" : "border-neutral-300 focus:ring-green-600"}`}
        />
        <FormError error={error} />
      </div>
    );
  }
);
