
import { Info } from "lucide-react";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";

interface CircleHelpProps {
  text: string;
}

export function CircleHelp({ text }: CircleHelpProps) {
  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        <button 
          type="button" 
          className="rounded-full p-1.5 text-muted-foreground hover:bg-accent hover:text-accent-foreground transition-colors"
          aria-label="More information"
        >
          <Info className="h-4 w-4" />
        </button>
      </HoverCardTrigger>
      <HoverCardContent className="w-80">
        <p className="text-sm text-muted-foreground">{text}</p>
      </HoverCardContent>
    </HoverCard>
  );
}
