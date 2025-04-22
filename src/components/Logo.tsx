
import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  size?: "sm" | "md" | "lg";
}

export function Logo({ className, size = "md" }: LogoProps) {
  const sizeClasses = {
    sm: "text-xl",
    md: "text-2xl",
    lg: "text-4xl"
  };

  return (
    <div className={cn("font-bold text-primary flex items-center gap-1", sizeClasses[size], className)}>
      <span>Calc</span>
      <span className="text-secondary">Bitola</span>
    </div>
  );
}
