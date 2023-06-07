-- DropForeignKey
ALTER TABLE `recipe` DROP FOREIGN KEY `Recipe_userId_fkey`;

-- AddForeignKey
ALTER TABLE `Recipe` ADD CONSTRAINT `Recipe_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
