import * as z from "zod";
import { VALIDATION_MESSAGES as MSG } from "../../../../constants/validationMessages";

export const faunaSchema = z.object({
  nome_popular: z
    .string()
    .min(3, MSG.MIN_CHARS("O nome popular deve ter pelo menos", 3))
    .nonempty(MSG.REQUIRED("Informe o nome popular da espécie")),

  nome_cientifico: z
    .string()
    .min(3, MSG.MIN_CHARS("O nome científico deve ter pelo menos", 3))
    .nonempty(MSG.REQUIRED("Informe o nome científico da espécie")),

  descricao: z
    .string()
    .min(10, MSG.MIN_CHARS("A descrição deve ter pelo menos", 10))
    .nonempty(MSG.REQUIRED("Descreva a espécie")),

  parque_ids: z.array(z.coerce.number()).default([]),

  status_conservacao: z
    .string()
    .nonempty(MSG.REQUIRED("Selecione o status de conservação")),

  importancia_ecologica: z
    .string()
    .min(10, MSG.MIN_CHARS("A importância ecológica deve ter pelo menos", 10))
    .nonempty(MSG.REQUIRED("Explique a importância ecológica da espécie")),

  conservacao: z
    .array(
      z.string().min(
        2,
        MSG.MIN_CHARS("Cada ação de conservação deve ter pelo menos", 2)
      )
    )
    .min(1, MSG.REQUIRED("Adicione pelo menos uma ação de conservação")),

  habitat: z
    .string()
    .min(6, MSG.MIN_CHARS("A descrição do habitat deve ter pelo menos", 6))
    .nonempty(MSG.REQUIRED("Informe o habitat da espécie")),

  habitos: z
    .string()
    .min(6, MSG.MIN_CHARS("A descrição dos hábitos deve ter pelo menos", 6))
    .nonempty(MSG.REQUIRED("Descreva os hábitos da espécie")),

  alimentacao: z
    .string()
    .min(10, MSG.MIN_CHARS("A alimentação deve ter pelo menos", 10))
    .nonempty(MSG.REQUIRED("Descreva a alimentação da espécie")),

  fotos_urls: z.array(z.string()).default([]),
});