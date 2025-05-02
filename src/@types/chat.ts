export type Group = {
  id: string;
  name: string;
  icon: string;
  lastMessage: string;
  time: string;
  unread?: number;
};

export type Message = {
  id: string;
  content: string;
  timestamp: string;
  userId: string;
};

export type User = {
  id: string;
  name: string;
  avatar: string;
};
