import * as z from "zod";
import { VALIDATION_MESSAGES as MSG } from "../../../../constants/validationMessages";

export const floraSchema = z.object({
  nome_popular: z
    .string()
    .min(3, MSG.MIN_CHARS("O nome popular deve ter pelo menos", 3))
    .nonempty(MSG.REQUIRED("Informe o nome popular")),

  nome_cientifico: z
    .string()
    .min(3, MSG.MIN_CHARS("O nome científico deve ter pelo menos", 3))
    .nonempty(MSG.REQUIRED("Informe o nome científico")),

  parque_ids: z.array(z.coerce.number()).default([]),

  tipo_flora: z.string().nonempty(MSG.SELECT_OPTION("tipo de flora")),

  familia: z
    .string()
    .min(3, MSG.MIN_CHARS("O nome da família deve ter pelo menos", 3))
    .nonempty(MSG.REQUIRED("Informe a família botânica")),

  altura_media_m: z.coerce
    .number({ invalid_type_error: MSG.INVALID_NUMBER })
    .min(0, MSG.MIN_VALUE("A altura média deve ser maior que 0", 0)),

  epoca_floracao: z
    .string()
    .nonempty(MSG.REQUIRED("Selecione a época de floração")),

  uso_medicinal: z.boolean().default(false),

  descricao: z
    .string()
    .min(10, MSG.MIN_CHARS("A descrição deve ter pelo menos", 10))
    .nonempty(MSG.REQUIRED("Descreva a espécie")),

  status_conservacao: z
    .string()
    .nonempty(MSG.REQUIRED("Selecione o status de conservação")),

  importancia_ecologica: z
    .string()
    .min(10, MSG.MIN_CHARS("A importância ecológica deve ter pelo menos", 10))
    .nonempty(MSG.REQUIRED("Explique a importância ecológica")),

  caracteristicas: z
    .array(
      z
        .string()
        .min(2, MSG.MIN_CHARS("Cada característica deve ter pelo menos", 2))
    )
    .min(1, MSG.REQUIRED("Adicione pelo menos uma característica")),

  conservacao: z
    .array(
      z
        .string()
        .min(
          2,
          MSG.MIN_CHARS("Cada ação de conservação deve ter pelo menos", 2)
        )
    )
    .min(1, MSG.REQUIRED("Adicione pelo menos uma ação de conservação")),

  fotos_urls: z.array(z.string()).default([]),
});
