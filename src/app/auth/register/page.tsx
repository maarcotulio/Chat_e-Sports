import { prisma } from "@/lib/prisma";
import { RegisterForm } from "../components/registerForm";
import { registerFormSchema } from "@/schemas/auth";
import bcrypt from "bcryptjs";

export default function Register() {
  async function registerAction(formData: FormData) {
    "use server";

    const { success, data } = registerFormSchema.safeParse(
      Object.fromEntries(formData)
    );

    if (!success) {
      return null;
    }

    const { email, password, name } = data;

    const existingUser = await prisma.user.findUnique({ where: { email } });

    if (existingUser) {
      return { error: "Email já cadastrado" };
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name,
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
