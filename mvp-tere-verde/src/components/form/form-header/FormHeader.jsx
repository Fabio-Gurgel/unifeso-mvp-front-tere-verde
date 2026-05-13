import React from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

export function FormHeader({ backPath, title, isEdit, gender = "m" }) {
  const prefix = isEdit ? "Editar" : gender === "f" ? "Nova" : "Novo";

  return (
    <header className="bg-white border-b border-neutral-200 sticky top-0 z-10">
      <div className="max-w-5xl mx-auto px-6 py-4 flex items-center gap-4">
        <Link
          to={backPath}
          className="p-2 hover:bg-neutral-100 rounded-lg transition-colors group"
        >
          <ArrowLeft className="size-5 text-neutral-600 group-hover:text-neutral-900" />
        </Link>
        <h1 className="text-lg font-semibold text-neutral-900">
          {`${prefix} ${title}`}
        </h1>
      </div>
    </header>
  );
}
