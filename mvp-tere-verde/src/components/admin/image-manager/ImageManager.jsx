import { useState } from "react";
import { useFieldArray } from "react-hook-form";
import { Plus, Trash2, Image as ImageIcon } from "lucide-react";
import { Gallery } from "../../gallery/Gallery";
import { FormField } from "../../inputs/form-field/FormField";
import { FormSection } from "../../inputs/form-section/FormSection"; // Ajuste o path conforme sua estrutura

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
    <FormSection
      title="Galeria de fotos"
      icon={<ImageIcon />}
      className="grid grid-cols-1 lg:grid-cols-2 gap-8"
    >
      <div className="space-y-4">
        <div className="flex items-end gap-2">
          <div className="flex-1">
            <FormField
              label="Adicionar link da imagem"
              placeholder="https://exemplo.com/foto.jpg"
              value={urlInput}
              onChange={(e) => setUrlInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  handleAddPhoto();
                }
              }}
            />
          </div>

          <button
            type="button"
            onClick={handleAddPhoto}
            className="px-4 py-2 bg-green-700 hover:bg-green-800 text-white rounded-lg font-medium transition-all flex items-center justify-center h-[42px]"
          >
            <Plus className="size-5" />
          </button>
        </div>

        <div className="space-y-2 max-h-64 overflow-y-auto pr-2">
          <label className="block text-[10px] font-bold text-neutral-500 tracking-wider">
            Links adicionados ({fields.length})
          </label>

          {fields.map((field, index) => (
            <div key={field.id} className="flex items-center gap-2 group">
              <div className="flex-1">
                <FormField
                  {...register(`fotos_urls.${index}`)}
                  readOnly
                  className="bg-neutral-50 text-neutral-500 text-sm cursor-default m-1"
                />
              </div>
              <button
                type="button"
                onClick={() => remove(index)}
                className="p-2 text-neutral-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all mb-1"
                title="Remover imagem"
              >
                <Trash2 className="size-4" />
              </button>
            </div>
          ))}

          {fields.length === 0 && (
            <div className="text-center py-8 border-2 border-dashed border-neutral-100 rounded-xl">
              <p className="text-sm text-neutral-400">
                Nenhuma imagem adicionada ainda.
              </p>
            </div>
          )}
        </div>
      </div>

      <div className="bg-neutral-100 rounded-xl p-4 flex flex-col items-center justify-center min-h-[300px]">
        <span className="text-[10px] font-bold text-neutral-400 uppercase mb-4 tracking-wider">
          Preview da Galeria
        </span>
        <div className="w-full max-w-sm overflow-hidden rounded-lg shadow-md bg-white">
          <Gallery photos={currentPhotos} altPrefix="Preview Parque" />
        </div>
      </div>
    </FormSection>
  );
}
