import { Message } from "@/@types/chat";

export const groupMessages: Record<string, Message[]> = {
  g1: [
    {
      id: "m1",
      content: "Alguém online para jogar?",
      timestamp: "14:20",
      userId: "user2",
    },
    {
      id: "m2",
      content: "Estou disponível depois das 18h",
      timestamp: "14:25",
      userId: "user1",
    },
    {
      id: "m3",
      content: "Alguém pra jogar comp hoje?",
      timestamp: "14:30",
      userId: "user3",
    },
  ],
  g2: [
    {
      id: "m1",
      content: "Viram o novo trailer?",
      timestamp: "12:05",
      userId: "user4",
    },
    {
      id: "m2",
      content: "Sim, parece incrível!",
      timestamp: "12:10",
      userId: "user1",
    },
    {
      id: "m3",
      content: "Novo agente confirmado!",
      timestamp: "12:15",
      userId: "user5",
    },
  ],
  g3: [
    {
      id: "m1",
      content: "O que acharam do novo campeão?",
      timestamp: "09:45",
      userId: "user3",
    },
    {
      id: "m2",
      content: "Muito OP, vão nerfar na próxima atualização",
      timestamp: "10:00",
      userId: "user2",
    },
    {
      id: "m3",
      content: "Análise do patch 14.8",
      timestamp: "10:15",
      userId: "user4",
    },
  ],
};
