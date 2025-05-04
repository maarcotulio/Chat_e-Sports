import useStore from "@/store";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import {
  QueryClient,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";

export function useMoreDetails({
  setShowDetails,
}: {
  setShowDetails: (showDetails: boolean) => void;
}) {
  const queryClient = useQueryClient();
  const setSelectedGroup = useStore((state) => state.setSelectedGroup);
  const { refetch: refetchMembers } = useQuery({
    queryKey: ["members"],
    queryFn: () => fetchMembers(),
  });

  const { mutate: deleteGroup, isPending: isDeletingGroup } = useMutation({
    mutationFn: (groupId: string) => {
      return fetch(`/api/groups/${user?.id}/${groupId}`, {
        method: "DELETE",
      });
    },
    onSuccess: () => {
      setSelectedGroup(null);
      queryClient.invalidateQueries({
        queryKey: ["groups"],
      });
      queryClient.invalidateQueries({
        queryKey: ["groupMessages", selectedGroup?.id],
      });

      if (isAdmin) {
        toast.success("Grupo deletado com sucesso");
      } else {
        toast.success("Você saiu do grupo com sucesso");
      }

      setShowDetails(false);
    },
  });

  const [showAddUser, setShowAddUser] = useState(false);
  const [showChangeGroupAvatar, setShowChangeGroupAvatar] = useState(false);
  const selectedGroup = useStore((state) => state.selectedGroup);
  const setMembers = useStore((state) => state.setMembers);
  const members = useStore((state) => state.members);
  const user = useStore((state) => state.user);

  useEffect(() => {
    if (selectedGroup) {
      refetchMembers();
    }
  }, [selectedGroup]);

  const isAdmin = selectedGroup?.admin === user?.id;

  const deleteOrLeaveGroup = async (groupId: string) => {
    deleteGroup(groupId);
  };

  const fetchMembers = async () => {
    const response = await fetch(`/api/members/${selectedGroup?.id}`);
    const data = await response.json();
    setMembers(data);
    return data;
  };

  return {
    selectedGroup,
    members,
    isAdmin,
    showAddUser,
    setShowAddUser,
    deleteOrLeaveGroup,
    isDeletingGroup,
    showChangeGroupAvatar,
    setShowChangeGroupAvatar,
    userId: user!.id,
  };
}
