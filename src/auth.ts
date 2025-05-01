import { loginFormSchema } from "@/schemas/auth";
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { prisma } from "@/lib/prisma";
import GoogleProvider from "next-auth/providers/google";
import bcrypt from "bcryptjs";

export const { handlers, signIn, signOut, auth } = NextAuth({
  secret: process.env.AUTH_SECRET,
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/auth/login",
    error: "/auth/error",
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),

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

        if (!user) {
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
