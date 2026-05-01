import * as z from "zod";

export const parkSchema = z.object({
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
  cachoeiras_relacionadas_ids: z
    .preprocess(
      (val) => (Array.isArray(val) ? val : val ? [val] : []),
      z.array(z.coerce.number())
    )
    .default([]),

  trilhas_relacionadas_ids: z
    .preprocess(
      (val) => (Array.isArray(val) ? val : val ? [val] : []),
      z.array(z.coerce.number())
    )
    .default([]),

  eventos_relacionados_ids: z
    .preprocess(
      (val) => (Array.isArray(val) ? val : val ? [val] : []),
      z.array(z.coerce.number())
    )
    .default([]),
  fotos_urls: z.array(z.string().url("Insira um link válido")).default([]),
});
