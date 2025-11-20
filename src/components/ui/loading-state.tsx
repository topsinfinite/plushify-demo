import { cn } from "@/lib/utils";
import { Loader2, Sparkles, Bot, Image as ImageIcon } from "lucide-react";

interface LoadingStateProps {
  type?: "default" | "generating" | "uploading" | "processing";
  size?: "sm" | "md" | "lg";
  message?: string;
  className?: string;
}

const loadingConfigs = {
  default: {
    icon: Loader2,
    message: "Loading..."
  },
  generating: {
    icon: Sparkles,
    message: "Generating your plushie..."
  },
  uploading: {
    icon: ImageIcon,
    message: "Uploading image..."
  },
  processing: {
    icon: Bot,
    message: "Processing with AI..."
  }
};

export function LoadingState({
  type = "default",
  size = "md",
  message,
  className
}: LoadingStateProps) {
  const config = loadingConfigs[type];
  const IconComponent = config.icon;
  const displayMessage = message || config.message;

  const sizeClasses = {
    sm: {
      container: "gap-2",
      icon: "h-4 w-4",
      text: "text-sm"
    },
    md: {
      container: "gap-3",
      icon: "h-6 w-6",
      text: "text-base"
    },
    lg: {
      container: "gap-4",
      icon: "h-8 w-8",
      text: "text-lg"
    }
  };

  return (
    <div className={cn(
      "flex flex-col items-center justify-center",
      sizeClasses[size].container,
      className
    )}>
      <IconComponent className={cn(
        "animate-spin text-primary",
        sizeClasses[size].icon
      )} />
      <p className={cn(
        "text-muted-foreground font-medium",
        sizeClasses[size].text
      )}>
        {displayMessage}
      </p>
    </div>
  );
}

// Skeleton components for different content types
export function PlushieCardSkeleton({ className }: { className?: string }) {
  return (
    <div className={cn("w-64 h-72 rounded-lg overflow-hidden bg-muted animate-pulse", className)}>
      <div className="h-48 bg-muted-foreground/10" />
      <div className="p-3 space-y-2">
        <div className="flex justify-between">
          <div className="h-4 w-16 bg-muted-foreground/20 rounded" />
          <div className="h-4 w-12 bg-muted-foreground/20 rounded" />
        </div>
        <div className="h-3 w-24 bg-muted-foreground/20 rounded" />
        <div className="h-3 w-20 bg-muted-foreground/20 rounded" />
      </div>
    </div>
  );
}

export function PricingCardSkeleton({ className }: { className?: string }) {
  return (
    <div className={cn("p-6 rounded-lg border bg-card animate-pulse", className)}>
      <div className="space-y-4">
        <div className="h-6 w-24 bg-muted-foreground/20 rounded mx-auto" />
        <div className="h-4 w-32 bg-muted-foreground/20 rounded mx-auto" />
        <div className="space-y-2 py-4">
          <div className="h-8 w-16 bg-muted-foreground/20 rounded mx-auto" />
          <div className="h-6 w-24 bg-muted-foreground/20 rounded mx-auto" />
        </div>
        <div className="space-y-2">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="h-4 w-full bg-muted-foreground/20 rounded" />
          ))}
        </div>
        <div className="h-10 w-full bg-muted-foreground/20 rounded" />
      </div>
    </div>
  );
}

export function ImageUploadSkeleton({ className }: { className?: string }) {
  return (
    <div className={cn("border-2 border-dashed border-muted-foreground/25 rounded-lg p-8 animate-pulse", className)}>
      <div className="flex flex-col items-center gap-4">
        <div className="w-16 h-16 rounded-full bg-muted-foreground/20" />
        <div className="space-y-2 text-center">
          <div className="h-6 w-48 bg-muted-foreground/20 rounded mx-auto" />
          <div className="h-4 w-64 bg-muted-foreground/20 rounded mx-auto" />
        </div>
        <div className="h-10 w-32 bg-muted-foreground/20 rounded" />
      </div>
    </div>
  );
}

// Grid skeletons
interface GridSkeletonProps {
  count?: number;
  className?: string;
  itemClassName?: string;
}

export function PlushieGridSkeleton({ count = 6, className, itemClassName }: GridSkeletonProps) {
  return (
    <div className={cn("grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4", className)}>
      {Array.from({ length: count }).map((_, i) => (
        <PlushieCardSkeleton key={i} className={itemClassName} />
      ))}
    </div>
  );
}

export function PricingGridSkeleton({ count = 3, className, itemClassName }: GridSkeletonProps) {
  return (
    <div className={cn("grid grid-cols-1 md:grid-cols-3 gap-6", className)}>
      {Array.from({ length: count }).map((_, i) => (
        <PricingCardSkeleton key={i} className={itemClassName} />
      ))}
    </div>
  );
}

// Page loading overlay
export function PageLoadingOverlay({ message }: { message?: string }) {
  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center">
      <LoadingState type="default" size="lg" message={message} />
    </div>
  );
}

// Button loading state
export function ButtonLoading({ className }: { className?: string }) {
  return (
    <Loader2 className={cn("h-4 w-4 animate-spin", className)} />
  );
}