import { User } from "@/@types/chat";

export const currentUser: User = {
  id: "user1",
  name: "Você",
  avatar: "U",
};

export const users: User[] = [
  currentUser,
  { id: "user2", name: "Carlos", avatar: "C" },
  { id: "user3", name: "Mariana", avatar: "M" },
  { id: "user4", name: "Felipe", avatar: "F" },
  { id: "user5", name: "Amanda", avatar: "A" },
];
