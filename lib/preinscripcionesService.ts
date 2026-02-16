import { Estado, PreInscripcion } from "@prisma/client";
import { DashboardStats, PreRegistrationRecord } from "./adminTypes";
import { prisma } from "./prisma";

const TOTAL_SLOTS = 96;

export function mapPreInscripcionToRecord(item: PreInscripcion): PreRegistrationRecord {
  return {
    id: item.id,
    fullName: item.nombre,
    phone: item.telefono,
    identityNumber: item.identidad,
    eventAge: item.edad,
    email: item.email,
    createdAt: item.createdAt.toISOString(),
    status: item.estado === Estado.CONFIRMADO ? "confirmed" : "pending"
  };
}

export function calcStats(items: PreRegistrationRecord[]): DashboardStats {
  const total = items.length;
  const confirmed = items.filter((item) => item.status === "confirmed").length;
  const pending = total - confirmed;
  const occupancyPercent = Math.min(100, Number(((confirmed / TOTAL_SLOTS) * 100).toFixed(1)));

  return {
    total,
    confirmed,
    pending,
    occupancyPercent
  };
}

export async function listPreInscripciones() {
  const items = await prisma.preInscripcion.findMany({
    orderBy: {
      createdAt: "desc"
    }
  });

  return items.map(mapPreInscripcionToRecord);
}

export async function getDashboardPayload() {
  const items = await listPreInscripciones();
  return {
    items,
    stats: calcStats(items)
  };
}
