import * as React from "react";
import * as RadixSelect from "@radix-ui/react-select";
import { FaChevronUp, FaChevronDown } from "react-icons/fa";
import { cn } from "@/lib/utils";
import { SelectItem } from "./selectItem";
import { useDictionary } from "@/providers/dictionaryProvider";

interface Option {
  value: string | number;
  label: string;
}

interface SelectProps {
  options: Option[];
  selected?: string | number;
  onValueChange?: (value: string | number) => void;
  className?: string;
}

const Select = React.forwardRef<HTMLButtonElement, SelectProps>(
  ({ className, options, selected, onValueChange, ...props }, ref) => {
    const { t } = useDictionary();
    return (
      <RadixSelect.Root
        value={selected?.toString()}
        onValueChange={onValueChange}
      >
        <RadixSelect.Trigger
          className={cn(
            "flex h-9 w-full items-center justify-between rounded-md border border-gray-800 bg-gray-800 px-3 py-1 text-base shadow-sm transition-colors placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-500 disabled:cursor-not-allowed disabled:opacity-50",
            className
          )}
          ref={ref}
          {...props}
        >
          <RadixSelect.Value placeholder={t("common.select")} />
          <RadixSelect.Icon className="text-slate-500 hover:text-slate-700 transition-colors">
            <FaChevronDown />
          </RadixSelect.Icon>
        </RadixSelect.Trigger>
        <RadixSelect.Portal>
          <RadixSelect.Content className="overflow-hidden rounded-md bg-gray-800 shadow-lg z-2">
            <RadixSelect.ScrollUpButton className="flex h-[25px] cursor-default items-center justify-center text-slate-500 hover:text-slate-700 transition-colors">
              <FaChevronUp />
            </RadixSelect.ScrollUpButton>
            <RadixSelect.Viewport className="p-[5px]">
              {options.map((option) => (
                <SelectItem key={option.value} value={option.value.toString()}>
                  {option.label}
                </SelectItem>
              ))}
            </RadixSelect.Viewport>
            <RadixSelect.ScrollDownButton className="flex h-[25px] cursor-default items-center justify-center bg-gray-800 text-gray-500 hover:text-gray-700 transition-colors">
              <FaChevronDown />
            </RadixSelect.ScrollDownButton>
          </RadixSelect.Content>
        </RadixSelect.Portal>
      </RadixSelect.Root>
    );
  }
);
Select.displayName = "Select";

export { Select };
