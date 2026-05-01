import React from "react";
import { FormError } from "../form-error/FormError";

export const FormSelect = React.forwardRef(
  ({ label, error, options, ...props }, ref) => {
    return (
      <div className="w-full">
        {label && (
          <label className="block text-sm font-medium text-neutral-700 mb-1">
            {label}
          </label>
        )}
        <select
          ref={ref}
          {...props}
          className={`w-full px-4 py-2 border rounded-lg bg-white outline-none transition-all
          ${error ? "border-red-500" : "border-neutral-300 focus:ring-green-600"}`}
        >
          <option value="">Selecione...</option>
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        <FormError error={error} />
      </div>
    );
  }
);
