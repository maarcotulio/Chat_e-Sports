import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function getServerSession() {
  const supabase = createServerComponentClient({
    cookies,
  });

  const {
    data: { session },
    error,
  } = await supabase.auth.getSession();

  if (!session) {
    return {
      session: null,
      unauthorizedResponse: NextResponse.json(
        { error: "Não autorizado" },
        { status: 401 }
      ),
    };
  }

  return { session, supabase };
}
