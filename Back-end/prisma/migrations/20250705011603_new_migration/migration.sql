/*
  Warnings:

  - The primary key for the `Agendamento` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `_AgendamentoToServico` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropForeignKey
ALTER TABLE "_AgendamentoToServico" DROP CONSTRAINT "_AgendamentoToServico_A_fkey";

-- AlterTable
ALTER TABLE "Agendamento" DROP CONSTRAINT "Agendamento_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Agendamento_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Agendamento_id_seq";

-- AlterTable
ALTER TABLE "Servico" ALTER COLUMN "descricao" DROP NOT NULL;

-- AlterTable
ALTER TABLE "_AgendamentoToServico" DROP CONSTRAINT "_AgendamentoToServico_AB_pkey",
ALTER COLUMN "A" SET DATA TYPE TEXT,
ADD CONSTRAINT "_AgendamentoToServico_AB_pkey" PRIMARY KEY ("A", "B");

-- AddForeignKey
ALTER TABLE "_AgendamentoToServico" ADD CONSTRAINT "_AgendamentoToServico_A_fkey" FOREIGN KEY ("A") REFERENCES "Agendamento"("id") ON DELETE CASCADE ON UPDATE CASCADE;
