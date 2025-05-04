import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";

export async function POST(
  request: Request,
  { params }: { params: { groupId: string; userId: string } }
) {
  const supabase = await createClient();
  const { error } = await supabase.auth.getUser();

  if (error) {
    return NextResponse.json(
      { error: "Usuário não encontrado" },
      { status: 404 }
    );
  }

  const { groupId, userId } = await params;
  const { email } = await request.json();
  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user) {
    return NextResponse.json("Usuário não encontrado", { status: 404 });
  }

  const group = await prisma.group.findUnique({
    where: { id: groupId },
    include: {
      members: true,
    },
  });

  if (!group) {
    return NextResponse.json("Grupo não encontrado", { status: 404 });
  }

  const isAdmin = group.admin === userId;

  if (!isAdmin) {
    return NextResponse.json("Não autorizado", { status: 401 });
  }

  const isMember = group.members.some((member) => member.userId === user.id);

  if (isMember) {
    return NextResponse.json("Usuário já está no grupo", { status: 400 });
  }

  await prisma.groupMember.create({
    data: {
      userId: user.id,
      groupId: groupId,
    },
  });

  return NextResponse.json("Usuário adicionado ao grupo", { status: 200 });
}
