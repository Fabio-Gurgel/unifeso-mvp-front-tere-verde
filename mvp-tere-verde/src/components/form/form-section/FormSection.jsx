import React from "react";

export function FormSection({ title, icon, children, className = "" }) {
  return (
    <div className="bg-white rounded-xl border border-neutral-200 shadow-sm overflow-hidden">
      <div className="p-4 border-b border-neutral-100 bg-neutral-50/50">
        <h2 className="text-l font-medium flex items-center gap-2">
          {icon &&
            React.cloneElement(icon, {
              className: "size-5 text-green-700",
            })}
          {title}
        </h2>
      </div>

      <div className={`p-6 ${className}`}>{children}</div>
    </div>
  );
}
