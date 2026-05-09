import { useEffect } from "react";
import { Trash2, X } from "lucide-react";

export function DeleteModal({ isOpen, onClose, onConfirm, message }) {
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-neutral-900/60 backdrop-blur-sm"
        onClick={onClose}
      />

      <div className="relative bg-white rounded-3xl shadow-2xl max-w-sm w-full p-8 overflow-hidden transform transition-all animate-in fade-in zoom-in duration-200">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-neutral-400 hover:text-neutral-600 hover:bg-neutral-100 rounded-full transition-colors"
        >
          <X size={18} />
        </button>

        <div className="flex flex-col items-center text-center">
          <div className="p-4 rounded-2xl bg-red-50 text-red-600 mb-6">
            <Trash2 size={42} strokeWidth={1.5} />
          </div>

          <h3 className="text-xl font-bold text-neutral-900 mb-2">
            Confirmar exclusão
          </h3>

          <p className="text-neutral-500 text-sm leading-relaxed">{message}</p>
        </div>

        <div className="flex gap-3 mt-8">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-3 text-sm font-semibold text-neutral-600 bg-neutral-100 hover:bg-neutral-200 rounded-xl transition-colors"
          >
            Cancelar
          </button>
          <button
            onClick={() => {
              onConfirm();
              onClose();
            }}
            className="flex-1 px-4 py-3 text-sm font-semibold text-white bg-red-600 hover:bg-red-700 shadow-lg shadow-red-200 rounded-xl transition-all active:scale-95"
          >
            Excluir
          </button>
        </div>
      </div>
    </div>
  );
}
