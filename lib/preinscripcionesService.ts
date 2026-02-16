import { Categoria, Estado, EstadoPiloto, PreInscripcion } from "@prisma/client";
import { DashboardStats, PreRegistrationRecord } from "./adminTypes";
import { prisma } from "./prisma";

const TOTAL_SLOTS = 96;

export function mapPreInscripcionToRecord(item: PreInscripcion): PreRegistrationRecord {
  const legalDocumentationStatus =
    item.seguroAceptado && item.imagenAceptada && item.responsabilidad ? "complete" : "incomplete";

  const pilotStatusMap: Record<EstadoPiloto, PreRegistrationRecord["pilotStatus"]> = {
    ACTIVO: "active",
    PENDIENTE_PAGO: "pending_payment",
    BAJA: "inactive"
  };

  const pilotCategoryMap: Record<Categoria, NonNullable<PreRegistrationRecord["pilotCategory"]>> = {
    Junior: "Junior",
    Senior: "Senior",
    Master: "Master"
  };

  return {
    id: item.id,
    fullName: item.nombre,
    phone: item.telefono,
    identityNumber: item.identidad,
    eventAge: item.edad,
    email: item.email,
    insuranceAccepted: item.seguroAceptado,
    imageAccepted: item.imagenAceptada,
    liabilityAccepted: item.responsabilidad,
    legalDocumentationStatus,
    createdAt: item.createdAt.toISOString(),
    confirmedAt: item.confirmedAt?.toISOString() ?? null,
    confirmedBy: item.confirmedBy ?? null,
    internalNotes: item.observaciones ?? null,
    pilotStatus: pilotStatusMap[item.estadoPiloto],
    pilotCategory: item.categoria ? pilotCategoryMap[item.categoria] : null,
    competitiveNotes: item.notasCompetitivas ?? null,
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
