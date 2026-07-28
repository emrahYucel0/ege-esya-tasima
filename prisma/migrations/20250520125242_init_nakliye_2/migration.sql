-- AlterTable
ALTER TABLE `about` MODIFY `title` VARCHAR(191) NULL,
    MODIFY `subtitle` VARCHAR(191) NULL,
    MODIFY `content` TEXT NULL,
    MODIFY `image` VARCHAR(191) NULL,
    MODIFY `createdAt` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),
    MODIFY `updatedAt` DATETIME(3) NULL;

-- AlterTable
ALTER TABLE `advancedplan` MODIFY `planName` VARCHAR(191) NULL,
    MODIFY `price` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `advancedplantype` MODIFY `description` TEXT NULL;

-- AlterTable
ALTER TABLE `basicplan` MODIFY `planName` VARCHAR(191) NULL,
    MODIFY `price` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `basicplantype` MODIFY `description` TEXT NULL;

-- AlterTable
ALTER TABLE `card` MODIFY `title` VARCHAR(191) NULL,
    MODIFY `subtitle` VARCHAR(191) NULL,
    MODIFY `blockquote` TEXT NULL,
    MODIFY `image` VARCHAR(191) NULL,
    MODIFY `createdAt` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),
    MODIFY `updatedAt` DATETIME(3) NULL;

-- AlterTable
ALTER TABLE `carditem` MODIFY `iconPath` VARCHAR(191) NULL,
    MODIFY `title` VARCHAR(191) NULL,
    MODIFY `description` TEXT NULL,
    MODIFY `order` INTEGER NULL,
    MODIFY `createdAt` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),
    MODIFY `updatedAt` DATETIME(3) NULL;

-- AlterTable
ALTER TABLE `fact` MODIFY `subtitle` VARCHAR(191) NULL,
    MODIFY `title` VARCHAR(191) NULL,
    MODIFY `description` TEXT NULL,
    MODIFY `phoneLabel` VARCHAR(191) NULL,
    MODIFY `phone` VARCHAR(191) NULL,
    MODIFY `createdAt` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),
    MODIFY `updatedAt` DATETIME(3) NULL;

-- AlterTable
ALTER TABLE `factstatistic` MODIFY `title` VARCHAR(191) NULL,
    MODIFY `createdAt` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3);

-- AlterTable
ALTER TABLE `faq` MODIFY `title` VARCHAR(191) NULL,
    MODIFY `subtitle` VARCHAR(191) NULL,
    MODIFY `createdAt` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),
    MODIFY `updatedAt` DATETIME(3) NULL;

-- AlterTable
ALTER TABLE `faqitem` MODIFY `question` VARCHAR(191) NULL,
    MODIFY `answer` TEXT NULL,
    MODIFY `open` BOOLEAN NULL DEFAULT false,
    MODIFY `createdAt` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),
    MODIFY `updatedAt` DATETIME(3) NULL;

-- AlterTable
ALTER TABLE `feature` MODIFY `subtitle` VARCHAR(191) NULL,
    MODIFY `title` VARCHAR(191) NULL,
    MODIFY `image` VARCHAR(191) NULL,
    MODIFY `createdAt` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3);

-- AlterTable
ALTER TABLE `featuretype` MODIFY `title` VARCHAR(191) NULL,
    MODIFY `description` TEXT NULL;

-- AlterTable
ALTER TABLE `footer` MODIFY `address` VARCHAR(191) NULL,
    MODIFY `phone` VARCHAR(191) NULL,
    MODIFY `email` VARCHAR(191) NULL,
    MODIFY `copyright` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `footerbloglink` MODIFY `name` VARCHAR(191) NULL,
    MODIFY `url` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `footerregionlink` MODIFY `name` VARCHAR(191) NULL,
    MODIFY `url` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `footersociallink` MODIFY `name` VARCHAR(191) NULL,
    MODIFY `url` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `heropage` MODIFY `title` VARCHAR(191) NULL,
    MODIFY `subtitle` VARCHAR(191) NULL,
    MODIFY `description` TEXT NULL,
    MODIFY `primaryButton` VARCHAR(191) NULL,
    MODIFY `primaryLink` VARCHAR(191) NULL,
    MODIFY `secondaryButton` VARCHAR(191) NULL,
    MODIFY `secondaryLink` VARCHAR(191) NULL,
    MODIFY `image` VARCHAR(191) NULL,
    MODIFY `createdAt` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3);

