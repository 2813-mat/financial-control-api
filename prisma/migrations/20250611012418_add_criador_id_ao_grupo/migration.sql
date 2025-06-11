/*
  Warnings:

  - Added the required column `criadorId` to the `Grupo` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Grupo" ADD COLUMN     "criadorId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Grupo" ADD CONSTRAINT "Grupo_criadorId_fkey" FOREIGN KEY ("criadorId") REFERENCES "Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
