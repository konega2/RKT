import { NextResponse } from "next/server";
import { isAdminAuthenticated } from "@/lib/adminAuth";
import { prisma } from "@/lib/prisma";

type Params = {
  params: { id: string };
};

export async function PUT(request: Request, { params }: Params) {
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

    const updated = await comentarioClient.update({
      where: { id: params.id },
      data: { contenido: content }
    });

    return NextResponse.json({
      ok: true,
      item: {
        id: updated.id,
        pilotId: updated.pilotoId,
        content: updated.contenido,
        createdAt: updated.createdAt.toISOString()
      }
    });
  } catch {
    return NextResponse.json({ ok: false, message: "No se pudo editar el comentario." }, { status: 500 });
  }
}

export async function DELETE(_: Request, { params }: Params) {
  try {
    if (!isAdminAuthenticated()) {
      return NextResponse.json({ ok: false, message: "No autorizado." }, { status: 401 });
    }

    const comentarioClient = (prisma as unknown as { comentarioInterno: any }).comentarioInterno;
    await comentarioClient.delete({ where: { id: params.id } });
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false, message: "No se pudo eliminar el comentario." }, { status: 500 });
  }
}
