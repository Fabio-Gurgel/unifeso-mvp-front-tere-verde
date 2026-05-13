import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";
import { waterfallSchema } from "./waterfallSchema";

import { Loader2, Info, Waves, MapPin, Shield } from "lucide-react";
import { toast } from "sonner";

import { FormField } from "../../../../components/form/form-field/FormField";
import { FormTextArea } from "../../../../components/form/form-text-area/FormTextArea";
import { FormSelect } from "../../../../components/form/form-select/FormSelect";
import { FormCheckbox } from "../../../../components/form/form-checkbox/FormCheckbox";
import { FormFooter } from "../../../../components/form/form-footer/FormFooter";
import { FormHeader } from "../../../../components/form/form-header/FormHeader";
import { FormSection } from "../../../../components/form/form-section/FormSection";
import { ImageManager } from "../../../../components/admin/image-manager/ImageManager";

import WaterfallService from "../../../../services/waterfallService";
import ParkService from "../../../../services/parkService";
import TrailService from "../../../../services/trailService";
import EnumService from "../../../../services/enumService";
const mapToOptions = (arr = []) =>
  arr.map((item) => ({
    value: item,
    label: item
      .toLowerCase()
      .replace(/_/g, " ")
      .replace(/(^|\s)\S/g, (l) => l.toUpperCase()),
  }));

export function WaterfallForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = Boolean(id);

  const [loading, setLoading] = useState(true);

  const [parkOptions, setParkOptions] = useState([]);

  const [trailOptions, setTrailOptions] = useState([]);

  const [enumOptions, setEnumOptions] = useState({
    risco_tromba_dagua: [],
  });

  const {
    register,
    handleSubmit,
    control,
    reset,
    watch,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(waterfallSchema),

    defaultValues: {
      parque_id: null,
      trilha_id: null,

      ativo: true,

      nome: "",
      descricao: "",
      localizacao: "",

      coordenadas: {
        lat: "",
        lng: "",
      },

      caracteristicas: {
        altura_queda_m: "",
        pode_banhar: false,
        profundidade_max_poco_m: "",
      },

      seguranca: {
        risco_tromba_dagua: "BAIXO",
        acesso_deficientes: false,
        presenca_salvavidas: false,
      },

      fotos_urls: [],
    },
  });

  const loadEnums = async () => {
    try {
      const enums = await EnumService.getAll();

      setEnumOptions({
        risco_tromba_dagua: mapToOptions(enums.risco_tromba_dagua),
      });
    } catch (error) {
      console.error(error);

      toast.error("Erro ao carregar opções");
    }
  };

  useEffect(() => {
    const init = async () => {
      try {
        setLoading(true);

        await loadEnums();

        const [parks, trails] = await Promise.all([
          ParkService.getAll(),
          TrailService.getAll(),
        ]);

        setParkOptions([
          {
            value: "",
            label: "Nenhum parque",
          },

          ...parks.map((park) => ({
            value: String(park.id),
            label: park.nome,
          })),
        ]);

        setTrailOptions([
          {
            value: "",
            label: "Nenhuma trilha",
          },

          ...trails.map((trail) => ({
            value: String(trail.id),
            label: trail.nome,
          })),
        ]);

        if (isEdit) {
          const waterfall = await WaterfallService.getById(id);

          reset({
            ...waterfall,

            parque_id: waterfall.parque_id ?? "",
            trilha_id: waterfall.trilha_id ?? "",

            fotos_urls: waterfall.fotos_urls || [],
          });
        }
      } catch (error) {
        console.error(error);

        toast.error("Erro ao carregar dados");
      } finally {
        setLoading(false);
      }
    };

    init();
  }, [id, isEdit, reset]);

  const onSubmit = async (data) => {
    try {
      const payload = {
        ...data,

        parque_id: data.parque_id === "" ? null : Number(data.parque_id),

        trilha_id: data.trilha_id === "" ? null : Number(data.trilha_id),
      };

      if (isEdit) {
        await WaterfallService.update(id, payload);
      } else {
        await WaterfallService.create(payload);
      }

      toast.success("Cachoeira salva com sucesso!");

      navigate("/admin/cachoeiras");
    } catch (error) {
      console.error(error);

      toast.error("Erro ao salvar cachoeira");
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
        backPath="/admin/cachoeiras"
        title="Cachoeira"
        isEdit={isEdit}
        gender="f"
      />

      <main className="max-w-5xl mx-auto px-6 mt-8">
        <form
          onSubmit={handleSubmit(onSubmit, (errors) => console.log(errors))}
          className="space-y-6"
        >
          <FormSection title="Geral" icon={<Info />}>
            <FormField label="Nome" {...register("nome")} error={errors.nome} />

            <FormTextArea
              label="Descrição"
              {...register("descricao")}
              error={errors.descricao}
            />

            <FormField
              label="Localização"
              {...register("localizacao")}
              error={errors.localizacao}
            />

            <FormCheckbox label="Ativo" {...register("ativo")} />
          </FormSection>

          <FormSection title="Localização" icon={<MapPin />}>
            <FormSelect
              label="Parque"
              {...register("parque_id")}
              options={parkOptions}
              error={errors.parque_id}
            />

            <FormSelect
              label="Trilha"
              {...register("trilha_id")}
              options={trailOptions}
              error={errors.trilha_id}
            />
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
          </FormSection>

          <FormSection title="Características" icon={<Waves />}>
            <FormCheckbox
              label="Banho"
              {...register("caracteristicas.pode_banhar")}
            />

            <FormField
              label="Altura da queda (m)"
              type="number"
              step="any"
              {...register("caracteristicas.altura_queda_m", {
                valueAsNumber: true,
              })}
              error={errors.caracteristicas?.altura_queda_m}
            />

            <FormField
              label="Profundidade máxima (m)"
              type="number"
              step="any"
              {...register("caracteristicas.profundidade_max_poco_m", {
                valueAsNumber: true,
              })}
              error={errors.caracteristicas?.profundidade_max_poco_m}
            />
          </FormSection>

          <FormSection title="Informações de Segurança" icon={<Shield />}>
            <FormSelect
              label="Risco de tromba d'água"
              {...register("seguranca.risco_tromba_dagua")}
              options={enumOptions.risco_tromba_dagua}
              error={errors.seguranca?.risco_tromba_dagua}
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormCheckbox
                label="Acesso para deficientes"
                {...register("seguranca.acesso_deficientes")}
              />

              <FormCheckbox
                label="Salva-vidas disponível"
                {...register("seguranca.presenca_salvavidas")}
              />
            </div>
          </FormSection>

          <ImageManager control={control} register={register} watch={watch} />

          <FormFooter
            isEdit={isEdit}
            isSubmitting={isSubmitting}
            onCancel={() => navigate("/admin/cachoeiras")}
            label="Cachoeira"
          />
        </form>
      </main>
    </div>
  );
}
