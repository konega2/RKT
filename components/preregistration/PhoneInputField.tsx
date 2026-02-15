"use client";

import { motion } from "framer-motion";
import PhoneInput, { isValidPhoneNumber } from "react-phone-number-input";
import es from "react-phone-number-input/locale/es";
import { fieldRevealVariants } from "./preregistrationVariants";

type PhoneInputFieldProps = {
  index: number;
  value?: string;
  touched: boolean;
  error?: string;
  onChange: (value?: string) => void;
  onBlur: () => void;
};

export function isPhoneFieldValid(value?: string) {
  if (!value) return false;
  try {
    return isValidPhoneNumber(value);
  } catch {
    return false;
  }
}

export default function PhoneInputField({
  index,
  value,
  touched,
  error,
  onChange,
  onBlur
}: PhoneInputFieldProps) {
  const hasError = touched && Boolean(error);

  return (
    <motion.div custom={index} variants={fieldRevealVariants} className="space-y-2">
      <label htmlFor="phone" className="block text-xs font-semibold uppercase tracking-[0.1em] text-[#d9d9d9] sm:text-sm">
        Número de teléfono <span className="text-[#ffd100]">*</span>
      </label>

      <div
        className={`rkt-phone ${
          hasError ? "[&_.PhoneInput]:border-[#ffd10088] [&_.PhoneInput]:shadow-[0_0_0_1px_rgba(255,209,0,0.24)]" : ""
        }`}
      >
        <PhoneInput
          id="phone"
          international
          defaultCountry="ES"
          countryCallingCodeEditable={false}
          addInternationalOption={false}
          labels={es}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          placeholder="Número de teléfono"
        />
      </div>

      {hasError ? <p className="text-xs text-[#e5cf6e]">{error}</p> : null}
    </motion.div>
  );
}
