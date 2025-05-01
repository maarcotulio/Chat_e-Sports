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
import { signIn } from "next-auth/react";

export function LoginForm({
  className,
  loginAction,
  ...props
}: React.ComponentProps<"div"> & {
  loginAction: (
    formData: FormData
  ) => Promise<null | undefined | { error: string } | { success: string }>;
}) {
  const { errors, register } = useLoginForm();

  const [, dispatchAction, isPending] = useActionState(
    async (_previousData: any, formData: FormData) => {
      const response = await loginAction(formData);

      if (response && "error" in response) {
        toast.error(response.error);
      }

      if (response && "success" in response) {
        toast.success(response.success);
        window.location.href = "/auth/login";
      }
    },
    null
  );

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Bem-vindo de volta</CardTitle>
          <CardDescription>Faça login com sua conta do Google</CardDescription>
        </CardHeader>
        <CardContent>
          <form action={dispatchAction} noValidate>
            <div className="grid gap-6">
              <div className="flex flex-col gap-4">
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={(e) => {
                    e.preventDefault();
                    signIn("google");
                  }}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <path
                      d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
                      fill="currentColor"
                    />
                  </svg>
                  Entrar com Google
                </Button>
              </div>
              <div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
                <span className="bg-card text-muted-foreground relative z-10 px-2">
                  Ou continue com
                </span>
              </div>
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