-- AlterTable
ALTER TABLE `meta` MODIFY `page` VARCHAR(191) NULL,
    MODIFY `title` VARCHAR(191) NULL,
    MODIFY `createdAt` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),
    MODIFY `updatedAt` DATETIME(3) NULL;

-- AlterTable
ALTER TABLE `navbar` MODIFY `title` VARCHAR(191) NULL,
    MODIFY `subtitle` VARCHAR(191) NULL,
    MODIFY `phone` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `post` MODIFY `author` VARCHAR(191) NULL,
    MODIFY `slug` VARCHAR(191) NULL,
    MODIFY `content` TEXT NULL,
    MODIFY `excerpt` TEXT NULL,
    MODIFY `image` VARCHAR(191) NULL,
    MODIFY `createdAt` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),
    MODIFY `updatedAt` DATETIME(3) NULL;

-- AlterTable
ALTER TABLE `pricingplan` MODIFY `subtitle` VARCHAR(191) NULL,
    MODIFY `title` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `quicklink` MODIFY `name` VARCHAR(191) NULL,
    MODIFY `url` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `quoterequest` MODIFY `subtitle` VARCHAR(191) NULL,
    MODIFY `title` VARCHAR(191) NULL,
    MODIFY `description` TEXT NULL,
    MODIFY `phoneLabel` VARCHAR(191) NULL,
    MODIFY `phone` VARCHAR(191) NULL,
    MODIFY `createdAt` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),
    MODIFY `updatedAt` DATETIME(3) NULL;

-- AlterTable
ALTER TABLE `region` MODIFY `content` TEXT NULL,
    MODIFY `excerpt` TEXT NULL,
    MODIFY `image` VARCHAR(191) NULL,
    MODIFY `createdAt` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),
    MODIFY `updatedAt` DATETIME(3) NULL;

-- AlterTable
ALTER TABLE `service` MODIFY `title` VARCHAR(191) NULL,
    MODIFY `subtitle` VARCHAR(191) NULL,
    MODIFY `blockquote` TEXT NULL,
    MODIFY `createdAt` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),
    MODIFY `updatedAt` DATETIME(3) NULL;

-- AlterTable
ALTER TABLE `servicecard` MODIFY `content` TEXT NULL,
    MODIFY `cardTitle` VARCHAR(191) NULL,
    MODIFY `cardDescription` TEXT NULL,
    MODIFY `createdAt` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),
    MODIFY `updatedAt` DATETIME(3) NULL;

-- AlterTable
ALTER TABLE `standardplan` MODIFY `planName` VARCHAR(191) NULL,
    MODIFY `price` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `standardplantype` MODIFY `description` TEXT NULL;

-- AlterTable
ALTER TABLE `storedfile` MODIFY `originalName` VARCHAR(191) NULL,
    MODIFY `mimeType` VARCHAR(191) NULL,
    MODIFY `createdAt` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),
    MODIFY `updatedAt` DATETIME(3) NULL;

-- AlterTable
ALTER TABLE `testimonial` MODIFY `sectionName` VARCHAR(191) NULL DEFAULT 'testimonials',
    MODIFY `title` VARCHAR(191) NULL,
    MODIFY `subtitle` VARCHAR(191) NULL,
    MODIFY `createdAt` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3);

-- AlterTable
ALTER TABLE `testimonialdetail` MODIFY `name` VARCHAR(191) NULL,
    MODIFY `profession` VARCHAR(191) NULL,
    MODIFY `description` TEXT NULL;

-- AlterTable
ALTER TABLE `user` MODIFY `password` VARCHAR(191) NULL,
    MODIFY `role` VARCHAR(191) NULL DEFAULT 'user',
    MODIFY `createdAt` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3);
