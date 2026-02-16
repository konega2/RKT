import { NextResponse } from "next/server";
import { isValidPhoneNumber, validatePhoneNumberLength } from "libphonenumber-js";
import { isAdminAuthenticated } from "@/lib/adminAuth";
import { prisma } from "@/lib/prisma";

type Payload = {
  fullName?: string;
  phone?: string;
  identityNumber?: string;
  eventAge?: number;
  email?: string;
  insuranceAccepted?: boolean;
  imageAccepted?: boolean;
  liabilityAccepted?: boolean;
  mode?: "preinscripcion" | "piloto";
  pilotStatus?: "active" | "pending_payment" | "inactive";
  pilotCategory?: "Junior" | "Senior" | "Master" | null;
  internalNotes?: string;
  competitiveNotes?: string;
};

export async function POST(request: Request) {
  try {
    if (!isAdminAuthenticated()) {
      return NextResponse.json({ ok: false, message: "No autorizado." }, { status: 401 });
    }

    const body = (await request.json()) as Payload;

    if (!body.fullName || !body.phone || !body.identityNumber || !body.eventAge) {
      return NextResponse.json({ ok: false, message: "Datos incompletos." }, { status: 400 });
    }

    const edad = Number(body.eventAge);
    if (!Number.isFinite(edad) || edad < 16 || edad > 90) {
      return NextResponse.json({ ok: false, message: "La edad debe estar entre 16 y 90 años." }, { status: 400 });
    }

    const phoneLengthValidation = validatePhoneNumberLength(body.phone);
    if (phoneLengthValidation === "TOO_LONG") {
      return NextResponse.json(
        { ok: false, message: "El teléfono supera la longitud máxima permitida para ese país." },
        { status: 400 }
      );
    }

    if (!isValidPhoneNumber(body.phone)) {
      return NextResponse.json({ ok: false, message: "Número de teléfono inválido." }, { status: 400 });
    }

    const mode = body.mode === "piloto" ? "piloto" : "preinscripcion";

    const pilotStatusMap: Record<NonNullable<Payload["pilotStatus"]>, "ACTIVO" | "PENDIENTE_PAGO" | "BAJA"> = {
      active: "ACTIVO",
      pending_payment: "PENDIENTE_PAGO",
      inactive: "BAJA"
    };

    const pilotCategoryMap: Record<Exclude<NonNullable<Payload["pilotCategory"]>, null>, "Junior" | "Senior" | "Master"> = {
      Junior: "Junior",
      Senior: "Senior",
      Master: "Master"
    };

    const createData = {
      nombre: body.fullName.trim(),
      telefono: body.phone.trim(),
      identidad: body.identityNumber.trim(),
      edad,
      email: body.email?.trim() ?? "",
      seguroAceptado: Boolean(body.insuranceAccepted),
      imagenAceptada: Boolean(body.imageAccepted),
      responsabilidad: Boolean(body.liabilityAccepted),
      estado: mode === "piloto" ? "CONFIRMADO" : "PENDIENTE",
      confirmedAt: mode === "piloto" ? new Date() : null,
      confirmedBy: mode === "piloto" ? "RKT Admin" : null,
      estadoPiloto: body.pilotStatus ? pilotStatusMap[body.pilotStatus] : "ACTIVO",
      categoria:
        body.pilotCategory === null
          ? null
          : body.pilotCategory
            ? pilotCategoryMap[body.pilotCategory]
            : null,
      observaciones: body.internalNotes?.trim() || null,
      notasCompetitivas: body.competitiveNotes?.trim() || null
    };

    const created = await prisma.preInscripcion.create({
      data: createData as never
    });

    return NextResponse.json({ ok: true, item: created }, { status: 201 });
  } catch {
    return NextResponse.json({ ok: false, message: "No se pudo crear el registro manual." }, { status: 500 });
  }
}
