import * as z from "zod";
import { VALIDATION_MESSAGES as MSG } from "../../../../constants/validationMessages";

export const trailSchema = z.object({
  nome: z
    .string()
    .min(3, MSG.MIN_CHARS("O nome deve ter pelo menos", 3))
    .nonempty(MSG.REQUIRED("Informe o nome da trilha")),

  descricao: z
    .string()
    .min(10, MSG.MIN_CHARS("A descrição deve ter pelo menos", 10))
    .nonempty(MSG.REQUIRED("Descreva a trilha")),

  ativo: z.boolean().default(true),
  parque_id: z.coerce.number().optional(),
  cachoeiras_relacionadas_ids: z
    .preprocess(
      (val) => (Array.isArray(val) ? val : val ? [val] : []),
      z.array(z.coerce.number())
    )
    .default([]),
  localizacao: z.string().nonempty(MSG.REQUIRED("Informe o local de início")),

  coordenadas: z.object({
    lat: z.coerce.number({ invalid_type_error: MSG.INVALID_NUMBER }),
    lng: z.coerce.number({ invalid_type_error: MSG.INVALID_NUMBER }),
  }),

  dificuldade: z.string().nonempty(MSG.SELECT_OPTION("dificuldade")),
  tipo_percurso: z.string().nonempty(MSG.SELECT_OPTION("tipo de percurso")),

  distancia_total_m: z.coerce
    .number()
    .min(1, "A distância deve ser maior que 0"),

  tempo_estimado_min: z.coerce.number().min(1, "O tempo deve ser maior que 0"),

  ganho_elevacao_m: z.coerce
    .number()
    .min(0, "O ganho de elevação não pode ser negativo"),

  exige_guia: z.boolean().default(false),
  fotos_urls: z.array(z.string()).default([]),
});
