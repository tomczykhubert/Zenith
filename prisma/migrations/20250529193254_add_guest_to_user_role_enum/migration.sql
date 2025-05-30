-- AlterEnum
ALTER TYPE "UserRole" ADD VALUE 'GUEST';

-- AlterTable
ALTER TABLE "user" ALTER COLUMN "role" DROP NOT NULL;
