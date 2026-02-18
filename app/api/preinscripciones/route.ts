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
  void request;
  return NextResponse.json(
    {
      ok: false,
      message: "La preinscripción desde la web está deshabilitada. Usa el formulario oficial de Google."
    },
    { status: 410 }
  );
}
