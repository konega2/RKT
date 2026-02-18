import { NextResponse } from "next/server";
import { Estado, Prisma } from "@prisma/client";
import { parsePhoneNumber } from "libphonenumber-js";
import { prisma } from "@/lib/prisma";

type GooglePayload = {
  secret?: string;
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
  if (typeof value === "boolean") return value;

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
    console.log("---- GOOGLE FORM WEBHOOK ----");

    const body = (await request.json()) as GooglePayload;

    const expectedSecret = process.env.GOOGLE_FORMS_SECRET;
    const providedSecret = body.secret;

    console.log("Expected:", expectedSecret);
    console.log("Provided:", providedSecret);

    if (!expectedSecret || providedSecret !== expectedSecret) {
      return NextResponse.json(
        { ok: false, message: "No autorizado." },
        { status: 401 }
      );
    }

    const seguroAceptado = parseBoolean(body.seguroAceptado);
    const imagenAceptada = parseBoolean(body.imagenAceptada);
    const responsabilidad = parseBoolean(body.responsabilidad);

    const parsedEdad = Number(body.edad);
    const edad =
      Number.isFinite(parsedEdad) && parsedEdad >= 16 && parsedEdad <= 90
        ? parsedEdad
        : 18;

    const timestamp = Date.now();
    const nombre = body.nombre?.trim() || "Sin nombre (Google Form)";
    const identidad = body.identidad?.trim() || `SIN-ID-${timestamp}`;

    const rawTelefono = String(body.telefono ?? "").trim();
    let telefono = rawTelefono;

    try {
      if (telefono && !telefono.startsWith("+")) {
        const parsed = parsePhoneNumber(telefono, "ES");
        if (parsed?.isValid()) {
          telefono = parsed.number;
        }
      }
    } catch (e) {
      console.log("Teléfono inválido:", telefono);
    }

    if (!telefono) {
      telefono = `SIN-TELEFONO-${timestamp}`;
    }

    const created = await prisma.preInscripcion.create({
      data: {
        nombre,
        telefono,
        identidad,
        edad,
        email: body.email?.trim() ?? "",
        seguroAceptado,
        imagenAceptada,
        responsabilidad,
        estado: Estado.PENDIENTE
      }
    });

    console.log("Preinscripción creada:", created.id);

    return NextResponse.json(
      { ok: true, item: created },
      { status: 201 }
    );
  } catch (error) {
    console.error("ERROR EN WEBHOOK GOOGLE:", error);

    if (isDbUnavailableError(error)) {
      return NextResponse.json(
        { ok: false, message: "Base de datos no disponible temporalmente." },
        { status: 503 }
      );
    }

    return NextResponse.json(
      { ok: false, message: "No se pudo registrar la preinscripción." },
      { status: 500 }
    );
  }
}
