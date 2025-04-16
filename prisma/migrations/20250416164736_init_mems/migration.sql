-- CreateTable
CREATE TABLE "Mem" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "desc" TEXT NOT NULL,
    "likes" INTEGER NOT NULL,

    CONSTRAINT "Mem_pkey" PRIMARY KEY ("id")
);
