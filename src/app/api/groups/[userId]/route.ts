import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

export async function POST(
  req: Request,
  { params }: { params: { userId: string } }
) {
  try {
    const session = await auth();

    if (!session) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const body = await req.json();
    const { name } = body;

    if (!name) {
      return new NextResponse("Name is required", { status: 400 });
    }

    const { userId } = params;

    const group = await prisma.group.create({
      data: {
        name,
        icon: "👥",
        lastMessage: "",
        members: {
          create: {
            userId: userId,
          },
        },
      },
      include: {
        members: true,
      },
    });

    return NextResponse.json(group);
  } catch (error) {
    console.log("[GROUPS_POST]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
