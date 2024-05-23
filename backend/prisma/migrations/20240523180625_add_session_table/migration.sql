-- CreateTable
CREATE TABLE "Session" (
    "token" TEXT NOT NULL,
    "isRefreshToken" BOOLEAN NOT NULL,

    CONSTRAINT "Session_pkey" PRIMARY KEY ("token")
);
