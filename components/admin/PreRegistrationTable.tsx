"use client";

import { motion } from "framer-motion";
import { PreRegistrationRecord } from "@/lib/adminTypes";
import { adminFadeVariants } from "./adminVariants";

type PreRegistrationTableProps = {
  title: string;
  items: PreRegistrationRecord[];
  onConfirm: (id: string) => void;
  onEdit: (item: PreRegistrationRecord) => void;
  onDelete: (item: PreRegistrationRecord) => void;
};

export default function PreRegistrationTable({ title, items, onConfirm, onEdit, onDelete }: PreRegistrationTableProps) {
  return (
    <motion.section variants={adminFadeVariants} className="rounded-md border border-[#ffffff22] bg-[#090909] px-4 py-5 shadow-[0_12px_24px_rgba(0,0,0,0.62)] sm:px-5">
      <h3 className="text-sm font-black uppercase tracking-[0.1em] text-white sm:text-base">{title}</h3>

      <div className="mt-4 space-y-3">
        {items.length === 0 ? (
          <p className="text-sm text-[#bababa]">Sin registros en esta sección.</p>
        ) : (
          items.map((item) => (
            <article key={item.id} className="rounded-md border border-[#ffffff1d] bg-[#0d0d0d] px-4 py-4">
              <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
                <div>
                  <p className="text-base font-semibold text-white">{item.fullName}</p>
                  <p className="mt-1 text-xs text-[#cfcfcf]">
                    {item.phone} · {item.identityNumber} · {item.eventAge} años
                  </p>
                  <p className="mt-1 text-xs uppercase tracking-[0.08em] text-[#9f9f9f]">
                    {new Date(item.createdAt).toLocaleString("es-ES")} · {item.status === "confirmed" ? "Confirmada" : "Pendiente"}
                  </p>
                </div>

                <div className="flex flex-wrap gap-2">
                  {item.status === "pending" ? (
                    <button
                      onClick={() => onConfirm(item.id)}
                      className="rounded-md bg-[#ffd100] px-3 py-2 text-xs font-black uppercase tracking-[0.08em] text-black"
                    >
                      Confirmar
                    </button>
                  ) : null}
                  <button
                    onClick={() => onEdit(item)}
                    className="rounded-md border border-[#4f4f4f] px-3 py-2 text-xs font-semibold uppercase tracking-[0.08em] text-[#e7e7e7]"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => onDelete(item)}
                    className="rounded-md border border-[#4f4f4f] px-3 py-2 text-xs font-semibold uppercase tracking-[0.08em] text-[#e7e7e7]"
                  >
                    Eliminar
                  </button>
                </div>
              </div>
            </article>
          ))
        )}
      </div>
    </motion.section>
  );
}
