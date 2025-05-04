import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ImageIcon, Loader2, LogOut, Trash2, UserPlus2 } from "lucide-react";
import ListMembers from "./components/listMembers";

import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { AvatarFallback } from "@/components/ui/avatar";
import AddUser from "./components/addUser";
import { useMoreDetails } from "./useMoreDetails";
import ChangeAvatar from "@/app/components/changeAvatar";

export default function MoreDetails({
  showDetails,
  setShowDetails,
}: {
  showDetails: boolean;
  setShowDetails: (showDetails: boolean) => void;
}) {
  const {
    selectedGroup,
    members,
    isAdmin,
    showAddUser,
    setShowAddUser,
    deleteOrLeaveGroup,
    isDeletingGroup,
    setShowChangeGroupAvatar,
    showChangeGroupAvatar,
    userId,
  } = useMoreDetails({
    setShowDetails,
  });

  if (isDeletingGroup) {
    return (
      <div className="flex items-center justify-center bg-gray-900/80 h-full w-full absolute top-0 left-0 flex-col gap-2">
        <Loader2 className="animate-spin" size={28} />
        <p className="text-gray-100">Aguarde...</p>
      </div>
    );
  }

  return (
    <>
      <Dialog open={showDetails} onOpenChange={setShowDetails}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Detalhes do grupo</DialogTitle>
            <div className="flex flex-col my-8 items-center justify-center gap-2">
              <div className="relative w-28 h-28 group cursor-pointer">
                <Avatar className="w-full h-full">
                  <AvatarImage
                    src={selectedGroup?.icon || ""}
                    alt="Group image"
                  />
                  <AvatarFallback>👥</AvatarFallback>
                </Avatar>
                <div
                  className="
          absolute inset-0 
          bg-black bg-opacity-50 
          flex items-center justify-center 
          text-white font-
          text-sm flex gap-2 flex-col
          opacity-0 group-hover:opacity-100 
          transition-opacity duration-200
        "
                  aria-label="Mudar a imagem do grupo"
                  onClick={() => {
                    setShowChangeGroupAvatar(true);
                  }}
                >
                  <ImageIcon />
                  Mudar a imagem do grupo
                </div>
              </div>

              <div className="flex flex-col">
                <h1 className="text-gray-100 font-bold text-center">
                  {selectedGroup?.name}
                </h1>
                <p className="text-gray-400 text-sm text-center">
                  {members.length} membro{members.length > 1 ? "s" : ""}
                </p>
              </div>
            </div>

            <div className="flex flex-col gap-2">
              {members.length > 0 ? (
                <div className="flex flex-col gap-2 ">
                  <div
                    className="hover:bg-gray-800 hover:cursor-pointer text-gray-100 p-2 rounded-md flex gap-2 items-center"
                    onClick={() => {
                      setShowAddUser(true);
                    }}
                  >
                    <Avatar>
                      <AvatarFallback>
                        <UserPlus2 size={20} className="text-cyan-600" />
                      </AvatarFallback>
                    </Avatar>
                    Add Member
                  </div>
                  <ListMembers />
                  {isAdmin && (
                    <div
                      className="hover:bg-gray-800 hover:cursor-pointer text-gray-100 p-2 rounded-md flex gap-2 items-center"
                      onClick={() => {
                        deleteOrLeaveGroup(selectedGroup!.id);
                      }}
                    >
                      <Avatar>
                        <AvatarFallback>
                          <Trash2 size={20} className="text-red-600" />
                        </AvatarFallback>
                      </Avatar>
                      Delete Group
                    </div>
                  )}
                  {!isAdmin && (
                    <div
                      className="hover:bg-gray-800 hover:cursor-pointer text-gray-100 p-2 rounded-md flex gap-2 items-center"
                      onClick={() => {
                        deleteOrLeaveGroup(selectedGroup!.id);
                      }}
                    >
                      <Avatar>
                        <AvatarFallback>
                          <LogOut size={20} className="text-red-600" />
                        </AvatarFallback>
                      </Avatar>
                      Leave Group
                    </div>
                  )}
                </div>
              ) : (
                <div className="flex items-center justify-center">
                  <Loader2 className="animate-spin" size={20} />
                </div>
              )}
            </div>
          </DialogHeader>
        </DialogContent>
      </Dialog>
      {showAddUser && (
        <AddUser
          showAddUser={showAddUser}
          setShowAddUser={setShowAddUser}
          setShowDetails={setShowDetails}
        />
      )}

      {showChangeGroupAvatar && (
        <ChangeAvatar
          open={showChangeGroupAvatar}
          setOpen={setShowChangeGroupAvatar}
          groupId={selectedGroup?.id}
          userId={userId}
        />
      )}
    </>
  );
}
