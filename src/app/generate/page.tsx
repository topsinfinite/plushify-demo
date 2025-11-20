import type { Metadata } from "next";

"use client"

export const metadata: Metadata = {
  title: "Generate AI Plushie",
  description: "Transform your photos into adorable plushies with AI! Upload any photo and choose from Classic, Kawaii, or Realistic styles. Generate your personalized plushie in seconds.",
  openGraph: {
    title: "Generate AI Plushie - Plushify",
    description: "Transform your photos into adorable plushies with AI! Upload any photo and choose from Classic, Kawaii, or Realistic styles.",
  },
};

import { useState, useCallback } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { useUser } from "@/lib/auth-client"
import { mockUser, updateUserCredits, createGeneration } from "@/lib/mock-data"
import { Upload, Download, Heart, Share2, Sparkles, AlertCircle, CheckCircle, Camera, Palette, Wand2 } from "lucide-react"

interface UploadedFile {
  file: File
  preview: string
  size: string
  dimensions?: string
}

interface GenerationResult {
  id: string
  originalUrl: string
  plushieUrl: string
  style: string
  createdAt: Date
}

const plushieStyles = [
  {
    id: "classic",
    name: "Classic",
    description: "Traditional plushie style with soft, rounded features",
    example: "/api/placeholder/120/120"
  },
  {
    id: "kawaii",
    name: "Kawaii",
    description: "Japanese cute style with big eyes and adorable features",
    example: "/api/placeholder/120/120"
  },
  {
    id: "realistic",
    name: "Realistic",
    description: "More detailed and lifelike plushie representation",
    example: "/api/placeholder/120/120"
  }
]

const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return "0 Bytes"
  const k = 1024
  const sizes = ["Bytes", "KB", "MB"]
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
}

const getImageDimensions = (file: File): Promise<string> => {
  return new Promise((resolve) => {
    const img = new Image()
    img.onload = () => {
      resolve(`${img.width} × ${img.height}`)
      URL.revokeObjectURL(img.src)
    }
    img.src = URL.createObjectURL(file)
  })
}

