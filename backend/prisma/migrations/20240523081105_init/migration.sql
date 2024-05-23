-- CreateTable
CREATE TABLE "User" (
    "username" TEXT NOT NULL,
    "UUID" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("UUID")
);

-- CreateTable
CREATE TABLE "Chat" (
    "UID" TEXT NOT NULL,

    CONSTRAINT "Chat_pkey" PRIMARY KEY ("UID")
);

-- CreateTable
CREATE TABLE "ChatUser" (
    "chatUID" TEXT NOT NULL,
    "userUUID" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Message" (
    "UID" TEXT NOT NULL,
    "chatUID" TEXT NOT NULL,
    "senderUUID" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "timestamp" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Message_pkey" PRIMARY KEY ("UID")
);

-- CreateIndex
CREATE UNIQUE INDEX "ChatUser_chatUID_key" ON "ChatUser"("chatUID");

-- CreateIndex
CREATE UNIQUE INDEX "ChatUser_userUUID_key" ON "ChatUser"("userUUID");

-- CreateIndex
CREATE UNIQUE INDEX "Message_chatUID_key" ON "Message"("chatUID");

-- CreateIndex
CREATE UNIQUE INDEX "Message_senderUUID_key" ON "Message"("senderUUID");

-- AddForeignKey
ALTER TABLE "ChatUser" ADD CONSTRAINT "ChatUser_chatUID_fkey" FOREIGN KEY ("chatUID") REFERENCES "Chat"("UID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ChatUser" ADD CONSTRAINT "ChatUser_userUUID_fkey" FOREIGN KEY ("userUUID") REFERENCES "User"("UUID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Message" ADD CONSTRAINT "Message_chatUID_fkey" FOREIGN KEY ("chatUID") REFERENCES "Chat"("UID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Message" ADD CONSTRAINT "Message_senderUUID_fkey" FOREIGN KEY ("senderUUID") REFERENCES "User"("UUID") ON DELETE RESTRICT ON UPDATE CASCADE;
