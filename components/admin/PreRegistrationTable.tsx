"use client";

import { motion } from "framer-motion";
import { PreRegistrationRecord } from "@/lib/adminTypes";
import { adminFadeVariants } from "./adminVariants";

type PreRegistrationTableProps = {
  title: string;
  section: "pending" | "confirmed" | "pilots";
  items: PreRegistrationRecord[];
  onConfirm: (id: string) => void;
  onEdit: (item: PreRegistrationRecord) => void;
  onDelete: (item: PreRegistrationRecord) => void;
  onViewPilot?: (item: PreRegistrationRecord) => void;
  compact?: boolean;
};

function DocumentationBadge({ item }: { item: PreRegistrationRecord }) {
  return (
    <span
      className={`inline-flex items-center rounded-full border px-2 py-1 text-[0.62rem] font-semibold uppercase tracking-[0.08em] ${
        item.legalDocumentationStatus === "complete"
          ? "border-[#ffd10055] bg-[#ffd1001a] text-[#ffd100]"
          : "border-[#ffffff35] bg-[#1a1a1a] text-[#d7d7d7]"
      }`}
    >
      {item.legalDocumentationStatus === "complete" ? "Completa" : "Incompleta"}
    </span>
  );
}

export default function PreRegistrationTable({
  title,
  section,
  items,
  onConfirm,
  onEdit,
  onDelete,
  onViewPilot,
  compact = false
}: PreRegistrationTableProps) {
  return (
    <motion.section variants={adminFadeVariants} className="rounded-md border border-[#ffffff22] bg-[#090909] px-4 py-5 shadow-[0_12px_24px_rgba(0,0,0,0.62)] sm:px-5">
      <h3 className="text-sm font-black uppercase tracking-[0.1em] text-white sm:text-base">{title}</h3>

      <div className="mt-4 overflow-hidden rounded-md border border-[#ffffff18]">
        {items.length === 0 ? (
          <p className="px-4 py-5 text-sm text-[#bababa]">Sin registros en esta sección.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[860px] text-left">
              <thead className="bg-[#101010]">
                <tr className="border-b border-[#ffffff14] text-[0.62rem] font-semibold uppercase tracking-[0.1em] text-[#cfcfcf]">
                  <th className="px-4 py-3">Nombre</th>
                  <th className="px-4 py-3">Edad</th>
                  <th className="px-4 py-3">Teléfono</th>
                  <th className="px-4 py-3">Documentación</th>
                  <th className="px-4 py-3">Fecha</th>
                  <th className="px-4 py-3">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {items.map((item) => (
                  <tr
                    key={item.id}
                    className="border-b border-[#ffffff10] bg-[#0d0d0d] text-xs text-[#e3e3e3] transition-colors duration-200 hover:bg-[#131313]"
                  >
                    <td className="px-4 py-3 align-top">
                      <p className={`font-semibold text-white ${compact ? "text-xs" : "text-sm"}`}>{item.fullName}</p>
                      <p className="mt-1 text-[0.66rem] uppercase tracking-[0.08em] text-[#a8a8a8]">{item.identityNumber}</p>
                      {section === "confirmed" ? (
                        <span className="mt-2 inline-flex items-center rounded-full border border-[#22c55e55] bg-[#22c55e1a] px-2 py-1 text-[0.6rem] font-semibold uppercase tracking-[0.08em] text-[#6ce792]">
                          Confirmada
                        </span>
                      ) : null}
                    </td>
                    <td className="px-4 py-3 align-top text-[0.72rem]">{item.eventAge}</td>
                    <td className="px-4 py-3 align-top text-[0.72rem]">{item.phone}</td>
                    <td className="px-4 py-3 align-top">
                      <DocumentationBadge item={item} />
                    </td>
                    <td className="px-4 py-3 align-top text-[0.7rem] text-[#b6b6b6]">
                      {new Date(item.createdAt).toLocaleString("es-ES")}
                    </td>
                    <td className="px-4 py-3 align-top">
                      <div className="flex flex-wrap gap-2">
                        {section === "pending" ? (
                          <button
                            onClick={() => onConfirm(item.id)}
                            className="rounded-md bg-[#ffd100] px-3 py-2 text-[0.62rem] font-black uppercase tracking-[0.08em] text-black"
                          >
                            Confirmar
                          </button>
                        ) : null}

                        {section !== "pending" && onViewPilot ? (
                          <button
                            onClick={() => onViewPilot(item)}
                            className="rounded-md border border-[#ffffff35] px-3 py-2 text-[0.62rem] font-semibold uppercase tracking-[0.08em] text-[#ededed]"
                          >
                            Ver ficha piloto
                          </button>
                        ) : null}

                        <button
                          onClick={() => onEdit(item)}
                          className="rounded-md border border-[#4f4f4f] px-3 py-2 text-[0.62rem] font-semibold uppercase tracking-[0.08em] text-[#e7e7e7]"
                        >
                          Editar
                        </button>
                        <button
                          onClick={() => onDelete(item)}
                          className="rounded-md border border-[#4f4f4f] px-3 py-2 text-[0.62rem] font-semibold uppercase tracking-[0.08em] text-[#e7e7e7]"
                        >
                          Eliminar
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </motion.section>
  );
}
