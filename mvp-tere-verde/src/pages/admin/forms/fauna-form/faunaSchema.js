import * as z from "zod";
import { VALIDATION_MESSAGES as MSG } from "../../../../constants/validationMessages";

export const faunaSchema = z.object({
  nome_popular: z
    .string()
    .min(3, MSG.MIN_CHARS("O nome popular precisa ser maior", 3))
    .nonempty(MSG.REQUIRED("Nome popular precisa ser preenchido")),

  nome_cientifico: z
    .string()
    .min(3, MSG.MIN_CHARS("O nome científico precisa ser maior", 3))
    .nonempty(MSG.REQUIRED("Nome científico precisa ser preenchido")),

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

  conservacao: z
    .array(z.string().min(2, MSG.MIN_CHARS("Conservação muito curta", 2)))
    .min(1, MSG.REQUIRED("Adicione pelo menos uma forma de conservação")),

  habitat: z
    .string()
    .min(10, MSG.MIN_CHARS("A descrição é muito curta", 10))
    .nonempty(MSG.REQUIRED("Descrição precisa ser preenchida")),

  habitos: z
    .string()
    .min(10, MSG.MIN_CHARS("A descrição é muito curta", 10))
    .nonempty(MSG.REQUIRED("Descrição precisa ser preenchida")),

  alimentacao: z
    .string()
    .min(10, MSG.MIN_CHARS("A descrição é muito curta", 10))
    .nonempty(MSG.REQUIRED("Descrição precisa ser preenchida")),

  fotos_urls: z.array(z.string()).default([]),
});
