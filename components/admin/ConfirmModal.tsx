"use client";

import { AnimatePresence, motion } from "framer-motion";
import { modalVariants } from "./adminVariants";

type ConfirmModalProps = {
  isOpen: boolean;
  title: string;
  message: string;
  confirmLabel: string;
  onConfirm: () => void;
  onClose: () => void;
};

export default function ConfirmModal({
  isOpen,
  title,
  message,
  confirmLabel,
  onConfirm,
  onClose
}: ConfirmModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div variants={modalVariants} initial="hidden" animate="show" exit="exit" className="w-full max-w-md rounded-md border border-[#ffffff24] bg-[#090909] px-5 py-5 shadow-[0_20px_40px_rgba(0,0,0,0.72)]">
            <h3 className="text-lg font-black uppercase tracking-[0.04em] text-white">{title}</h3>
            <p className="mt-3 text-sm leading-relaxed text-[#d3d3d3]">{message}</p>

            <div className="mt-5 flex items-center justify-end gap-3">
              <button
                onClick={onClose}
                className="rounded-md border border-[#4f4f4f] px-4 py-2 text-xs font-semibold uppercase tracking-[0.08em] text-[#dedede]"
              >
                Cancelar
              </button>
              <button
                onClick={onConfirm}
                className="rounded-md bg-[#ffd100] px-4 py-2 text-xs font-black uppercase tracking-[0.08em] text-black"
              >
                {confirmLabel}
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
