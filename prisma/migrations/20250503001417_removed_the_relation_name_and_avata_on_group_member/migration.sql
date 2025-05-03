/*
  Warnings:

  - You are about to drop the column `user_avatar` on the `GroupMember` table. All the data in the column will be lost.
  - You are about to drop the column `user_name` on the `GroupMember` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "GroupMember" DROP COLUMN "user_avatar",
DROP COLUMN "user_name";
