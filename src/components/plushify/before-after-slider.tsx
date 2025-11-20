"use client";

import { useState, useRef, useEffect } from "react";
import { cn } from "@/lib/utils";

interface BeforeAfterSliderProps {
  beforeImage: string;
  afterImage: string;
  beforeAlt?: string;
  afterAlt?: string;
  className?: string;
  initialPosition?: number; // 0-100, defaults to 50
  showLabels?: boolean;
}

export function BeforeAfterSlider({
  beforeImage,
  afterImage,
  beforeAlt = "Before",
  afterAlt = "After",
  className,
  initialPosition = 50,
  showLabels = true
}: BeforeAfterSliderProps) {
  const [sliderPosition, setSliderPosition] = useState(initialPosition);
  const [isDragging, setIsDragging] = useState(false);
  const [imagesLoaded, setImagesLoaded] = useState({ before: false, after: false });
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging || !containerRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
      setSliderPosition(percentage);
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    if (isDragging) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
    }

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging]);

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const x = e.touches[0].clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPosition(percentage);
  };

  const handleImageLoad = (image: 'before' | 'after') => {
    setImagesLoaded(prev => ({ ...prev, [image]: true }));
  };

  const allImagesLoaded = imagesLoaded.before && imagesLoaded.after;

  return (
    <div
      ref={containerRef}
      className={cn(
        "relative overflow-hidden rounded-lg bg-muted select-none",
        "aspect-square max-w-2xl mx-auto",
        className
      )}
      style={{ touchAction: 'none' }}
    >
      {/* Loading State */}
      {!allImagesLoaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-muted z-10">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      )}

      {/* Before Image (Right side) */}
      <div className="absolute inset-0">
        <img
          src={beforeImage}
          alt={beforeAlt}
          className="w-full h-full object-cover"
          onLoad={() => handleImageLoad('before')}
          draggable={false}
        />
        {showLabels && allImagesLoaded && (
          <div className="absolute top-4 right-4 bg-black/70 text-white px-3 py-1 rounded text-sm font-medium">
            Original
          </div>
        )}
      </div>

      {/* After Image (Left side, clipped) */}
      <div
        className="absolute inset-0 overflow-hidden"
        style={{
          clipPath: `polygon(0 0, ${sliderPosition}% 0, ${sliderPosition}% 100%, 0 100%)`
        }}
      >
        <img
          src={afterImage}
          alt={afterAlt}
          className="w-full h-full object-cover"
          onLoad={() => handleImageLoad('after')}
          draggable={false}
        />
        {showLabels && allImagesLoaded && (
          <div className="absolute top-4 left-4 bg-black/70 text-white px-3 py-1 rounded text-sm font-medium">
            Plushie
          </div>
        )}
      </div>

      {/* Slider */}
      {allImagesLoaded && (
        <>
          {/* Slider Line */}
          <div
            className="absolute top-0 bottom-0 w-0.5 bg-white shadow-lg z-20 cursor-ew-resize"
            style={{ left: `${sliderPosition}%` }}
          />

          {/* Slider Handle */}
          <div
            className="absolute top-1/2 w-8 h-8 bg-white rounded-full shadow-lg transform -translate-y-1/2 -translate-x-1/2 cursor-ew-resize z-30 flex items-center justify-center hover:scale-110 transition-transform"
            style={{ left: `${sliderPosition}%` }}
            onMouseDown={() => setIsDragging(true)}
            onTouchStart={() => setIsDragging(true)}
            onTouchMove={handleTouchMove}
            onTouchEnd={() => setIsDragging(false)}
          >
            <div className="flex items-center gap-0.5">
              <div className="w-0.5 h-4 bg-gray-400 rounded-full"></div>
              <div className="w-0.5 h-4 bg-gray-400 rounded-full"></div>
            </div>
          </div>

          {/* Touch/Click area for better mobile experience */}
          <div
            className="absolute inset-0 z-10 cursor-ew-resize"
            onMouseDown={(e) => {
              if (!containerRef.current) return;
              const rect = containerRef.current.getBoundingClientRect();
              const x = e.clientX - rect.left;
              const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
              setSliderPosition(percentage);
              setIsDragging(true);
            }}
            onTouchStart={(e) => {
              if (!containerRef.current) return;
              const rect = containerRef.current.getBoundingClientRect();
              const x = e.touches[0].clientX - rect.left;
              const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
              setSliderPosition(percentage);
            }}
            onTouchMove={handleTouchMove}
          />
        </>
      )}

      {/* Instructions */}
      {allImagesLoaded && (
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black/70 text-white px-3 py-1 rounded text-xs">
          Drag to compare
        </div>
      )}
    </div>
  );
}

// Simpler version for smaller spaces
export function CompactBeforeAfterSlider({
  beforeImage,
  afterImage,
  beforeAlt = "Before",
  afterAlt = "After",
  className
}: Omit<BeforeAfterSliderProps, 'showLabels' | 'initialPosition'>) {
  return (
    <BeforeAfterSlider
      beforeImage={beforeImage}
      afterImage={afterImage}
      beforeAlt={beforeAlt}
      afterAlt={afterAlt}
      initialPosition={50}
      showLabels={false}
      className={cn("aspect-video max-w-md", className)}
    />
  );
}