/*
  Warnings:

  - You are about to drop the column `descricao` on the `recipe` table. All the data in the column will be lost.
  - You are about to drop the column `nome` on the `recipe` table. All the data in the column will be lost.
  - You are about to drop the column `nome` on the `user` table. All the data in the column will be lost.
  - Added the required column `description` to the `Recipe` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `Recipe` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `recipe` DROP COLUMN `descricao`,
    DROP COLUMN `nome`,
    ADD COLUMN `description` VARCHAR(191) NOT NULL,
    ADD COLUMN `name` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `user` DROP COLUMN `nome`,
    ADD COLUMN `name` VARCHAR(191) NOT NULL;
