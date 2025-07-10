-- CreateTable
CREATE TABLE "Job" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "field" TEXT NOT NULL,
    "countries" TEXT NOT NULL,
    "salary" DOUBLE PRECISION NOT NULL,
    "minAge" INTEGER NOT NULL,
    "maxAge" INTEGER NOT NULL,
    "duration" INTEGER NOT NULL,
    "startWork" TIMESTAMP(3) NOT NULL,
    "description" TEXT NOT NULL,
    "phone" TEXT,
    "telegram" TEXT,
    "logotip" TEXT NOT NULL,

    CONSTRAINT "Job_pkey" PRIMARY KEY ("id")
);
