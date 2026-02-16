-- CreateEnum
CREATE TYPE "EstadoPiloto" AS ENUM ('ACTIVO', 'PENDIENTE_PAGO', 'BAJA');

-- CreateEnum
CREATE TYPE "Categoria" AS ENUM ('Junior', 'Senior', 'Master');

-- AlterTable
ALTER TABLE "PreInscripcion"
ADD COLUMN "confirmedAt" TIMESTAMP(3),
ADD COLUMN "confirmedBy" TEXT,
ADD COLUMN "observaciones" TEXT,
ADD COLUMN "estadoPiloto" "EstadoPiloto" NOT NULL DEFAULT 'ACTIVO',
ADD COLUMN "categoria" "Categoria",
ADD COLUMN "notasCompetitivas" TEXT;

-- CreateTable
CREATE TABLE "ComentarioInterno" (
    "id" TEXT NOT NULL,
    "pilotoId" TEXT NOT NULL,
    "contenido" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ComentarioInterno_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "ComentarioInterno_pilotoId_createdAt_idx" ON "ComentarioInterno"("pilotoId", "createdAt");

-- AddForeignKey
ALTER TABLE "ComentarioInterno" ADD CONSTRAINT "ComentarioInterno_pilotoId_fkey" FOREIGN KEY ("pilotoId") REFERENCES "PreInscripcion"("id") ON DELETE CASCADE ON UPDATE CASCADE;
