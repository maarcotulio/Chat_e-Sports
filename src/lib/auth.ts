import { loginFormSchema } from "@/schemas/auth";
import { compare } from "bcryptjs";
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";

export const { auth, signIn, signOut } = NextAuth({
  session: {
    strategy: "jwt",
  },
  providers: [
    Credentials({
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        const { success, data } = loginFormSchema.safeParse(credentials);

        if (!success) {
          return null;
        }

        return {
          id: "1",
          email: "teste@teste.com",
          name: "Teste",
        };
      },
    }),
  ],
});
