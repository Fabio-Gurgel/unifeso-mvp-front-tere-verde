import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { useForm, useFieldArray } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";
import { faunaSchema } from "./faunaSchema";

import {
  Loader2,
  Info,
  PawPrint,
  TriangleAlert,
  MapPin,
  List,
} from "lucide-react";
import { toast } from "sonner";

import { FormField } from "../../../../components/form/form-field/FormField";
import { FormTextArea } from "../../../../components/form/form-text-area/FormTextArea";
import { FormSelect } from "../../../../components/form/form-select/FormSelect";
import { FormCheckbox } from "../../../../components/form/form-checkbox/FormCheckbox";
import { FormFooter } from "../../../../components/form/form-footer/FormFooter";
import { FormHeader } from "../../../../components/form/form-header/FormHeader";
import { FormSection } from "../../../../components/form/form-section/FormSection";
import { FormArray } from "../../../../components/form/form-array/FormArray";
import { ImageManager } from "../../../../components/admin/image-manager/ImageManager";

import FaunaService from "../../../../services/faunaService";
import ParkService from "../../../../services/parkService";
import EnumService from "../../../../services/enumService";

const mapToOptions = (arr = []) =>
  arr.map((item) => ({
    value: item,
    label: item
      .toLowerCase()
      .replace(/_/g, " ")
      .replace(/(^|\s)\S/g, (l) => l.toUpperCase()),
  }));

export function FaunaForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = Boolean(id);

  const [loading, setLoading] = useState(true);

  const [options, setOptions] = useState({
    status_conservacao: [],
    parques: [],
  });

  const {
    register,
    handleSubmit,
    control,
    reset,
    watch,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(faunaSchema),
    defaultValues: {
      fotos_urls: [],
      conservacao: [""],
      parque_ids: [],
    },
  });

  const {
    fields: conservacaoFields,
    append: addConservacao,
    remove: removeConservacao,
  } = useFieldArray({
    control,
    name: "conservacao",
  });

  const loadOptions = async () => {
    try {
      const enums = await EnumService.getAll();
      const parques = await ParkService.getAll();

      setOptions({
        status_conservacao: mapToOptions(enums.status_conservacao),
        parques,
      });
    } catch (error) {
      console.error(error);
      toast.error("Erro ao carregar enums");
    }
  };

  useEffect(() => {
    const init = async () => {
      setLoading(true);

      await loadOptions();

      if (isEdit) {
        try {
          const fauna = await FaunaService.getById(id);

          reset({
            ...fauna,
            parque_ids: fauna.parque_ids
              ? fauna.parque_ids.map((id) => String(id))
              : [],
            conservacao: fauna.conservacao?.length ? fauna.conservacao : [""],
            fotos_urls: fauna.fotos_urls || [],
          });
        } catch (error) {
          console.error(error);
          toast.error("Erro ao carregar fauna");
        }
      }

      setLoading(false);
    };

    init();
  }, [id, isEdit, reset]);

  const onSubmit = async (data) => {
    try {
      const payload = {
        ...data,
        parque_ids: data.parque_ids?.map(Number) || [],
      };

      if (isEdit) {
        await FaunaService.update(id, payload);
      } else {
        await FaunaService.create(payload);
      }

      toast.success("Salvo com sucesso!");
      navigate("/admin/fauna");
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
        backPath="/admin/fauna"
        title="Fauna"
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

            <FormTextArea
              label="Descrição"
              {...register("descricao")}
              error={errors.descricao}
            />
          </FormSection>

          <FormSection
            title="Informações básicas de conservação"
            icon={<TriangleAlert />}
          >
            <FormSelect
              label="Status de conservação"
              {...register("status_conservacao")}
              error={errors.status_conservacao}
              options={options.status_conservacao}
            />

            <FormTextArea
              label="Importância ecológica"
              {...register("importancia_ecologica")}
              error={errors.importancia_ecologica}
            />
          </FormSection>

          <FormSection
            title="Onde encontrar"
            icon={<MapPin className="size-5 text-green-700" />}
          >
            <div className="space-y-2 max-h-56 overflow-y-auto p-1 bg-white">
              {options.parques.map((opt) => (
                <div
                  key={opt.id}
                  className="p-3 hover:bg-green-50 rounded-xl transition-colors"
                >
                  <FormCheckbox
                    value={String(opt.id)}
                    label={opt.nome}
                    {...register("parque_ids")}
                  />
                </div>
              ))}
            </div>
          </FormSection>

          <FormSection title="Vida e Comportamento" icon={<PawPrint />}>
            <FormField
              label="Habitat"
              {...register("habitat")}
              error={errors.habitat}
            />

            <FormField
              label="Hábitos"
              {...register("habitos")}
              error={errors.habitos}
            />

            <FormField
              label="Alimentação"
              {...register("alimentacao")}
              error={errors.alimentacao}
            />
          </FormSection>

          <FormSection
            title="Medidas de conservação"
            icon={<List />}
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
            onCancel={() => navigate("/admin/fauna")}
            label="Fauna"
          />
        </form>
      </main>
    </div>
  );
}
