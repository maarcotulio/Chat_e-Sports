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
import { useState } from "react";
import useStore from "@/store";

export function CreateGroup({
  isCreateGroupOpen,
  setIsCreateGroupOpen,
}: {
  isCreateGroupOpen: boolean;
  setIsCreateGroupOpen: (isOpen: boolean) => void;
}) {
  const [groupName, setGroupName] = useState("");
  const user = useStore((state) => state.user);

  const handleCreateGroup = async () => {
    const response = await fetch(`/api/groups/${user!.id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name: groupName }),
    });

    if (response.ok) {
      setIsCreateGroupOpen(false);
      setGroupName("");
    }
  };

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
        <Button onClick={handleCreateGroup}>Criar</Button>
      </DialogContent>
    </Dialog>
  );
}
