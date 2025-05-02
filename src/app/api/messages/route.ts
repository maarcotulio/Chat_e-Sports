import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const session = await auth();

  if (!session) {
    return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
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
