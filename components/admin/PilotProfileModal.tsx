"use client";

import { AnimatePresence, motion } from "framer-motion";
import { FormEvent, useEffect, useMemo, useState } from "react";
import { InternalCommentRecord, PilotCategory, PilotOperationalStatus, PreRegistrationRecord } from "@/lib/adminTypes";
import { modalVariants } from "./adminVariants";

type PilotProfileModalProps = {
  item: PreRegistrationRecord | null;
  onClose: () => void;
  onRefresh: () => Promise<void>;
};

const statusLabels: Record<PilotOperationalStatus, string> = {
  active: "Activo",
  pending_payment: "Pendiente pago",
  inactive: "Baja"
};

export default function PilotProfileModal({ item, onClose, onRefresh }: PilotProfileModalProps) {
  const [comments, setComments] = useState<InternalCommentRecord[]>([]);
  const [newComment, setNewComment] = useState("");
  const [editingCommentId, setEditingCommentId] = useState<string | null>(null);
  const [editingCommentText, setEditingCommentText] = useState("");

  const [internalNotes, setInternalNotes] = useState("");
  const [competitiveNotes, setCompetitiveNotes] = useState("");
  const [pilotStatus, setPilotStatus] = useState<PilotOperationalStatus>("active");
  const [pilotCategory, setPilotCategory] = useState<PilotCategory | "">("");

  useEffect(() => {
    if (!item) return;

    setInternalNotes(item.internalNotes ?? "");
    setCompetitiveNotes(item.competitiveNotes ?? "");
    setPilotStatus(item.pilotStatus);
    setPilotCategory(item.pilotCategory ?? "");
  }, [item]);

  useEffect(() => {
    if (!item) return;

    const loadComments = async () => {
      const response = await fetch(`/api/preinscripciones/${item.id}/comentarios`, { cache: "no-store" });
      if (!response.ok) {
        setComments([]);
        return;
      }

      const payload = (await response.json()) as { ok: boolean; items?: InternalCommentRecord[] };
      setComments(payload.items ?? []);
    };

    loadComments();
  }, [item]);

  const pilotInternalId = useMemo(() => {
    if (!item) return "";
    return `RKT-${item.id.slice(0, 8).toUpperCase()}`;
  }, [item]);

  if (!item) return null;

  const handleSaveProfile = async (event: FormEvent) => {
    event.preventDefault();

    await fetch(`/api/preinscripciones/${item.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        fullName: item.fullName,
        phone: item.phone,
        identityNumber: item.identityNumber,
        eventAge: item.eventAge,
        email: item.email,
        internalNotes,
        pilotStatus,
        pilotCategory: pilotCategory || null,
        competitiveNotes
      })
    });

    await onRefresh();
  };

  const handleAddComment = async (event: FormEvent) => {
    event.preventDefault();
    if (!newComment.trim()) return;

    const response = await fetch(`/api/preinscripciones/${item.id}/comentarios`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ content: newComment.trim() })
    });

    if (response.ok) {
      const payload = (await response.json()) as { ok: boolean; item?: InternalCommentRecord };
      if (payload.item) {
        setComments((prev) => [payload.item as InternalCommentRecord, ...prev]);
        setNewComment("");
      }
    }
  };

  const handleEditComment = async (commentId: string) => {
    if (!editingCommentText.trim()) return;

    const response = await fetch(`/api/comentarios/${commentId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ content: editingCommentText.trim() })
    });

    if (response.ok) {
      setComments((prev) =>
        prev.map((comment) =>
          comment.id === commentId
            ? {
                ...comment,
                content: editingCommentText.trim()
              }
            : comment
        )
      );
      setEditingCommentId(null);
      setEditingCommentText("");
    }
  };

  const handleDeleteComment = async (commentId: string) => {
    const response = await fetch(`/api/comentarios/${commentId}`, {
      method: "DELETE"
    });

    if (response.ok) {
      setComments((prev) => prev.filter((comment) => comment.id !== commentId));
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 px-4 py-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          variants={modalVariants}
          initial="hidden"
          animate="show"
          exit="exit"
          className="max-h-[92vh] w-full max-w-6xl overflow-y-auto rounded-md border border-[#ffffff24] bg-[#090909] p-5 shadow-[0_24px_48px_rgba(0,0,0,0.75)] sm:p-6"
        >
          <div className="flex flex-wrap items-start justify-between gap-4 border-b border-[#ffffff18] pb-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#ffd100]">Ficha piloto</p>
              <h3 className="mt-2 text-2xl font-black uppercase tracking-[-0.02em] text-white sm:text-3xl">{item.fullName}</h3>
              <p className="mt-2 text-xs uppercase tracking-[0.1em] text-[#b9b9b9]">ID interno: {pilotInternalId}</p>
            </div>

            <div className="flex items-center gap-2">
              <span className="rounded-full border border-[#ffffff2b] px-3 py-1 text-[0.65rem] font-semibold uppercase tracking-[0.1em] text-[#ececec]">
                {statusLabels[pilotStatus]}
              </span>
              <button
                onClick={onClose}
                className="rounded-md border border-[#4f4f4f] px-3 py-2 text-[0.62rem] font-semibold uppercase tracking-[0.08em] text-[#dedede]"
              >
                Cerrar
              </button>
            </div>
          </div>

          <div className="mt-5 grid grid-cols-1 gap-5 xl:grid-cols-[1.05fr_0.95fr]">
            <div className="space-y-4">
              <section className="rounded-md border border-[#ffffff18] bg-[#0d0d0d] px-4 py-4">
                <h4 className="text-xs font-black uppercase tracking-[0.1em] text-white">Datos personales</h4>
                <div className="mt-3 grid grid-cols-1 gap-2 text-sm text-[#d5d5d5] sm:grid-cols-2">
                  <p><span className="text-[#a6a6a6]">Nombre:</span> {item.fullName}</p>
                  <p><span className="text-[#a6a6a6]">Edad:</span> {item.eventAge}</p>
                  <p><span className="text-[#a6a6a6]">DNI:</span> {item.identityNumber}</p>
                  <p><span className="text-[#a6a6a6]">Teléfono:</span> {item.phone}</p>
                  <p className="sm:col-span-2"><span className="text-[#a6a6a6]">Email:</span> {item.email || "—"}</p>
                </div>
              </section>

              <section className="rounded-md border border-[#ffffff18] bg-[#0d0d0d] px-4 py-4">
                <h4 className="text-xs font-black uppercase tracking-[0.1em] text-white">Documentación</h4>
                <ul className="mt-3 space-y-2 text-sm text-[#d6d6d6]">
                  <li className="flex items-center gap-2">{item.insuranceAccepted ? "✔" : "✖"} Seguro aceptado</li>
                  <li className="flex items-center gap-2">{item.liabilityAccepted ? "✔" : "✖"} Responsabilidad firmada</li>
                  <li className="flex items-center gap-2">{item.imageAccepted ? "✔" : "✖"} Imagen aceptada</li>
                </ul>
              </section>

              <form onSubmit={handleSaveProfile} className="rounded-md border border-[#ffffff18] bg-[#0d0d0d] px-4 py-4">
                <h4 className="text-xs font-black uppercase tracking-[0.1em] text-white">Observaciones internas</h4>
                <textarea
                  value={internalNotes}
                  onChange={(event) => setInternalNotes(event.target.value)}
                  className="mt-3 min-h-[94px] w-full rounded-md border border-[#4f4f4f] bg-[#111] px-3 py-2 text-sm text-white outline-none focus:border-[#ffd100]"
                  placeholder="Comentarios internos del equipo de gestión"
                />

                <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
                  <select
                    value={pilotStatus}
                    onChange={(event) => setPilotStatus(event.target.value as PilotOperationalStatus)}
                    className="rounded-md border border-[#4f4f4f] bg-[#111] px-3 py-2 text-sm text-white outline-none focus:border-[#ffd100]"
                  >
                    <option value="active">Activo</option>
                    <option value="pending_payment">Pendiente pago</option>
                    <option value="inactive">Baja</option>
                  </select>

                  <select
                    value={pilotCategory}
                    onChange={(event) => setPilotCategory(event.target.value as PilotCategory | "")}
                    className="rounded-md border border-[#4f4f4f] bg-[#111] px-3 py-2 text-sm text-white outline-none focus:border-[#ffd100]"
                  >
                    <option value="">Sin categoría</option>
                    <option value="Junior">Junior</option>
                    <option value="Senior">Senior</option>
                    <option value="Master">Master</option>
                  </select>
                </div>

                <textarea
                  value={competitiveNotes}
                  onChange={(event) => setCompetitiveNotes(event.target.value)}
                  className="mt-3 min-h-[84px] w-full rounded-md border border-[#4f4f4f] bg-[#111] px-3 py-2 text-sm text-white outline-none focus:border-[#ffd100]"
                  placeholder="Notas administrativas / competitivas"
                />

                <button
                  type="submit"
                  className="mt-4 rounded-md bg-[#ffd100] px-4 py-2 text-[0.68rem] font-black uppercase tracking-[0.08em] text-black"
                >
                  Guardar ficha
                </button>
              </form>
            </div>

            <div className="space-y-4">
              <section className="rounded-md border border-[#ffffff18] bg-[#0d0d0d] px-4 py-4">
                <h4 className="text-xs font-black uppercase tracking-[0.1em] text-white">Historial admin</h4>
                <div className="mt-3 space-y-2 text-sm text-[#d6d6d6]">
                  <p><span className="text-[#a6a6a6]">Fecha inscripción:</span> {new Date(item.createdAt).toLocaleString("es-ES")}</p>
                  <p><span className="text-[#a6a6a6]">Fecha confirmación:</span> {item.confirmedAt ? new Date(item.confirmedAt).toLocaleString("es-ES") : "—"}</p>
                  <p><span className="text-[#a6a6a6]">Confirmado por:</span> {item.confirmedBy ?? "—"}</p>
                </div>
              </section>

              <section className="rounded-md border border-[#ffffff18] bg-[#0d0d0d] px-4 py-4">
                <h4 className="text-xs font-black uppercase tracking-[0.1em] text-white">Comentarios internos</h4>

                <form onSubmit={handleAddComment} className="mt-3 flex gap-2">
                  <input
                    value={newComment}
                    onChange={(event) => setNewComment(event.target.value)}
                    className="flex-1 rounded-md border border-[#4f4f4f] bg-[#111] px-3 py-2 text-sm text-white outline-none focus:border-[#ffd100]"
                    placeholder="Añadir comentario interno"
                  />
                  <button
                    type="submit"
                    className="rounded-md bg-[#ffd100] px-3 py-2 text-[0.62rem] font-black uppercase tracking-[0.08em] text-black"
                  >
                    Añadir
                  </button>
                </form>

                <div className="mt-4 space-y-3">
                  {comments.length === 0 ? (
                    <p className="text-xs text-[#a9a9a9]">Sin comentarios internos.</p>
                  ) : (
                    comments.map((comment) => (
                      <article key={comment.id} className="relative border-l border-[#ffd10055] pl-3">
                        <p className="text-[0.64rem] uppercase tracking-[0.08em] text-[#a8a8a8]">
                          {new Date(comment.createdAt).toLocaleString("es-ES")}
                        </p>

                        {editingCommentId === comment.id ? (
                          <div className="mt-2 space-y-2">
                            <textarea
                              value={editingCommentText}
                              onChange={(event) => setEditingCommentText(event.target.value)}
                              className="min-h-[74px] w-full rounded-md border border-[#4f4f4f] bg-[#111] px-3 py-2 text-sm text-white outline-none focus:border-[#ffd100]"
                            />
                            <div className="flex gap-2">
                              <button
                                onClick={() => handleEditComment(comment.id)}
                                className="rounded-md bg-[#ffd100] px-3 py-2 text-[0.62rem] font-black uppercase tracking-[0.08em] text-black"
                              >
                                Guardar
                              </button>
                              <button
                                onClick={() => {
                                  setEditingCommentId(null);
                                  setEditingCommentText("");
                                }}
                                className="rounded-md border border-[#4f4f4f] px-3 py-2 text-[0.62rem] font-semibold uppercase tracking-[0.08em] text-[#e7e7e7]"
                              >
                                Cancelar
                              </button>
                            </div>
                          </div>
                        ) : (
                          <>
                            <p className="mt-1 text-sm leading-relaxed text-[#dfdfdf]">{comment.content}</p>
                            <div className="mt-2 flex gap-2">
                              <button
                                onClick={() => {
                                  setEditingCommentId(comment.id);
                                  setEditingCommentText(comment.content);
                                }}
                                className="rounded-md border border-[#4f4f4f] px-2.5 py-1.5 text-[0.58rem] font-semibold uppercase tracking-[0.08em] text-[#e7e7e7]"
                              >
                                Editar
                              </button>
                              <button
                                onClick={() => handleDeleteComment(comment.id)}
                                className="rounded-md border border-[#4f4f4f] px-2.5 py-1.5 text-[0.58rem] font-semibold uppercase tracking-[0.08em] text-[#e7e7e7]"
                              >
                                Eliminar
                              </button>
                            </div>
                          </>
                        )}
                      </article>
                    ))
                  )}
                </div>
              </section>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
