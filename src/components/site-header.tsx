"use client";

import Link from "next/link";
import { UserProfile } from "@/components/auth/user-profile";
import { ModeToggle } from "./ui/mode-toggle";
import { Bot, Sparkles, Image, Grid3X3, Zap, DollarSign, Shield } from "lucide-react";
import { useSession } from "@/lib/auth-client";

export function SiteHeader() {
  const { data: session } = useSession();

  return (
    <header className="border-b">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center gap-8">
          <h1 className="text-2xl font-bold">
            <Link
              href="/"
              className="flex items-center gap-2 text-primary hover:text-primary/80 transition-colors"
            >
              <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-primary/10">
                <Bot className="h-5 w-5" />
              </div>
              <span className="bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                Plushify
              </span>
            </Link>
          </h1>

          {session ? (
            <nav className="hidden md:flex items-center gap-6">
              <Link
                href="/dashboard"
                className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                <Grid3X3 className="h-4 w-4" />
                Dashboard
              </Link>
              <Link
                href="/generate"
                className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                <Sparkles className="h-4 w-4" />
                Generate
              </Link>
              <Link
                href="/gallery"
                className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                <Image className="h-4 w-4" aria-label="Gallery icon" />
                Gallery
              </Link>
              {session.user.platformRole === "admin" && (
                <Link
                  href="/admin"
                  className="flex items-center gap-2 text-sm font-medium text-primary hover:text-primary/80 transition-colors"
                >
                  <Shield className="h-4 w-4" />
                  Admin
                </Link>
              )}
              <Link
                href="/pricing"
                className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                Pricing
              </Link>
            </nav>
          ) : (
            <nav className="hidden md:flex items-center gap-6">
              <Link
                href="/docs"
                className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                <Zap className="h-4 w-4" />
                How it Works
              </Link>
              <Link
                href="/pricing"
                className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                <DollarSign className="h-4 w-4" />
                Pricing
              </Link>
            </nav>
          )}
        </div>

        <div className="flex items-center gap-4">
          {session && (
            <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-primary/10 rounded-lg">
              <Sparkles className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium">{session.user.credits ?? 0} credits</span>
            </div>
          )}
          <UserProfile />
          <ModeToggle />
        </div>
      </div>
    </header>
  );
}
