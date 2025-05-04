import useStore from "@/store";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { toast } from "react-toastify";

export function useCreateGroup({
  isCreateGroupOpen,
  setIsCreateGroupOpen,
}: {
  isCreateGroupOpen: boolean;
  setIsCreateGroupOpen: (isOpen: boolean) => void;
}) {
  const [groupName, setGroupName] = useState("");
  const queryClient = useQueryClient();
  const { mutate: createGroup } = useMutation({
    mutationKey: ["createGroup"],
    mutationFn: async () => {
      await fetch(`/api/groups/${user!.id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name: groupName }),
      });
    },
    onSuccess: () => {
      setIsCreateGroupOpen(false);
      setGroupName("");
      queryClient.invalidateQueries({ queryKey: ["groups"] });
    },
  });
  const user = useStore((state) => state.user);

  const handleCreateGroup = async () => {
    try {
      createGroup();
      toast.success("Grupo criado com sucesso");
    } catch (error) {
      toast.error("Erro ao criar grupo");
    }
  };

  return { groupName, setGroupName, handleCreateGroup };
}
