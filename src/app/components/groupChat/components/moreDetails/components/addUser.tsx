import { Button } from "@/app/auth/components/ui/button";
import { Input } from "@/app/auth/components/ui/input";
import {
  Dialog,
  DialogTitle,
  DialogHeader,
  DialogContent,
  DialogDescription,
} from "@/components/ui/dialog";
import useStore from "@/store";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { toast } from "react-toastify";

export default function AddUser({
  showAddUser,
  setShowAddUser,
  setShowDetails,
}: {
  showAddUser: boolean;
  setShowAddUser: (showAddUser: boolean) => void;
  setShowDetails: (showDetails: boolean) => void;
}) {
  const queryClient = useQueryClient();
  const userId = useStore((state) => state.user?.id);
  const { mutate: addUser, isPending: isAddingUser } = useMutation({
    mutationKey: ["addUser"],
    mutationFn: async () => {
      const response = await fetch(
        `/api/groups/${userId}/${selectedGroup?.id}/addUser`,
        {
          method: "POST",
          body: JSON.stringify({ email }),
        }
      );
      const data = await response.json();

      if (response.ok) {
        toast.success(data);
      } else {
        toast.error(data);
      }

      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["groups"] });
      queryClient.invalidateQueries({ queryKey: ["members"] });
    },
  });
  const [email, setEmail] = useState("");
  const selectedGroup = useStore((state) => state.selectedGroup);
  const handleAddUser = async () => {
    addUser();
  };

  return (
    <Dialog open={showAddUser} onOpenChange={setShowAddUser}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Adicionar membro</DialogTitle>
        </DialogHeader>
        <DialogDescription>
          Adicione um membro ao grupo utilizando o email do usuário.
        </DialogDescription>
        <div className="flex gap-4 flex-col">
          <Input
            type="text"
            placeholder="Digite o email do membro"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Button
            disabled={isAddingUser}
            onClick={() => {
              handleAddUser();
              setShowAddUser(false);
              setShowDetails(false);
            }}
          >
            {isAddingUser ? <Loader2 className="animate-spin" /> : "Adicionar"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
