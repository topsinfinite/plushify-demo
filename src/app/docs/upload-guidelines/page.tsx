import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import Link from "next/link"
import {
  Camera,
  CheckCircle,
  XCircle,
  Lightbulb,
  Image,
  User,
  PawPrint,
  AlertTriangle,
  FileImage,
  Zap,
  Star
} from "lucide-react"

export default function UploadGuidelinesPage() {
  const photoExamples = [
    {
      type: "Excellent",
      icon: CheckCircle,
      color: "text-green-600",
      bg: "bg-green-50 dark:bg-green-950",
      border: "border-green-200 dark:border-green-800",
      examples: [
        "Well-lit portrait with clear facial features",
        "High contrast between subject and background",
        "Subject centered and taking up 60-80% of frame",
        "Sharp focus on the main subject",
        "Natural lighting or soft artificial light"
      ]
    },
    {
      type: "Good",
      icon: CheckCircle,
      color: "text-blue-600",
      bg: "bg-blue-50 dark:bg-blue-950",
      border: "border-blue-200 dark:border-blue-800",
      examples: [
        "Slightly dim but clear subject visibility",
        "Minor background distractions",
        "Subject takes up 40-60% of frame",
        "Acceptable focus with minor blur",
        "Indoor lighting with some shadows"
      ]
    },
    {
      type: "Poor",
      icon: XCircle,
      color: "text-red-600",
      bg: "bg-red-50 dark:bg-red-950",
      border: "border-red-200 dark:border-red-800",
      examples: [
        "Very dark or backlit subjects",
        "Blurry or out-of-focus images",
        "Multiple people or pets in frame",
        "Subject is very small in the image",
        "Heavily filtered or edited photos"
      ]
    }
  ]

  const technicalSpecs = [
    {
      category: "File Format",
      recommended: "JPG, PNG",
      acceptable: "WEBP",
      avoid: "GIF, BMP, TIFF"
    },
    {
      category: "File Size",
      recommended: "1-5 MB",
      acceptable: "Up to 10 MB",
      avoid: "Over 10 MB"
    },
    {
      category: "Resolution",
      recommended: "1000x1000px+",
      acceptable: "500x500px+",
      avoid: "Below 300x300px"
    },
    {
      category: "Aspect Ratio",
      recommended: "Square (1:1)",
      acceptable: "Portrait (4:5)",
      avoid: "Wide landscape"
    }
  ]

  const subjectTypes = [
    {
      icon: User,
      title: "People",
      description: "Individual portraits work best",
      tips: [
        "Face should be clearly visible",
        "Good lighting on facial features",
        "Avoid group photos",
        "Neutral background preferred",
        "Natural expressions work best"
      ]
    },
    {
      icon: PawPrint,
      title: "Pets",
      description: "Animals make adorable plushies",
      tips: [
        "Show full face or profile",
        "Capture distinctive features",
        "Ensure pet is still and focused",
        "Natural outdoor lighting ideal",
        "Single pet per photo"
      ]
    }
  ]

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-6">
            <Camera className="h-10 w-10 text-primary mr-4" />
            <h1 className="text-4xl font-bold">Upload Guidelines</h1>
          </div>
          <p className="text-xl text-muted-foreground mb-6">
            Follow these guidelines to create the most amazing plushies with our AI
          </p>
          <Badge variant="secondary" className="text-sm">
            <Star className="h-4 w-4 mr-1" />
            Pro Tips Inside
          </Badge>
        </div>

        {/* Quick Start Alert */}
        <Alert className="mb-8">
          <Lightbulb className="h-4 w-4" />
          <AlertDescription>
            <strong>Quick Tip:</strong> The better your photo quality, the more amazing your plushie will look!
            Take a moment to ensure good lighting and clear focus for best results.
          </AlertDescription>
        </Alert>

        {/* Photo Quality Examples */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold mb-8 text-center">Photo Quality Guide</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {photoExamples.map((example, index) => (
              <Card key={index} className={`${example.bg} ${example.border} border-2`}>
                <CardHeader>
                  <CardTitle className={`flex items-center gap-3 ${example.color}`}>
                    <example.icon className="h-6 w-6" />
                    {example.type}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {example.examples.map((item, itemIndex) => (
                      <li key={itemIndex} className="flex items-start gap-2 text-sm">
                        <div className="w-1.5 h-1.5 rounded-full bg-current mt-2 flex-shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Technical Specifications */}
        <Card className="mb-12">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-2xl">
              <FileImage className="h-6 w-6" />
              Technical Specifications
            </CardTitle>
            <CardDescription>
              Optimal file specifications for best AI processing results
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4 font-semibold">Specification</th>
                    <th className="text-left py-3 px-4 font-semibold text-green-600">Recommended</th>
                    <th className="text-left py-3 px-4 font-semibold text-blue-600">Acceptable</th>
                    <th className="text-left py-3 px-4 font-semibold text-red-600">Avoid</th>
                  </tr>
                </thead>
                <tbody>
                  {technicalSpecs.map((spec, index) => (
                    <tr key={index} className="border-b last:border-b-0">
                      <td className="py-3 px-4 font-medium">{spec.category}</td>
                      <td className="py-3 px-4 text-green-700 dark:text-green-400">{spec.recommended}</td>
                      <td className="py-3 px-4 text-blue-700 dark:text-blue-400">{spec.acceptable}</td>
                      <td className="py-3 px-4 text-red-700 dark:text-red-400">{spec.avoid}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Subject Types */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold mb-8 text-center">Subject Guidelines</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {subjectTypes.map((subject, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                      <subject.icon className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-xl">{subject.title}</h3>
                      <p className="text-sm text-muted-foreground">{subject.description}</p>
                    </div>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {subject.tips.map((tip, tipIndex) => (
                      <li key={tipIndex} className="flex items-start gap-2 text-sm">
                        <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                        <span>{tip}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Lighting Guide */}
        <Card className="mb-12">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-2xl">
              <Zap className="h-6 w-6" />
              Lighting Guide
            </CardTitle>
            <CardDescription>
              Master lighting for professional-looking plushies
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h4 className="font-semibold text-green-600 mb-4">✓ Best Lighting Conditions</h4>
                <ul className="space-y-3 text-sm">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                    <div>
                      <strong>Natural Window Light:</strong> Soft, diffused light from a large window
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                    <div>
                      <strong>Overcast Day:</strong> Even, soft lighting without harsh shadows
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                    <div>
                      <strong>Open Shade:</strong> Outdoor lighting in shade, away from direct sun
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                    <div>
                      <strong>Ring Light:</strong> Soft, even artificial lighting for close-ups
                    </div>
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-red-600 mb-4">✗ Lighting to Avoid</h4>
                <ul className="space-y-3 text-sm">
                  <li className="flex items-start gap-2">
                    <XCircle className="h-4 w-4 text-red-500 mt-0.5 flex-shrink-0" />
                    <div>
                      <strong>Direct Flash:</strong> Harsh, flat lighting that creates unflattering results
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <XCircle className="h-4 w-4 text-red-500 mt-0.5 flex-shrink-0" />
                    <div>
                      <strong>Backlighting:</strong> Light behind subject creating silhouettes
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <XCircle className="h-4 w-4 text-red-500 mt-0.5 flex-shrink-0" />
                    <div>
                      <strong>Mixed Lighting:</strong> Combination of different light colors and sources
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <XCircle className="h-4 w-4 text-red-500 mt-0.5 flex-shrink-0" />
                    <div>
                      <strong>Very Dim Light:</strong> Insufficient lighting causing noise and blur
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Common Mistakes */}
        <Card className="mb-12">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-2xl">
              <AlertTriangle className="h-6 w-6" />
              Common Mistakes to Avoid
            </CardTitle>
            <CardDescription>
              Learn from these frequent upload issues
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h4 className="font-semibold mb-4">Composition Issues</h4>
                <ul className="space-y-3 text-sm text-muted-foreground">
                  <li>• Subject too small in the frame</li>
                  <li>• Multiple subjects competing for attention</li>
                  <li>• Tilted or crooked photos</li>
                  <li>• Important features cut off by frame edges</li>
                  <li>• Busy or distracting backgrounds</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-4">Technical Issues</h4>
                <ul className="space-y-3 text-sm text-muted-foreground">
                  <li>• Motion blur from camera shake</li>
                  <li>• Over or under-exposed images</li>
                  <li>• Heavy digital filters or effects</li>
                  <li>• Compressed or low-quality images</li>
                  <li>• Screenshots instead of original photos</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Pro Tips */}
        <Card className="mb-12 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-950 dark:to-pink-950 border-purple-200 dark:border-purple-800">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-2xl text-purple-700 dark:text-purple-300">
              <Star className="h-6 w-6" />
              Pro Tips for Amazing Results
            </CardTitle>
            <CardDescription className="text-purple-600 dark:text-purple-400">
              Advanced techniques from our community of creators
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="p-4 bg-white/50 dark:bg-gray-800/50 rounded-lg">
                  <h5 className="font-semibold mb-2">📸 Camera Settings</h5>
                  <p className="text-sm text-muted-foreground">
                    Use portrait mode on phones for natural background blur, or manually set a wide aperture (f/1.8-f/2.8) on cameras.
                  </p>
                </div>
                <div className="p-4 bg-white/50 dark:bg-gray-800/50 rounded-lg">
                  <h5 className="font-semibold mb-2">🎨 Color Considerations</h5>
                  <p className="text-sm text-muted-foreground">
                    Vibrant, saturated colors translate better to plushie form. Avoid very pale or washed-out color palettes.
                  </p>
                </div>
              </div>
              <div className="space-y-4">
                <div className="p-4 bg-white/50 dark:bg-gray-800/50 rounded-lg">
                  <h5 className="font-semibold mb-2">👁️ Eye Contact</h5>
                  <p className="text-sm text-muted-foreground">
                    Photos where the subject looks directly at the camera create more engaging and lifelike plushies.
                  </p>
                </div>
                <div className="p-4 bg-white/50 dark:bg-gray-800/50 rounded-lg">
                  <h5 className="font-semibold mb-2">⚡ Quick Edits</h5>
                  <p className="text-sm text-muted-foreground">
                    Light adjustments to brightness and contrast are fine, but avoid heavy filters or AI enhancement tools.
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Before You Upload Checklist */}
        <Card className="mb-12">
          <CardHeader>
            <CardTitle className="text-2xl">Final Checklist</CardTitle>
            <CardDescription>
              Review these points before uploading your photo
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h4 className="font-semibold mb-4">Photo Quality</h4>
                <div className="space-y-2">
                  {[
                    "Image is clear and in focus",
                    "Good lighting without harsh shadows",
                    "Subject is well-framed and centered",
                    "Background is simple or blurred",
                    "Colors are natural and vibrant"
                  ].map((item, index) => (
                    <label key={index} className="flex items-center gap-3 text-sm cursor-pointer">
                      <input type="checkbox" className="rounded" />
                      <span>{item}</span>
                    </label>
                  ))}
                </div>
              </div>
              <div>
                <h4 className="font-semibold mb-4">Technical Requirements</h4>
                <div className="space-y-2">
                  {[
                    "File format is JPG, PNG, or WEBP",
                    "File size is under 10MB",
                    "Resolution is at least 500x500px",
                    "Only one main subject in photo",
                    "No heavy filters or effects applied"
                  ].map((item, index) => (
                    <label key={index} className="flex items-center gap-3 text-sm cursor-pointer">
                      <input type="checkbox" className="rounded" />
                      <span>{item}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Call to Action */}
        <Card className="text-center">
          <CardContent className="pt-8">
            <Image className="h-16 w-16 mx-auto mb-4 text-primary" />
            <h3 className="text-2xl font-bold mb-4">Ready to Upload Your Photo?</h3>
            <p className="text-muted-foreground mb-6 max-w-md mx-auto">
              Follow these guidelines and you&apos;ll be amazed at the quality of your AI-generated plushie!
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button size="lg" asChild>
                <Link href="/generate">
                  <Camera className="h-5 w-5 mr-2" />
                  Start Creating
                </Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link href="/docs">
                  <Lightbulb className="h-5 w-5 mr-2" />
                  Getting Started Guide
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Footer Navigation */}
        <div className="mt-12 pt-8 border-t">
          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              href="/docs"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Getting Started
            </Link>
            <Link
              href="/docs/faq"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              FAQ
            </Link>
            <Link
              href="/generate"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Generate Plushie
            </Link>
            <Link
              href="/"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}