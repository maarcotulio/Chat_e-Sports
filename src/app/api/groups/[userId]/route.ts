import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { createClient } from "@/utils/supabase/server";

export async function POST(
  req: NextRequest,
  context: { params: { userId: string } }
) {
  try {
    const { userId } = context.params;

    const supabase = await createClient();
    const { error } = await supabase.auth.getUser();

    if (error) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const body = await req.json();
    const { name } = body;

    if (!name) {
      return NextResponse.json({ error: "Name is required" }, { status: 400 });
    }

    const group = await prisma.group.create({
      data: {
        name,
        lastMessage: "",
        admin: userId,
        members: {
          create: {
            userId,
          },
        },
      },
      include: {
        members: true,
      },
    });

    return NextResponse.json(group);
  } catch (error) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
