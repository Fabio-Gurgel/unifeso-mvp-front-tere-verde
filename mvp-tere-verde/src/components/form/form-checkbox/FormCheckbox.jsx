import React from "react";
import { FormError } from "../form-error/FormError";

export const FormCheckbox = React.forwardRef(
  ({ label, error, ...props }, ref) => {
    const id = props.id || props.name;

    return (
      <div className="flex flex-col">
        <div className="flex items-center gap-3 py-2 group cursor-pointer">
          <input
            ref={ref}
            type="checkbox"
            id={id}
            {...props}
            className={`size-4 accent-green-600 cursor-pointer rounded border-neutral-300 
            transition-transform group-active:scale-90
            ${error ? "ring-2 ring-red-200 border-red-500" : ""}`}
          />
          {label && (
            <label
              htmlFor={id}
              className="text-sm font-medium text-neutral-700 cursor-pointer select-none group-hover:text-green-700 transition-colors"
            >
              {label}
            </label>
          )}
        </div>
        <FormError error={error} />
      </div>
    );
  }
);

FormCheckbox.displayName = "FormCheckbox";
