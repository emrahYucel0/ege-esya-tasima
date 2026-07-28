-- AlterTable
ALTER TABLE `region` ADD COLUMN `priceFactors` JSON NULL,
    ADD COLUMN `priceFactorsImage` VARCHAR(191) NULL,
    ADD COLUMN `priceFactorsTitle` VARCHAR(191) NULL;
