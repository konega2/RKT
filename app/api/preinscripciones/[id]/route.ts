import { NextResponse } from "next/server";
import { Categoria, EstadoPiloto } from "@prisma/client";
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
      internalNotes?: string;
      pilotStatus?: "active" | "pending_payment" | "inactive";
      pilotCategory?: "Junior" | "Senior" | "Master" | null;
      competitiveNotes?: string;
    };

    if (!body.fullName || !body.phone || !body.identityNumber || !body.eventAge) {
      return NextResponse.json({ ok: false, message: "Datos incompletos." }, { status: 400 });
    }

    const pilotStatusMap: Record<NonNullable<typeof body.pilotStatus>, EstadoPiloto> = {
      active: EstadoPiloto.ACTIVO,
      pending_payment: EstadoPiloto.PENDIENTE_PAGO,
      inactive: EstadoPiloto.BAJA
    };

    const pilotCategoryMap: Record<Exclude<NonNullable<typeof body.pilotCategory>, null>, Categoria> = {
      Junior: Categoria.Junior,
      Senior: Categoria.Senior,
      Master: Categoria.Master
    };

    const updated = await prisma.preInscripcion.update({
      where: { id: params.id },
      data: {
        nombre: body.fullName.trim(),
        telefono: body.phone.trim(),
        identidad: body.identityNumber.trim(),
        edad: Number(body.eventAge),
        email: body.email?.trim() ?? "",
        observaciones: body.internalNotes?.trim() ?? null,
        estadoPiloto: body.pilotStatus ? pilotStatusMap[body.pilotStatus] : undefined,
        categoria:
          body.pilotCategory === null
            ? null
            : body.pilotCategory
              ? pilotCategoryMap[body.pilotCategory]
              : undefined,
        notasCompetitivas: body.competitiveNotes?.trim() ?? null
      }
    });

    return NextResponse.json({ ok: true, item: updated });
  } catch {
    return NextResponse.json({ ok: false, message: "No se pudo editar la preinscripción." }, { status: 500 });
  }
}
