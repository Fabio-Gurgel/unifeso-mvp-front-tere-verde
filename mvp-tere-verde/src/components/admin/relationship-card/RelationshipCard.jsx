import React from "react";
import { Plus } from "lucide-react";

export function RelationshipCard({
  title,
  icon,
  options,
  register,
  name,
  createPath,
}) {
  return (
    <div className="bg-white rounded-xl border border-neutral-200 shadow-sm flex flex-col h-64">
      <div className="p-4 border-b border-neutral-100 bg-neutral-50/50 flex items-center justify-between">
        <div className="flex items-center gap-2">
          {icon}
          <h3 className="text-xs font-bold text-neutral-900">
            {title}
          </h3>
        </div>

        <a
          href={createPath}
          target="_blank"
          rel="noopener noreferrer"
          className="p-1.5 hover:bg-green-100 text-green-600 rounded-md transition-colors"
          title={`Cadastrar novo(a) ${title.slice(0, -1)}`}
        >
          <Plus className="size-4" />
        </a>
      </div>

      <div className="p-4 overflow-y-auto flex-1 space-y-2">
        {options.map((opt) => (
          <label
            key={opt.id.toString()}
            className="flex items-center gap-3 p-2 hover:bg-green-50 rounded-lg cursor-pointer transition-colors group"
          >
            <input
              type="checkbox"
              value={opt.id.toString()}
              {...register(name)}
              className="size-4 accent-green-600"
            />
            <span className="text-sm text-neutral-600 group-hover:text-green-700 font-medium">
              {opt.nome}
            </span>
          </label>
        ))}
        {options.length === 0 && (
          <p className="text-[10px] text-neutral-400 italic text-center py-4">
            Nenhum registro encontrado
          </p>
        )}
      </div>
    </div>
  );
}
