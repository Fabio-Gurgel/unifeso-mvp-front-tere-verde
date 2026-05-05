import React from "react";
import { Plus } from "lucide-react";

export function FormSection({
  title,
  icon,
  children,
  className = "",
  onAction,
}) {
  return (
    <div className="bg-white rounded-xl border border-neutral-200 shadow-sm overflow-hidden">
      <div className="p-4 border-b border-neutral-100 bg-neutral-50/50 flex items-center justify-between">
        <h2 className="text-l font-medium flex items-center gap-2">
          {icon &&
            React.cloneElement(icon, {
              className: "size-5 text-green-700",
            })}
          {title}
        </h2>

        {onAction && (
          <button
            type="button"
            onClick={onAction}
            className="p-1.5 hover:bg-green-100 text-green-600 rounded-md transition-colors"
          >
            <Plus className="size-4" />
          </button>
        )}
      </div>

      <div className={`p-6 ${className}`}>{children}</div>
    </div>
  );
}
