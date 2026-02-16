"use client";

import { AnimatePresence, motion } from "framer-motion";
import { FormEvent, useEffect, useState } from "react";
import { PreRegistrationRecord } from "@/lib/adminTypes";
import { modalVariants } from "./adminVariants";

type EditModalProps = {
  item: PreRegistrationRecord | null;
  onSave: (payload: {
    id: string;
    fullName: string;
    phone: string;
    identityNumber: string;
    eventAge: number;
  }) => void;
  onClose: () => void;
};

export default function EditModal({ item, onSave, onClose }: EditModalProps) {
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [identityNumber, setIdentityNumber] = useState("");
  const [eventAge, setEventAge] = useState("");

  useEffect(() => {
    if (!item) return;

    setFullName(item.fullName);
    setPhone(item.phone);
    setIdentityNumber(item.identityNumber);
    setEventAge(String(item.eventAge));
  }, [item]);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!item) return;

    onSave({
      id: item.id,
      fullName: fullName.trim(),
      phone: phone.trim(),
      identityNumber: identityNumber.trim(),
      eventAge: Number(eventAge)
    });
  };

  return (
    <AnimatePresence>
      {item && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.form
            onSubmit={handleSubmit}
            variants={modalVariants}
            initial="hidden"
            animate="show"
            exit="exit"
            className="w-full max-w-lg rounded-md border border-[#ffffff24] bg-[#090909] px-5 py-5 shadow-[0_20px_40px_rgba(0,0,0,0.72)]"
          >
            <h3 className="text-lg font-black uppercase tracking-[0.04em] text-white">Editar Preinscripción</h3>

            <div className="mt-4 space-y-3">
              <input
                value={fullName}
                onChange={(event) => setFullName(event.target.value)}
                className="w-full rounded-md border border-[#565656] bg-[#101010] px-4 py-3 text-sm text-white outline-none focus:border-[#ffd100]"
                placeholder="Nombre completo"
                required
              />
              <input
                value={phone}
                onChange={(event) => setPhone(event.target.value)}
                className="w-full rounded-md border border-[#565656] bg-[#101010] px-4 py-3 text-sm text-white outline-none focus:border-[#ffd100]"
                placeholder="Teléfono"
                required
              />
              <input
                value={identityNumber}
                onChange={(event) => setIdentityNumber(event.target.value)}
                className="w-full rounded-md border border-[#565656] bg-[#101010] px-4 py-3 text-sm text-white outline-none focus:border-[#ffd100]"
                placeholder="DNI / NIE / Pasaporte"
                required
              />
              <input
                type="number"
                value={eventAge}
                onChange={(event) => setEventAge(event.target.value)}
                className="w-full rounded-md border border-[#565656] bg-[#101010] px-4 py-3 text-sm text-white outline-none focus:border-[#ffd100]"
                placeholder="Edad"
                required
              />
            </div>

            <div className="mt-5 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={onClose}
                className="rounded-md border border-[#4f4f4f] px-4 py-2 text-xs font-semibold uppercase tracking-[0.08em] text-[#dedede]"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="rounded-md bg-[#ffd100] px-4 py-2 text-xs font-black uppercase tracking-[0.08em] text-black"
              >
                Guardar cambios
              </button>
            </div>
          </motion.form>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
