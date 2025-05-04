import { prisma } from "@/lib/prisma";
import { RegisterForm } from "../components/registerForm";
import { registerFormSchema } from "@/schemas/auth";
import { createClient } from "@/utils/supabase/server";

export default function Register() {
  async function registerAction(formData: FormData) {
    "use server";
    const supabase = await createClient();

    const { success, data } = registerFormSchema.safeParse(
      Object.fromEntries(formData)
    );

    if (!success) {
      return null;
    }

    const { email, password, name } = data;

    const userExists = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (userExists) {
      return { error: "Email já cadastrado" };
    }

    const { data: user, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      return { error: "Não foi possível criar o usuário" };
    }

    await prisma.user.create({
      data: {
        id: user.user?.id,
        email,
        name,
        image: user.user?.user_metadata.avatar_url || "",
      },
    });

    return { success: "Usuário criado com sucesso" };
  }

  return (
    <div className="flex min-h-svh flex-col items-center justify-center gap-6 bg-muted p-6 md:p-10">
      <div className="flex w-full max-w-sm flex-col gap-6">
        <RegisterForm registerAction={registerAction} />
      </div>
    </div>
  );
}
