"use client";

import { motion } from "framer-motion";
import { FormEvent, useMemo, useState } from "react";
import FormInput from "./FormInput";
import LegalBlock from "./LegalBlock";
import PhoneInputField, { isPhoneFieldValid } from "./PhoneInputField";
import ProgressBar from "./ProgressBar";
import { ctaBounceVariants, formPanelVariants } from "./preregistrationVariants";

type PreRegistrationFormProps = {
  onSuccess: () => void;
};

type FormData = {
  fullName: string;
  phone?: string;
  identityNumber: string;
  eventAge: string;
  insuranceAccepted: boolean;
  imageRightsAccepted: boolean;
  physicalResponsibilityAccepted: boolean;
};

type FormErrors = Partial<Record<keyof FormData, string>>;

const initialData: FormData = {
  fullName: "",
  phone: undefined,
  identityNumber: "",
  eventAge: "",
  insuranceAccepted: false,
  imageRightsAccepted: false,
  physicalResponsibilityAccepted: false
};

export default function PreRegistrationForm({ onSuccess }: PreRegistrationFormProps) {
  const [formData, setFormData] = useState<FormData>(initialData);
  const [touched, setTouched] = useState<Partial<Record<keyof FormData, boolean>>>({});
  const [submitted, setSubmitted] = useState(false);

  const errors = useMemo(() => {
    const nextErrors: FormErrors = {};
    const eventAgeNumber = Number(formData.eventAge);

    if (!formData.fullName.trim()) nextErrors.fullName = "Introduce tu nombre completo.";
    if (!isPhoneFieldValid(formData.phone)) {
      nextErrors.phone = "Introduce un número de teléfono válido y dentro de la longitud permitida para su país.";
    }
    if (!formData.identityNumber.trim()) nextErrors.identityNumber = "Introduce tu número de identidad.";
    if (!formData.eventAge.trim()) {
      nextErrors.eventAge = "Indica tu edad en el evento.";
    } else if (!Number.isFinite(eventAgeNumber) || eventAgeNumber < 16 || eventAgeNumber > 90) {
      nextErrors.eventAge = "La edad debe estar entre 16 y 90 años.";
    }
    if (!formData.insuranceAccepted) nextErrors.insuranceAccepted = "Debes aceptar esta condición.";
    if (!formData.imageRightsAccepted) nextErrors.imageRightsAccepted = "Debes aceptar esta condición.";
    if (!formData.physicalResponsibilityAccepted) nextErrors.physicalResponsibilityAccepted = "Debes aceptar esta condición.";

    return nextErrors;
  }, [formData]);

  const completionCount = useMemo(() => {
    const eventAgeNumber = Number(formData.eventAge);
    const isAgeValid = Number.isFinite(eventAgeNumber) && eventAgeNumber >= 16 && eventAgeNumber <= 90;

    const checks = [
      Boolean(formData.fullName.trim()),
      Boolean(isPhoneFieldValid(formData.phone)),
      Boolean(formData.identityNumber.trim()),
      isAgeValid,
      formData.insuranceAccepted,
      formData.imageRightsAccepted,
      formData.physicalResponsibilityAccepted
    ];

    return checks.filter(Boolean).length;
  }, [formData]);

  const progress = (completionCount / 7) * 100;

  const setTouchedField = (field: keyof FormData) => {
    setTouched((previous) => ({ ...previous, [field]: true }));
  };

  const showError = (field: keyof FormData) => (touched[field] || submitted ? errors[field] : undefined);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitted(true);

    const hasErrors = Object.keys(errors).length > 0;

    if (hasErrors) {
      setTouched({
        fullName: true,
        phone: true,
        identityNumber: true,
        eventAge: true,
        insuranceAccepted: true,
        imageRightsAccepted: true,
        physicalResponsibilityAccepted: true
      });
      return;
    }

    try {
      const response = await fetch("/api/preinscripciones", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          nombre: formData.fullName,
          telefono: formData.phone,
          identidad: formData.identityNumber,
          edad: Number(formData.eventAge),
          email: "",
          seguroAceptado: formData.insuranceAccepted,
          imagenAceptada: formData.imageRightsAccepted,
          responsabilidad: formData.physicalResponsibilityAccepted
        })
      });

      if (!response.ok) {
        return;
      }
    } catch {
      return;
    }

    onSuccess();
  };

  return (
    <motion.form
      onSubmit={handleSubmit}
      variants={formPanelVariants}
      initial="hidden"
      animate="show"
      className="mx-auto w-full max-w-3xl rounded-md border border-[#ffffff22] bg-[#070707]/92 px-5 py-6 shadow-[0_20px_42px_rgba(0,0,0,0.72)] sm:px-8 sm:py-8"
    >
      <ProgressBar progress={progress} />

      <div className="mt-6 grid grid-cols-1 gap-4 sm:gap-5">
        <FormInput
          index={0}
          id="fullName"
          label="Nombre completo"
          value={formData.fullName}
          placeholder="Nombre y apellidos"
          touched={Boolean(touched.fullName || submitted)}
          error={showError("fullName")}
          onChange={(value) => setFormData((previous) => ({ ...previous, fullName: value }))}
          onBlur={() => setTouchedField("fullName")}
        />

        <PhoneInputField
          index={1}
          value={formData.phone}
          touched={Boolean(touched.phone || submitted)}
          error={showError("phone")}
          onChange={(value) => setFormData((previous) => ({ ...previous, phone: value }))}
          onBlur={() => setTouchedField("phone")}
        />

        <FormInput
          index={2}
          id="identityNumber"
          label="Número de identidad (DNI, NIE, PASAPORTE)"
          value={formData.identityNumber}
          placeholder="Documento de identidad"
          touched={Boolean(touched.identityNumber || submitted)}
          error={showError("identityNumber")}
          onChange={(value) => setFormData((previous) => ({ ...previous, identityNumber: value }))}
          onBlur={() => setTouchedField("identityNumber")}
        />

        <FormInput
          index={3}
          id="eventAge"
          type="number"
          min={16}
          max={90}
          label="¿Cuántos años tienes? (En el momento del evento)"
          value={formData.eventAge}
          placeholder="Edad"
          touched={Boolean(touched.eventAge || submitted)}
          error={showError("eventAge")}
          onChange={(value) => setFormData((previous) => ({ ...previous, eventAge: value }))}
          onBlur={() => setTouchedField("eventAge")}
        />
      </div>

      <LegalBlock
        values={{
          insuranceAccepted: formData.insuranceAccepted,
          imageRightsAccepted: formData.imageRightsAccepted,
          physicalResponsibilityAccepted: formData.physicalResponsibilityAccepted
        }}
        touched={{
          insuranceAccepted: touched.insuranceAccepted,
          imageRightsAccepted: touched.imageRightsAccepted,
          physicalResponsibilityAccepted: touched.physicalResponsibilityAccepted
        }}
        errors={{
          insuranceAccepted: showError("insuranceAccepted"),
          imageRightsAccepted: showError("imageRightsAccepted"),
          physicalResponsibilityAccepted: showError("physicalResponsibilityAccepted")
        }}
        submitted={submitted}
        onChange={(key, value) => setFormData((previous) => ({ ...previous, [key]: value }))}
        onBlur={(key) => setTouchedField(key)}
      />

      <motion.div variants={ctaBounceVariants} className="mt-8">
        <motion.button
          type="submit"
          className="inline-flex w-full items-center justify-center rounded-md bg-[#ffd100] px-5 py-4 text-sm font-black uppercase tracking-[0.08em] text-black shadow-[0_14px_0_rgba(0,0,0,0.58)] sm:text-base"
          whileHover={{ scale: 1.05, boxShadow: "0 18px 0 rgba(0,0,0,0.58)" }}
          whileTap={{ scale: 0.97 }}
          transition={{ type: "spring", stiffness: 260, damping: 18 }}
        >
          RESERVAR PLAZA PROVISIONAL
        </motion.button>
      </motion.div>
    </motion.form>
  );
}
