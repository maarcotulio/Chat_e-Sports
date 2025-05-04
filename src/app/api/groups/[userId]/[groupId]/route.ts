import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";
import { NextRequest } from "next/server";

export async function DELETE(
  request: NextRequest,
  context: { params: { userId: string; groupId: string } }
) {
  const { userId, groupId } = context.params;

  const supabase = await createClient();
  const { error } = await supabase.auth.getUser();

  if (error) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  const group = await prisma.group.findUnique({
    where: { id: groupId },
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
    where: { id: groupId },
  });

  return NextResponse.json({ message: "Group deleted" }, { status: 200 });
}
