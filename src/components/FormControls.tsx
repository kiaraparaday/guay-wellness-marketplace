
import React, { useState } from "react";
import { User, Edit, Check } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Toggle } from "@/components/ui/toggle";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";

interface FormControlsProps {
  onValueChange?: (controlType: string, value: any) => void;
}

const FormControls: React.FC<FormControlsProps> = ({ onValueChange }) => {
  const [switchValue, setSwitchValue] = useState(false);
  const [toggleValue, setToggleValue] = useState("");
  const [radioValue, setRadioValue] = useState("");
  const [checkboxValues, setCheckboxValues] = useState<Record<string, boolean>>({
    check1: false,
    check2: true,
    check3: false,
    check4: false,
    check5: true
  });

  const handleSwitchChange = (checked: boolean) => {
    setSwitchValue(checked);
    onValueChange?.("switch", checked);
  };

  const handleToggleChange = (value: string) => {
    setToggleValue(value);
    onValueChange?.("toggle", value);
  };

  const handleRadioChange = (value: string) => {
    setRadioValue(value);
    onValueChange?.("radio", value);
  };

  const handleCheckboxChange = (id: string, checked: boolean) => {
    setCheckboxValues(prev => ({ ...prev, [id]: checked }));
    onValueChange?.("checkbox", { id, checked });
  };

  return (
    <div className="space-y-12 max-w-3xl mx-auto p-6">
      <div>
        <h2 className="text-[40px] font-bold mb-8">Controles</h2>
      </div>

      {/* Switch */}
      <div className="border border-dashed border-primary p-6 rounded-lg space-y-6">
        <h3 className="text-[24px] font-bold mb-4">Switch</h3>
        <div className="flex flex-col space-y-3">
          <div className="flex items-center gap-2">
            <Switch id="switch-active" checked={true} onCheckedChange={() => {}} />
            <Label htmlFor="switch-active" className="text-base">Texto</Label>
          </div>
          <div className="flex items-center gap-2">
            <Switch id="switch-inactive" checked={false} onCheckedChange={() => {}} />
            <Label htmlFor="switch-inactive" className="text-base">Texto</Label>
          </div>
        </div>
      </div>

      {/* Check celda */}
      <div className="border border-dashed border-primary p-6 rounded-lg space-y-6">
        <h3 className="text-[24px] font-bold mb-4">Check celda</h3>
        <div className="grid grid-cols-1 gap-2 max-w-[300px]">
          <Toggle 
            pressed={toggleValue === "texto"}
            variant="outline"
            className="w-full justify-start bg-guay-dark-blue text-white data-[state=on]:bg-guay-dark-blue data-[state=on]:text-white"
            onClick={() => handleToggleChange("texto")}
          >
            Texto
          </Toggle>
          <Toggle 
            pressed={toggleValue === "cta"}
            variant="outline"
            className="w-full justify-start data-[state=on]:bg-guay-dark-blue data-[state=on]:text-white"
            onClick={() => handleToggleChange("cta")}
          >
            CTA
          </Toggle>
          <Toggle 
            pressed={toggleValue === "estado"}
            variant="outline"
            className="w-full justify-start data-[state=on]:bg-guay-dark-blue data-[state=on]:text-white"
            onClick={() => handleToggleChange("estado")}
          >
            Estado
          </Toggle>
        </div>
      </div>

      {/* Check celda con icono */}
      <div className="border border-dashed border-primary p-6 rounded-lg space-y-6">
        <h3 className="text-[24px] font-bold mb-4">Check celda con icono</h3>
        <div className="flex flex-col space-y-3 max-w-[300px]">
          <div className="border border-gray-200 rounded-md p-4 flex flex-col space-y-4">
            <div className="flex items-center gap-3">
              <p className="text-base">Texto</p>
            </div>
            <div className="flex flex-col space-y-3">
              <Checkbox id="checkbox-icon1" />
              <div className="flex items-center justify-center w-6 h-6">
                <User size={18} />
              </div>
              <div className="flex items-center justify-center w-6 h-6">
                <Edit size={18} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Radio button */}
      <div className="border border-dashed border-primary p-6 rounded-lg space-y-6">
        <h3 className="text-[24px] font-bold mb-4">Radio button</h3>
        <div className="grid grid-cols-2 gap-6">
          <RadioGroup value={radioValue} onValueChange={handleRadioChange}>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="radio-1" id="radio-1" />
              <Label htmlFor="radio-1">Seleccionar</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="radio-2" id="radio-2" />
              <Label htmlFor="radio-2">Seleccionar</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="radio-3" id="radio-3" />
              <Label htmlFor="radio-3">Seleccionar</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="radio-4" id="radio-4" />
              <Label htmlFor="radio-4">Seleccionar</Label>
            </div>
          </RadioGroup>
        </div>
      </div>

      {/* Check box */}
      <div className="border border-dashed border-primary p-6 rounded-lg space-y-6">
        <h3 className="text-[24px] font-bold mb-4">Check box</h3>
        <div className="flex flex-col space-y-3">
          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-2">
              {/* Simple checkbox list */}
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="check1" 
                  checked={checkboxValues.check1} 
                  onCheckedChange={(checked) => handleCheckboxChange("check1", checked as boolean)} 
                />
                <Label htmlFor="check1">Seleccionar</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="check2" 
                  checked={checkboxValues.check2} 
                  onCheckedChange={(checked) => handleCheckboxChange("check2", checked as boolean)} 
                />
                <Label htmlFor="check2">Seleccionar</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="check3" 
                  checked={checkboxValues.check3} 
                  onCheckedChange={(checked) => handleCheckboxChange("check3", checked as boolean)} 
                />
                <Label htmlFor="check3">Seleccionar</Label>
              </div>
            </div>
            <div className="space-y-6">
              {/* Larger list */}
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="check4" 
                  checked={checkboxValues.check4} 
                  onCheckedChange={(checked) => handleCheckboxChange("check4", checked as boolean)} 
                />
                <Label htmlFor="check4">Seleccionar</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="check5" 
                  checked={checkboxValues.check5} 
                  onCheckedChange={(checked) => handleCheckboxChange("check5", checked as boolean)} 
                />
                <Label htmlFor="check5">Seleccionar</Label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormControls;
