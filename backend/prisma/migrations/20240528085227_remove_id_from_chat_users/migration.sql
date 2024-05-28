/*
  Warnings:

  - The primary key for the `ChatUser` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `ChatUser` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "ChatUser" DROP CONSTRAINT "ChatUser_pkey",
DROP COLUMN "id",
ADD CONSTRAINT "ChatUser_pkey" PRIMARY KEY ("chatUID", "userUUID");
