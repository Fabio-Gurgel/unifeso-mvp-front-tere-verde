import { useState } from "react";
import { useFieldArray } from "react-hook-form";
import { Plus, Trash2, Image as ImageIcon } from "lucide-react";
import { Gallery } from "../../gallery/Gallery";

export function ImageManager({ control, register, watch }) {
  const [urlInput, setUrlInput] = useState("");

  const { fields, append, remove } = useFieldArray({
    control,
    name: "fotos_urls",
  });

  const currentPhotos = watch("fotos_urls") || [];

  const handleAddPhoto = () => {
    if (urlInput.trim() === "") return;
    append(urlInput);
    setUrlInput("");
  };

  return (
    <section className="bg-white rounded-xl border border-neutral-200 shadow-sm overflow-hidden">
      <div className="p-4 border-b border-neutral-100 bg-neutral-50/50 flex items-center gap-2">
        <ImageIcon className="size-4 text-green-600" />
        <h2 className="text-l font-medium flex items-center gap-2">
          Galeria de fotos
        </h2>
      </div>

      <div className="p-6 grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-1">
              Adicionar link da imagem
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                value={urlInput}
                onChange={(e) => setUrlInput(e.target.value)}
                placeholder="https://exemplo.com/foto.jpg"
                className="w-full px-4 py-2 border border-neutral-300 rounded-lg outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent transition-all"
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    handleAddPhoto();
                  }
                }}
              />
              <button
                type="button"
                onClick={handleAddPhoto}
                className="px-4 py-2 bg-green-700 hover:bg-green-800 text-white rounded-lg font-medium transition-all flex items-center gap-2"
              >
                <Plus className="size-5" />
              </button>
            </div>
            <p className="text-[10px] text-neutral-400 mt-1 italic">
              Cole o link direto da imagem (.jpg, .png, .webp)
            </p>
          </div>

          <div className="space-y-2 max-h-64 overflow-y-auto pr-2">
            <label className="block text-xs font-bold text-neutral-500 uppercase">
              Links Adicionados ({fields.length})
            </label>
            {fields.map((field, index) => (
              <div key={field.id} className="flex items-center gap-2 group">
                <input
                  {...register(`fotos_urls.${index}`)}
                  className="w-full px-4 py-2 m-1 border border-neutral-300 rounded-lg outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent transition-all"
                  readOnly
                />
                <button
                  type="button"
                  onClick={() => remove(index)}
                  className="p-2 text-neutral-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all"
                  title="Remover imagem"
                >
                  <Trash2 className="size-4" />
                </button>
              </div>
            ))}
            {fields.length === 0 && (
              <div className="text-center py-8 border-2 border-dashed border-neutral-100 rounded-xl">
                <p className="text-sm text-neutral-400 text-center">
                  Nenhuma imagem adicionada ainda.
                </p>
              </div>
            )}
          </div>
        </div>

        <div className="bg-neutral-100 rounded-xl p-4 flex flex-col items-center justify-center min-h-[300px]">
          <span className="text-[10px] font-bold text-neutral-400 uppercase mb-4">
            Preview da Galeria
          </span>
          <div className="w-full max-w-sm overflow-hidden rounded-lg shadow-md bg-white">
            <Gallery photos={currentPhotos} altPrefix="Preview Parque" />
          </div>
        </div>
      </div>
    </section>
  );
}
