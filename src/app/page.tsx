"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BeforeAfterSlider } from "@/components/plushify/before-after-slider";
import { PricingCard, pricingTiers } from "@/components/plushify/pricing-card";
import { getMockUserGenerations } from "@/lib/mock-data";
import {
  Shield,
  Palette,
  Bot,
  Upload,
  Sparkles,
  Download,
  Clock,
  Star,
  Users,
  CheckCircle
} from "lucide-react";

export default function Home() {
  const mockGenerations = getMockUserGenerations().slice(0, 6);

  return (
    <main className="flex-1">
      {/* Hero Section */}
      <section className="relative py-20 lg:py-28 bg-gradient-to-b from-primary/5 via-background to-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <div className="space-y-6">
              <div className="flex items-center justify-center gap-3 mb-4">
                <div className="flex items-center justify-center w-16 h-16 rounded-xl bg-primary/10">
                  <Bot className="h-9 w-9 text-primary" />
                </div>
                <h1 className="text-6xl font-bold tracking-tight bg-gradient-to-r from-primary via-primary/90 to-primary/70 bg-clip-text text-transparent">
                  Plushify
                </h1>
              </div>
              <h2 className="text-3xl lg:text-4xl font-bold text-foreground max-w-3xl mx-auto leading-tight">
                Transform Any Photo into an Adorable AI-Generated Plushie Design
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                Upload any photo and watch our advanced AI transform it into a cute, cuddly plushie design in seconds. Perfect for gifts, keepsakes, or bringing your imagination to life!
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button asChild size="lg" className="text-lg px-8 py-6">
                <Link href="/dashboard">Get Started Free</Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="text-lg px-8 py-6">
                <Link href="/gallery">View Examples</Link>
              </Button>
            </div>

            <div className="flex items-center justify-center gap-6 text-sm text-muted-foreground pt-6">
              <div className="flex items-center gap-1">
                <Users className="h-4 w-4" />
                <span>10,000+ happy users</span>
              </div>
              <div className="flex items-center gap-1">
                <Sparkles className="h-4 w-4" />
                <span>50,000+ plushies created</span>
              </div>
              <div className="flex items-center gap-1">
                <Star className="h-4 w-4 fill-current text-yellow-500" />
                <span>4.9/5 rating</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Before/After Showcase */}
      <section className="py-16 lg:py-24 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl lg:text-4xl font-bold mb-4">
                See the Magic in Action
              </h2>
              <p className="text-xl text-muted-foreground">
                Real transformations from our AI plushie generator
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {mockGenerations.map((generation, index) => (
                <div key={generation.id} className="group">
                  <BeforeAfterSlider
                    beforeImage={generation.originalImage}
                    afterImage={generation.plushieImage}
                    beforeAlt={`Original photo ${index + 1}`}
                    afterAlt={`Plushie design ${index + 1}`}
                    className="mb-4 transform group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="text-center space-y-2">
                    <Badge variant="secondary" className="capitalize">
                      {generation.style} Style
                    </Badge>
                    <p className="text-sm text-muted-foreground capitalize">
                      {generation.category === "people" ? "Person" : "Pet"} • Created {generation.createdAt.toLocaleDateString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-4xl font-bold mb-4">
                How It Works
              </h2>
              <p className="text-xl text-muted-foreground">
                Create your perfect plushie in three simple steps
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center space-y-6">
                <div className="flex items-center justify-center w-20 h-20 mx-auto rounded-full bg-primary/10">
                  <Upload className="h-10 w-10 text-primary" />
                </div>
                <div className="space-y-4">
                  <div className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-primary text-primary-foreground text-sm font-bold">
                    1
                  </div>
                  <h3 className="text-2xl font-semibold">Upload Your Photo</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Upload any clear photo of a person or pet. Our AI works best with well-lit, high-quality images with the subject clearly visible.
                  </p>
                </div>
              </div>

              <div className="text-center space-y-6">
                <div className="flex items-center justify-center w-20 h-20 mx-auto rounded-full bg-primary/10">
                  <Palette className="h-10 w-10 text-primary" />
                </div>
                <div className="space-y-4">
                  <div className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-primary text-primary-foreground text-sm font-bold">
                    2
                  </div>
                  <h3 className="text-2xl font-semibold">Choose Your Style</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Select from Classic, Kawaii, or Realistic styles. Each style creates a unique interpretation of your photo as a loveable plushie.
                  </p>
                </div>
              </div>

              <div className="text-center space-y-6">
                <div className="flex items-center justify-center w-20 h-20 mx-auto rounded-full bg-primary/10">
                  <Download className="h-10 w-10 text-primary" />
                </div>
                <div className="space-y-4">
                  <div className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-primary text-primary-foreground text-sm font-bold">
                    3
                  </div>
                  <h3 className="text-2xl font-semibold">Download & Share</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    In seconds, receive your custom plushie design in high resolution. Download, share, or save to your personal gallery.
                  </p>
                </div>
              </div>
            </div>

            <div className="text-center mt-12">
              <Button asChild size="lg" className="text-lg px-8 py-6">
                <Link href="/generate">Start Creating Now</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Highlight */}
      <section className="py-16 lg:py-24 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-4xl font-bold mb-4">
                Why Choose Plushify?
              </h2>
              <p className="text-xl text-muted-foreground">
                The most advanced AI plushie generator with unmatched quality and speed
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <Card className="text-center p-6 hover:shadow-lg transition-shadow">
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-center w-16 h-16 mx-auto rounded-full bg-primary/10 mb-4">
                    <Bot className="h-8 w-8 text-primary" />
                  </div>
                  <CardTitle className="text-xl">AI-Powered</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    State-of-the-art AI technology trained on thousands of plushie designs for perfect results every time.
                  </p>
                </CardContent>
              </Card>

              <Card className="text-center p-6 hover:shadow-lg transition-shadow">
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-center w-16 h-16 mx-auto rounded-full bg-primary/10 mb-4">
                    <Clock className="h-8 w-8 text-primary" />
                  </div>
                  <CardTitle className="text-xl">Lightning Fast</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Generate beautiful plushie designs in under 5 seconds. No waiting around - instant gratification.
                  </p>
                </CardContent>
              </Card>

              <Card className="text-center p-6 hover:shadow-lg transition-shadow">
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-center w-16 h-16 mx-auto rounded-full bg-primary/10 mb-4">
                    <Sparkles className="h-8 w-8 text-primary" />
                  </div>
                  <CardTitle className="text-xl">Multiple Styles</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Choose from Classic, Kawaii, and Realistic styles. Each offers a unique take on your plushie design.
                  </p>
                </CardContent>
              </Card>

              <Card className="text-center p-6 hover:shadow-lg transition-shadow">
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-center w-16 h-16 mx-auto rounded-full bg-primary/10 mb-4">
                    <Shield className="h-8 w-8 text-primary" />
                  </div>
                  <CardTitle className="text-xl">Safe & Secure</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Your photos are processed securely and never stored. Complete privacy and data protection guaranteed.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Preview */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-4xl font-bold mb-4">
                Simple, Transparent Pricing
              </h2>
              <p className="text-xl text-muted-foreground">
                Choose the perfect plan for your plushie creation needs
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {pricingTiers.map((tier, index) => (
                <PricingCard
                  key={tier.name}
                  tier={tier}
                  className={index === 1 ? "md:scale-105" : ""}
                />
              ))}
            </div>

            <div className="text-center mt-12">
              <Button asChild variant="outline" size="lg" className="text-lg px-8 py-6">
                <Link href="/pricing">View Detailed Pricing</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="py-16 lg:py-24 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-4xl font-bold mb-4">
                Loved by Thousands
              </h2>
              <p className="text-xl text-muted-foreground">
                See what our customers are saying about Plushify
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Card className="p-6">
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-1">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} className="h-5 w-5 fill-current text-yellow-500" />
                    ))}
                  </div>
                  <p className="text-muted-foreground italic">
                    &ldquo;Amazing! I turned my daughter&apos;s photo into a plushie design and she absolutely loves it. The quality is incredible and it looks exactly like her!&rdquo;
                  </p>
                  <div className="flex items-center gap-3 pt-2">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-sm font-semibold">
                      SM
                    </div>
                    <div>
                      <div className="font-semibold">Sarah M.</div>
                      <div className="text-sm text-muted-foreground">Parent</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="p-6">
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-1">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} className="h-5 w-5 fill-current text-yellow-500" />
                    ))}
                  </div>
                  <p className="text-muted-foreground italic">
                    &ldquo;I use this for my pet photography business. Clients love getting plushie versions of their pets! It&apos;s such a unique offering.&rdquo;
                  </p>
                  <div className="flex items-center gap-3 pt-2">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-sm font-semibold">
                      DJ
                    </div>
                    <div>
                      <div className="font-semibold">David J.</div>
                      <div className="text-sm text-muted-foreground">Photographer</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="p-6">
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-1">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} className="h-5 w-5 fill-current text-yellow-500" />
                    ))}
                  </div>
                  <p className="text-muted-foreground italic">
                    &ldquo;Super fast and easy to use. I&apos;ve created plushie designs of all my family members. The kawaii style is my favorite!&rdquo;
                  </p>
                  <div className="flex items-center gap-3 pt-2">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-sm font-semibold">
                      ER
                    </div>
                    <div>
                      <div className="font-semibold">Emily R.</div>
                      <div className="text-sm text-muted-foreground">Artist</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="text-center mt-16 p-8 bg-primary/5 rounded-lg">
              <div className="flex items-center justify-center gap-2 mb-4">
                <CheckCircle className="h-8 w-8 text-green-500" />
                <h3 className="text-2xl font-bold">100% Satisfaction Guarantee</h3>
              </div>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Not happy with your plushie design? We&apos;ll refund your credits, no questions asked.
                We&apos;re confident you&apos;ll love the results, but your satisfaction is our top priority.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 lg:py-24 bg-gradient-to-t from-primary/5 via-background to-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              Ready to Create Your First Plushie?
            </h2>
            <p className="text-xl text-muted-foreground">
              Join thousands of happy users and transform your favorite photos into adorable plushie designs today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="text-lg px-8 py-6">
                <Link href="/dashboard">Get Started Free</Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="text-lg px-8 py-6">
                <Link href="/pricing">View Pricing</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
