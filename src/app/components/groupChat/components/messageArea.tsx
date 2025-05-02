import { Message } from "@/@types/chat";
import { currentUser } from "@/mock/users";

import { users } from "@/mock/users";

export default function MessageArea({ messages }: { messages: Message[] }) {
  const findUser = (userId: string) => {
    return users.find((user) => user.id === userId) || currentUser;
  };

  return (
    <div className="space-y-3">
      {messages.map((message) => {
        const user = findUser(message.userId);
        const isCurrentUser = user.id === currentUser.id;

        return (
          <div
            key={message.id}
            className={`flex ${
              isCurrentUser ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`flex max-w-xs md:max-w-md ${
                isCurrentUser ? "flex-row-reverse" : "flex-row"
              }`}
            >
              {!isCurrentUser && (
                <div className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center text-cyan-400 font-bold flex-shrink-0 mr-2">
                  {user.avatar}
                </div>
              )}
              <div
                className={`rounded-lg py-2 px-3 ${
                  isCurrentUser
                    ? "bg-gray-200 text-black rounded-tr-none"
                    : "bg-gray-800 text-white rounded-tl-none"
                }`}
              >
                {!isCurrentUser && (
                  <p className="text-xs font-medium text-cyan-400 mb-1">
                    {user.name}
                  </p>
                )}
                <p className="text-sm">{message.content}</p>
                <p
                  className={`text-right text-xs ${
                    isCurrentUser ? "text-gray-600" : "text-gray-500"
                  } mt-1`}
                >
                  {message.timestamp}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
