import * as z from "zod";
import { VALIDATION_MESSAGES as MSG } from "../../../../constants/validationMessages";

export const parkSchema = z.object({
  nome: z
    .string()
    .min(3, MSG.MIN_CHARS("O nome", 3))
    .nonempty(MSG.REQUIRED("Nome")),

  descricao: z
    .string()
    .min(10, MSG.MIN_CHARS("A descrição", 10))
    .nonempty(MSG.REQUIRED("Descrição")),

  localizacao: z.string().nonempty(MSG.REQUIRED("O endereço")),

  bioma: z.string().nonempty(MSG.SELECT_OPTION("bioma")),

  dificuldade_acesso: z
    .string()
    .nonempty(MSG.SELECT_OPTION("dificuldade de acesso")),

  ativo: z.boolean().default(true),

  area_total_ha: z.coerce
    .number({ invalid_type_error: MSG.INVALID_NUMBER })
    .min(0.1, MSG.GREATER_THAN("A área total", 0)),

  altitude_max_m: z.coerce
    .number({ invalid_type_error: MSG.INVALID_NUMBER })
    .min(1, MSG.GREATER_THAN("A altitude máxima", 0)),

  visitacao_anual: z.coerce
    .number({ invalid_type_error: MSG.INVALID_NUMBER })
    .min(1, MSG.GREATER_THAN("A visitação anual", 0)),

  quantidade_mirantes: z.coerce
    .number({ invalid_type_error: MSG.INVALID_NUMBER })
    .min(0, MSG.MIN_VALUE("A quantidade de mirantes", 0)),

  tempo_medio_visita_h: z.coerce
    .number({ invalid_type_error: MSG.INVALID_NUMBER })
    .min(0.1, MSG.GREATER_THAN("O tempo médio de visitação", 0)),

  distancia_estacionamento_min: z.coerce
    .number({ invalid_type_error: MSG.INVALID_NUMBER })
    .min(0, MSG.MIN_VALUE("A distância do estacionamento", 0)),

  coordenadas: z.object({
    lat: z.coerce.number({ invalid_type_error: MSG.REQUIRED("Lat.") }),
    lng: z.coerce.number({ invalid_type_error: MSG.REQUIRED("Long.") }),
  }),

  horario_operacao: z.object({
    abertura: z.string().nonempty(MSG.REQUIRED("Hora de abertura")),
    fechamento: z.string().nonempty(MSG.REQUIRED("Hora de fechamento")),
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

  fotos_urls: z.array(z.string()).default([])
});
