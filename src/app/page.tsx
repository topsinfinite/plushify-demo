"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Shield, Database, Palette, Bot } from "lucide-react";

export default function Home() {
  return (
    <main className="flex-1 container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto text-center space-y-8">
        <div className="space-y-4">
          <div className="flex items-center justify-center gap-3 mb-2">
            <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-primary/10">
              <Bot className="h-7 w-7 text-primary" />
            </div>
            <h1 className="text-5xl font-bold tracking-tight bg-gradient-to-r from-primary via-primary/90 to-primary/70 bg-clip-text text-transparent">
              Plushify
            </h1>
          </div>
          <h2 className="text-2xl font-semibold text-muted-foreground">
            Transform Photos into Adorable Plushie Designs
          </h2>
          <p className="text-xl text-muted-foreground">
            Upload any photo and watch our AI transform it into a cute, cuddly plushie design. Perfect for gifts, keepsakes, or just for fun!
          </p>
        </div>


        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
          <div className="p-6 border rounded-lg">
            <h3 className="font-semibold mb-2 flex items-center gap-2">
              <Bot className="h-4 w-4" />
              AI-Powered
            </h3>
            <p className="text-sm text-muted-foreground">
              Advanced AI transforms your photos into plushie designs
            </p>
          </div>
          <div className="p-6 border rounded-lg">
            <h3 className="font-semibold mb-2 flex items-center gap-2">
              <Palette className="h-4 w-4" />
              Multiple Styles
            </h3>
            <p className="text-sm text-muted-foreground">
              Choose from Classic, Kawaii, and Realistic styles
            </p>
          </div>
          <div className="p-6 border rounded-lg">
            <h3 className="font-semibold mb-2 flex items-center gap-2">
              <Shield className="h-4 w-4" />
              Secure & Private
            </h3>
            <p className="text-sm text-muted-foreground">
              Your photos are processed securely and privately
            </p>
          </div>
          <div className="p-6 border rounded-lg">
            <h3 className="font-semibold mb-2 flex items-center gap-2">
              <Database className="h-4 w-4" />
              Gallery Storage
            </h3>
            <p className="text-sm text-muted-foreground">
              Save and organize all your plushie creations
            </p>
          </div>
        </div>

        <div className="space-y-6 mt-12">
          <h3 className="text-2xl font-semibold">Get Started with Plushify</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
            <div className="p-4 border rounded-lg">
              <h4 className="font-medium mb-2">
                1. Upload Your Photo
              </h4>
              <p className="text-sm text-muted-foreground mb-2">
                Choose a clear photo of yourself, a loved one, or pet
              </p>
              <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
                <li>High quality images work best</li>
                <li>Good lighting is important</li>
                <li>Clear view of subject</li>
              </ul>
            </div>
            <div className="p-4 border rounded-lg">
              <h4 className="font-medium mb-2">2. Choose Your Style</h4>
              <p className="text-sm text-muted-foreground mb-2">
                Select from our curated plushie styles:
              </p>
              <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
                <li>Classic - Traditional plushie look</li>
                <li>Kawaii - Cute Japanese-inspired style</li>
                <li>Realistic - Lifelike plushie design</li>
              </ul>
            </div>
            <div className="p-4 border rounded-lg">
              <h4 className="font-medium mb-2">3. Generate & Download</h4>
              <div className="space-y-2">
                <Button asChild size="sm" className="w-full">
                  <Link href="/dashboard">View Dashboard</Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  size="sm"
                  className="w-full"
                >
                  <Link href="/generate">Start Creating</Link>
                </Button>
              </div>
            </div>
            <div className="p-4 border rounded-lg">
              <h4 className="font-medium mb-2">4. Share & Enjoy</h4>
              <p className="text-sm text-muted-foreground mb-3">
                Download your plushie design and share it with friends. Perfect for gifts, keepsakes, or just for fun!
              </p>
              <Button asChild variant="outline" size="sm" className="w-full">
                <Link href="/gallery">View Gallery</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
