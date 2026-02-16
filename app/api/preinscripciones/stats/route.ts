import { NextResponse } from "next/server";
import { Estado, Prisma } from "@prisma/client";
import { prisma } from "@/lib/prisma";

const TOTAL_SLOTS = 96;

function isDbUnavailableError(error: unknown) {
  return (
    error instanceof Prisma.PrismaClientInitializationError ||
    (error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P1001")
  );
}

export async function GET() {
  try {
    const confirmed = await prisma.preInscripcion.count({
      where: {
        estado: Estado.CONFIRMADO
      }
    });

    const available = Math.max(0, TOTAL_SLOTS - confirmed);
    const occupancyPercent = Math.min(100, Number(((confirmed / TOTAL_SLOTS) * 100).toFixed(1)));

    return NextResponse.json({
      ok: true,
      totalSlots: TOTAL_SLOTS,
      confirmed,
      available,
      occupancyPercent
    });
  } catch (error) {
    if (isDbUnavailableError(error)) {
      return NextResponse.json(
        { ok: false, message: "Base de datos no disponible temporalmente." },
        { status: 503 }
      );
    }

    return NextResponse.json({ ok: false, message: "No se pudieron obtener las plazas." }, { status: 500 });
  }
}
