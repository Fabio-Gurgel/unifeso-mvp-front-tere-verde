import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { useForm, useFieldArray } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";
import { floraSchema } from "./floraSchema";

import { Loader2, Info, Leaf, Trash2, Plus } from "lucide-react";
import { toast } from "sonner";

import { FormField } from "../../../../components/form/form-field/FormField";
import { FormTextArea } from "../../../../components/form/form-text-area/FormTextArea";
import { FormSelect } from "../../../../components/form/form-select/FormSelect";
import { FormCheckbox } from "../../../../components/form/form-checkbox/FormCheckbox";
import { FormFooter } from "../../../../components/form/form-footer/FormFooter";
import { FormHeader } from "../../../../components/form/form-header/FormHeader";
import { FormSection } from "../../../../components/form/form-section/FormSection";
import { ImageManager } from "../../../../components/admin/image-manager/ImageManager";
import { FormArray } from "../../../../components/form/form-array/FormArray";

import FloraService from "../../../../services/floraService";
import EnumService from "../../../../services/enumService";

const mapToOptions = (arr = []) =>
  arr.map((item) => ({
    value: item,
    label: item
      .toLowerCase()
      .replace(/_/g, " ")
      .replace(/(^|\s)\S/g, (l) => l.toUpperCase()),
  }));

export function FloraForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = Boolean(id);

  const [loading, setLoading] = useState(true);

  const [enumOptions, setEnumOptions] = useState({
    tipo_flora: [],
    epoca_floracao: [],
    status_conservacao: [],
  });

  const {
    register,
    handleSubmit,
    control,
    reset,
    watch,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(floraSchema),
    defaultValues: {
      uso_medicinal: false,
      fotos_urls: [],
      caracteristicas: [""],
      conservacao: [""],
    },
  });

  const {
    fields: caracteristicasFields,
    append: addCaracteristica,
    remove: removeCaracteristica,
  } = useFieldArray({ control, name: "caracteristicas" });

  const {
    fields: conservacaoFields,
    append: addConservacao,
    remove: removeConservacao,
  } = useFieldArray({ control, name: "conservacao" });

  const loadEnums = async () => {
    try {
      const enums = await EnumService.getAll();

      setEnumOptions({
        tipo_flora: mapToOptions(enums.tipo_flora),
        epoca_floracao: mapToOptions(enums.epoca_floracao),
        status_conservacao: mapToOptions(enums.status_conservacao),
      });
    } catch (error) {
      console.error(error);
      toast.error("Erro ao carregar enums");
    }
  };

  useEffect(() => {
    const init = async () => {
      setLoading(true);

      await loadEnums();

      if (isEdit) {
        try {
          const flora = await FloraService.getById(id);

          reset({
            ...flora,
            caracteristicas: flora.caracteristicas?.length
              ? flora.caracteristicas
              : [""],
            conservacao: flora.conservacao?.length ? flora.conservacao : [""],
            fotos_urls: flora.fotos_urls || [],
          });
        } catch (error) {
          console.error(error);
          toast.error("Erro ao carregar flora");
        }
      }

      setLoading(false);
    };

    init();
  }, [id, isEdit, reset]);

  const onSubmit = async (data) => {
    try {
      if (isEdit) {
        await FloraService.update(id, data);
      } else {
        await FloraService.create(data);
      }

      toast.success("Salvo com sucesso!");
      navigate("/admin/flora");
    } catch (error) {
      console.error(error);
      toast.error("Erro ao salvar");
    }
  };

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Loader2 className="animate-spin size-8 text-neutral-400" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-50 pb-20">
      <FormHeader
        backPath="/admin/flora"
        title="Flora"
        isEdit={isEdit}
        gender="f"
      />

      <main className="max-w-5xl mx-auto px-6 mt-8">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <FormSection title="Geral" icon={<Info />}>
            <FormField
              label="Nome popular"
              {...register("nome_popular")}
              error={errors.nome_popular}
            />

            <FormField
              label="Nome científico"
              {...register("nome_cientifico")}
              error={errors.nome_cientifico}
            />
            <FormSelect
              label="Status de conservação"
              {...register("status_conservacao")}
              error={errors.status_conservacao}
              options={enumOptions.status_conservacao}
            />

            <FormTextArea
              label="Descrição"
              {...register("descricao")}
              error={errors.descricao}
            />

            <FormCheckbox
              label="Uso medicinal"
              {...register("uso_medicinal")}
            />
          </FormSection>

          <FormSection
            title="Classificação e dados científicos"
            icon={<Leaf />}
          >
            <FormSelect
              label="Tipo de flora"
              {...register("tipo_flora")}
              error={errors.tipo_flora}
              options={enumOptions.tipo_flora}
            />

            <FormField
              label="Família"
              {...register("familia")}
              error={errors.familia}
            />

            <FormField
              label="Altura média (m)"
              type="number"
              {...register("altura_media_m")}
              error={errors.altura_media_m}
            />

            <FormSelect
              label="Época de floração"
              {...register("epoca_floracao")}
              error={errors.epoca_floracao}
              options={enumOptions.epoca_floracao}
            />

            <FormTextArea
              label="Importância ecológica"
              {...register("importancia_ecologica")}
              error={errors.importancia_ecologica}
            />
          </FormSection>

          <FormSection
            title="Características"
            icon={<Leaf />}
            onAction={() => addCaracteristica("")}
          >
            <FormArray
              fields={caracteristicasFields}
              register={register}
              name="caracteristicas"
              errors={errors.caracteristicas}
              onRemove={removeCaracteristica}
            />
          </FormSection>

          <FormSection
            title="Conservação"
            icon={<Leaf />}
            onAction={() => addConservacao("")}
          >
            <FormArray
              fields={conservacaoFields}
              register={register}
              name="conservacao"
              errors={errors.conservacao}
              onRemove={removeConservacao}
            />
          </FormSection>

          <ImageManager control={control} register={register} watch={watch} />

          <FormFooter
            isEdit={isEdit}
            isSubmitting={isSubmitting}
            onCancel={() => navigate("/admin/flora")}
            label="Flora"
          />
        </form>
      </main>
    </div>
  );
}
