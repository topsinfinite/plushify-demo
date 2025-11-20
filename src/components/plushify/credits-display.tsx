import { Sparkles, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

interface CreditsDisplayProps {
  credits: number;
  size?: "sm" | "md" | "lg";
  showIcon?: boolean;
  showBuyButton?: boolean;
  lowCreditThreshold?: number;
  className?: string;
}

export function CreditsDisplay({
  credits,
  size = "md",
  showIcon = true,
  showBuyButton = false,
  lowCreditThreshold = 10,
  className
}: CreditsDisplayProps) {
  const isLowCredits = credits <= lowCreditThreshold;

  const sizeClasses = {
    sm: "px-2 py-1 text-xs",
    md: "px-3 py-1.5 text-sm",
    lg: "px-4 py-2 text-base"
  };

  const iconSizes = {
    sm: "h-3 w-3",
    md: "h-4 w-4",
    lg: "h-5 w-5"
  };

  return (
    <div className={cn("flex items-center gap-2", className)}>
      <div
        className={cn(
          "flex items-center gap-2 rounded-lg font-medium transition-colors",
          sizeClasses[size],
          isLowCredits
            ? "bg-orange-100 text-orange-700 dark:bg-orange-900/20 dark:text-orange-400"
            : "bg-primary/10 text-primary"
        )}
      >
        {showIcon && (
          isLowCredits ? (
            <AlertCircle className={cn(iconSizes[size], "text-orange-600 dark:text-orange-400")} />
          ) : (
            <Sparkles className={cn(iconSizes[size])} />
          )
        )}
        <span>{credits} credits</span>
        {isLowCredits && (
          <Badge variant="secondary" className="ml-1 px-1 py-0 text-xs">
            Low
          </Badge>
        )}
      </div>

      {(showBuyButton || isLowCredits) && (
        <Button asChild size={size === "lg" ? "default" : "sm"} variant="outline">
          <Link href="/pricing">
            Buy Credits
          </Link>
        </Button>
      )}
    </div>
  );
}

// Compact version for navigation/header use
export function CompactCreditsDisplay({ credits, className }: { credits: number; className?: string }) {
  return (
    <CreditsDisplay
      credits={credits}
      size="sm"
      showIcon={true}
      showBuyButton={false}
      className={className}
    />
  );
}

// Full version with buy button for dashboard/pages
export function FullCreditsDisplay({ credits, className }: { credits: number; className?: string }) {
  return (
    <CreditsDisplay
      credits={credits}
      size="md"
      showIcon={true}
      showBuyButton={true}
      className={className}
    />
  );
}

// Large prominent display for low credit warnings
export function ProminentCreditsDisplay({ credits, className }: { credits: number; className?: string }) {
  return (
    <CreditsDisplay
      credits={credits}
      size="lg"
      showIcon={true}
      showBuyButton={true}
      lowCreditThreshold={20} // Higher threshold for prominent display
      className={className}
    />
  );
}