export default function GeneratePage() {
  const { data: user } = useUser()
  const router = useRouter()
  const [uploadedFile, setUploadedFile] = useState<UploadedFile | null>(null)
  const [selectedStyle, setSelectedStyle] = useState<string>("")
  const [isGenerating, setIsGenerating] = useState(false)
  const [generationProgress, setGenerationProgress] = useState(0)
  const [generationStatus, setGenerationStatus] = useState("")
  const [generationResult, setGenerationResult] = useState<GenerationResult | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [isDragOver, setIsDragOver] = useState(false)

  const currentUser = user || mockUser

  const validateFile = (file: File): string | null => {
    const allowedTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp"]
    if (!allowedTypes.includes(file.type)) {
      return "Please upload a JPG, PNG, or WEBP image file"
    }
    if (file.size > 10 * 1024 * 1024) {
      return "File size must be less than 10MB"
    }
    return null
  }

  const handleFileUpload = useCallback(async (file: File) => {
    const validation = validateFile(file)
    if (validation) {
      setError(validation)
      return
    }

    setError(null)
    const preview = URL.createObjectURL(file)
    const size = formatFileSize(file.size)
    const dimensions = await getImageDimensions(file)

    setUploadedFile({
      file,
      preview,
      size,
      dimensions
    })
  }, [])

  const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setIsDragOver(false)

    const files = Array.from(e.dataTransfer.files)
    if (files.length > 0) {
      handleFileUpload(files[0])
    }
  }, [handleFileUpload])

  const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setIsDragOver(true)
  }, [])

  const handleDragLeave = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setIsDragOver(false)
  }, [])

  const handleFileInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    if (files.length > 0) {
      handleFileUpload(files[0])
    }
  }, [handleFileUpload])

  const simulateGeneration = async () => {
    if (!uploadedFile || !selectedStyle || currentUser.credits < 1) return

    setIsGenerating(true)
    setGenerationProgress(0)
    setError(null)

    // Simulate AI processing
    const steps = [
      { progress: 20, status: "Analyzing your photo..." },
      { progress: 40, status: "Preparing AI model..." },
      { progress: 60, status: "Generating plushie design..." },
      { progress: 80, status: "Applying style preferences..." },
      { progress: 100, status: "Finalizing your plushie..." }
    ]

    for (const step of steps) {
      setGenerationProgress(step.progress)
      setGenerationStatus(step.status)
      await new Promise(resolve => setTimeout(resolve, 600))
    }

    // Create mock result
    const result: GenerationResult = {
      id: Date.now().toString(),
      originalUrl: uploadedFile.preview,
      plushieUrl: "/api/placeholder/400/400", // Mock plushie result
      style: selectedStyle as "classic" | "kawaii" | "realistic",
      createdAt: new Date()
    }

    // Update user credits and add to gallery
    updateUserCredits(currentUser.credits - 1)
    createGeneration({
      id: result.id,
      originalImage: result.originalUrl,
      plushieImage: result.plushieUrl,
      style: selectedStyle as "classic" | "kawaii" | "realistic",
      createdAt: result.createdAt,
      isFavorite: false,
      category: "people" // Default category for user uploads
    })

    setGenerationResult(result)
    setIsGenerating(false)
  }

  const downloadResult = () => {
    if (!generationResult) return
    // In a real app, this would download the actual file
    const link = document.createElement("a")
    link.href = generationResult.plushieUrl
    link.download = `plushie-${generationResult.id}.png`
    link.click()
  }

  const saveToGallery = () => {
    // Already saved during generation
    alert("Saved to your gallery!")
  }

  const generateAnother = () => {
    setUploadedFile(null)
    setSelectedStyle("")
    setGenerationResult(null)
    setGenerationProgress(0)
    setGenerationStatus("")
    setError(null)
  }

  if (generationResult) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-2">Your Plushie is Ready! 🧸</h1>
            <p className="text-muted-foreground">
              Amazing! Your {plushieStyles.find(s => s.id === selectedStyle)?.name} style plushie has been generated.
            </p>
          </div>

          <Card className="mb-8">
            <CardContent className="p-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="text-center">
                  <h3 className="text-lg font-semibold mb-4">Original Photo</h3>
                  <div className="relative aspect-square rounded-lg overflow-hidden bg-muted">
                    <img
                      src={generationResult.originalUrl}
                      alt="Original"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
                <div className="text-center">
                  <h3 className="text-lg font-semibold mb-4">Your Plushie</h3>
                  <div className="relative aspect-square rounded-lg overflow-hidden bg-muted">
                    <img
                      src={generationResult.plushieUrl}
                      alt="Generated plushie"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="flex flex-wrap gap-4 justify-center">
            <Button onClick={downloadResult} className="gap-2">
              <Download className="h-4 w-4" />
              Download HD Image
            </Button>
            <Button variant="outline" onClick={saveToGallery} className="gap-2">
              <Heart className="h-4 w-4" />
              Save to Gallery
            </Button>
            <Button variant="outline" className="gap-2">
              <Share2 className="h-4 w-4" />
              Share
            </Button>
            <Button variant="secondary" onClick={generateAnother} className="gap-2">
              <Wand2 className="h-4 w-4" />
              Generate Another
            </Button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">Create Your Plushie 🧸</h1>
          <p className="text-muted-foreground">
            Upload a photo and watch our AI transform it into an adorable plushie
          </p>
        </div>

        {error && (
          <Alert className="mb-6" variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <div className="grid gap-8">
          {/* Upload Section */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Upload className="h-5 w-5" />
                Upload Your Photo
              </CardTitle>
              <CardDescription>
                Upload a clear photo of yourself, a loved one, or your pet
              </CardDescription>
            </CardHeader>
            <CardContent>
              {!uploadedFile ? (
                <div
                  className={`relative border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
                    isDragOver ? "border-primary bg-primary/5" : "border-muted-foreground/25"
                  }`}
                  onDrop={handleDrop}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                >
                  <input
                    type="file"
                    accept="image/jpeg,image/jpg,image/png,image/webp"
                    onChange={handleFileInput}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  />
                  <Camera className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                  <p className="text-lg font-medium mb-2">Drag & drop your photo here</p>
                  <p className="text-sm text-muted-foreground mb-4">or click to browse</p>
                  <p className="text-xs text-muted-foreground">
                    Supports JPG, PNG, WEBP • Max 10MB
                  </p>
                </div>
              ) : (
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="relative aspect-square rounded-lg overflow-hidden bg-muted">
                    <img
                      src={uploadedFile.preview}
                      alt="Uploaded preview"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold mb-2">File Details</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Size:</span>
                          <span>{uploadedFile.size}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Dimensions:</span>
                          <span>{uploadedFile.dimensions}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Format:</span>
                          <span>{uploadedFile.file.type.split('/')[1].toUpperCase()}</span>
                        </div>
                      </div>
                    </div>
                    <Button
                      variant="outline"
                      onClick={() => setUploadedFile(null)}
                      className="w-full"
                    >
                      Upload Different Photo
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Style Selection */}
          {uploadedFile && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Palette className="h-5 w-5" />
                  Choose Your Style
                </CardTitle>
                <CardDescription>
                  Select the plushie style that best fits your vision
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-4">
                  {plushieStyles.map((style) => (
                    <Card
                      key={style.id}
                      className={`cursor-pointer transition-all ${
                        selectedStyle === style.id
                          ? "ring-2 ring-primary bg-primary/5"
                          : "hover:bg-muted/50"
                      }`}
                      onClick={() => setSelectedStyle(style.id)}
                    >
                      <CardContent className="p-4 text-center">
                        <div className="w-20 h-20 mx-auto mb-3 rounded-lg bg-muted flex items-center justify-center">
                          <img
                            src={style.example}
                            alt={style.name}
                            className="w-full h-full object-cover rounded-lg"
                          />
                        </div>
                        <h4 className="font-semibold mb-1">{style.name}</h4>
                        <p className="text-xs text-muted-foreground">{style.description}</p>
                        {selectedStyle === style.id && (
                          <CheckCircle className="h-4 w-4 text-primary mx-auto mt-2" />
                        )}
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Generation Section */}
          {uploadedFile && selectedStyle && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Sparkles className="h-5 w-5" />
                  Generate Your Plushie
                </CardTitle>
              </CardHeader>
              <CardContent>
                {!isGenerating ? (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
                      <div>
                        <p className="font-medium">Ready to generate!</p>
                        <p className="text-sm text-muted-foreground">
                          This will use 1 credit from your balance
                        </p>
                      </div>
                      <Badge variant="secondary">1 Credit</Badge>
                    </div>

                    <div className="text-center">
                      {currentUser.credits >= 1 ? (
                        <Button
                          onClick={simulateGeneration}
                          size="lg"
                          className="gap-2"
                        >
                          <Wand2 className="h-5 w-5" />
                          Generate My Plushie
                        </Button>
                      ) : (
                        <div className="space-y-4">
                          <Alert variant="destructive">
                            <AlertCircle className="h-4 w-4" />
                            <AlertDescription>
                              You don&apos;t have enough credits. You need 1 credit to generate a plushie.
                            </AlertDescription>
                          </Alert>
                          <Button onClick={() => router.push("/pricing")}>
                            Buy More Credits
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="text-center">
                      <div className="mb-4">
                        <Sparkles className="h-8 w-8 mx-auto text-primary animate-spin" />
                      </div>
                      <h3 className="text-lg font-semibold mb-2">Creating Your Plushie</h3>
                      <p className="text-muted-foreground mb-4">{generationStatus}</p>
                    </div>
                    <Progress value={generationProgress} className="w-full" />
                    <p className="text-center text-sm text-muted-foreground">
                      {generationProgress}% complete
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}