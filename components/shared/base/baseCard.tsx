import { formatDate } from "@/lib/utils/dateFormat";
import { ReactNode } from "react";
import { KanbanBase } from "@/types/kanbanBase";
import UpdateFormProps from "@/types/props/updateFormProps";
import ConfirmModal from "../elements/modals/confirmModal";
import ActionButton from "../elements/actionButton";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { LuTrash2 } from "react-icons/lu";

interface BaseCardProps<T extends KanbanBase> {
  item: T;
  onDelete: () => void;
  t: (key: string) => string;
  additionalActions?: ReactNode;
  additionalProperties?: ReactNode;
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
  UpdateFormComponent,
  translations,
}: BaseCardProps<T>) {
  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
          <CardTitle className="break-all">{item.name}</CardTitle>
          <div className="flex flex-wrap gap-2 order-1 sm:order-2">
            {additionalActions}
            <UpdateFormComponent item={item} />
            <ConfirmModal
              header={t(translations.delete)}
              message={t(translations.deleteConfirm)}
              onConfirm={onDelete}
              trigger={
                <ActionButton
                  variant="destructive"
                  size="icon"
                  tooltip={t(translations.delete)}
                >
                  <LuTrash2 />
                </ActionButton>
              }
            />
          </div>
        </div>
      </CardHeader>

      <CardContent className="break-all">
        <div>
          <p>{item.description}</p>
          {additionalProperties}
        </div>
      </CardContent>

      <CardFooter className="flex-col items-start">
        <p>
          <strong>{t("common.properties.createdAt")}:</strong>{" "}
          {formatDate(item.createdAt)}
        </p>
        <p>
          <strong>{t("common.properties.updatedAt")}:</strong>{" "}
          {formatDate(item.updatedAt)}
        </p>
      </CardFooter>
    </Card>
  );
}
