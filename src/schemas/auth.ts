import { z } from "zod";

export const loginFormSchema = z.object({
  email: z.string().email().min(1, "Email é obrigatório"),
  password: z
    .string()
    .nonempty("Senha é obrigatória")
    .min(8, "Senha deve conter pelo menos 8 digitos"),
});

export const registerFormSchema = z.object({
  name: z.string().nonempty("Nome é obrigatório"),
  email: z
    .string()
    .nonempty("Email é obrigatório")
    .email("Use um email válido"),
  password: z
    .string()
    .nonempty("Senha é obrigatória")
    .min(8, "Senha deve conter pelo menos 8 digitos"),
});
