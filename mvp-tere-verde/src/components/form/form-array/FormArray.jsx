
import { FormField } from "../form-field/FormField"; 
import { Trash2 } from "lucide-react";
export function FormArray({ fields, register, name, errors, onRemove }) {
  return (
    <div className="space-y-2">
      {fields.map((field, index) => (
        <div key={field.id} className="flex gap-2">
          <FormField
            {...register(`${name}.${index}`)}
            error={errors?.[index]}
          />
          <button
            type="button"
            onClick={() => onRemove(index)}
            className="p-2 hover:bg-red-50 rounded-lg transition-colors group"
          >
            <Trash2 className="size-4 text-neutral-400 group-hover:text-red-600" />
          </button>
        </div>
      ))}
    </div>
  );
}
