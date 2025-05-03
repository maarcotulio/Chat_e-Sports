import { formatDate } from "@/app/utils/formatDate";
import { AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Avatar } from "@/components/ui/avatar";
import useStore from "@/store";
import { Message as MessageType, User } from "@prisma/client";

interface Message extends MessageType {
  user?: User;
}

export default function MessageArea({ messages }: { messages: Message[] }) {
  if (!messages) {
    return null;
  }

  const currentUser = useStore((state) => state.user);

  return (
    <div className="space-y-3">
      {messages.map((message) => {
        const { user } = message;
        const isCurrentUser = message.userId === currentUser?.id;

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
                  <Avatar>
                    <AvatarImage src={user!.image || undefined} />
                    <AvatarFallback>{user!.name?.charAt(0)}</AvatarFallback>
                  </Avatar>
                </div>
              )}
              <div
                className={`rounded-lg py-2 px-3 ${
                  isCurrentUser
                    ? "bg-gray-200 text-black rounded-tr-none"
                    : "bg-gray-800 text-white rounded-tl-none"
                }`}
              >
                {!isCurrentUser && user?.name && (
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
                  {formatDate(new Date(message.createdAt))}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
