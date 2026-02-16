"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { motion } from "framer-motion";
import { adminFadeVariants } from "./adminVariants";

export default function AdminLogin() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");
    setIsLoading(true);

    const response = await fetch("/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ username, password })
    });

    setIsLoading(false);

    if (!response.ok) {
      setError("Credenciales incorrectas. Verifica usuario y contraseña.");
      return;
    }

    router.push("/rkt-panel");
    router.refresh();
  };

  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#040404] px-5 py-12 sm:px-8">
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.88),rgba(0,0,0,0.96))]" />

      <motion.div
        variants={adminFadeVariants}
        initial="hidden"
        animate="show"
        className="relative w-full max-w-md rounded-md border border-[#ffffff24] bg-[#070707]/92 px-6 py-8 shadow-[0_22px_42px_rgba(0,0,0,0.72)] sm:px-8"
      >
        <div className="mb-6 flex flex-col items-center gap-3">
          <Image src="/LOGO_RKT.jpg" alt="RKT" width={160} height={80} className="h-auto w-28 sm:w-36" priority />
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#ffd100] sm:text-sm">Acceso Privado</p>
        </div>

        <form onSubmit={onSubmit} className="space-y-4">
          <div>
            <label htmlFor="username" className="mb-2 block text-xs font-semibold uppercase tracking-[0.1em] text-[#d8d8d8] sm:text-sm">
              Usuario
            </label>
            <input
              id="username"
              value={username}
              onChange={(event) => setUsername(event.target.value)}
              className="w-full rounded-md border border-[#5d5d5d] bg-[#0d0d0d] px-4 py-3 text-sm text-white outline-none transition-all focus:border-[#ffd100] focus:shadow-[0_0_10px_rgba(255,209,0,0.18)]"
              required
            />
          </div>

          <div>
            <label htmlFor="password" className="mb-2 block text-xs font-semibold uppercase tracking-[0.1em] text-[#d8d8d8] sm:text-sm">
              Contraseña
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className="w-full rounded-md border border-[#5d5d5d] bg-[#0d0d0d] px-4 py-3 text-sm text-white outline-none transition-all focus:border-[#ffd100] focus:shadow-[0_0_10px_rgba(255,209,0,0.18)]"
              required
            />
          </div>

          {error ? <p className="text-xs text-[#e5cf6e]">{error}</p> : null}

          <motion.button
            type="submit"
            disabled={isLoading}
            className="inline-flex w-full items-center justify-center rounded-md bg-[#ffd100] px-5 py-4 text-sm font-black uppercase tracking-[0.08em] text-black shadow-[0_14px_0_rgba(0,0,0,0.6)] disabled:opacity-70"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
          >
            {isLoading ? "Validando acceso..." : "Entrar al Panel"}
          </motion.button>
        </form>
      </motion.div>
    </section>
  );
}
