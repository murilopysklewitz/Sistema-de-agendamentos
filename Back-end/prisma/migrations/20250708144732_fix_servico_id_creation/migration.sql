/*
  Warnings:

  - You are about to drop the column `Preco` on the `Servico` table. All the data in the column will be lost.
  - Added the required column `preco` to the `Servico` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Servico" DROP COLUMN "Preco",
ADD COLUMN     "preco" DOUBLE PRECISION NOT NULL;
