import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";

export async function DELETE(
  request: Request,
  { params }: { params: { userId: string; groupId: string } }
) {
  const supabase = await createClient();

  const { error } = await supabase.auth.getUser();

  if (error) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  const { userId, groupId } = await params;

  const group = await prisma.group.findUnique({
    where: {
      id: groupId,
    },
  });

  if (!group) {
    return NextResponse.json({ error: "Group not found" }, { status: 404 });
  }

  const isAdmin = group.admin === userId;

  if (!isAdmin) {
    await prisma.groupMember.delete({
      where: {
        userId_groupId: {
          userId,
          groupId,
        },
      },
    });

    return NextResponse.json({ message: "Group left" }, { status: 200 });
  }

  await prisma.group.delete({
    where: {
      id: groupId,
    },
  });

  return NextResponse.json({ message: "Group deleted" }, { status: 200 });
}
