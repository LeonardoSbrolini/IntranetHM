-- AlterTable
ALTER TABLE "Customer" ALTER COLUMN "cpf" SET DATA TYPE BIGINT,
ALTER COLUMN "phone" SET DATA TYPE BIGINT,
ALTER COLUMN "cep" SET DATA TYPE BIGINT;

-- CreateTable
CREATE TABLE "Users" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    "company" INTEGER NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "Users_pkey" PRIMARY KEY ("id")
);
