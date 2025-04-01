import { formatDate } from "@/lib/utils/dateFormat";
import ActionIcon from "@/components/ui/actionIcon";
import { FaEdit, FaTrash } from "react-icons/fa";
import { ReactNode, useState } from "react";
import { KanbanBase } from "@/types/kanbanBase";
import FormModal from "@/components/ui/modals/formModal";
import ConfirmModal from "@/components/ui/modals/confirmModal";
import UpdateFormProps from "@/types/forms/updateFormProps";

interface BaseCardProps<T extends KanbanBase> {
  item: T;
  onDelete: () => void;
  t: (key: string) => string;
  additionalActions?: ReactNode;
  additionalProperties?: ReactNode;
  additionalModals?: ReactNode;
  UpdateFormComponent: React.ComponentType<UpdateFormProps<T>>;
  translations: {
    edit: string;
    delete: string;
    deleteConfirm: string;
  };
}

export default function BaseCard<T extends KanbanBase>({
  item,
  onDelete,
  t,
  additionalActions,
  additionalProperties,
  additionalModals,
  UpdateFormComponent,
  translations,
}: BaseCardProps<T>) {
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  return (
    <>
      <div className="bg-slate-700 border border-slate-700 shadow-md rounded-md p-4 min-h-[200px] drop-shadow-3xl break-words h-full">
        <div className="flex flex-col h-full">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-3">
            <h2 className="text-xl font-bold text-foreground max-w-full order-2 sm:order-1">
              {item.name}
            </h2>
            <div className="flex flex-wrap gap-2 order-1 sm:order-2">
              {additionalActions}
              <ActionIcon
                variant="blue"
                Icon={FaEdit}
                onClick={() => setIsUpdateModalOpen(true)}
                text={t(translations.edit)}
              />
              <ActionIcon
                variant="danger"
                Icon={FaTrash}
                onClick={() => setIsDeleteModalOpen(true)}
                text={t(translations.delete)}
              />
            </div>
          </div>
          <div className="flex flex-col flex-1 justify-between gap-2">
            <div className="space-y-2">
              <p className="text-muted-foreground">{item.description}</p>
              {additionalProperties}
            </div>
            <div className="space-y-2">
              <p className="text-muted-foreground">
                <strong>{t("common.properties.createdAt")}:</strong>{" "}
                {formatDate(item.createdAt)}
              </p>
              <p className="text-muted-foreground">
                <strong>{t("common.properties.updatedAt")}:</strong>{" "}
                {formatDate(item.updatedAt)}
              </p>
            </div>
          </div>
        </div>
      </div>
      <FormModal
        isOpen={isUpdateModalOpen}
        onClose={() => setIsUpdateModalOpen(false)}
        header={t(translations.edit)}
      >
        <UpdateFormComponent
          onSubmit={() => setIsUpdateModalOpen(false)}
          item={item}
        />
      </FormModal>
      <ConfirmModal
        header={t(translations.delete)}
        message={t(translations.deleteConfirm)}
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={onDelete}
      />
      {additionalModals}
    </>
  );
}
