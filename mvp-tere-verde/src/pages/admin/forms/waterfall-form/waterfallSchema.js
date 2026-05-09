import * as z from "zod";

import { VALIDATION_MESSAGES as MSG } from "../../../../constants/validationMessages";

export const waterfallSchema = z.object({
  parque_id: z
    .union([
      z.literal(""),
      z.coerce.number().int().positive(),
    ])
    .transform((value) =>
      value === "" ? null : value
    )
    .nullable()
    .optional(),

  trilha_id: z
    .union([
      z.literal(""),
      z.coerce.number().int().positive(),
    ])
    .transform((value) =>
      value === "" ? null : value
    )
    .nullable()
    .optional(),

  ativo: z.boolean().default(true),

  nome: z
    .string()
    .min(3, MSG.MIN_CHARS("O nome", 3))
    .nonempty(MSG.REQUIRED("Nome")),

  descricao: z
    .string()
    .min(10, MSG.MIN_CHARS("A descrição", 10))
    .nonempty(MSG.REQUIRED("Descrição")),

  localizacao: z
    .string()
    .min(
      4,
      MSG.MIN_CHARS(
        "A localização deve ter pelo menos",
        4
      )
    )
    .nonempty(
      MSG.REQUIRED(
        "Você precisa fornecer a localização"
      )
    ),

  coordenadas: z.object({
    lat: z.coerce.number({
      invalid_type_error: MSG.REQUIRED("Lat."),
    }),

    lng: z.coerce.number({
      invalid_type_error: MSG.REQUIRED("Long."),
    }),
  }),

  caracteristicas: z.object({
    altura_queda_m: z.coerce
      .number()
      .positive(
        "A altura da queda deve ser maior que 0 e dada em metros"
      ),

    pode_banhar: z.boolean(),

    profundidade_max_poco_m: z.coerce
      .number()
      .positive(
        "A profundidade deve ser maior que 0 e dada em metros"
      ),
  }),

  seguranca: z.object({
    risco_tromba_dagua: z
      .string()
      .nonempty(
        MSG.SELECT_OPTION(
          "Risco de tromba d'água"
        )
      ),

    acesso_deficientes: z
      .boolean()
      .default(false),

    presenca_salvavidas: z
      .boolean()
      .default(false),
  }),

  fotos_urls: z.array(z.string()).default([]),
});