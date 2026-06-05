"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import Button from "@/components/ui/Button";
import Modal from "@/components/ui/Modal";
import CreateUserForm from "./CreateUserForm";

export default function CreateUserModal() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setOpen(true)}>
        <Plus size={16} /> Create user
      </Button>

      <Modal open={open} onClose={() => setOpen(false)} title="Create a new user">
        <CreateUserForm onSuccess={() => setTimeout(() => setOpen(false), 600)} />
      </Modal>
    </>
  );
}
