import { LoginForm } from "@/app/auth/components/loginForm";
import { signIn } from "@/auth";
export default function LoginPage() {
  const loginAction = async (formData: FormData) => {
    "use server";

    const { email, password } = Object.fromEntries(formData);
    try {
      const result = await signIn("credentials", {
        email,
        password,
        redirectTo: "/",
        redirect: false,
      });

      if (result?.error) {
        return { error: "Erro ao fazer login: " + result.error };
      }

      return { success: "Login realizado com sucesso" };
    } catch (error) {
      console.error("Unexpected error:", error);
      return { error: "Erro ao fazer login" };
    }
  };

  return (
    <div className="bg-muted flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
      <div className="flex w-full max-w-sm flex-col gap-6">
        <LoginForm loginAction={loginAction} />
      </div>
    </div>
  );
}
