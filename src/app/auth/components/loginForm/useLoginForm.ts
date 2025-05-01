"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginFormSchema } from "@/schemas/auth";
type FormData = z.infer<typeof loginFormSchema>;

export function useLoginForm() {
  const {
    register,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(loginFormSchema),
    mode: "onChange",
  });

  return { register, errors };
}
