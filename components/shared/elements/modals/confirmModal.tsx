import React from "react";
import ActionIcon from "../actionIcon";
import { useDictionary } from "@/providers/dictionaryProvider";

interface ModalProps {
  header: string;
  message: string;
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

const ConfirmModal: React.FC<ModalProps> = ({
  header,
  message,
  isOpen,
  onClose,
  onConfirm,
}) => {
  const { t } = useDictionary();
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50">
      <div className="bg-slate-700 p-6 rounded-md shadow-md">
        <h2 className="text-xl font-semibold mb-4">{header}</h2>
        <p className="mb-4">{message}</p>
        <div className="flex justify-end gap-4">
          <ActionIcon
            onClick={onConfirm}
            variant="danger"
            text={t("common.yes")}
            className="text-slate-100"
          />
          <ActionIcon
            onClick={onClose}
            variant="outline"
            iconSize={25}
            text={t("common.no")}
            className="text-slate-100"
          />
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
