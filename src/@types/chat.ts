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
  timestamp: Date;
  userId: string;
  user?: User;
};

export type User = {
  id: string;
  name: string;
  avatar: string;
};
