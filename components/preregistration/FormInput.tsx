"use client";

import { motion } from "framer-motion";
import { fieldRevealVariants } from "./preregistrationVariants";

type FormInputProps = {
  index: number;
  id: string;
  label: string;
  type?: "text" | "number";
  min?: number;
  max?: number;
  value: string;
  placeholder: string;
  touched: boolean;
  error?: string;
  requiredMark?: boolean;
  onChange: (value: string) => void;
  onBlur: () => void;
};

export default function FormInput({
  index,
  id,
  label,
  type = "text",
  min,
  max,
  value,
  placeholder,
  touched,
  error,
  requiredMark = true,
  onChange,
  onBlur
}: FormInputProps) {
  const hasError = touched && Boolean(error);

  return (
    <motion.div custom={index} variants={fieldRevealVariants} className="space-y-2">
      <label htmlFor={id} className="block text-xs font-semibold uppercase tracking-[0.1em] text-[#d9d9d9] sm:text-sm">
        {label} {requiredMark ? <span className="text-[#ffd100]">*</span> : null}
      </label>
      <input
        id={id}
        type={type}
        min={min}
        max={max}
        value={value}
        placeholder={placeholder}
        onChange={(event) => onChange(event.target.value)}
        onBlur={onBlur}
        className={`w-full rounded-md border bg-[#0b0b0b] px-4 py-3 text-sm text-white outline-none transition-all duration-300 placeholder:text-[#8f8f8f] sm:text-base ${
          hasError
            ? "border-[#ffd10088] shadow-[0_0_0_1px_rgba(255,209,0,0.24)]"
            : "border-[#5f5f5f] focus:border-[#ffd100] focus:shadow-[0_0_10px_rgba(255,209,0,0.2)]"
        }`}
      />
      {hasError ? <p className="text-xs text-[#e5cf6e]">{error}</p> : null}
    </motion.div>
  );
}
