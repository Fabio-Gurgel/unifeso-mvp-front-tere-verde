import * as z from "zod";
import { VALIDATION_MESSAGES as MSG } from "../../../../constants/validationMessages";

export const eventSchema = z.object({
  nome: z
    .string()
    .min(3, MSG.MIN_CHARS("O nome deve ter pelo menos", 3))
    .nonempty(MSG.REQUIRED("Informe o nome do evento")),

  descricao: z
    .string()
    .min(10, MSG.MIN_CHARS("A descrição deve ter pelo menos", 10))
    .nonempty(MSG.REQUIRED("Descreva o evento")),

  ativo: z.boolean().default(true),
  parque_id: z.coerce.number().optional(),
  categoria: z.string().nonempty(MSG.SELECT_OPTION("categoria")),
  status: z.string().nonempty(MSG.SELECT_OPTION("status")),
  localizacao: z.string().nonempty(MSG.REQUIRED("Informe o local")),

  coordenadas: z.object({
    lat: z.coerce.number({ invalid_type_error: MSG.INVALID_NUMBER }),
    lng: z.coerce.number({ invalid_type_error: MSG.INVALID_NUMBER }),
  }),

  cronograma: z.object({
    data_inicio: z
      .string()
      .nonempty(MSG.REQUIRED("Data de início obrigatória")),
    data_fim: z.string().nonempty(MSG.REQUIRED("Data de fim obrigatória")),
    horario_inicio: z.string().nonempty(MSG.REQUIRED("Horário de início")),
    horario_fim: z.string().nonempty(MSG.REQUIRED("Horário de fim")),
  }),

  capacidade: z.object({
    maxima: z.coerce.number().min(1, "Capacidade mínima é 1"),
    vagas_disponiveis: z.coerce.number(),
    exige_inscricao: z.boolean().default(false),
  }),

  valor_entrada: z.coerce.number().min(0, "O valor não pode ser negativo"),

  organizador: z.object({
    nome: z.string().nonempty(MSG.REQUIRED("Nome do organizador")),
    contato: z
      .string()
      .email("E-mail inválido")
      .nonempty(MSG.REQUIRED("Contato obrigatório")),
  }),

  fotos_urls: z.array(z.string()).default([]),
});
