import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { createClient } from "@/utils/supabase/server";
import { v4 as uuidv4 } from "uuid";

export async function POST(req: Request) {
  const supabase = await createClient();
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    return NextResponse.json({ error: "Sem permissão" }, { status: 401 });
  }

  const formData = await req.formData();
  const file = formData.get("file") as File;
  const userId = formData.get("userId") as string;
  const groupId = formData.get("groupId") as string;

  if (!file || !userId) {
    return NextResponse.json(
      { error: "Erro na autenticação" },
      { status: 400 }
    );
  }

  if (groupId) {
    const group = await prisma.group.findUnique({
      where: { id: groupId },
    });

    if (!group) {
      return NextResponse.json(
        { error: "Grupo não encontrado" },
        { status: 404 }
      );
    }

    if (group.admin !== userId) {
      return NextResponse.json(
        { error: "Você não tem permissão para alterar o avatar do grupo" },
        { status: 403 }
      );
    }
  }

  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);
  const ext = file.name.split(".").pop();
  const fileName = `${uuidv4()}.${ext}`;

  const { error: uploadError } = await supabase.storage
    .from("avatar")
    .upload(fileName, buffer, {
      contentType: file.type,
      upsert: true,
    });

  if (uploadError) {
    return NextResponse.json(
      { error: "Erro ao salvar avatar", details: uploadError.message },
      { status: 500 }
    );
  }

  const { data: publicUrlData } = supabase.storage
    .from("avatar")
    .getPublicUrl(fileName);

  const avatarUrl = publicUrlData.publicUrl;

  if (groupId) {
    await prisma.group.update({
      where: { id: groupId },
      data: { icon: avatarUrl },
    });
  } else {
    await prisma.user.update({
      where: { id: userId },
      data: { image: avatarUrl },
    });
  }

  return NextResponse.json({ avatarUrl });
}
