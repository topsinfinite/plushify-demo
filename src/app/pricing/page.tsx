"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PricingCard, pricingTiers } from "@/components/plushify/pricing-card";
import { Badge } from "@/components/ui/badge";
import {
  Check,
  X,
  Star,
  Shield,
  Clock,
  Zap,
  HelpCircle,
  ArrowLeft,
  ChevronDown,
  ChevronUp
} from "lucide-react";
import { useState } from "react";

export default function PricingPage() {
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  const features = [
    {
      name: "Credits per package",
      basic: "30 credits",
      pro: "100 credits",
      elite: "200 credits"
    },
    {
      name: "Processing speed",
      basic: "Standard",
      pro: "Priority",
      elite: "Fastest"
    },
    {
      name: "Image resolution",
      basic: "Standard (1024x1024)",
      pro: "HD (2048x2048)",
      elite: "Ultra-HD (4096x4096)"
    },
    {
      name: "Support level",
      basic: "Email support",
      pro: "Priority support",
      elite: "24/7 priority support"
    },
    {
      name: "Plushie styles",
      basic: "Basic styles",
      pro: "All styles",
      elite: "All premium styles"
    },
    {
      name: "Gallery organization",
      basic: false,
      pro: "Basic tools",
      elite: "Advanced tools"
    },
    {
      name: "Download formats",
      basic: "PNG",
      pro: "PNG, JPG, WEBP",
      elite: "PNG, JPG, WEBP, SVG"
    },
    {
      name: "Commercial usage",
      basic: false,
      pro: false,
      elite: "Full rights"
    },
    {
      name: "Advanced editing",
      basic: false,
      pro: false,
      elite: "Included"
    },
    {
      name: "Bulk processing",
      basic: false,
      pro: false,
      elite: "Included"
    }
  ];

  const faqs = [
    {
      question: "How do credits work?",
      answer: "Each plushie generation costs 1 credit. Credits never expire and are stored in your account until you use them. You can purchase more credits anytime."
    },
    {
      question: "What&apos;s the difference between the styles?",
      answer: "Classic style creates traditional plushie designs, Kawaii offers cute Japanese-inspired aesthetics, and Realistic produces lifelike plushie designs. Pro and Elite plans include access to all styles."
    },
    {
      question: "Can I get a refund?",
      answer: "Yes! We offer a 100% satisfaction guarantee. If you&apos;re not happy with your plushie designs, we&apos;ll refund your unused credits within 30 days of purchase."
    },
    {
      question: "What image formats are supported?",
      answer: "We accept JPG, PNG, and WEBP formats. For best results, use high-quality images with good lighting and clear subjects."
    },
    {
      question: "How long does generation take?",
      answer: "Standard processing takes 3-5 seconds, Priority processing takes 1-3 seconds, and Fastest processing typically completes in under 1 second."
    },
    {
      question: "Can I use the plushie designs commercially?",
      answer: "Commercial usage rights are included only with the Elite plan. Basic and Pro plans are for personal use only."
    },
    {
      question: "Is there a free trial?",
      answer: "Yes! All new users start with 50 free credits to try our service. No credit card required for the trial."
    },
    {
      question: "How do I contact support?",
      answer: "Basic users get email support with 24-48 hour response times. Pro users get priority email support with faster responses. Elite users get 24/7 priority support including live chat."
    }
  ];

  const toggleFaq = (index: number) => {
    setExpandedFaq(expandedFaq === index ? null : index);
  };

  return (
    <main className="flex-1">
      {/* Header */}
      <section className="py-12 bg-gradient-to-b from-primary/5 to-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-4 mb-6">
              <Button asChild variant="ghost" size="sm">
                <Link href="/" className="flex items-center gap-2">
                  <ArrowLeft className="h-4 w-4" />
                  Back to Home
                </Link>
              </Button>
            </div>

            <div className="text-center space-y-6">
              <h1 className="text-4xl lg:text-5xl font-bold">
                Simple, Transparent Pricing
              </h1>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Choose the perfect plan for your plushie creation needs. All plans include our core AI generation technology and personal gallery storage.
              </p>

              <div className="flex items-center justify-center gap-6 text-sm text-muted-foreground pt-4">
                <div className="flex items-center gap-1">
                  <Shield className="h-4 w-4 text-green-500" />
                  <span>100% Satisfaction Guarantee</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4 text-blue-500" />
                  <span>No Subscription Required</span>
                </div>
                <div className="flex items-center gap-1">
                  <Zap className="h-4 w-4 text-yellow-500" />
                  <span>Credits Never Expire</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto mb-16">
              {pricingTiers.map((tier, index) => (
                <PricingCard
                  key={tier.name}
                  tier={tier}
                  className={index === 1 ? "md:scale-105 relative z-10" : ""}
                />
              ))}
            </div>

            {/* Trust Signals */}
            <div className="text-center space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
                <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                  <Shield className="h-5 w-5 text-green-500" />
                  <span>Secure Payment Processing</span>
                </div>
                <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                  <Clock className="h-5 w-5 text-blue-500" />
                  <span>Instant Credit Delivery</span>
                </div>
                <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                  <Star className="h-5 w-5 text-yellow-500" />
                  <span>4.9/5 Customer Rating</span>
                </div>
              </div>

              <p className="text-sm text-muted-foreground">
                Join thousands of satisfied users who&apos;ve created amazing plushie designs
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Comparison */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl lg:text-4xl font-bold mb-4">
                Compare All Features
              </h2>
              <p className="text-xl text-muted-foreground">
                See exactly what&apos;s included in each plan
              </p>
            </div>

            <div className="bg-background rounded-lg overflow-hidden shadow-lg">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-muted">
                    <tr>
                      <th className="text-left p-6 font-semibold">Features</th>
                      <th className="text-center p-6 font-semibold">
                        <div className="space-y-2">
                          <div className="font-bold text-lg">Basic</div>
                          <div className="text-sm text-muted-foreground">$9 / 30 credits</div>
                        </div>
                      </th>
                      <th className="text-center p-6 font-semibold relative">
                        <div className="space-y-2">
                          <Badge className="absolute -top-1 left-1/2 -translate-x-1/2 -translate-y-full">
                            Most Popular
                          </Badge>
                          <div className="font-bold text-lg">Pro</div>
                          <div className="text-sm text-muted-foreground">$19 / 100 credits</div>
                        </div>
                      </th>
                      <th className="text-center p-6 font-semibold relative">
                        <div className="space-y-2">
                          <Badge variant="secondary" className="absolute -top-1 left-1/2 -translate-x-1/2 -translate-y-full">
                            Best Value
                          </Badge>
                          <div className="font-bold text-lg">Elite</div>
                          <div className="text-sm text-muted-foreground">$29 / 200 credits</div>
                        </div>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {features.map((feature, index) => (
                      <tr key={feature.name} className={index % 2 === 0 ? "bg-muted/30" : "bg-background"}>
                        <td className="p-4 font-medium">{feature.name}</td>
                        <td className="p-4 text-center">
                          {typeof feature.basic === "boolean" ? (
                            feature.basic ? (
                              <Check className="h-5 w-5 text-green-500 mx-auto" />
                            ) : (
                              <X className="h-5 w-5 text-muted-foreground mx-auto" />
                            )
                          ) : (
                            <span className="text-sm">{feature.basic}</span>
                          )}
                        </td>
                        <td className="p-4 text-center">
                          {typeof feature.pro === "boolean" ? (
                            feature.pro ? (
                              <Check className="h-5 w-5 text-green-500 mx-auto" />
                            ) : (
                              <X className="h-5 w-5 text-muted-foreground mx-auto" />
                            )
                          ) : (
                            <span className="text-sm font-medium">{feature.pro}</span>
                          )}
                        </td>
                        <td className="p-4 text-center">
                          {typeof feature.elite === "boolean" ? (
                            feature.elite ? (
                              <Check className="h-5 w-5 text-green-500 mx-auto" />
                            ) : (
                              <X className="h-5 w-5 text-muted-foreground mx-auto" />
                            )
                          ) : (
                            <span className="text-sm font-medium">{feature.elite}</span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl lg:text-4xl font-bold mb-4">
                Frequently Asked Questions
              </h2>
              <p className="text-xl text-muted-foreground">
                Everything you need to know about Plushify pricing and features
              </p>
            </div>

            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <Card key={index} className="cursor-pointer hover:shadow-md transition-shadow">
                  <CardHeader
                    className="pb-4"
                    onClick={() => toggleFaq(index)}
                  >
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-left text-lg">{faq.question}</CardTitle>
                      {expandedFaq === index ? (
                        <ChevronUp className="h-5 w-5 text-muted-foreground flex-shrink-0" />
                      ) : (
                        <ChevronDown className="h-5 w-5 text-muted-foreground flex-shrink-0" />
                      )}
                    </div>
                  </CardHeader>
                  {expandedFaq === index && (
                    <CardContent className="pt-0">
                      <p className="text-muted-foreground leading-relaxed">{faq.answer}</p>
                    </CardContent>
                  )}
                </Card>
              ))}
            </div>

            <div className="text-center mt-12 p-6 bg-muted/30 rounded-lg">
              <div className="flex items-center justify-center gap-2 mb-4">
                <HelpCircle className="h-6 w-6 text-primary" />
                <h3 className="text-xl font-semibold">Still have questions?</h3>
              </div>
              <p className="text-muted-foreground mb-4">
                Our support team is here to help you choose the right plan and get the most out of Plushify.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild variant="outline">
                  <Link href="mailto:support@plushify.ai">Email Support</Link>
                </Button>
                <Button asChild variant="outline">
                  <Link href="/docs/faq">View Full FAQ</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Money Back Guarantee */}
      <section className="py-16 bg-gradient-to-t from-primary/5 to-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Shield className="h-12 w-12 text-green-500" />
            </div>
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              100% Satisfaction Guarantee
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              We&apos;re so confident you&apos;ll love Plushify that we offer a complete satisfaction guarantee.
              If you&apos;re not happy with your results, we&apos;ll refund your unused credits within 30 days.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
              <div className="text-center">
                <div className="w-16 h-16 mx-auto rounded-full bg-green-100 dark:bg-green-900/20 flex items-center justify-center mb-4">
                  <Clock className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="font-semibold mb-2">30-Day Window</h3>
                <p className="text-sm text-muted-foreground">Full refund available within 30 days of purchase</p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 mx-auto rounded-full bg-blue-100 dark:bg-blue-900/20 flex items-center justify-center mb-4">
                  <HelpCircle className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="font-semibold mb-2">No Questions Asked</h3>
                <p className="text-sm text-muted-foreground">Simple refund process with no complicated requirements</p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 mx-auto rounded-full bg-purple-100 dark:bg-purple-900/20 flex items-center justify-center mb-4">
                  <Zap className="h-8 w-8 text-purple-600" />
                </div>
                <h3 className="font-semibold mb-2">Quick Processing</h3>
                <p className="text-sm text-muted-foreground">Refunds processed within 5-7 business days</p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mt-12">
              <Button asChild size="lg" className="text-lg px-8 py-6">
                <Link href="/dashboard">Start Creating Now</Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="text-lg px-8 py-6">
                <Link href="/legal/refunds">Read Refund Policy</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}