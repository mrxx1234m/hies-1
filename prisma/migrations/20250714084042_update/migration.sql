/*
  Warnings:

  - You are about to drop the column `countries` on the `Job` table. All the data in the column will be lost.
  - You are about to drop the column `field` on the `Job` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `Job` table. All the data in the column will be lost.
  - Added the required column `category` to the `Job` table without a default value. This is not possible if the table is not empty.
  - Added the required column `country` to the `Job` table without a default value. This is not possible if the table is not empty.
  - Added the required column `title` to the `Job` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `Job` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Job" DROP COLUMN "countries",
DROP COLUMN "field",
DROP COLUMN "name",
ADD COLUMN     "category" TEXT NOT NULL,
ADD COLUMN     "country" TEXT NOT NULL,
ADD COLUMN     "title" TEXT NOT NULL,
ADD COLUMN     "userId" INTEGER NOT NULL,
ALTER COLUMN "logotip" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Job" ADD CONSTRAINT "Job_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
