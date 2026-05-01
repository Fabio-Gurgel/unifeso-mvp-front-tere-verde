import { useState, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router";
import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";
import { parkSchema } from "./parkSchema";

import {
  ArrowLeft,
  Info,
  MapPin,
  Route,
  Waves,
  Calendar,
  Activity,
  Loader2,
} from "lucide-react";
import { toast } from "sonner";

import { RelationshipCard } from "../../../../components/admin/relationship-card/RelationshipCard";
import { ImageManager } from "../../../../components/admin/image-manager/ImageManager";

import { FormField } from "../../../../components/inputs/form-field/FormField";
import { FormTextArea } from "../../../../components/inputs/form-text-area/FormTextArea";
import { FormSelect } from "../../../../components/inputs/form-select/FormSelect";
import { FormCheckbox } from "../../../../components/inputs/form-checkbox/FormCheckbox";
import { FormFooter } from "../../../../components/inputs/form-footer/FormFooter";
import { FormSection } from "../../../../components/inputs/form-section/FormSection"; // Certifique-se de que o path está correto

import ParkService from "../../../../services/parkService";
import WaterfallService from "../../../../services/waterfallService";
import TrailService from "../../../../services/trailService";
import EventService from "../../../../services/eventService";

export function ParkForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = Boolean(id);

  const [loading, setLoading] = useState(true);
  const [options, setOptions] = useState({
    waterfalls: [],
    trails: [],
    events: [],
  });

  const {
    register,
    handleSubmit,
    reset,
    control,
    watch,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(parkSchema),
    defaultValues: {
      ativo: true,
      coordenadas: { lat: 0, lng: 0 },
      area_total_ha: 0,
      altitude_max_m: 0,
      visitacao_anual: 0,
      quantidade_mirantes: 0,
      tempo_medio_visita_h: 0,
      distancia_estacionamento_min: 0,
      fotos_urls: [],
      horario_operacao: { abertura: "08:00", fechamento: "18:00" },
    },
  });

  const refreshRelationshipOptions = async () => {
    try {
      const [wf, tr, ev] = await Promise.all([
        WaterfallService.getAll(),
        TrailService.getAll(),
        EventService.getAll(),
      ]);
      setOptions({ waterfalls: wf, trails: tr, events: ev });
    } catch (error) {
      console.error("Erro ao atualizar listas:", error);
    }
  };

  useEffect(() => {
    const loadInitialData = async () => {
      setLoading(true);
      await refreshRelationshipOptions();

      if (isEdit) {
        try {
          const park = await ParkService.getById(id);
          reset({
            ...park,
            cachoeiras_relacionadas_ids:
              park.cachoeiras_relacionadas_ids?.map((id) => id.toString()) ||
              [],
            trilhas_relacionadas_ids:
              park.trilhas_relacionadas_ids?.map((id) => id.toString()) || [],
            eventos_relacionados_ids:
              park.eventos_relacionados_ids?.map((id) => id.toString()) || [],
            fotos_urls: park.fotos_urls || [],
          });
        } catch (error) {
          console.error("Erro ao carregar parque:", error);
          toast.error("Erro ao carregar o parque.");
        }
      }
      setLoading(false);
    };
    loadInitialData();
  }, [id, isEdit, reset]);

  useEffect(() => {
    const onFocus = () => refreshRelationshipOptions();
    window.addEventListener("focus", onFocus);
    return () => window.removeEventListener("focus", onFocus);
  }, []);

  const onSubmit = async (data) => {
    try {
      isEdit
        ? await ParkService.update(id, data)
        : await ParkService.create(data);
      toast.success(isEdit ? "Parque atualizado!" : "Parque cadastrado!");
      navigate("/admin/parques");
    } catch (error) {
      console.error(error);
      toast.error("Erro ao salvar.");
    }
  };

  if (loading)
    return (
      <div className="flex h-screen items-center justify-center">
        <Loader2 className="animate-spin size-8 text-neutral-400" />
      </div>
    );

  return (
    <div className="min-h-screen bg-neutral-50 pb-20">
      <header className="bg-white border-b border-neutral-200 sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center gap-4">
          <Link
            to="/admin/parques"
            className="p-2 hover:bg-neutral-100 rounded-lg"
          >
            <ArrowLeft className="size-5 text-neutral-600" />
          </Link>
          <h1 className="text-lg font-semibold text-neutral-900">
            {isEdit ? "Editar Parque" : "Novo Parque"}
          </h1>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-6 mt-8">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* 1. INFORMAÇÕES BÁSICAS */}
          <FormSection
            title="Geral"
            icon={<Info />}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            <div className="md:col-span-2">
              <FormField
                label="Nome"
                {...register("nome")}
                placeholder="Ex: Parque Nacional da Serra dos Órgãos"
                error={errors.nome}
              />
            </div>
            <div className="md:col-span-2">
              <FormTextArea
                label="Descrição"
                {...register("descricao")}
                placeholder="Ex: Área de preservação ambiental com diversas trilhas, cachoeiras e bioma predominante de Cerrado..."
                error={errors.descricao}
              />
            </div>
            <FormSelect
              label="Bioma"
              {...register("bioma")}
              error={errors.bioma}
              options={[
                { value: "MATA_ATLANTICA", label: "Mata Atlântica" },
                { value: "AMAZONIA", label: "Amazônia" },
                { value: "CERRADO", label: "Cerrado" },
              ]}
            />
            <FormSelect
              label="Dificuldade de acesso"
              {...register("dificuldade_acesso")}
              error={errors.dificuldade_acesso}
              options={[
                { value: "FACIL", label: "Fácil" },
                { value: "MÉDIO", label: "Médio" },
                { value: "DIFICIL", label: "Difícil" },
              ]}
            />
          </FormSection>

          {/* 2. DADOS TÉCNICOS */}
          <FormSection
            title="Dados técnicos"
            icon={<Activity />}
            className="grid grid-cols-2 md:grid-cols-3 gap-6"
          >
            <FormField
              label="Área (HA)"
              type="number"
              step="0.01"
              {...register("area_total_ha")}
              error={errors.area_total_ha}
            />
            <FormField
              label="Altitude máxima (M)"
              type="number"
              step="0.01"
              {...register("altitude_max_m")}
              error={errors.altitude_max_m}
            />
            <FormField
              label="Tempo médio de visitação (Hrs)"
              type="number"
              step="0.1"
              {...register("tempo_medio_visita_h")}
              error={errors.tempo_medio_visita_h}
            />
            <FormField
              label="Qtd. de mirantes"
              type="number"
              {...register("quantidade_mirantes")}
              error={errors.quantidade_mirantes}
            />
            <FormField
              label="Distância do estacionamento (min)"
              type="number"
              {...register("distancia_estacionamento_min")}
              error={errors.distancia_estacionamento_min}
            />
            <FormField
              label="Visitação anual"
              type="number"
              {...register("visitacao_anual")}
              error={errors.visitacao_anual}
            />
          </FormSection>

          {/* 3. LOCALIZAÇÃO E OPERAÇÃO */}
          <FormSection
            title="Localização e horários"
            icon={<MapPin />}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            <div className="md:col-span-2">
              <FormField
                label="Endereço"
                {...register("localizacao")}
                error={errors.localizacao}
                placeholder="Rua, número, bairro..."
              />
            </div>
            <div className="flex items-center">
              <FormCheckbox
                label="Parque ativo"
                {...register("ativo")}
                error={errors.ativo}
              />
            </div>
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
            <div className="flex flex-col gap-1">
              <label className="block text-sm font-medium text-neutral-700 mb-1">
                Horário de Funcionamento
              </label>
              <div className="flex items-start gap-4">
                <div className="flex-1">
                  <FormField
                    type="time"
                    {...register("horario_operacao.abertura")}
                    error={errors.horario_operacao?.abertura}
                  />
                </div>
                <div className="flex-1">
                  <FormField
                    type="time"
                    {...register("horario_operacao.fechamento")}
                    error={errors.horario_operacao?.fechamento}
                  />
                </div>
              </div>
            </div>
          </FormSection>

          {/* 4. RELACIONAMENTOS */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <RelationshipCard
              title="Cachoeiras"
              icon={<Waves className="size-5 text-green-700"/>}
              options={options.waterfalls}
              register={register}
              name="cachoeiras_relacionadas_ids"
              createPath="/admin/cachoeiras/novo"
            />
            <RelationshipCard
              title="Trilhas"
              icon={<Route className="size-5 text-green-700"/>}
              options={options.trails}
              register={register}
              name="trilhas_relacionadas_ids"
              createPath="/admin/trilhas/novo"
            />
            <RelationshipCard
              title="Eventos"
              icon={<Calendar className="size-5 text-green-700"/>}
              options={options.events}
              register={register}
              name="eventos_relacionados_ids"
              createPath="/admin/eventos/novo"
            />
          </div>

          <ImageManager control={control} register={register} watch={watch} />

          <FormFooter
            isEdit={isEdit}
            isSubmitting={isSubmitting}
            onCancel={() => navigate("/admin/parques")}
            label="Parque"
          />
        </form>
      </main>
    </div>
  );
}
