import { User } from "lucide-react";
import useStore from "@/store";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function ListMembers() {
  const members = useStore((state) => state.members);
  return (
    <>
      {members.map((member) => (
        <div
          key={member.id}
          className="hover:bg-gray-800 hover:cursor-pointer text-white p-2 rounded-md flex gap-2 items-center"
        >
          <Avatar>
            <AvatarImage src={member.user.image || undefined} />
            <AvatarFallback>{member.user.name.charAt(0)}</AvatarFallback>
          </Avatar>

          {member.user.name}
        </div>
      ))}
    </>
  );
}
