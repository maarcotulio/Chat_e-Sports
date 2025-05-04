import { LoginForm } from "@/app/auth/components/loginForm";
import { loginFormSchema } from "@/schemas/auth";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export default function LoginPage() {
  const loginAction = async (formData: FormData) => {
    "use server";
    const supabase = await createClient();

    const { success, data } = loginFormSchema.safeParse(
      Object.fromEntries(formData)
    );

    if (!success) {
      return null;
    }

    const { email, password } = data;

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      return { error: "Erro ao fazer login" };
    }

    redirect("/");
  };

  return (
    <div className="bg-muted flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
      <div className="flex w-full max-w-sm flex-col gap-6">
        <LoginForm loginAction={loginAction} />
      </div>
    </div>
  );
}
