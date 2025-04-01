import React from "react";
import { FaTimes } from "react-icons/fa";
import ActionIcon from "../actionIcon";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  header?: string;
}

const FormModal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  children,
  header,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-1">
      <div className="relative bg-slate-700 p-6 rounded-md shadow-md w-full max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl">
        <div className="flex justify-between items-center mb-4">
          {header && (
            <h2 className="text-xl font-semibold text-slate-100">{header}</h2>
          )}
          <ActionIcon
            onClick={onClose}
            Icon={FaTimes}
            variant="transparent"
            iconSize={25}
            text=""
          />
        </div>
        {children}
      </div>
    </div>
  );
};

export default FormModal;
