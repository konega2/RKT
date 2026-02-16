-- CreateEnum
CREATE TYPE "Estado" AS ENUM ('PENDIENTE', 'CONFIRMADO');

-- CreateTable
CREATE TABLE "PreInscripcion" (
    "id" TEXT NOT NULL,
    "nombre" TEXT NOT NULL,
    "telefono" TEXT NOT NULL,
    "identidad" TEXT NOT NULL,
    "edad" INTEGER NOT NULL,
    "email" TEXT NOT NULL,
    "seguroAceptado" BOOLEAN NOT NULL,
    "imagenAceptada" BOOLEAN NOT NULL,
    "responsabilidad" BOOLEAN NOT NULL,
    "estado" "Estado" NOT NULL DEFAULT 'PENDIENTE',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "PreInscripcion_pkey" PRIMARY KEY ("id")
);
