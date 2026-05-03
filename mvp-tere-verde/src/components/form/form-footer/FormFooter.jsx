import React from "react";
import { X, Save, Loader2 } from "lucide-react";

export function FormFooter({
  onCancel,
  isSubmitting,
  isEdit,
  label = "Registro",
}) {
  return (
    <div className="flex items-center justify-end gap-4 pt-10">
      <button
        type="button"
        onClick={onCancel}
        className="px-6 py-2 border border-neutral-300 rounded-lg font-medium 
                   hover:bg-neutral-100 text-neutral-600 transition-all 
                   flex items-center gap-2 disabled:opacity-50"
        disabled={isSubmitting}
      >
        <X className="size-4" /> Cancelar
      </button>

      <button
        type="submit"
        disabled={isSubmitting}
        className="px-10 py-2 bg-green-700 hover:bg-green-800 text-white rounded-lg 
                   font-medium transition-all flex items-center gap-2 
                   disabled:bg-green-900/50 disabled:cursor-not-allowed min-w-[200px] justify-center"
      >
        {isSubmitting ? (
          <>
            <Loader2 className="size-4 animate-spin" />
            <span>Salvando...</span>
          </>
        ) : (
          <>
            <Save className="size-4" />
            <span>{isEdit ? "Salvar alterações" : `Cadastrar ${label}`}</span>
          </>
        )}
      </button>
    </div>
  );
}
