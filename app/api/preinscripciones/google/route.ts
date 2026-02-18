import { NextResponse } from "next/server";
import { Estado, Prisma } from "@prisma/client";
import { isValidPhoneNumber, parsePhoneNumber, validatePhoneNumberLength } from "libphonenumber-js";
import { prisma } from "@/lib/prisma";

type GooglePayload = {
  nombre?: string;
  telefono?: string;
  identidad?: string;
  edad?: number | string;
  email?: string;
  seguroAceptado?: boolean | string;
  imagenAceptada?: boolean | string;
  responsabilidad?: boolean | string;
};

function isDbUnavailableError(error: unknown) {
  return (
    error instanceof Prisma.PrismaClientInitializationError ||
    (error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P1001")
  );
}

function parseBoolean(value: boolean | string | undefined) {
  if (typeof value === "boolean") {
    return value;
  }

  if (typeof value === "string") {
    const normalized = value.trim().toLowerCase();
    return [
      "true",
      "si",
      "sí",
      "yes",
      "1",
      "acepto",
      "ok",
      "de acuerdo",
      "estoy de acuerdo"
    ].includes(normalized);
  }

  return false;
}

export async function POST(request: Request) {
  try {
    const expectedSecret = process.env.GOOGLE_FORMS_SECRET;
    const providedSecret = request.headers.get("x-google-secret");

    if (!expectedSecret || providedSecret !== expectedSecret) {
      return NextResponse.json({ ok: false, message: "No autorizado." }, { status: 401 });
    }

    const body = (await request.json()) as GooglePayload;

    if (!body.nombre || !body.telefono || !body.identidad || body.edad === undefined || body.edad === null) {
      return NextResponse.json({ ok: false, message: "Datos incompletos." }, { status: 400 });
    }

    const seguroAceptado = parseBoolean(body.seguroAceptado);
    const imagenAceptada = parseBoolean(body.imagenAceptada);
    const responsabilidad = parseBoolean(body.responsabilidad);

    if (!seguroAceptado || !imagenAceptada || !responsabilidad) {
      return NextResponse.json({ ok: false, message: "Debes aceptar todas las condiciones." }, { status: 400 });
    }

    const edad = Number(body.edad);
    if (!Number.isFinite(edad) || edad < 16 || edad > 90) {
      return NextResponse.json({ ok: false, message: "La edad debe estar entre 16 y 90 años." }, { status: 400 });
    }

    const rawTelefono = String(body.telefono).trim();
    let telefono = rawTelefono;
    if (!telefono.startsWith("+")) {
      const parsed = parsePhoneNumber(telefono, "ES");
      if (parsed?.isValid()) {
        telefono = parsed.number;
      }
    }

    const phoneLengthValidation = validatePhoneNumberLength(telefono);
    if (phoneLengthValidation === "TOO_LONG") {
      return NextResponse.json(
        { ok: false, message: "El teléfono supera la longitud máxima permitida para ese país." },
        { status: 400 }
      );
    }

    if (!isValidPhoneNumber(telefono)) {
      return NextResponse.json({ ok: false, message: "Número de teléfono inválido." }, { status: 400 });
    }

    const created = await prisma.preInscripcion.create({
      data: {
        nombre: body.nombre.trim(),
        telefono,
        identidad: body.identidad.trim(),
        edad,
        email: body.email?.trim() ?? "",
        seguroAceptado,
        imagenAceptada,
        responsabilidad,
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