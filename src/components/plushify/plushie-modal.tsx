"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { BeforeAfterSlider } from "./before-after-slider";
import {
  Download,
  Heart,
  Share2,
  Calendar,
  Clock,
  Sparkles,
  ChevronLeft,
  ChevronRight
} from "lucide-react";
import { cn } from "@/lib/utils";
import { PlushieGeneration } from "./plushie-card";

interface PlushieModalProps {
  generation: PlushieGeneration | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onToggleFavorite?: (id: string) => void;
  onDownload?: (generation: PlushieGeneration) => void;
  onShare?: (generation: PlushieGeneration) => void;
  onNext?: () => void;
  onPrevious?: () => void;
  hasNext?: boolean;
  hasPrevious?: boolean;
}

export function PlushieModal({
  generation,
  open,
  onOpenChange,
  onToggleFavorite,
  onDownload,
  onShare,
  onNext,
  onPrevious,
  hasNext = false,
  hasPrevious = false
}: PlushieModalProps) {
  const [viewMode, setViewMode] = useState<"comparison" | "original" | "plushie">("comparison");

  if (!generation) return null;

  const styleColors = {
    classic: "bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400",
    kawaii: "bg-pink-100 text-pink-800 dark:bg-pink-900/20 dark:text-pink-400",
    realistic: "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400"
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const handleToggleFavorite = () => {
    onToggleFavorite?.(generation.id);
  };

  const handleDownload = () => {
    onDownload?.(generation);
  };

  const handleShare = () => {
    onShare?.(generation);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-hidden p-0">
        {/* Header */}
        <DialogHeader className="p-6 pb-0">
          <div className="flex items-center justify-between">
            <DialogTitle className="flex items-center gap-3">
              <Badge
                variant="secondary"
                className={cn("capitalize", styleColors[generation.style])}
              >
                {generation.style}
              </Badge>
              <span className="text-lg font-semibold">Plushie Generation</span>
            </DialogTitle>

            <div className="flex items-center gap-2">
              {/* Navigation */}
              {(hasPrevious || hasNext) && (
                <div className="flex items-center gap-1 mr-4">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={onPrevious}
                    disabled={!hasPrevious}
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={onNext}
                    disabled={!hasNext}
                  >
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              )}

              {/* Actions */}
              <Button
                variant="outline"
                size="sm"
                onClick={handleToggleFavorite}
              >
                <Heart
                  className={cn(
                    "h-4 w-4",
                    generation.isFavorite && "fill-red-500 text-red-500"
                  )}
                />
              </Button>

              <Button variant="outline" size="sm" onClick={handleShare}>
                <Share2 className="h-4 w-4" />
              </Button>

              <Button onClick={handleDownload}>
                <Download className="h-4 w-4 mr-2" />
                Download
              </Button>
            </div>
          </div>
        </DialogHeader>

        {/* Content */}
        <div className="flex flex-col lg:flex-row h-full min-h-[400px]">
          {/* Image Area */}
          <div className="flex-1 p-6 pt-0">
            {/* View Mode Toggle */}
            <div className="flex items-center justify-center gap-2 mb-6">
              <Button
                variant={viewMode === "comparison" ? "default" : "outline"}
                size="sm"
                onClick={() => setViewMode("comparison")}
              >
                Compare
              </Button>
              <Button
                variant={viewMode === "original" ? "default" : "outline"}
                size="sm"
                onClick={() => setViewMode("original")}
              >
                Original
              </Button>
              <Button
                variant={viewMode === "plushie" ? "default" : "outline"}
                size="sm"
                onClick={() => setViewMode("plushie")}
              >
                Plushie
              </Button>
            </div>

            {/* Image Display */}
            <div className="flex items-center justify-center min-h-[400px]">
              {viewMode === "comparison" && (
                <BeforeAfterSlider
                  beforeImage={generation.originalImage}
                  afterImage={generation.plushieImage}
                  beforeAlt="Original photo"
                  afterAlt="Generated plushie"
                  className="max-w-2xl"
                />
              )}

              {viewMode === "original" && (
                <div className="relative max-w-2xl">
                  <img
                    src={generation.originalImage}
                    alt="Original photo"
                    className="w-full h-auto rounded-lg shadow-lg"
                  />
                  <div className="absolute top-4 left-4 bg-black/70 text-white px-3 py-1 rounded text-sm font-medium">
                    Original
                  </div>
                </div>
              )}

              {viewMode === "plushie" && (
                <div className="relative max-w-2xl">
                  <img
                    src={generation.plushieImage}
                    alt="Generated plushie"
                    className="w-full h-auto rounded-lg shadow-lg"
                  />
                  <div className="absolute top-4 left-4 bg-black/70 text-white px-3 py-1 rounded text-sm font-medium">
                    Plushie
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Info Panel */}
          <div className="lg:w-80 border-t lg:border-t-0 lg:border-l p-6 bg-muted/30">
            <div className="space-y-6">
              {/* Basic Info */}
              <div>
                <h3 className="font-semibold mb-3">Details</h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-sm">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span className="text-muted-foreground">Created:</span>
                    <span>{formatDate(generation.createdAt)}</span>
                  </div>

                  <div className="flex items-center gap-2 text-sm">
                    <Sparkles className="h-4 w-4 text-muted-foreground" />
                    <span className="text-muted-foreground">Style:</span>
                    <Badge
                      variant="secondary"
                      className={cn("capitalize text-xs", styleColors[generation.style])}
                    >
                      {generation.style}
                    </Badge>
                  </div>

                  <div className="flex items-center gap-2 text-sm">
                    <span className="text-muted-foreground">Category:</span>
                    <Badge variant="outline" className="text-xs capitalize">
                      {generation.category}
                    </Badge>
                  </div>

                  {generation.metadata?.processingTime && (
                    <div className="flex items-center gap-2 text-sm">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <span className="text-muted-foreground">Processing:</span>
                      <span>{generation.metadata.processingTime}s</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Metadata */}
              {generation.metadata && (
                <div>
                  <h3 className="font-semibold mb-3">Technical Info</h3>
                  <div className="space-y-2 text-sm">
                    {generation.metadata.originalImageSize && (
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Original size:</span>
                        <span>{generation.metadata.originalImageSize}</span>
                      </div>
                    )}

                    {generation.metadata.creditsUsed && (
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Credits used:</span>
                        <span>{generation.metadata.creditsUsed}</span>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Actions */}
              <div>
                <h3 className="font-semibold mb-3">Actions</h3>
                <div className="space-y-2">
                  <Button
                    onClick={handleDownload}
                    className="w-full justify-start"
                    variant="outline"
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Download HD Image
                  </Button>

                  <Button
                    onClick={handleToggleFavorite}
                    className="w-full justify-start"
                    variant="outline"
                  >
                    <Heart
                      className={cn(
                        "h-4 w-4 mr-2",
                        generation.isFavorite && "fill-red-500 text-red-500"
                      )}
                    />
                    {generation.isFavorite ? "Remove from" : "Add to"} Favorites
                  </Button>

                  <Button
                    onClick={handleShare}
                    className="w-full justify-start"
                    variant="outline"
                  >
                    <Share2 className="h-4 w-4 mr-2" />
                    Share Plushie
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}