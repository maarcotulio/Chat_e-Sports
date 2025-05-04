"use client";

import { Button } from "@/app/auth/components/ui/button";
import { Input } from "@/app/auth/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import useStore from "@/store";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import { toast } from "react-toastify";

interface ChangeAvatarProps {
  userId: string;
  open: boolean;
  setOpen: (open: boolean) => void;
  groupId?: string;
  setShowDetails?: (showDetails: boolean) => void;
}

export default function ChangeAvatar({
  userId,
  open,
  setOpen,
  groupId,
  setShowDetails,
}: ChangeAvatarProps) {
  const queryClient = useQueryClient();
  const setSelectedGroup = useStore((state) => state.setSelectedGroup);
  const { mutate: uploadAvatar, isPending: isLoading } = useMutation({
    mutationFn: async (formData: FormData) => {
      const res = await fetch("/api/avatar", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        const data = await res.json();
        toast.error(data.error);
      } else {
        toast.success("Avatar salvo com sucesso");
      }

      setOpen(false);
      if (groupId) {
        queryClient.invalidateQueries({ queryKey: ["groups"] });
        setSelectedGroup(null);
      }
      queryClient.invalidateQueries({ queryKey: ["groupMessages"] });

      setShowDetails?.(false);

      return res.json();
    },
  });

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fileInput = e.currentTarget.file as HTMLInputElement;
    if (!fileInput?.files?.[0]) return;

    const formData = new FormData();
    formData.append("file", fileInput.files[0]);
    formData.append("userId", userId);
    if (groupId) {
      formData.append("groupId", groupId);
    }

    uploadAvatar(formData);
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogTitle>Change Avatar</DialogTitle>
        <DialogDescription>Selecione uma imagem</DialogDescription>

        <form onSubmit={handleSubmit} className="space-y-4 ">
          <Input type="file" name="file" accept="image/*" required />
          <div className="flex justify-end items-center">
            <Button
              type="submit"
              disabled={isLoading}
              className="flex justify-end items-center"
            >
              {isLoading ? (
                <Loader2 size={20} className="animate-spin" />
              ) : (
                "Enviar"
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
