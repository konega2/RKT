"use client";

import { AnimatePresence, motion } from "framer-motion";
import { FormEvent, useEffect, useState } from "react";
import { modalVariants } from "./adminVariants";

type ManualEntryMode = "preinscripcion" | "piloto";

type ManualEntryModalProps = {
  isOpen: boolean;
  mode: ManualEntryMode;
  onClose: () => void;
  onCreated: () => Promise<void>;
};

export default function ManualEntryModal({ isOpen, mode, onClose, onCreated }: ManualEntryModalProps) {
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [identityNumber, setIdentityNumber] = useState("");
  const [eventAge, setEventAge] = useState("");
  const [email, setEmail] = useState("");
  const [insuranceAccepted, setInsuranceAccepted] = useState(true);
  const [imageAccepted, setImageAccepted] = useState(true);
  const [liabilityAccepted, setLiabilityAccepted] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!isOpen) return;
    setError("");
  }, [isOpen]);

  const resetForm = () => {
    setFullName("");
    setPhone("");
    setIdentityNumber("");
    setEventAge("");
    setEmail("");
    setInsuranceAccepted(true);
    setImageAccepted(true);
    setLiabilityAccepted(true);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");
    setIsSubmitting(true);

    const response = await fetch("/api/preinscripciones/manual", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        fullName,
        phone,
        identityNumber,
        eventAge: Number(eventAge),
        email,
        insuranceAccepted,
        imageAccepted,
        liabilityAccepted,
        mode
      })
    });

    setIsSubmitting(false);

    if (!response.ok) {
      const payload = (await response.json()) as { message?: string };
      setError(payload.message ?? "No se pudo crear el registro.");
      return;
    }

    resetForm();
    onClose();
    await onCreated();
  };

  return (
    <AnimatePresence>
      {isOpen ? (
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
            className="w-full max-w-xl rounded-md border border-[#ffffff24] bg-[#090909] px-5 py-5 shadow-[0_20px_40px_rgba(0,0,0,0.72)]"
          >
            <h3 className="text-lg font-black uppercase tracking-[0.04em] text-white">
              {mode === "piloto" ? "Alta manual de piloto" : "Alta manual de preinscripción"}
            </h3>

            <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
              <input
                value={fullName}
                onChange={(event) => setFullName(event.target.value)}
                className="rounded-md border border-[#565656] bg-[#101010] px-4 py-3 text-sm text-white outline-none focus:border-[#ffd100] sm:col-span-2"
                placeholder="Nombre completo"
                required
              />
              <input
                value={phone}
                onChange={(event) => setPhone(event.target.value)}
                className="rounded-md border border-[#565656] bg-[#101010] px-4 py-3 text-sm text-white outline-none focus:border-[#ffd100]"
                placeholder="Teléfono (+34...)"
                required
              />
              <input
                value={identityNumber}
                onChange={(event) => setIdentityNumber(event.target.value)}
                className="rounded-md border border-[#565656] bg-[#101010] px-4 py-3 text-sm text-white outline-none focus:border-[#ffd100]"
                placeholder="DNI / NIE / Pasaporte"
                required
              />
              <input
                type="number"
                min={16}
                max={90}
                value={eventAge}
                onChange={(event) => setEventAge(event.target.value)}
                className="rounded-md border border-[#565656] bg-[#101010] px-4 py-3 text-sm text-white outline-none focus:border-[#ffd100]"
                placeholder="Edad"
                required
              />
              <input
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                className="rounded-md border border-[#565656] bg-[#101010] px-4 py-3 text-sm text-white outline-none focus:border-[#ffd100]"
                placeholder="Email"
              />
            </div>

            <div className="mt-4 flex flex-wrap gap-3 text-[0.68rem] font-semibold uppercase tracking-[0.08em] text-[#d4d4d4]">
              <label className="inline-flex items-center gap-2">
                <input type="checkbox" checked={insuranceAccepted} onChange={(event) => setInsuranceAccepted(event.target.checked)} />
                Seguro
              </label>
              <label className="inline-flex items-center gap-2">
                <input type="checkbox" checked={liabilityAccepted} onChange={(event) => setLiabilityAccepted(event.target.checked)} />
                Responsabilidad
              </label>
              <label className="inline-flex items-center gap-2">
                <input type="checkbox" checked={imageAccepted} onChange={(event) => setImageAccepted(event.target.checked)} />
                Imagen
              </label>
            </div>

            {error ? <p className="mt-3 text-xs text-[#e5cf6e]">{error}</p> : null}

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
                disabled={isSubmitting}
                className="rounded-md bg-[#ffd100] px-4 py-2 text-xs font-black uppercase tracking-[0.08em] text-black disabled:opacity-70"
              >
                {isSubmitting ? "Guardando..." : mode === "piloto" ? "Crear piloto" : "Crear preinscripción"}
              </button>
            </div>
          </motion.form>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
