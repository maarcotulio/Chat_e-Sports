import { loginFormSchema } from "@/schemas/auth";
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import Google from "next-auth/providers/google";
import { PrismaAdapter } from "@auth/prisma-adapter";
export const { handlers, signIn, signOut, auth } = NextAuth({
  session: {
    strategy: "jwt",
  },
  adapter: PrismaAdapter(prisma),
  providers: [
    Google,

    Credentials({
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const { success, data } = loginFormSchema.safeParse(credentials);

        if (!success) {
          return null;
        }

        const user = await prisma.user.findUnique({
          where: { email: data.email },
        });

        if (!user || !user.password) {
          return null;
        }

        const isPasswordValid = await bcrypt.compare(
          data.password,
          user.password
        );

        if (!isPasswordValid) {
          return null;
        }

        return {
          email: user.email,
          name: user.name,
          id: user.id,
        };
      },
    }),
  ],
});
