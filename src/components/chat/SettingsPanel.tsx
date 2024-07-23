"use client";

import { Settings2 } from "lucide-react";

import { ExternalLink } from "@/components/atoms/ExternalLink";
import { Tooltip } from "@/components/atoms/Tooltip";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Slider } from "@/components/ui/slider";
import { useAppStore } from "@/lib/useAppStore";

export function SettingsPanel() {
  const model = useAppStore((state) => state.model);
  const setModel = useAppStore((state) => state.setModel);
  const temperature = useAppStore((state) => state.temperature);
  const setTemperature = useAppStore((state) => state.setTemperature);

  const handleTemperatureChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);
    if (!isNaN(value) && value >= 0) {
      setTemperature(value);
    }
  };

  const handleTemperatureBlur = () => {
    setTemperature(Math.min(1, Math.max(0, parseFloat(temperature.toFixed(2)))));
  };

  return (
    <Sheet>
      <Tooltip content="Settings">
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon">
            <Settings2 className="h-5 w-5" />
          </Button>
        </SheetTrigger>
      </Tooltip>
      <SheetContent className="data-[state=closed]:duration-200 data-[state=open]:duration-200">
        <SheetHeader className="text-left">
          <SheetTitle>Settings</SheetTitle>
          <SheetDescription>{`Configure Llama 3.1 settings`}</SheetDescription>
        </SheetHeader>

        <Separator className="my-6" />

        <div className="grid gap-8">
          <div className="grid gap-3">
            <Label htmlFor="model">Model</Label>
            <Select
              value={model}
              onValueChange={(model) => {
                if (
                  model === "llama-3.1-405b-reasoning" ||
                  model === "llama-3.1-70b-versatile" ||
                  model === "llama-3.1-8b-instant"
                ) {
                  setModel(model);
                }
              }}
            >
              <SelectTrigger
                id="model"
                className="items-start [&_[data-description]]:hidden"
              >
                <SelectValue placeholder="Select a model" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem
                  value="llama-3.1-405b-reasoning"
                  disabled
                  className="data-[disabled]:opacity-70"
                >
                  <div className="flex items-start gap-3 text-muted-foreground">
                    <div className="grid gap-0.5">
                      <p>
                        Llama 3.1{" "}
                        <span className="font-medium text-foreground">405B</span>
                      </p>
                      <p className="text-warning text-xs" data-description>
                        Not yet available (coming soon)
                      </p>
                    </div>
                  </div>
                </SelectItem>
                <SelectItem value="llama-3.1-70b-versatile">
                  <div className="flex items-start gap-3 text-muted-foreground">
                    Llama 3.1 <span className="font-medium text-foreground">70B</span>
                  </div>
                </SelectItem>
                <SelectItem value="llama-3.1-8b-instant">
                  <div className="flex items-start gap-3 text-muted-foreground">
                    Llama 3.1 <span className="font-medium text-foreground">8B</span>
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid gap-3">
            <div className="group flex items-center justify-between">
              <Label htmlFor="temperature">Temperature</Label>
              <Input
                type="number"
                step="0.01"
                min="0"
                className="no-arrows h-9 w-12 border-transparent px-1 text-right hover:border-border"
                value={temperature}
                onChange={handleTemperatureChange}
                onBlur={handleTemperatureBlur}
              />
            </div>
            <Slider
              id="temperature"
              min={0}
              max={1}
              step={0.1}
              value={[temperature]}
              onValueChange={(value) => {
                if (value.length === 1) {
                  setTemperature(value[0]);
                }
              }}
            />
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
