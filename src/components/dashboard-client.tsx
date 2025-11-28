"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { PlushieCard } from "@/components/plushify/plushie-card";
import { getMockUserGenerations } from "@/lib/mock-data";
import {
  Upload,
  Images,
  Settings,
  CreditCard,
  AlertTriangle,
  TrendingUp,
  Calendar,
  Heart,
  Sparkles,
  ArrowRight,
  Star,
  Download,
  Eye
} from "lucide-react";
import Link from "next/link";

interface DashboardClientProps {
  user: {
    id: string;
    name: string;
    email: string;
    credits: number;
    totalGenerations: number;
    creditsUsed: number;
    favoriteCount: number;
    createdAt: Date;
  };
}

export function DashboardClient({ user }: DashboardClientProps) {
  const recentGenerations = getMockUserGenerations().slice(0, 6);
  const isLowCredits = user.credits < 10;

  return (
    <div className="container mx-auto px-4 py-6">
      {/* Welcome Section */}
      <div className="mb-8">
        <h1 className="text-3xl lg:text-4xl font-bold mb-2">
          Welcome back, {user.name}! 👋
        </h1>
        <p className="text-muted-foreground text-lg">
          Ready to create some amazing plushie designs today?
        </p>
      </div>

      {/* Credit Warning */}
      {isLowCredits && (
        <Alert className="mb-6 border-orange-200 bg-orange-50 dark:bg-orange-900/10">
          <AlertTriangle className="h-4 w-4 text-orange-600" />
          <AlertDescription className="text-orange-800 dark:text-orange-200">
            You&apos;re running low on credits! You have {user.credits} credits remaining.{" "}
            <Link href="/pricing" className="font-medium underline hover:no-underline">
              Buy more credits
            </Link>{" "}
            to continue creating plushies.
          </AlertDescription>
        </Alert>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column - Main Content */}
        <div className="lg:col-span-8 space-y-6">
          {/* Credit Management */}
          <Card>
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <CreditCard className="h-5 w-5" />
                  Credit Balance
                </CardTitle>
                <Badge variant={isLowCredits ? "destructive" : "secondary"} className="text-sm">
                  {user.credits} credits
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                <div>
                  <p className="font-semibold text-lg">{user.credits} credits available</p>
                  <p className="text-sm text-muted-foreground">
                    Each generation costs 1 credit • {user.creditsUsed} credits used to date
                  </p>
                </div>
                <Button asChild>
                  <Link href="/pricing">Buy More Credits</Link>
                </Button>
              </div>

              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <p className="text-2xl font-bold text-green-600">{user.credits}</p>
                  <p className="text-xs text-muted-foreground">Available</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-blue-600">{user.creditsUsed}</p>
                  <p className="text-xs text-muted-foreground">Used</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-purple-600">{user.credits + user.creditsUsed}</p>
                  <p className="text-xs text-muted-foreground">Total Purchased</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Button asChild size="lg" className="h-20 flex-col gap-2">
                  <Link href="/generate">
                    <Upload className="h-6 w-6" />
                    <span>Upload New Photo</span>
                  </Link>
                </Button>

                <Button asChild variant="outline" size="lg" className="h-20 flex-col gap-2">
                  <Link href="/gallery">
                    <Images className="h-6 w-6" />
                    <span>View Gallery</span>
                  </Link>
                </Button>

                <Button asChild variant="outline" size="lg" className="h-20 flex-col gap-2">
                  <Link href="/profile">
                    <Settings className="h-6 w-6" />
                    <span>Account Settings</span>
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Recent Generations */}
          <Card>
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <Sparkles className="h-5 w-5" />
                  Recent Generations
                </CardTitle>
                <Button asChild variant="ghost" size="sm">
                  <Link href="/gallery" className="flex items-center gap-1">
                    View All
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              {recentGenerations.length > 0 ? (
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {recentGenerations.map((generation) => (
                    <div key={generation.id} className="group relative">
                      <PlushieCard
                        generation={generation}
                        className="aspect-square"
                      />
                      {/* Hover overlay with quick actions */}
                      <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-200 rounded-lg flex items-center justify-center gap-2">
                        <Button size="sm" variant="secondary" asChild>
                          <Link href={`/gallery?view=${generation.id}`}>
                            <Eye className="h-4 w-4" />
                          </Link>
                        </Button>
                        <Button size="sm" variant="secondary">
                          <Download className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="secondary">
                          <Heart className={`h-4 w-4 ${generation.isFavorite ? 'fill-current text-red-500' : ''}`} />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 text-muted-foreground">
                  <Sparkles className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <h3 className="text-lg font-medium mb-2">No generations yet</h3>
                  <p className="mb-4">Start creating your first plushie design!</p>
                  <Button asChild>
                    <Link href="/generate">Upload Photo</Link>
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Right Column - Stats & Activity */}
        <div className="lg:col-span-4 space-y-6">
          {/* Account Statistics */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                Your Stats
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                  <div className="flex items-center gap-2">
                    <Sparkles className="h-4 w-4 text-purple-500" />
                    <span className="text-sm">Total Generations</span>
                  </div>
                  <span className="font-semibold">{user.totalGenerations}</span>
                </div>

                <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                  <div className="flex items-center gap-2">
                    <Heart className="h-4 w-4 text-red-500" />
                    <span className="text-sm">Favorites</span>
                  </div>
                  <span className="font-semibold">{user.favoriteCount}</span>
                </div>

                <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-blue-500" />
                    <span className="text-sm">Member Since</span>
                  </div>
                  <span className="font-semibold text-sm">
                    {new Date(user.createdAt).toLocaleDateString('en-US', {
                      month: 'short',
                      year: 'numeric'
                    })}
                  </span>
                </div>

                <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                  <div className="flex items-center gap-2">
                    <Star className="h-4 w-4 text-yellow-500" />
                    <span className="text-sm">Credits Used</span>
                  </div>
                  <span className="font-semibold">{user.creditsUsed}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {recentGenerations.slice(0, 3).map((generation) => (
                  <div key={generation.id} className="flex items-center gap-3 p-3 bg-muted/30 rounded-lg">
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary/20 to-purple-500/20 flex items-center justify-center">
                      <Sparkles className="h-5 w-5 text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium">Generated plushie</p>
                      <p className="text-xs text-muted-foreground capitalize">
                        {generation.style} style • {generation.category}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-muted-foreground">
                        {generation.createdAt.toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                ))}

                {recentGenerations.length === 0 && (
                  <div className="text-center py-6 text-muted-foreground">
                    <p className="text-sm">No recent activity</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Tips Card */}
          <Card className="bg-gradient-to-br from-primary/5 to-purple-500/5">
            <CardHeader>
              <CardTitle className="text-lg">💡 Pro Tip</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-3">
                For best results, use high-quality photos with good lighting and clear subjects.
                The kawaii style works great for cute pet photos!
              </p>
              <Button asChild size="sm" variant="outline">
                <Link href="/docs/upload-guidelines">Upload Guidelines</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
