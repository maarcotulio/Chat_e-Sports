import { LogOut, MoreVertical, Plus, User } from "lucide-react";
import { useState } from "react";

import {
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DropdownMenu } from "@/components/ui/dropdown-menu";
import { CreateGroup } from "./createGroup";
import { supabase } from "@/lib/supabase";
import ChangeAvatar from "../../changeAvatar";
import useStore from "@/store";

export default function Options() {
  const [isCreateGroupOpen, setIsCreateGroupOpen] = useState(false);
  const [isChangeUserAvatarOpen, setIsChangeUserAvatarOpen] = useState(false);
  const userId = useStore((state) => state.user?.id) as string;

  return (
    <div className="flex items-center space-x-2">
      <DropdownMenu>
        <DropdownMenuTrigger className="hover:cursor-pointer">
          <MoreVertical size={20} />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem
            onClick={() => setIsCreateGroupOpen(!isCreateGroupOpen)}
            className="flex justify-between gap-2 hover:cursor-pointer"
          >
            <button className="hover:cursor-pointer">Criar grupo</button>
            <Plus size={20} />
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => setIsChangeUserAvatarOpen(true)}
            className="flex justify-between gap-2 hover:cursor-pointer"
          >
            <button className="hover:cursor-pointer">Trocar avatar</button>
            <User size={20} />
          </DropdownMenuItem>
          <DropdownMenuItem
            className="flex justify-between gap-2 hover:cursor-pointer"
            onClick={async () => {
              await supabase.auth.signOut();
              window.location.href = "/auth/login";
            }}
          >
            <button className="hover:cursor-pointer">Sair</button>
            <LogOut size={20} />
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <CreateGroup
        isCreateGroupOpen={isCreateGroupOpen}
        setIsCreateGroupOpen={setIsCreateGroupOpen}
      />
      <ChangeAvatar
        open={isChangeUserAvatarOpen}
        setOpen={setIsChangeUserAvatarOpen}
        userId={userId}
        setShowDetails={setIsCreateGroupOpen}
      />
    </div>
  );
}
