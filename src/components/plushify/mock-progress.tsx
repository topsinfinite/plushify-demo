"use client";

import { useState, useEffect } from "react";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent } from "@/components/ui/card";
import { Bot, Upload, Sparkles, Download, Check } from "lucide-react";
import { cn } from "@/lib/utils";

type ProcessingStage = "uploading" | "analyzing" | "generating" | "finalizing" | "complete";

interface MockProgressProps {
  isProcessing: boolean;
  stage?: ProcessingStage;
  processingTime?: number; // in seconds, defaults to random 2-4 seconds
  onComplete?: () => void;
  className?: string;
  showStages?: boolean;
}

interface StageConfig {
  label: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  duration: number; // percentage of total time
}

const stageConfigs: Record<ProcessingStage, StageConfig> = {
  uploading: {
    label: "Uploading",
    description: "Uploading your image securely...",
    icon: Upload,
    duration: 10
  },
  analyzing: {
    label: "Analyzing",
    description: "AI is analyzing your photo...",
    icon: Bot,
    duration: 30
  },
  generating: {
    label: "Generating",
    description: "Creating your adorable plushie...",
    icon: Sparkles,
    duration: 50
  },
  finalizing: {
    label: "Finalizing",
    description: "Adding finishing touches...",
    icon: Download,
    duration: 10
  },
  complete: {
    label: "Complete",
    description: "Your plushie is ready!",
    icon: Check,
    duration: 0
  }
};

export function MockProgress({
  isProcessing,
  stage,
  processingTime,
  onComplete,
  className,
  showStages = true
}: MockProgressProps) {
  const [progress, setProgress] = useState(0);
  const [currentStage, setCurrentStage] = useState<ProcessingStage>("uploading");
  const [totalTime] = useState(processingTime || (2000 + Math.random() * 2000)); // 2-4 seconds

  useEffect(() => {
    if (!isProcessing) {
      setProgress(0);
      setCurrentStage("uploading");
      return;
    }

    const interval = setInterval(() => {
      setProgress((prev) => {
        const increment = 100 / (totalTime / 100); // Update every 100ms
        const newProgress = Math.min(prev + increment, 100);

        // Update stage based on progress
        if (newProgress < 10) {
          setCurrentStage("uploading");
        } else if (newProgress < 40) {
          setCurrentStage("analyzing");
        } else if (newProgress < 90) {
          setCurrentStage("generating");
        } else if (newProgress < 100) {
          setCurrentStage("finalizing");
        } else {
          setCurrentStage("complete");
          onComplete?.();
        }

        return newProgress;
      });
    }, 100);

    return () => clearInterval(interval);
  }, [isProcessing, totalTime, onComplete]);

  useEffect(() => {
    if (stage) {
      setCurrentStage(stage);
    }
  }, [stage]);

  if (!isProcessing && progress === 0) {
    return null;
  }

  const currentConfig = stageConfigs[currentStage];
  const IconComponent = currentConfig.icon;

  return (
    <Card className={cn("w-full max-w-md mx-auto", className)}>
      <CardContent className="p-6 space-y-4">
        {/* Header */}
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/10">
            <IconComponent className={cn(
              "h-5 w-5",
              currentStage === "complete" ? "text-green-600" : "text-primary"
            )} />
          </div>
          <div>
            <h3 className="font-semibold">{currentConfig.label}</h3>
            <p className="text-sm text-muted-foreground">{currentConfig.description}</p>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="space-y-2">
          <Progress
            value={progress}
            className="h-2"
          />
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>{Math.round(progress)}%</span>
            <span>{Math.round((totalTime - (progress / 100 * totalTime)) / 1000)}s remaining</span>
          </div>
        </div>

        {/* Stage Indicators */}
        {showStages && (
          <div className="grid grid-cols-4 gap-2">
            {Object.entries(stageConfigs).slice(0, 4).map(([stageName, config], index) => {
              const stageProgress = progress >= (index + 1) * 25;
              const isCurrentStageIndicator = stageName === currentStage;

              return (
                <div
                  key={stageName}
                  className={cn(
                    "flex flex-col items-center gap-1 p-2 rounded text-center transition-colors",
                    stageProgress && "bg-primary/10",
                    isCurrentStageIndicator && !stageProgress && "bg-muted"
                  )}
                >
                  <config.icon className={cn(
                    "h-4 w-4",
                    stageProgress ? "text-primary" : "text-muted-foreground"
                  )} />
                  <span className={cn(
                    "text-xs font-medium",
                    stageProgress ? "text-primary" : "text-muted-foreground"
                  )}>
                    {config.label}
                  </span>
                </div>
              );
            })}
          </div>
        )}

        {/* Fun Facts */}
        <div className="text-xs text-muted-foreground text-center">
          {currentStage === "analyzing" && "🔍 Detecting facial features and expressions..."}
          {currentStage === "generating" && "🎨 Applying plushie magic with AI..."}
          {currentStage === "finalizing" && "✨ Adding that extra cuteness factor..."}
          {currentStage === "complete" && "🎉 Your adorable plushie is ready to download!"}
        </div>
      </CardContent>
    </Card>
  );
}

// Compact version for smaller spaces
export function CompactMockProgress({
  isProcessing,
  stage,
  className
}: Pick<MockProgressProps, 'isProcessing' | 'stage' | 'className'>) {
  return (
    <MockProgress
      isProcessing={isProcessing}
      stage={stage}
      showStages={false}
      className={cn("max-w-sm", className)}
    />
  );
}

// Simple progress bar only
export function SimpleProgress({
  isProcessing,
  onComplete,
  className
}: Pick<MockProgressProps, 'isProcessing' | 'onComplete' | 'className'>) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!isProcessing) {
      setProgress(0);
      return;
    }

    const interval = setInterval(() => {
      setProgress((prev) => {
        const newProgress = Math.min(prev + 2, 100);
        if (newProgress === 100) {
          onComplete?.();
        }
        return newProgress;
      });
    }, 100);

    return () => clearInterval(interval);
  }, [isProcessing, onComplete]);

  if (!isProcessing && progress === 0) {
    return null;
  }

  return (
    <div className={cn("space-y-2", className)}>
      <Progress value={progress} className="h-2" />
      <div className="text-xs text-muted-foreground text-center">
        Generating your plushie... {Math.round(progress)}%
      </div>
    </div>
  );
}