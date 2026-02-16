import { NextResponse } from "next/server";
import { Estado } from "@prisma/client";
import { isAdminAuthenticated } from "@/lib/adminAuth";
import { prisma } from "@/lib/prisma";

type Params = {
  params: { id: string };
};

export async function PATCH(_: Request, { params }: Params) {
  try {
    if (!isAdminAuthenticated()) {
      return NextResponse.json({ ok: false, message: "No autorizado." }, { status: 401 });
    }

    const updated = await prisma.preInscripcion.update({
      where: { id: params.id },
      data: { estado: Estado.CONFIRMADO }
    });

    return NextResponse.json({ ok: true, item: updated });
  } catch {
    return NextResponse.json({ ok: false, message: "No se pudo confirmar la preinscripción." }, { status: 500 });
  }
}
