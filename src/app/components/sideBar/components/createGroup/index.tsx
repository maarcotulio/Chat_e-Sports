import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/app/auth/components/ui/input";
import { Button } from "@/app/auth/components/ui/button";

import { useCreateGroup } from "./useCreateGroup";
import { LoaderCircle } from "lucide-react";

export function CreateGroup({
  isCreateGroupOpen,
  setIsCreateGroupOpen,
}: {
  isCreateGroupOpen: boolean;
  setIsCreateGroupOpen: (isOpen: boolean) => void;
}) {
  const { groupName, setGroupName, handleCreateGroup, isCreatingGroup } =
    useCreateGroup({
      isCreateGroupOpen,
      setIsCreateGroupOpen,
    });

  return (
    <Dialog open={isCreateGroupOpen} onOpenChange={setIsCreateGroupOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Criando grupo</DialogTitle>
          <DialogDescription>
            Crie um grupo para compartilhar com seus amigos
          </DialogDescription>
        </DialogHeader>
        <Input
          type="text"
          placeholder="Nome do grupo"
          value={groupName}
          onChange={(e) => setGroupName(e.target.value)}
        />
        <Button onClick={handleCreateGroup} disabled={isCreatingGroup}>
          {isCreatingGroup ? (
            <LoaderCircle className="animate-spin" />
          ) : (
            "Criar"
          )}
        </Button>
      </DialogContent>
    </Dialog>
  );
}
