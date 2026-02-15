"use client";

import { motion } from "framer-motion";
import { fieldRevealVariants } from "./preregistrationVariants";

type LegalKey = "insuranceAccepted" | "imageRightsAccepted" | "physicalResponsibilityAccepted";

type LegalState = Record<LegalKey, boolean>;

type LegalTouched = Partial<Record<LegalKey, boolean>>;

type LegalErrors = Partial<Record<LegalKey, string>>;

type LegalBlockProps = {
  values: LegalState;
  touched: LegalTouched;
  errors: LegalErrors;
  submitted: boolean;
  onChange: (key: LegalKey, value: boolean) => void;
  onBlur: (key: LegalKey) => void;
};

const legalItems: Array<{
  key: LegalKey;
  title: string;
  question: string;
  description: string;
  checkbox: string;
}> = [
  {
    key: "insuranceAccepted",
    title: "A) SEGURO DE PILOTO",
    question: "¿Te haces responsable en contratar por tu cuenta un seguro de piloto?",
    description:
      "El participante declara que será responsable de contratar por su cuenta un seguro de piloto que cubra su participación en el evento.",
    checkbox: "He leído y acepto contratar por mi cuenta un seguro de piloto."
  },
  {
    key: "imageRightsAccepted",
    title: "B) DERECHOS DE IMAGEN",
    question: "",
    description:
      "Al participar en el RKT – Rental Karting Trophy, el piloto acepta que la organización pueda realizar fotografías y grabaciones de vídeo durante el evento, y autoriza su uso posterior con fines promocionales y de comunicación en cualquier medio.",
    checkbox: "Autorizo el uso de mi imagen con fines promocionales."
  },
  {
    key: "physicalResponsibilityAccepted",
    title: "C) RESPONSABILIDAD DEL PILOTO",
    question: "",
    description:
      "Al inscribirse en el RKT – Rental Karting Trophy, el piloto declara encontrarse en condiciones físicas adecuadas para competir y acepta participar bajo su propia responsabilidad, eximiendo a la organización de cualquier daño físico o lesión que pueda sufrir durante o posterior al evento.",
    checkbox: "Declaro participar bajo mi propia responsabilidad."
  }
];

export default function LegalBlock({
  values,
  touched,
  errors,
  submitted,
  onChange,
  onBlur
}: LegalBlockProps) {
  const hasAnyError = legalItems.some((item) => (touched[item.key] || submitted) && Boolean(errors[item.key]));

  return (
    <motion.section custom={5} variants={fieldRevealVariants} className="mt-8 rounded-md border border-[#ffffff24] bg-[#0a0a0a] px-4 py-5 sm:px-6 sm:py-6">
      <h3 className="text-sm font-black uppercase tracking-[0.12em] text-[#f2f2f2] sm:text-base">
        CONDICIONES DE PARTICIPACIÓN
      </h3>

      <div className="mt-4 space-y-4">
        {legalItems.map((item, index) => {
          const hasError = (touched[item.key] || submitted) && Boolean(errors[item.key]);
          return (
            <motion.article
              key={item.key}
              custom={6 + index}
              variants={fieldRevealVariants}
              className={`rounded-md border px-4 py-4 ${hasError ? "border-[#ffd10088]" : "border-[#3f3f3f]"}`}
            >
              <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[#ffd100] sm:text-sm">{item.title}</p>
              {item.question ? <p className="mt-2 text-sm leading-relaxed text-[#ececec] sm:text-base">{item.question}</p> : null}
              <p className="mt-2 text-xs leading-relaxed text-[#cfcfcf] sm:text-sm">{item.description}</p>

              <label className="mt-4 flex items-start gap-3 text-sm leading-relaxed text-[#ececec] sm:text-base">
                <input
                  type="checkbox"
                  checked={values[item.key]}
                  onChange={(event) => onChange(item.key, event.target.checked)}
                  onBlur={() => onBlur(item.key)}
                  className="mt-1 h-4 w-4 rounded border-[#7a7a7a] bg-[#111] accent-[#ffd100]"
                />
                <span>{item.checkbox}</span>
              </label>
            </motion.article>
          );
        })}
      </div>

      {hasAnyError ? (
        <p className="mt-4 text-xs text-[#e5cf6e] sm:text-sm">
          Debes aceptar todas las condiciones para completar la preinscripción.
        </p>
      ) : null}
    </motion.section>
  );
}
