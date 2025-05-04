import { prisma } from "@/lib/prisma";
import { supabase } from "@/lib/supabase";
import { createClient } from "@/utils/supabase/server";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const supabase = await createClient();
  const { error } = await supabase.auth.getUser();

  if (error) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  const messages = await prisma.message.findMany({
    where: {
      groupId: req.nextUrl.searchParams.get("groupId") as string,
    },
    orderBy: { createdAt: "asc" },
    take: 100,
    include: {
      user: true,
    },
  });
  return NextResponse.json(messages);
}

export async function POST(req: NextRequest) {
  const supabase = await createClient();
  const { error } = await supabase.auth.getUser();

  if (error) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  const { content, groupId, userId, id } = await req.json();

  const newMessage = await prisma.message.create({
    data: { content, groupId, userId, id },
  });

  return NextResponse.json(newMessage);
}
