"use client";

import { useState, useCallback, useRef } from "react";
import { Upload, Image as ImageIcon, X, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";

export interface UploadValidation {
  isValid: boolean;
  errors: string[];
  warnings?: string[];
  fileInfo?: {
    size: number;
    width: number;
    height: number;
    format: string;
  };
}

interface ImageUploadProps {
  onImageSelect: (file: File, validation: UploadValidation) => void;
  onRemove?: () => void;
  maxSizeBytes?: number;
  acceptedFormats?: string[];
  className?: string;
  disabled?: boolean;
  currentImage?: string;
  showPreview?: boolean;
}

export function ImageUpload({
  onImageSelect,
  onRemove,
  maxSizeBytes = 10 * 1024 * 1024, // 10MB default
  acceptedFormats = ["image/jpeg", "image/png", "image/webp"],
  className,
  disabled = false,
  currentImage,
  showPreview = true
}: ImageUploadProps) {
  const [isDragOver, setIsDragOver] = useState(false);
  const [preview, setPreview] = useState<string | null>(currentImage || null);
  const [validation, setValidation] = useState<UploadValidation | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const validateFile = useCallback(async (file: File): Promise<UploadValidation> => {
    const errors: string[] = [];
    const warnings: string[] = [];

    // Check file type
    if (!acceptedFormats.includes(file.type)) {
      errors.push(`File type ${file.type} is not supported. Please use JPG, PNG, or WebP.`);
    }

    // Check file size
    if (file.size > maxSizeBytes) {
      const maxMB = Math.round(maxSizeBytes / (1024 * 1024));
      errors.push(`File size (${Math.round(file.size / (1024 * 1024))}MB) exceeds ${maxMB}MB limit.`);
    }

    // Get image dimensions
    const fileInfo = await new Promise<{
      size: number;
      width: number;
      height: number;
      format: string;
    }>((resolve) => {
      const img = new Image();
      img.onload = () => {
        resolve({
          size: file.size,
          width: img.width,
          height: img.height,
          format: file.type
        });
      };
      img.src = URL.createObjectURL(file);
    });

    // Check image dimensions
    if (fileInfo.width < 256 || fileInfo.height < 256) {
      errors.push("Image should be at least 256x256 pixels for best results.");
    }

    if (fileInfo.width < 512 || fileInfo.height < 512) {
      warnings.push("For best results, use images larger than 512x512 pixels.");
    }

    // Check aspect ratio
    const aspectRatio = fileInfo.width / fileInfo.height;
    if (aspectRatio < 0.5 || aspectRatio > 2) {
      warnings.push("Images work best with aspect ratios close to square (1:1).");
    }

    return {
      isValid: errors.length === 0,
      errors,
      warnings,
      fileInfo
    };
  }, [acceptedFormats, maxSizeBytes]);

  const handleFileSelect = useCallback(async (file: File) => {
    if (disabled) return;

    const validationResult = await validateFile(file);
    setValidation(validationResult);

    if (validationResult.isValid) {
      const previewUrl = URL.createObjectURL(file);
      setPreview(previewUrl);
      onImageSelect(file, validationResult);
    }
  }, [disabled, validateFile, onImageSelect]);

  const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragOver(false);

    if (disabled) return;

    const files = Array.from(e.dataTransfer.files);
    const imageFile = files.find(file => acceptedFormats.includes(file.type));

    if (imageFile) {
      handleFileSelect(imageFile);
    }
  }, [disabled, acceptedFormats, handleFileSelect]);

  const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (!disabled) {
      setIsDragOver(true);
    }
  }, [disabled]);

  const handleDragLeave = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragOver(false);
  }, []);

  const handleRemove = useCallback(() => {
    setPreview(null);
    setValidation(null);
    if (preview && preview.startsWith("blob:")) {
      URL.revokeObjectURL(preview);
    }
    onRemove?.();
  }, [preview, onRemove]);

  const handleFileInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFileSelect(file);
    }
  }, [handleFileSelect]);

  return (
    <div className={cn("space-y-4", className)}>
      {!preview ? (
        <div
          className={cn(
            "relative border-2 border-dashed rounded-lg p-8 text-center transition-colors cursor-pointer",
            isDragOver && !disabled
              ? "border-primary bg-primary/5"
              : "border-muted-foreground/25 hover:border-muted-foreground/50",
            disabled && "opacity-50 cursor-not-allowed"
          )}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onClick={() => !disabled && fileInputRef.current?.click()}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept={acceptedFormats.join(",")}
            onChange={handleFileInputChange}
            className="sr-only"
            disabled={disabled}
          />

          <div className="flex flex-col items-center gap-4">
            <div className="flex items-center justify-center w-16 h-16 rounded-full bg-muted">
              <Upload className="h-8 w-8 text-muted-foreground" />
            </div>

            <div className="space-y-2">
              <h3 className="text-lg font-medium">
                {isDragOver ? "Drop your image here" : "Upload your photo"}
              </h3>
              <p className="text-sm text-muted-foreground">
                Drag and drop or click to select • JPG, PNG, WebP up to {Math.round(maxSizeBytes / (1024 * 1024))}MB
              </p>
            </div>

            <Button variant="outline" size="sm" disabled={disabled}>
              <ImageIcon className="h-4 w-4 mr-2" />
              Choose Image
            </Button>
          </div>
        </div>
      ) : (
        showPreview && (
          <div className="relative">
            <div className="relative rounded-lg overflow-hidden border bg-muted">
              <img
                src={preview}
                alt="Upload preview"
                className="w-full h-64 object-cover"
              />
              <Button
                variant="destructive"
                size="sm"
                className="absolute top-2 right-2"
                onClick={handleRemove}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>
        )
      )}

      {validation && (
        <div className="space-y-2">
          {validation.errors.length > 0 && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                <ul className="list-disc list-inside space-y-1">
                  {validation.errors.map((error, index) => (
                    <li key={index} className="text-sm">{error}</li>
                  ))}
                </ul>
              </AlertDescription>
            </Alert>
          )}

          {validation.warnings && validation.warnings.length > 0 && (
            <Alert>
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                <ul className="list-disc list-inside space-y-1">
                  {validation.warnings.map((warning, index) => (
                    <li key={index} className="text-sm">{warning}</li>
                  ))}
                </ul>
              </AlertDescription>
            </Alert>
          )}

          {validation.fileInfo && validation.isValid && (
            <div className="text-xs text-muted-foreground space-y-1">
              <p>
                Size: {Math.round(validation.fileInfo.size / (1024 * 1024) * 10) / 10}MB •
                Dimensions: {validation.fileInfo.width}×{validation.fileInfo.height}px
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}