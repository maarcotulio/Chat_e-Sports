import { RegisterForm } from "../components/registerForm";
import { registerFormSchema } from "@/schemas/auth";
import { signIn } from "next-auth/react";

export default function Register() {
  async function registerAction(formData: FormData) {
    "use server";

    const { success, data } = registerFormSchema.safeParse(
      Object.fromEntries(formData)
    );

    if (!success) {
      return null;
    }

    const { email, password } = data;

    // try {
    //   await signIn("credentials", {
    //     email,
    //     password,
    //     redirectTo: "/",
    //   });
    // } catch (error) {
    //   return {
    //     error: "Something went wrong. Try again.",
    //   };
    // }
  }

  return (
    <div className="flex min-h-svh flex-col items-center justify-center gap-6 bg-muted p-6 md:p-10">
      <div className="flex w-full max-w-sm flex-col gap-6">
        <RegisterForm registerAction={registerAction} />
      </div>
    </div>
  );
}
