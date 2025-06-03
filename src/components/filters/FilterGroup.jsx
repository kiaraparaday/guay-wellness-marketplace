
import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ChevronDown, ChevronUp } from "lucide-react";

const FilterGroup = ({
  title,
  options,
  selectedOptions,
  onChange,
  collapse = false,
}) => {
  const [isOpen, setIsOpen] = useState(!collapse);

  const toggleOption = (id) => {
    const newSelected = selectedOptions.includes(id)
      ? selectedOptions.filter((item) => item !== id)
      : [...selectedOptions, id];
    console.log(`Filter ${title} changed:`, newSelected);
    onChange(newSelected);
  };

  return (
    <div className="mb-4">
      {collapse ? (
        <Collapsible open={isOpen} onOpenChange={setIsOpen}>
          <CollapsibleTrigger className="flex w-full items-center justify-between py-2 font-poppins text-sm font-medium">
            <span>{title}</span>
            {isOpen ? (
              <ChevronUp className="h-4 w-4 text-muted-foreground" />
            ) : (
              <ChevronDown className="h-4 w-4 text-muted-foreground" />
            )}
          </CollapsibleTrigger>
          <CollapsibleContent className="pt-2">
            <div className="flex flex-wrap gap-2">
              {options.map((option) => (
                <button
                  key={option.id}
                  onClick={() => toggleOption(option.id)}
                  className={cn(
                    "px-3 py-1.5 rounded-full text-sm font-medium transition duration-200 font-poppins",
                    selectedOptions.includes(option.id)
                      ? "bg-primary text-white shadow-sm"
                      : "bg-secondary hover:bg-primary/10"
                  )}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </CollapsibleContent>
        </Collapsible>
      ) : (
        <>
          <h3 className="font-poppins font-medium mb-2 text-sm">{title}</h3>
          <div className="flex flex-wrap gap-2">
            {options.map((option) => (
              <button
                key={option.id}
                onClick={() => toggleOption(option.id)}
                className={cn(
                  "px-3 py-1.5 rounded-full text-sm font-medium transition duration-200 font-poppins",
                  selectedOptions.includes(option.id)
                    ? "bg-primary text-white shadow-sm"
                    : "bg-secondary hover:bg-primary/10"
                )}
              >
                {option.label}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default FilterGroup;
