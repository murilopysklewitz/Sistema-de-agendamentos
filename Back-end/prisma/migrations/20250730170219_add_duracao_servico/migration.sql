/*
  Warnings:

  - You are about to drop the column `horasDeServico` on the `Servico` table. All the data in the column will be lost.
  - You are about to drop the `Carrinho` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ItemCarrinho` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `duracaoEmMinutos` to the `Servico` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "ItemCarrinho" DROP CONSTRAINT "ItemCarrinho_carrinhoId_fkey";

-- DropForeignKey
ALTER TABLE "ItemCarrinho" DROP CONSTRAINT "ItemCarrinho_servicoId_fkey";

-- AlterTable
ALTER TABLE "Servico" DROP COLUMN "horasDeServico",
ADD COLUMN     "duracaoEmMinutos" INTEGER ;
UPDATE "Servico" SET "duracaoEmMinutos" = 60 WHERE "duracaoEmMinutos" IS NULL;
ALTER TABLE "Servico" ALTER COLUMN "duracaoEmMinutos" SET NOT NULL;

-- DropTable
DROP TABLE "Carrinho";

-- DropTable
DROP TABLE "ItemCarrinho";
