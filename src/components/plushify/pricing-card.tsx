import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

export interface PricingTier {
  name: string;
  price: number;
  credits: number;
  badge?: "Most Popular" | "Best Value";
  features: string[];
  highlighted?: boolean;
}

interface PricingCardProps {
  tier: PricingTier;
  onSelect?: (tier: PricingTier) => void;
  className?: string;
}

export function PricingCard({ tier, onSelect, className }: PricingCardProps) {
  const costPerGeneration = (tier.price / tier.credits).toFixed(2);

  return (
    <Card
      className={cn(
        "relative transition-all duration-200 hover:shadow-lg",
        tier.highlighted && "border-primary ring-2 ring-primary/20 scale-105",
        className
      )}
    >
      {tier.badge && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2">
          <Badge
            variant={tier.badge === "Most Popular" ? "default" : "secondary"}
            className="px-3 py-1 text-xs font-medium"
          >
            {tier.badge}
          </Badge>
        </div>
      )}

      <CardHeader className="text-center pb-4">
        <CardTitle className="text-xl font-bold">{tier.name}</CardTitle>
        <CardDescription className="text-sm">
          Perfect for {tier.name.toLowerCase()} users
        </CardDescription>

        <div className="mt-4">
          <div className="flex items-baseline justify-center gap-1">
            <span className="text-3xl font-bold">${tier.price}</span>
            <span className="text-muted-foreground text-sm">one-time</span>
          </div>
          <div className="text-primary font-semibold text-lg mt-1">
            {tier.credits} credits
          </div>
          <div className="text-xs text-muted-foreground mt-1">
            ${costPerGeneration} per generation
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-3">
        {tier.features.map((feature, index) => (
          <div key={index} className="flex items-start gap-2">
            <Check className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
            <span className="text-sm text-muted-foreground">{feature}</span>
          </div>
        ))}
      </CardContent>

      <CardFooter className="pt-4">
        <Button
          className="w-full"
          variant={tier.highlighted ? "default" : "outline"}
          onClick={() => onSelect?.(tier)}
        >
          Choose {tier.name}
        </Button>
      </CardFooter>
    </Card>
  );
}

// Pre-defined pricing tiers
export const pricingTiers: PricingTier[] = [
  {
    name: "Basic",
    price: 9,
    credits: 30,
    features: [
      "Standard processing speed",
      "Standard resolution (1024x1024)",
      "Email support",
      "Basic plushie styles",
      "Gallery storage"
    ]
  },
  {
    name: "Pro",
    price: 19,
    credits: 100,
    badge: "Most Popular",
    highlighted: true,
    features: [
      "Priority processing",
      "HD resolution (2048x2048)",
      "Priority support",
      "All plushie styles",
      "Gallery organization tools",
      "Download in multiple formats"
    ]
  },
  {
    name: "Elite",
    price: 29,
    credits: 200,
    badge: "Best Value",
    features: [
      "Fastest processing",
      "Ultra-HD resolution (4096x4096)",
      "24/7 priority support",
      "All premium styles",
      "Advanced editing tools",
      "Commercial usage rights",
      "Bulk processing"
    ]
  }
];