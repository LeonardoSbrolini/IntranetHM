-- CreateTable
CREATE TABLE "Customer" (
    "id" SERIAL NOT NULL,
    "image" TEXT,
    "name" TEXT NOT NULL,
    "age" INTEGER NOT NULL,
    "cpf" BIGINT NOT NULL,
    "phone" BIGINT NOT NULL,
    "cep" BIGINT NOT NULL,
    "sex" TEXT NOT NULL,
    "createAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "status" TEXT NOT NULL,

    CONSTRAINT "Customer_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Customer_cpf_key" ON "Customer"("cpf");
