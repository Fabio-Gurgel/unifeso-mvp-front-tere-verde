import { useState, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  ArrowLeft,
  Save,
  X,
  Loader2,
  Info,
  MapPin,
  ListTree,
  Waves,
  Calendar,
  Clock,
  Activity,
} from "lucide-react";
import { toast } from "sonner";

// Services
import ParkService from "../../../../services/parkService";
import WaterfallService from "../../../../services/waterfallService";
import TrailService from "../../../../services/trailService";
import EventService from "../../../../services/eventService";

const parkSchema = z.object({
  nome: z.string().min(3, "Nome obrigatório"),
  descricao: z.string().min(10, "Descrição obrigatória"),
  ativo: z.boolean(),
  localizacao: z.string().min(5, "Localização obrigatória"),
  coordenadas: z.object({
    lat: z.coerce.number(),
    lng: z.coerce.number(),
  }),
  area_total_ha: z.coerce.number().min(0),
  altitude_max_m: z.coerce.number().min(0),
  visitacao_anual: z.coerce.number().min(0),
  quantidade_mirantes: z.coerce.number().min(0),
  bioma: z.string(),
  dificuldade_acesso: z.string(),
  tempo_medio_visita_h: z.coerce.number().min(0),
  distancia_estacionamento_min: z.coerce.number().min(0),
  horario_operacao: z.object({
    abertura: z.string(),
    fechamento: z.string(),
  }),
  cachoeiras_relacionadas_ids: z.array(z.number()).default([]),
  trilhas_relacionadas_ids: z.array(z.number()).default([]),
  eventos_relacionados_ids: z.array(z.number()).default([]),
});

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
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(parkSchema),
    defaultValues: {
      ativo: true,
      coordenadas: { lat: 0, lng: 0 },
      horario_operacao: { abertura: "08:00", fechamento: "18:00" },
    },
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [wf, tr, ev] = await Promise.all([
          WaterfallService.getAll(),
          TrailService.getAll(),
          EventService.getAll(),
        ]);
        setOptions({ waterfalls: wf, trails: tr, events: ev });

        if (isEdit) {
          const park = await ParkService.getById(id);
          reset(park);
        }
      } catch (error) {
        console.error(error);
        toast.error("Erro ao carregar dados.");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id, isEdit, reset]);

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
          <div className="bg-white rounded-xl border border-neutral-200 shadow-sm overflow-hidden">
            <div className="p-4 border-b border-neutral-100 bg-neutral-50/50">
              <h2 className="text-xs font-bold text-neutral-900 uppercase flex items-center gap-2">
                <Info className="size-4" /> Geral
              </h2>
            </div>
            <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-neutral-700 mb-1">
                  Nome Oficial
                </label>
                <input
                  {...register("nome")}
                  className="w-full px-4 py-2 border border-neutral-300 rounded-lg outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent transition-all"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-neutral-700 mb-1">
                  Descrição
                </label>
                <textarea
                  {...register("descricao")}
                  rows={3}
                  className="w-full px-4 py-2 border border-neutral-300 rounded-lg outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent transition-all"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-1">
                  Bioma
                </label>
                <select
                  {...register("bioma")}
                  className="w-full px-4 py-2 border border-neutral-300 rounded-lg outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent transition-all"
                >
                  <option value="MATA_ATLANTICA">Mata Atlântica</option>
                  <option value="AMAZONIA">Amazônia</option>
                  <option value="CERRADO">Cerrado</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-1">
                  Dificuldade de Acesso
                </label>
                <select
                  {...register("dificuldade_acesso")}
                  className="w-full px-4 py-2 border border-neutral-300 rounded-lg outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent transition-all"
                >
                  <option value="FACIL">Fácil</option>
                  <option value="MODERADO">Moderado</option>
                  <option value="DIFICIL">Difícil</option>
                </select>
              </div>
            </div>
          </div>

          {/* 2. DADOS TÉCNICOS */}
          <div className="bg-white rounded-xl border border-neutral-200 shadow-sm overflow-hidden">
            <div className="p-4 border-b border-neutral-100 bg-neutral-50/50">
              <h2 className="text-xs font-bold text-neutral-900 uppercase flex items-center gap-2">
                <Activity className="size-4" /> Dados Técnicos
              </h2>
            </div>
            <div className="p-6 grid grid-cols-2 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-1">
                  Área (HA)
                </label>
                <input
                  type="number"
                  {...register("area_total_ha")}
                  className="w-full px-4 py-2 border border-neutral-300 rounded-lg outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent transition-all"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-1">
                  Alt. Máxima (M)
                </label>
                <input
                  type="number"
                  {...register("altitude_max_m")}
                  className="w-full px-4 py-2 border border-neutral-300 rounded-lg outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent transition-all"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-1">
                  Tempo Visita (H)
                </label>
                <input
                  type="number"
                  {...register("tempo_medio_visita_h")}
                  className="w-full px-4 py-2 border border-neutral-300 rounded-lg outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent transition-all"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-1">
                  Mirantes
                </label>
                <input
                  type="number"
                  {...register("quantidade_mirantes")}
                  className="w-full px-4 py-2 border border-neutral-300 rounded-lg outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent transition-all"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-1">
                  Distância do estacionamento (min)
                </label>
                <input
                  type="number"
                  {...register("distancia_estacionamento_min")}
                  className="w-full px-4 py-2 border border-neutral-300 rounded-lg outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent transition-all"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-1">
                  Visitação anual
                </label>
                <input
                  type="number"
                  {...register("visitacao_anual")}
                  className="w-full px-4 py-2 border border-neutral-300 rounded-lg outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent transition-all"
                />
              </div>
            </div>
          </div>

          {/* 3. LOCALIZAÇÃO E OPERAÇÃO */}
          <div className="bg-white rounded-xl border border-neutral-200 shadow-sm overflow-hidden">
            <div className="p-4 border-b border-neutral-100 bg-neutral-50/50">
              <h2 className="text-xs font-bold text-neutral-900 uppercase flex items-center gap-2">
                <MapPin className="size-4" /> Localização & Horários
              </h2>
            </div>
            <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-neutral-700 mb-1">
                  Endereço Completo
                </label>
                <input
                  {...register("localizacao")}
                  className="w-full px-4 py-2 border border-neutral-300 rounded-lg outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent transition-all"
                />
              </div>
              <div className="flex items-center gap-3 pt-6">
                <input
                  type="checkbox"
                  {...register("ativo")}
                  className="size-4 accent-green-600 cursor-pointer"
                />
                <span className="text-sm font-medium text-neutral-700">
                  Parque Ativo
                </span>
              </div>
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-1 text-neutral-400">
                  Latitude
                </label>
                <input
                  type="number"
                  step="any"
                  {...register("coordenadas.lat")}
                  className="w-full px-4 py-2 border border-neutral-300 rounded-lg outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent transition-all"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-1 text-neutral-400">
                  Longitude
                </label>
                <input
                  type="number"
                  step="any"
                  {...register("coordenadas.lng")}
                  className="w-full px-4 py-2 border border-neutral-300 rounded-lg outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent transition-all"
                />
              </div>
              <div className="flex items-center gap-4">
                <div>
                  <label className="block text-xs font-bold text-neutral-700 flex items-center gap-1">
                    <Clock className="size-3" /> Abre às
                  </label>
                  <input
                    type="time"
                    {...register("horario_operacao.abertura")}
                    className="w-full px-4 py-2 border border-neutral-300 rounded-lg outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent transition-all"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-neutral-700 flex items-center gap-1">
                    <Clock className="size-3" /> Fecha às
                  </label>
                  <input
                    type="time"
                    {...register("horario_operacao.fechamento")}
                    className="w-full px-4 py-2 border border-neutral-300 rounded-lg outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent transition-all"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* 4. RELACIONAMENTOS */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <RelationshipCard
              title="Cachoeiras"
              icon={<Waves className="size-4" />}
              options={options.waterfalls}
              register={register}
              name="cachoeiras_relacionadas_ids"
            />
            <RelationshipCard
              title="Trilhas"
              icon={<ListTree className="size-4" />}
              options={options.trails}
              register={register}
              name="trilhas_relacionadas_ids"
            />
            <RelationshipCard
              title="Eventos"
              icon={<Calendar className="size-4" />}
              options={options.events}
              register={register}
              name="eventos_relacionados_ids"
            />
          </div>

          {/* FOOTER ACTIONS */}
          <div className="flex items-center justify-end gap-4 pt-10">
            <button
              type="button"
              onClick={() => navigate("/admin/parques")}
              className="px-6 py-2 border rounded-lg font-medium hover:bg-neutral-100 transition-all flex items-center gap-2 text-neutral-600"
            >
              <X className="size-4" /> Cancelar
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-10 py-2 bg-green-700 hover:bg-green-800 text-white rounded-lg font-medium transition-all flex items-center gap-2"
            >
              {isSubmitting ? (
                <Loader2 className="size-4 animate-spin" />
              ) : (
                <Save className="size-4" />
              )}
              {isEdit ? "Salvar Alterações" : "Cadastrar Parque"}
            </button>
          </div>
        </form>
      </main>
    </div>
  );
}

// Subcomponente para os cards de relação para não repetir código
function RelationshipCard({ title, icon, options, register, name }) {
  return (
    <div className="bg-white rounded-xl border border-neutral-200 shadow-sm flex flex-col h-64">
      <div className="p-4 border-b border-neutral-100 bg-neutral-50/50">
        <h3 className="text-xs font-bold text-neutral-900 uppercase flex items-center gap-2">
          {icon} {title}
        </h3>
      </div>
      <div className="p-4 overflow-y-auto flex-1 space-y-2">
        {options.map((opt) => (
          <label
            key={opt.id}
            className="flex items-center gap-3 p-2 hover:bg-neutral-50 rounded-lg cursor-pointer transition-colors group"
          >
            <input
              type="checkbox"
              value={opt.id}
              {...register(name)}
              className="size-4 accent-green-600 cursor-pointer"
            />
            <span className="text-sm text-neutral-600 group-hover:text-black">
              {opt.nome}
            </span>
          </label>
        ))}
        {options.length === 0 && (
          <p className="text-xs text-neutral-400 italic py-4 text-center">
            Nenhum registro disponível
          </p>
        )}
      </div>
    </div>
  );
}
