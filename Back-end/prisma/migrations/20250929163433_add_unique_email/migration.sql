/*
  Warnings:

  - A unique constraint covering the columns `[email]` on the table `Cliente` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[numero]` on the table `Cliente` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `numero` to the `Cliente` table without a default value. This is not possible if the table is not empty.
  - Added the required column `senha` to the `Cliente` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Cliente" ADD COLUMN     "numero" TEXT NOT NULL,
ADD COLUMN     "senha" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Cliente_email_key" ON "Cliente"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Cliente_numero_key" ON "Cliente"("numero");
