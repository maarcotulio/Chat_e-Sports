"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginFormSchema, registerFormSchema } from "@/schemas/auth";

type FormData = z.infer<typeof registerFormSchema>;

export function useRegisterForm() {
  const {
    register,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(registerFormSchema),
    mode: "onChange",
  });

  return { register, errors };
}
