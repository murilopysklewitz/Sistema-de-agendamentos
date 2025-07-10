/*
  Warnings:

  - Made the column `descricao` on table `Servico` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Servico" ALTER COLUMN "descricao" SET NOT NULL;
