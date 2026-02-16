import { NextResponse } from "next/server";
import { isAdminAuthenticated } from "@/lib/adminAuth";
import { prisma } from "@/lib/prisma";

type Params = {
  params: { id: string };
};

export async function DELETE(_: Request, { params }: Params) {
  try {
    if (!isAdminAuthenticated()) {
      return NextResponse.json({ ok: false, message: "No autorizado." }, { status: 401 });
    }

    await prisma.preInscripcion.delete({ where: { id: params.id } });
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false, message: "No se pudo eliminar la preinscripción." }, { status: 500 });
  }
}

export async function PUT(request: Request, { params }: Params) {
  try {
    if (!isAdminAuthenticated()) {
      return NextResponse.json({ ok: false, message: "No autorizado." }, { status: 401 });
    }

    const body = (await request.json()) as {
      fullName?: string;
      phone?: string;
      identityNumber?: string;
      eventAge?: number;
      email?: string;
    };

    if (!body.fullName || !body.phone || !body.identityNumber || !body.eventAge) {
      return NextResponse.json({ ok: false, message: "Datos incompletos." }, { status: 400 });
    }

    const updated = await prisma.preInscripcion.update({
      where: { id: params.id },
      data: {
        nombre: body.fullName.trim(),
        telefono: body.phone.trim(),
        identidad: body.identityNumber.trim(),
        edad: Number(body.eventAge),
        email: body.email?.trim() ?? ""
      }
    });

    return NextResponse.json({ ok: true, item: updated });
  } catch {
    return NextResponse.json({ ok: false, message: "No se pudo editar la preinscripción." }, { status: 500 });
  }
}
