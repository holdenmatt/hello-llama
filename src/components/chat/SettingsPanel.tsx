import { Settings2 } from "lucide-react";

import { Tooltip } from "@/components/atoms/Tooltip";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import { ExternalLink } from "../atoms/ExternalLink";

export function SettingsPanel() {
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
        <SheetHeader>
          <SheetTitle>Settings</SheetTitle>
          <SheetDescription>
            {`Configure Llama 3.1 settings used by `}
            <ExternalLink href="https://console.groq.com/docs/models">Groq</ExternalLink>.
          </SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
}
