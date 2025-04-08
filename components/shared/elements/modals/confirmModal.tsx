import React from "react";
import { useDictionary } from "@/providers/dictionaryProvider";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";

interface ModalProps {
  header: string;
  message: string;
  trigger: React.ReactElement | string;
  onConfirm: () => void;
}

const ConfirmModal: React.FC<ModalProps> = ({
  header,
  message,
  trigger,
  onConfirm,
}) => {
  const { t } = useDictionary();

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        {typeof trigger === "string" ? (
          <Button variant="destructive">{trigger}</Button>
        ) : (
          trigger
        )}
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{header}</AlertDialogTitle>
          <AlertDialogDescription>{message}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>{t("common.no")}</AlertDialogCancel>
          <AlertDialogAction onClick={onConfirm}>
            {t("common.yes")}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default ConfirmModal;
