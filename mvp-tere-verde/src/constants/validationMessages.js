export const VALIDATION_MESSAGES = {
  REQUIRED: (field) => `${field} é obrigatório(a)`,
  MIN_CHARS: (field, min) => `${field} deve ter pelo menos ${min} caracteres`,
  INVALID_NUMBER: "Informe um valor numérico válido",
  GREATER_THAN: (field, val) => `${field} deve ser maior que ${val}`,
  MIN_VALUE: (field, val) => `${field} deve ser de no mínimo ${val}`,
  INVALID_URL: "Link de imagem inválido",
  SELECT_OPTION: (field) => `Selecione um(a) ${field}`
};
