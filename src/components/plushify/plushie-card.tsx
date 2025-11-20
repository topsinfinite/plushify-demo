"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Heart, Download, Eye, Calendar } from "lucide-react";
import { cn } from "@/lib/utils";

export interface PlushieGeneration {
  id: string;
  userId: string;
  originalImage: string;
  plushieImage: string;
  style: "classic" | "kawaii" | "realistic";
  createdAt: Date;
  isFavorite: boolean;
  category: "people" | "pets";
  metadata?: {
    originalImageSize?: string;
    processingTime?: number;
    creditsUsed?: number;
  };
}

interface PlushieCardProps {
  generation: PlushieGeneration;
  onToggleFavorite?: (id: string) => void;
  onView?: (generation: PlushieGeneration) => void;
  onDownload?: (generation: PlushieGeneration) => void;
  showOriginal?: boolean;
  className?: string;
  size?: "sm" | "md" | "lg";
}

export function PlushieCard({
  generation,
  onToggleFavorite,
  onView,
  onDownload,
  showOriginal = false,
  className,
  size = "md"
}: PlushieCardProps) {
  const [showOriginalImage, setShowOriginalImage] = useState(showOriginal);
  const [imageLoading, setImageLoading] = useState(true);

  const sizeClasses = {
    sm: "w-48 h-56",
    md: "w-64 h-72",
    lg: "w-80 h-96"
  };

  const imageSizes = {
    sm: "h-32",
    md: "h-48",
    lg: "h-64"
  };

  const styleColors = {
    classic: "bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400",
    kawaii: "bg-pink-100 text-pink-800 dark:bg-pink-900/20 dark:text-pink-400",
    realistic: "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400"
  };

  const handleToggleFavorite = (e: React.MouseEvent) => {
    e.stopPropagation();
    onToggleFavorite?.(generation.id);
  };

  const handleView = () => {
    onView?.(generation);
  };

  const handleDownload = (e: React.MouseEvent) => {
    e.stopPropagation();
    onDownload?.(generation);
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <Card
      className={cn(
        "group cursor-pointer transition-all duration-200 hover:shadow-lg hover:-translate-y-1 overflow-hidden",
        sizeClasses[size],
        className
      )}
      onClick={handleView}
    >
      <CardContent className="p-0 h-full flex flex-col">
        {/* Image Container */}
        <div className={cn("relative overflow-hidden bg-muted", imageSizes[size])}>
          <img
            src={showOriginalImage ? generation.originalImage : generation.plushieImage}
            alt={showOriginalImage ? "Original photo" : "Generated plushie"}
            className="w-full h-full object-cover transition-transform duration-200 group-hover:scale-105"
            onLoad={() => setImageLoading(false)}
            onError={() => setImageLoading(false)}
          />

          {imageLoading && (
            <div className="absolute inset-0 bg-muted animate-pulse" />
          )}

          {/* Overlay Controls */}
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center">
            <div className="flex items-center gap-2">
              <Button
                variant="secondary"
                size="sm"
                onClick={handleView}
                className="bg-white/20 hover:bg-white/30 text-white border-white/20"
              >
                <Eye className="h-4 w-4" />
              </Button>
              <Button
                variant="secondary"
                size="sm"
                onClick={handleDownload}
                className="bg-white/20 hover:bg-white/30 text-white border-white/20"
              >
                <Download className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Toggle Original/Generated Button */}
          <Button
            variant="secondary"
            size="sm"
            className="absolute top-2 left-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 text-xs"
            onClick={(e) => {
              e.stopPropagation();
              setShowOriginalImage(!showOriginalImage);
            }}
          >
            {showOriginalImage ? "Plushie" : "Original"}
          </Button>

          {/* Favorite Button */}
          <Button
            variant="secondary"
            size="sm"
            className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
            onClick={handleToggleFavorite}
          >
            <Heart
              className={cn(
                "h-4 w-4",
                generation.isFavorite && "fill-red-500 text-red-500"
              )}
            />
          </Button>

          {/* Always visible favorite indicator */}
          {generation.isFavorite && (
            <div className="absolute top-2 right-2 group-hover:opacity-0 transition-opacity duration-200">
              <Heart className="h-4 w-4 fill-red-500 text-red-500" />
            </div>
          )}
        </div>

        {/* Card Footer */}
        <div className="p-3 flex-1 flex flex-col justify-between">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Badge
                variant="secondary"
                className={cn("text-xs capitalize", styleColors[generation.style])}
              >
                {generation.style}
              </Badge>
              <Badge variant="outline" className="text-xs capitalize">
                {generation.category}
              </Badge>
            </div>

            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <Calendar className="h-3 w-3" />
              {formatDate(generation.createdAt)}
            </div>

            {generation.metadata?.processingTime && (
              <div className="text-xs text-muted-foreground">
                Generated in {generation.metadata.processingTime}s
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

// Grid container for multiple cards
interface PlushieGridProps {
  generations: PlushieGeneration[];
  onToggleFavorite?: (id: string) => void;
  onView?: (generation: PlushieGeneration) => void;
  onDownload?: (generation: PlushieGeneration) => void;
  className?: string;
  cardSize?: "sm" | "md" | "lg";
}

export function PlushieGrid({
  generations,
  onToggleFavorite,
  onView,
  onDownload,
  className,
  cardSize = "md"
}: PlushieGridProps) {
  if (generations.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mb-4">
          <Eye className="h-8 w-8 text-muted-foreground" />
        </div>
        <h3 className="text-lg font-medium text-muted-foreground">No plushies yet</h3>
        <p className="text-sm text-muted-foreground mt-1">
          Generate your first plushie to see it here!
        </p>
      </div>
    );
  }

  return (
    <div
      className={cn(
        "grid gap-4",
        cardSize === "sm" && "grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5",
        cardSize === "md" && "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4",
        cardSize === "lg" && "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
        className
      )}
    >
      {generations.map((generation) => (
        <PlushieCard
          key={generation.id}
          generation={generation}
          onToggleFavorite={onToggleFavorite}
          onView={onView}
          onDownload={onDownload}
          size={cardSize}
        />
      ))}
    </div>
  );
}