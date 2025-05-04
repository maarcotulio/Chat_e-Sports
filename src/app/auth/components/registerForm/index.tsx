"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/app/auth/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/app/auth/components/ui/card";
import { Input } from "@/app/auth/components/ui/input";
import { Label } from "@/app/auth/components/ui/label";
import { useActionState } from "react";
import { toast } from "react-toastify";
import { LoaderCircle } from "lucide-react";
import { useRegisterForm } from "./useRegisterForm";
import { signIn } from "next-auth/react";
import { redirect } from "next/navigation";

export function RegisterForm({
  className,
  registerAction,
  ...props
}: React.ComponentProps<"div"> & {
  registerAction: (
    formData: FormData
  ) => Promise<null | undefined | { error: string } | { success: string }>;
}) {
  const { errors, register } = useRegisterForm();

  const [, dispatchAction, isPending] = useActionState(
    async (_previousData: any, formData: FormData) => {
      const response = await registerAction(formData);

      if (response && "error" in response) {
        toast.error(response.error);
      }

      if (response && "success" in response) {
        toast.success(response.success);
        redirect("/auth/login");
      }
    },
    null
  );

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Crie uma conta</CardTitle>
          <CardDescription>
            Crie uma conta com sua conta do Google
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form action={dispatchAction} noValidate>
            <div className="grid gap-6">
              <div className="grid gap-3">
                <Label htmlFor="name">Nome</Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="Nome"
                  error={errors.name?.message}
                  required
                  {...register("name")}
                />
              </div>
              <div className="grid gap-3">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  error={errors.email?.message}
                  required
                  {...register("email")}
                />
              </div>
              <div className="grid gap-6">
                <div className="grid gap-3">
                  <div className="flex items-center">
                    <Label htmlFor="password">Senha</Label>
                  </div>
                  <Input
                    id="password"
                    type="password"
                    error={errors.password?.message}
                    required
                    {...register("password")}
                  />
                </div>
                <Button type="submit" className="w-full" disabled={isPending}>
                  {isPending ? (
                    <LoaderCircle className="animate-spin" />
                  ) : (
                    "Criar conta"
                  )}
                </Button>
              </div>
              <div className="text-center text-sm">
                Já tem uma conta?{" "}
                <a href="/auth/login" className="underline underline-offset-4">
                  Login
                </a>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
      <div className="text-muted-foreground *:[a]:hover:text-primary text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4">
        Ao continuar, você concorda com nossos <a href="#">Termos de Serviço</a>{" "}
        e <a href="#">Política de Privacidade</a>.
      </div>
    </div>
  );
}
