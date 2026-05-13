import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { eventSchema } from "./eventSchema";

import {
  Loader2,
  Info,
  MapPin,
  Calendar,
  Users,
  Briefcase,
} from "lucide-react";
import { toast } from "sonner";

import { FormField } from "../../../../components/form/form-field/FormField";
import { FormTextArea } from "../../../../components/form/form-text-area/FormTextArea";
import { FormSelect } from "../../../../components/form/form-select/FormSelect";
import { FormCheckbox } from "../../../../components/form/form-checkbox/FormCheckbox";
import { FormFooter } from "../../../../components/form/form-footer/FormFooter";
import { FormHeader } from "../../../../components/form/form-header/FormHeader";
import { FormSection } from "../../../../components/form/form-section/FormSection";
import { ImageManager } from "../../../../components/admin/image-manager/ImageManager";

import EventService from "../../../../services/eventService";
import EnumService from "../../../../services/enumService";
import ParkService from "../../../../services/parkService";

const mapToOptions = (arr = []) =>
  arr.map((item) => {
    const value = typeof item === "object" ? item.id : item;
    const labelRaw = typeof item === "object" ? item.nome : item.toString();

    const label = labelRaw
      .toLowerCase()
      .replace(/_/g, " ")
      .replace(/(^|\s)\S/g, (l) => l.toUpperCase());

    return { value, label };
  });

export function EventsForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = Boolean(id);

  const [loading, setLoading] = useState(true);
  const [enumOptions, setEnumOptions] = useState({
    categorias: [],
    status: [],
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
    resolver: zodResolver(eventSchema),
    defaultValues: {
      ativo: true,
      capacidade: { exige_inscricao: false },
      fotos_urls: [],
    },
  });

  useEffect(() => {
    const init = async () => {
      setLoading(true);
      try {
        const [enums, parques] = await Promise.all([
          EnumService.getAll(),
          ParkService.getAll(),
        ]);

        setEnumOptions({
          categorias: mapToOptions(enums.categoria_evento),
          status: mapToOptions(enums.status_evento),
          parques: mapToOptions(parques),
        });

        if (isEdit) {
          const event = await EventService.getById(id);
          reset(event);
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
        await EventService.update(id, data);
      } else {
        await EventService.create(data);
      }
      toast.success("Evento salvo com sucesso!");
      navigate("/admin/eventos");
    } catch (error) {
      console.error("Erro ao salvar evento:", error);
      toast.error("Erro ao salvar evento.");
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
        backPath="/admin/eventos"
        title="Evento"
        isEdit={isEdit}
        gender="m"
      />

      <main className="max-w-5xl mx-auto px-6 mt-8">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <FormSection title="Informações Gerais" icon={<Info />}>
            <FormField
              label="Nome do Evento"
              {...register("nome")}
              error={errors.nome}
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormSelect
                label="Categoria"
                {...register("categoria")}
                options={enumOptions.categorias}
                error={errors.categoria}
              />
              <FormSelect
                label="Status"
                {...register("status")}
                options={enumOptions.status}
                error={errors.status}
              />
            </div>
            <FormTextArea
              label="Descrição"
              {...register("descricao")}
              error={errors.descricao}
            />
            <FormCheckbox label="Evento Ativo" {...register("ativo")} />
          </FormSection>

          <FormSection title="Localização" icon={<MapPin />}>
            <div className="grid grid-cols-2 gap-4">
              <FormSelect
                label="Parque"
                {...register("parque_id")}
                options={enumOptions.parques}
                error={errors.parque_id}
              />
              <FormField
                label="Nome do Local (ex: Mirante)"
                {...register("localizacao")}
                error={errors.localizacao}
              />
            </div>

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

          <FormSection title="Cronograma" icon={<Calendar />}>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <FormField
                label="Data Início"
                type="date"
                {...register("cronograma.data_inicio")}
                error={errors.cronograma?.data_inicio}
              />
              <FormField
                label="Data Fim"
                type="date"
                {...register("cronograma.data_fim")}
                error={errors.cronograma?.data_fim}
              />
              <FormField
                label="Hora Início"
                type="time"
                {...register("cronograma.horario_inicio")}
                error={errors.cronograma?.horario_inicio}
              />
              <FormField
                label="Hora Fim"
                type="time"
                {...register("cronograma.horario_fim")}
                error={errors.cronograma?.horario_fim}
              />
            </div>
          </FormSection>

          <FormSection title="Ingressos e Capacidade" icon={<Users />}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <FormField
                label="Capacidade Máxima"
                type="number"
                {...register("capacidade.maxima")}
                error={errors.capacidade?.maxima}
              />
              <FormField
                label="Vagas Disponíveis"
                type="number"
                {...register("capacidade.vagas_disponiveis")}
                error={errors.capacidade?.vagas_disponiveis}
              />
              <FormField
                label="Valor Entrada (R$)"
                type="number"
                step="0.01"
                {...register("valor_entrada")}
                error={errors.valor_entrada}
              />
            </div>
            <FormCheckbox
              label="Exige inscrição prévia"
              {...register("capacidade.exige_inscricao")}
            />
          </FormSection>

          <FormSection title="Organização" icon={<Briefcase />}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                label="Nome do Organizador"
                {...register("organizador.nome")}
                error={errors.organizador?.nome}
              />
              <FormField
                label="E-mail de Contato"
                {...register("organizador.contato")}
                error={errors.organizador?.contato}
              />
            </div>
          </FormSection>

          <ImageManager control={control} register={register} watch={watch} />

          <FormFooter
            isEdit={isEdit}
            isSubmitting={isSubmitting}
            onCancel={() => navigate("/admin/eventos")}
            label="Evento"
          />
        </form>
      </main>
    </div>
  );
}
