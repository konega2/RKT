import { NextResponse } from "next/server";
import { Estado, Prisma } from "@prisma/client";
import { isValidPhoneNumber, validatePhoneNumberLength } from "libphonenumber-js";
import { isAdminAuthenticated } from "@/lib/adminAuth";
import { getDashboardPayload } from "@/lib/preinscripcionesService";
import { prisma } from "@/lib/prisma";

function isDbUnavailableError(error: unknown) {
  return (
    error instanceof Prisma.PrismaClientInitializationError ||
    (error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P1001")
  );
}

export async function GET() {
  try {
    if (!isAdminAuthenticated()) {
      return NextResponse.json({ ok: false, message: "No autorizado." }, { status: 401 });
    }

    const payload = await getDashboardPayload();
    return NextResponse.json({ ok: true, ...payload });
  } catch (error) {
    if (isDbUnavailableError(error)) {
      return NextResponse.json(
        { ok: false, message: "Base de datos no disponible temporalmente." },
        { status: 503 }
      );
    }

    return NextResponse.json({ ok: false, message: "Error al obtener preinscripciones." }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as {
      nombre?: string;
      telefono?: string;
      identidad?: string;
      edad?: number;
      email?: string;
      seguroAceptado?: boolean;
      imagenAceptada?: boolean;
      responsabilidad?: boolean;
    };

    if (!body.nombre || !body.telefono || !body.identidad || !body.edad) {
      return NextResponse.json({ ok: false, message: "Datos incompletos." }, { status: 400 });
    }

    if (!body.seguroAceptado || !body.imagenAceptada || !body.responsabilidad) {
      return NextResponse.json({ ok: false, message: "Debes aceptar todas las condiciones." }, { status: 400 });
    }

    const edad = Number(body.edad);
    if (!Number.isFinite(edad) || edad < 16 || edad > 90) {
      return NextResponse.json({ ok: false, message: "La edad debe estar entre 16 y 90 años." }, { status: 400 });
    }

    const phoneLengthValidation = validatePhoneNumberLength(body.telefono);
    if (phoneLengthValidation === "TOO_LONG") {
      return NextResponse.json(
        { ok: false, message: "El teléfono supera la longitud máxima permitida para ese país." },
        { status: 400 }
      );
    }

    if (!isValidPhoneNumber(body.telefono)) {
      return NextResponse.json({ ok: false, message: "Número de teléfono inválido." }, { status: 400 });
    }

    const created = await prisma.preInscripcion.create({
      data: {
        nombre: body.nombre.trim(),
        telefono: body.telefono.trim(),
        identidad: body.identidad.trim(),
        edad,
        email: body.email?.trim() ?? "",
        seguroAceptado: Boolean(body.seguroAceptado),
        imagenAceptada: Boolean(body.imagenAceptada),
        responsabilidad: Boolean(body.responsabilidad),
        estado: Estado.PENDIENTE
      }
    });

    return NextResponse.json({ ok: true, item: created }, { status: 201 });
  } catch (error) {
    if (isDbUnavailableError(error)) {
      return NextResponse.json(
        { ok: false, message: "Base de datos no disponible temporalmente." },
        { status: 503 }
      );
    }

    return NextResponse.json({ ok: false, message: "No se pudo registrar la preinscripción." }, { status: 500 });
  }
}
