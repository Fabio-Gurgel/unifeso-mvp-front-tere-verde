import * as z from "zod";
import { VALIDATION_MESSAGES as MSG } from "../../../../constants/validationMessages";

export const floraSchema = z.object({
  nome_popular: z
    .string()
    .min(3, MSG.MIN_CHARS("O nome popular precisa ser maior", 3))
    .nonempty(MSG.REQUIRED("Nome popular precisa ser preenchido")),

  nome_cientifico: z
    .string()
    .min(3, MSG.MIN_CHARS("O nome científico precisa ser maior", 3))
    .nonempty(MSG.REQUIRED("Nome científico precisa ser preenchido")),

  tipo_flora: z.string().nonempty(MSG.SELECT_OPTION("tipo de flora")),

  familia: z
    .string()
    .min(3, MSG.MIN_CHARS("O nome científico da família precisa ser maior", 3))
    .nonempty(
      MSG.REQUIRED("Nome científico da família precisa ser preenchido")
    ),

  altura_media_m: z.coerce
    .number({ invalid_type_error: MSG.INVALID_NUMBER })
    .min(
      0,
      MSG.MIN_VALUE("A altura média em metros precisa ser maior que 0", 0)
    ),

  epoca_floracao: z
    .string()
    .nonempty(MSG.REQUIRED("Época de floração precisa ser selecionada")),

  uso_medicinal: z.boolean().default(false),

  descricao: z
    .string()
    .min(10, MSG.MIN_CHARS("A descrição é muito curta", 10))
    .nonempty(MSG.REQUIRED("Descrição precisa ser preenchida")),

  status_conservacao: z
    .string()
    .nonempty(MSG.REQUIRED("Status de conservação precisa ser selecionado")),

  importancia_ecologica: z
    .string()
    .min(10, MSG.MIN_CHARS("Importância ecológica é muito curta", 10))
    .nonempty(MSG.REQUIRED("Importância ecológica precisa ser preenchida")),

  caracteristicas: z
    .array(z.string().min(2, MSG.MIN_CHARS("Característica muito curta", 2)))
    .min(1, MSG.REQUIRED("Adicione pelo menos uma característica")),

  conservacao: z
    .array(z.string().min(2, MSG.MIN_CHARS("Conservação muito curta", 2)))
    .min(1, MSG.REQUIRED("Adicione pelo menos uma forma de conservação")),

  fotos_urls: z.array(z.string()).default([]),
});
