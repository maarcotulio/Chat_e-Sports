import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { createClient } from "@/utils/supabase/server";

export async function POST(
  req: Request,
  { params }: { params: { userId: string } }
) {
  try {
    const supabase = await createClient();
    const { error } = await supabase.auth.getUser();

    if (error) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const body = await req.json();
    const { name } = body;

    if (!name) {
      return new NextResponse("Name is required", { status: 400 });
    }

    const { userId } = await params;

    const group = await prisma.group.create({
      data: {
        name,
        lastMessage: "",
        members: {
          create: {
            userId: userId,
          },
        },
        admin: userId,
      },
      include: {
        members: true,
      },
    });

    return NextResponse.json(group);
  } catch (error) {
    return new NextResponse("Internal Error", { status: 500 });
  }
}
