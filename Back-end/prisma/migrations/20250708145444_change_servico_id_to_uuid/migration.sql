/*
  Warnings:

  - The primary key for the `Servico` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `_AgendamentoToServico` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropForeignKey
ALTER TABLE "_AgendamentoToServico" DROP CONSTRAINT "_AgendamentoToServico_B_fkey";

-- AlterTable
ALTER TABLE "Servico" DROP CONSTRAINT "Servico_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Servico_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Servico_id_seq";

-- AlterTable
ALTER TABLE "_AgendamentoToServico" DROP CONSTRAINT "_AgendamentoToServico_AB_pkey",
ALTER COLUMN "B" SET DATA TYPE TEXT,
ADD CONSTRAINT "_AgendamentoToServico_AB_pkey" PRIMARY KEY ("A", "B");

-- AddForeignKey
ALTER TABLE "_AgendamentoToServico" ADD CONSTRAINT "_AgendamentoToServico_B_fkey" FOREIGN KEY ("B") REFERENCES "Servico"("id") ON DELETE CASCADE ON UPDATE CASCADE;
