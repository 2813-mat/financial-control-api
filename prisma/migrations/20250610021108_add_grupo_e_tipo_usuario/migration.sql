-- CreateEnum
CREATE TYPE "TipoUsuario" AS ENUM ('ADMIN', 'CONTROLADOR', 'COMUM');

-- AlterTable
ALTER TABLE "Usuario" ADD COLUMN     "grupoId" INTEGER,
ADD COLUMN     "tipo" "TipoUsuario" NOT NULL DEFAULT 'COMUM';

-- CreateTable
CREATE TABLE "Grupo" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "criadoEm" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Grupo_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Usuario" ADD CONSTRAINT "Usuario_grupoId_fkey" FOREIGN KEY ("grupoId") REFERENCES "Grupo"("id") ON DELETE SET NULL ON UPDATE CASCADE;
