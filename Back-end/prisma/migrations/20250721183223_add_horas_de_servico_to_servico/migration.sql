/*
  Warnings:

  - You are about to drop the `Agendamento` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_AgendamentoToServico` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_AgendamentoToServico" DROP CONSTRAINT "_AgendamentoToServico_A_fkey";

-- DropForeignKey
ALTER TABLE "_AgendamentoToServico" DROP CONSTRAINT "_AgendamentoToServico_B_fkey";

-- AlterTable
ALTER TABLE "Servico" ADD COLUMN     "horasDeServico" INTEGER;

-- DropTable
DROP TABLE "Agendamento";

-- DropTable
DROP TABLE "_AgendamentoToServico";

-- CreateTable
CREATE TABLE "Carrinho" (
    "id" TEXT NOT NULL,

    CONSTRAINT "Carrinho_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ItemCarrinho" (
    "id" TEXT NOT NULL,
    "quantidade" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "servicoId" TEXT NOT NULL,
    "carrinhoId" TEXT NOT NULL,

    CONSTRAINT "ItemCarrinho_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ItemCarrinho" ADD CONSTRAINT "ItemCarrinho_servicoId_fkey" FOREIGN KEY ("servicoId") REFERENCES "Servico"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ItemCarrinho" ADD CONSTRAINT "ItemCarrinho_carrinhoId_fkey" FOREIGN KEY ("carrinhoId") REFERENCES "Carrinho"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
