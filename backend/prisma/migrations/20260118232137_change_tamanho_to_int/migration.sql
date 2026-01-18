/*
  Warnings:

  - You are about to alter the column `tamanho` on the `Foto` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.

*/
-- AlterTable
ALTER TABLE "Foto" ALTER COLUMN "tamanho" SET DATA TYPE INTEGER;
