import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { trailSchema } from "./trailSchema";

import { Loader2, Info, MapPin, Mountain, Route, Waves } from "lucide-react";
import { toast } from "sonner";

import { FormField } from "../../../../components/form/form-field/FormField";
import { FormTextArea } from "../../../../components/form/form-text-area/FormTextArea";
import { FormSelect } from "../../../../components/form/form-select/FormSelect";
import { FormCheckbox } from "../../../../components/form/form-checkbox/FormCheckbox";
import { FormFooter } from "../../../../components/form/form-footer/FormFooter";
import { FormHeader } from "../../../../components/form/form-header/FormHeader";
import { FormSection } from "../../../../components/form/form-section/FormSection";
import { ImageManager } from "../../../../components/admin/image-manager/ImageManager";

import TrailService from "../../../../services/trailService";
import EnumService from "../../../../services/enumService";
import ParkService from "../../../../services/parkService";
import waterfallService from "../../../../services/waterfallService";
import { RelationshipCard } from "../../../../components/admin/relationship-card/RelationshipCard";

const mapToOptions = (arr = []) =>
  arr.map((item) => ({
    value: typeof item === "object" ? item.id : item,
    label: (typeof item === "object" ? item.nome : item.toString())
      .toLowerCase()
      .replace(/_/g, " ")
      .replace(/(^|\s)\S/g, (l) => l.toUpperCase()),
  }));

export function TrailsForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = Boolean(id);
  const [loading, setLoading] = useState(true);

  const [enumOptions, setEnumOptions] = useState({
    dificuldade: [],
    tipo_percurso: [],
    parques: [],
    cachoeiras: [],
  });

  const {
    register,
    handleSubmit,
    control,
    reset,
    watch,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(trailSchema),
    defaultValues: {
      ativo: true,
      exige_guia: false,
      fotos_urls: [],
    },
  });

  useEffect(() => {
    const init = async () => {
      setLoading(true);
      try {
        const [enums, parques, cachoeiras] = await Promise.all([
          EnumService.getAll(),
          ParkService.getAll(),
          waterfallService.getAll(),
        ]);

        setEnumOptions({
          dificuldade: mapToOptions(enums.dificuldade_trilha),
          tipo_percurso: mapToOptions(enums.tipo_percurso),
          parques: mapToOptions(parques),
          cachoeiras: cachoeiras,
        });

        if (isEdit) {
          const trail = await TrailService.getById(id);
          reset({
            ...trail,
            cachoeiras_relacionadas_ids:
              trail.cachoeiras_relacionadas_ids?.map((id) => id.toString()) ||
              [],
          });
        }
      } catch (error) {
        console.error("Erro ao carregar dados.", error);
        toast.error("Erro ao carregar dados.");
      } finally {
        setLoading(false);
      }
    };
    init();
  }, [id, isEdit, reset]);

  const onSubmit = async (data) => {
    try {
      if (isEdit) {
        await TrailService.update(id, data);
      } else {
        await TrailService.create(data);
      }

      toast.success("Trilha salva com sucesso!");
      navigate("/admin/trilhas");
    } catch (error) {
      console.error("Erro ao salvar trilha.", error);
      toast.error("Erro ao salvar trilha.");
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
        backPath="/admin/trilhas"
        title="Trilha"
        isEdit={isEdit}
        gender="f"
      />

      <main className="max-w-5xl mx-auto px-6 mt-8">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <FormSection title="Geral" icon={<Info />}>
            <FormField
              label="Nome da Trilha"
              {...register("nome")}
              error={errors.nome}
            />
            <FormTextArea
              label="Descrição"
              {...register("descricao")}
              error={errors.descricao}
            />
            <FormCheckbox
              label="Trilha Ativa para visitação"
              {...register("ativo")}
            />
          </FormSection>

          <FormSection title="Espeficicações Técnicas" icon={<Mountain />}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <FormSelect
                label="Dificuldade"
                {...register("dificuldade")}
                options={enumOptions.dificuldade}
                error={errors.dificuldade}
              />
              <FormSelect
                label="Tipo de Percurso"
                {...register("tipo_percurso")}
                options={enumOptions.tipo_percurso}
                error={errors.tipo_percurso}
              />
              <FormField
                label="Distância Total (m)"
                type="number"
                {...register("distancia_total_m")}
                error={errors.distancia_total_m}
              />
              <FormField
                label="Tempo Estimado (min)"
                type="number"
                {...register("tempo_estimado_min")}
                error={errors.tempo_estimado_min}
              />
              <FormField
                label="Ganho de Elevação (m)"
                type="number"
                {...register("ganho_elevacao_m")}
                error={errors.ganho_elevacao_m}
              />
              <div className="flex items-end pb-3">
                <FormCheckbox label="Exige Guia" {...register("exige_guia")} />
              </div>
            </div>
          </FormSection>

          <FormSection title="Localização" icon={<MapPin />}>
            <FormField
              label="Ponto de Início"
              {...register("localizacao")}
              error={errors.localizacao}
            />
            <FormSelect
              label="Parque"
              {...register("parque_id")}
              options={enumOptions.parques}
              error={errors.parque_id}
            />
            <div className="grid grid-cols-2 gap-4">
              <FormField
                label="Latitude"
                type="number"
                step="any"
                {...register("coordenadas.lat")}
                error={errors.coordenadas?.lat}
              />
              <FormField
                label="Longitude"
                type="number"
                step="any"
                {...register("coordenadas.lng")}
                error={errors.coordenadas?.lng}
              />
            </div>
          </FormSection>

          <RelationshipCard
            title="Cachoeiras"
            icon={<Waves className="size-5 text-green-700" />}
            options={enumOptions.cachoeiras}
            register={register}
            name="cachoeiras_relacionadas_ids"
            createPath="/admin/cachoeiras/novo"
          />

          <ImageManager control={control} register={register} watch={watch} />

          <FormFooter
            isEdit={isEdit}
            isSubmitting={isSubmitting}
            onCancel={() => navigate("/admin/trilhas")}
            label="Trilha"
          />
        </form>
      </main>
    </div>
  );
}
