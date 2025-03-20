"use client";

import { useProjectsStore } from "@/providers/projectsProvider";
import { z } from "zod";
import { formSchema, ProjectForm } from "./projectForm";
import { collection, doc } from "firebase/firestore";
import { db } from "@/lib/firebase";

interface CreateProjectFormProps {
  onClose: () => void;
}

export default function CreateProjectForm({ onClose }: CreateProjectFormProps) {
  const addProject = useProjectsStore((state) => state.addProject);
  const handleCreate = (values: z.infer<typeof formSchema>) => {
    addProject({
      uid: doc(collection(db, "projects")).id,
      name: values.name,
      description: values.description,
    });

    onClose();
  };

  return (
    <>
      <ProjectForm onSubmit={handleCreate} />
    </>
  );
}
