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
import { useLoginForm } from "./useLoginForm";
import { useActionState } from "react";
import { toast } from "react-toastify";
import { LoaderCircle } from "lucide-react";
import { createClient } from "@/utils/supabase/client";

export function LoginForm({
  className,
  loginAction,
  ...props
}: React.ComponentProps<"div"> & {
  loginAction: (
    formData: FormData
  ) => Promise<null | undefined | { error: string } | { accessToken: string }>;
}) {
  const { errors, register } = useLoginForm();
  const supabase = createClient();
  const [, dispatchAction, isPending] = useActionState(
    async (_previousData: any, formData: FormData) => {
      const response = await loginAction(formData);

      if (response && "error" in response) {
        toast.error(response.error);
      }
    },
    null
  );

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Bem-vindo de volta</CardTitle>
          <CardDescription>Faça login com seu email e senha</CardDescription>
        </CardHeader>
        <CardContent>
          <form action={dispatchAction} noValidate>
            <div className="grid gap-6">
              <div className="grid gap-6">
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
                <div className="grid gap-3">
                  <div className="flex items-center">
                    <Label htmlFor="password">Senha</Label>
                    <a
                      href="#"
                      className="ml-auto text-sm underline-offset-4 hover:underline"
                    >
                      Esqueceu sua senha?
                    </a>
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
                    "Login"
                  )}
                </Button>
              </div>
              <div className="text-center text-sm">
                Não tem uma conta?{" "}
                <a
                  href="/auth/register"
                  className="underline underline-offset-4"
                >
                  Crie uma conta
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
