import { NextResponse } from "next/server";
import { isAdminAuthenticated } from "@/lib/adminAuth";
import { prisma } from "@/lib/prisma";

type Params = {
  params: { id: string };
};

export async function GET(_: Request, { params }: Params) {
  try {
    if (!isAdminAuthenticated()) {
      return NextResponse.json({ ok: false, message: "No autorizado." }, { status: 401 });
    }

    const comentarioClient = (prisma as unknown as { comentarioInterno: any }).comentarioInterno;

    const items = await comentarioClient.findMany({
      where: { pilotoId: params.id },
      orderBy: { createdAt: "desc" }
    });

    return NextResponse.json({
      ok: true,
      items: items.map((item: { id: string; pilotoId: string; contenido: string; createdAt: Date }) => ({
        id: item.id,
        pilotId: item.pilotoId,
        content: item.contenido,
        createdAt: item.createdAt.toISOString()
      }))
    });
  } catch {
    return NextResponse.json({ ok: false, message: "No se pudieron obtener los comentarios." }, { status: 500 });
  }
}

export async function POST(request: Request, { params }: Params) {
  try {
    if (!isAdminAuthenticated()) {
      return NextResponse.json({ ok: false, message: "No autorizado." }, { status: 401 });
    }

    const body = (await request.json()) as { content?: string };
    const content = body.content?.trim();

    if (!content) {
      return NextResponse.json({ ok: false, message: "El comentario no puede estar vacío." }, { status: 400 });
    }

    const comentarioClient = (prisma as unknown as { comentarioInterno: any }).comentarioInterno;

    const created = await comentarioClient.create({
      data: {
        pilotoId: params.id,
        contenido: content
      }
    });

    return NextResponse.json({
      ok: true,
      item: {
        id: created.id,
        pilotId: created.pilotoId,
        content: created.contenido,
        createdAt: created.createdAt.toISOString()
      }
    });
  } catch {
    return NextResponse.json({ ok: false, message: "No se pudo crear el comentario." }, { status: 500 });
  }
}
