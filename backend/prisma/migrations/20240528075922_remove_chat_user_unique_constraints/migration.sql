-- DropIndex
DROP INDEX "ChatUser_chatUID_key";

-- DropIndex
DROP INDEX "ChatUser_userUUID_key";

-- AlterTable
ALTER TABLE "ChatUser" ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "ChatUser_pkey" PRIMARY KEY ("id");
