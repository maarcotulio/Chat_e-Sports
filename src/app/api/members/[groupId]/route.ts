import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";

export async function GET(
  req: Request,
  { params }: { params: { groupId: string } }
) {
  const supabase = await createClient();
  const { error } = await supabase.auth.getUser();

  if (error) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  const { groupId } = await params;

  const group = await prisma.groupMember.findMany({
    where: {
      groupId: groupId,
    },
    include: {
      user: {
        select: {
          id: true,
          name: true,
          image: true,
        },
      },
    },
  });

  return NextResponse.json(group);
}
