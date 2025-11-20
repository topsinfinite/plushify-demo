export type PlushieStyle = "classic" | "kawaii" | "realistic";

export type GenerationCategory = "people" | "pets";

export type GalleryFilter = "all" | "people" | "pets" | "favorites";

export interface PlushieGeneration {
  id: string;
  userId: string;
  originalImage: string;
  plushieImage: string;
  style: PlushieStyle;
  createdAt: Date;
  isFavorite: boolean;
  category: GenerationCategory;
  metadata?: GenerationMetadata;
}

export interface GenerationMetadata {
  originalImageSize?: string;
  processingTime?: number;
  creditsUsed?: number;
  originalWidth?: number;
  originalHeight?: number;
  plushieWidth?: number;
  plushieHeight?: number;
}

export interface PlushifyUser {
  id: string;
  name: string;
  email: string;
  image?: string;
  joinDate: Date;
  credits: number;
  totalGenerations: number;
  creditsUsed: number;
  favoriteCount: number;
  subscription?: UserSubscription;
}

export interface UserSubscription {
  plan: "basic" | "pro" | "elite";
  status: "active" | "cancelled" | "expired";
  expiresAt?: Date;
  creditsPerMonth: number;
}

export interface PlushifySession {
  user: PlushifyUser;
  session: {
    token: string;
    expiresAt: Date;
  };
}

export interface UserStats {
  totalGenerations: number;
  creditsUsed: number;
  creditsRemaining: number;
  favoriteCount: number;
  joinDate: Date;
  recentGenerations: PlushieGeneration[];
}

export interface PricingTier {
  name: string;
  price: number;
  credits: number;
  badge?: "Most Popular" | "Best Value";
  features: string[];
  highlighted?: boolean;
}

export interface GenerationRequest {
  imageFile: File;
  style: PlushieStyle;
  category?: GenerationCategory;
}

export interface GenerationResponse {
  success: boolean;
  generationId?: string;
  plushieImageUrl?: string;
  creditsUsed: number;
  error?: string;
  processingTime?: number;
}

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

// Component Props Types
export interface PlushieCardProps {
  generation: PlushieGeneration;
  onToggleFavorite?: (id: string) => void;
  onView?: (generation: PlushieGeneration) => void;
  showOriginal?: boolean;
}

export interface BeforeAfterSliderProps {
  beforeImage: string;
  afterImage: string;
  beforeAlt?: string;
  afterAlt?: string;
  className?: string;
}

export interface ImageUploadProps {
  onImageSelect: (file: File) => void;
  maxSizeBytes?: number;
  acceptedFormats?: string[];
  className?: string;
  disabled?: boolean;
}

export interface CreditsDisplayProps {
  credits: number;
  size?: "sm" | "md" | "lg";
  showIcon?: boolean;
  className?: string;
}

export interface MockProgressProps {
  isProcessing: boolean;
  stage?: "uploading" | "processing" | "generating" | "complete";
  processingTime?: number;
  onComplete?: () => void;
}