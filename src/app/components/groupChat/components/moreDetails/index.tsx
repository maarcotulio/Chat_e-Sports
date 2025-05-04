import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Loader2, LogOut, Trash2, UserPlus2 } from "lucide-react";
import ListMembers from "./components/listMembers";

import { Avatar } from "@/components/ui/avatar";
import { AvatarFallback } from "@/components/ui/avatar";
import AddUser from "./components/addUser";
import { useMoreDetails } from "./useMoreDetails";

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
  } = useMoreDetails({
    setShowDetails,
  });

  return (
    <>
      <Dialog open={showDetails} onOpenChange={setShowDetails}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Detalhes do grupo</DialogTitle>
            <div className="flex flex-col my-8 items-center justify-center gap-2">
              <div className="w-15 h-15 rounded-full bg-gray-800 flex items-center justify-center text-gray-100 font-bold">
                {selectedGroup?.icon}
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
    </>
  );
}
