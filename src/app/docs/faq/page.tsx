"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import Link from "next/link"
import {
  HelpCircle,
  Search,
  ChevronDown,
  ChevronRight,
  CreditCard,
  Sparkles,
  Download,
  Settings,
  Shield,
  Clock,
  Mail
} from "lucide-react"

interface FAQ {
  id: string
  question: string
  answer: string
  category: string
  tags: string[]
}

const faqs: FAQ[] = [
  {
    id: "1",
    question: "How many credits do I get when I sign up?",
    answer: "Every new user receives 50 free credits to get started! This is enough to generate 50 plushies and explore all our features. You can purchase additional credits anytime through our pricing page.",
    category: "Credits",
    tags: ["credits", "signup", "free"]
  },
  {
    id: "2",
    question: "How much does it cost to generate a plushie?",
    answer: "Each plushie generation typically costs 1 credit, regardless of the style you choose (Classic, Kawaii, or Realistic). All styles use the same advanced AI technology and produce high-quality results.",
    category: "Credits",
    tags: ["cost", "pricing", "generation"]
  },
  {
    id: "3",
    question: "What photo formats can I upload?",
    answer: "We support JPG, PNG, and WEBP image formats. Your photos should be under 10MB in size and at least 500x500 pixels for best results. We recommend using high-quality, well-lit photos for the most amazing plushies.",
    category: "Upload",
    tags: ["format", "upload", "requirements"]
  },
  {
    id: "4",
    question: "Can I use photos of pets?",
    answer: "Absolutely! Our AI works wonderfully with pet photos. We recommend using clear, well-lit photos where your pet's face and distinctive features are visible. Single-pet photos work better than group shots.",
    category: "Upload",
    tags: ["pets", "animals", "photos"]
  },
  {
    id: "5",
    question: "How long does it take to generate a plushie?",
    answer: "Our AI typically generates your plushie in 2-3 seconds! You'll see a progress bar with status updates as our system analyzes your photo, applies the selected style, and creates your unique plushie design.",
    category: "Generation",
    tags: ["speed", "time", "processing"]
  },
  {
    id: "6",
    question: "What's the difference between plushie styles?",
    answer: "We offer three distinct styles: Classic (traditional soft plushie look), Kawaii (Japanese cute style with big eyes and adorable features), and Realistic (more detailed and lifelike appearance). Each style creates a unique interpretation of your photo.",
    category: "Generation",
    tags: ["styles", "classic", "kawaii", "realistic"]
  },
  {
    id: "7",
    question: "Can I download my generated plushies?",
    answer: "Yes! You can download high-resolution versions of all your generated plushies. Simply click the download button in your gallery or on the results page. All downloads are included with your generation - no extra cost.",
    category: "Download",
    tags: ["download", "save", "resolution"]
  },
  {
    id: "8",
    question: "Are my photos and generated plushies private?",
    answer: "Absolutely! Your uploaded photos and generated plushies are completely private to your account. We don't share, sell, or use your content for any purpose other than providing our service. See our Privacy Policy for full details.",
    category: "Privacy",
    tags: ["privacy", "security", "personal"]
  },
  {
    id: "9",
    question: "Can I edit or modify generated plushies?",
    answer: "Currently, our service generates final plushie images that cannot be edited within the platform. However, you can download the high-resolution images and edit them using external photo editing software if needed.",
    category: "Generation",
    tags: ["editing", "modification", "customize"]
  },
  {
    id: "10",
    question: "What happens if I'm not satisfied with a generation?",
    answer: "If you're not satisfied with your first 3 generations as a new user, we offer a full refund within 7 days. For technical issues or failed generations, we'll provide replacement credits. Contact our support team for assistance.",
    category: "Support",
    tags: ["refund", "satisfaction", "quality"]
  },
  {
    id: "11",
    question: "Do my credits expire?",
    answer: "No, your credits never expire! Once you purchase credits, they remain in your account until you use them. This means you can buy credits in bulk during sales and use them whenever you want to create plushies.",
    category: "Credits",
    tags: ["expiration", "validity", "purchase"]
  },
  {
    id: "12",
    question: "Can I use generated plushies commercially?",
    answer: "Yes! With our Elite package, you receive commercial usage rights for your generated plushies. Basic and Pro packages are for personal use only. Check our Terms of Service for complete licensing details.",
    category: "Licensing",
    tags: ["commercial", "rights", "business"]
  },
  {
    id: "13",
    question: "What if my generation fails or has technical issues?",
    answer: "If a generation fails due to technical issues on our end, we'll automatically refund the credit to your account. If you experience repeated issues, contact our support team for assistance and additional compensation.",
    category: "Support",
    tags: ["technical", "failure", "issues"]
  },
  {
    id: "14",
    question: "How do I delete my account and data?",
    answer: "You can delete your account anytime through your account settings. This will permanently remove all your data, including uploaded photos, generated plushies, and account information. This action cannot be undone.",
    category: "Account",
    tags: ["delete", "account", "data"]
  },
  {
    id: "15",
    question: "Can I share my plushies on social media?",
    answer: "Absolutely! You can share your generated plushies on any social media platform. We're working on adding direct sharing buttons to make this even easier. Many users love showing off their amazing AI-created plushies!",
    category: "Sharing",
    tags: ["social", "sharing", "media"]
  }
]

const categories = ["All", "Credits", "Upload", "Generation", "Download", "Privacy", "Support", "Account", "Licensing", "Sharing"]

export default function FAQPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [openItems, setOpenItems] = useState<Set<string>>(new Set())

  const toggleItem = (id: string) => {
    const newOpenItems = new Set(openItems)
    if (newOpenItems.has(id)) {
      newOpenItems.delete(id)
    } else {
      newOpenItems.add(id)
    }
    setOpenItems(newOpenItems)
  }

  const filteredFAQs = faqs.filter(faq => {
    const matchesSearch = searchQuery === "" ||
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))

    const matchesCategory = selectedCategory === "All" || faq.category === selectedCategory

    return matchesSearch && matchesCategory
  })

  const categoryIcons = {
    Credits: CreditCard,
    Upload: Download,
    Generation: Sparkles,
    Download: Download,
    Privacy: Shield,
    Support: HelpCircle,
    Account: Settings,
    Licensing: Shield,
    Sharing: Mail
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-6">
            <HelpCircle className="h-10 w-10 text-primary mr-4" />
            <h1 className="text-4xl font-bold">Frequently Asked Questions</h1>
          </div>
          <p className="text-xl text-muted-foreground mb-6">
            Find answers to common questions about Plushify
          </p>
          <Badge variant="secondary" className="text-sm">
            {faqs.length} Questions Answered
          </Badge>
        </div>

        {/* Search and Filter */}
        <Card className="mb-8">
          <CardContent className="p-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search questions..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <Button
                    key={category}
                    variant={selectedCategory === category ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedCategory(category)}
                    className="text-xs"
                  >
                    {category === "All" ? (
                      <HelpCircle className="h-3 w-3 mr-1" />
                    ) : (
                      (() => {
                        const IconComponent = categoryIcons[category as keyof typeof categoryIcons]
                        return IconComponent ? <IconComponent className="h-3 w-3 mr-1" /> : null
                      })()
                    )}
                    {category}
                  </Button>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* FAQ Results */}
        {filteredFAQs.length === 0 ? (
          <Card>
            <CardContent className="text-center py-12">
              <HelpCircle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">No questions found</h3>
              <p className="text-muted-foreground mb-4">
                Try adjusting your search terms or browse different categories
              </p>
              <Button onClick={() => { setSearchQuery(""); setSelectedCategory("All") }}>
                Clear Filters
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground mb-4">
              Showing {filteredFAQs.length} question{filteredFAQs.length !== 1 ? 's' : ''}
              {selectedCategory !== "All" && ` in ${selectedCategory}`}
            </p>

            {filteredFAQs.map((faq) => {
              const CategoryIcon = categoryIcons[faq.category as keyof typeof categoryIcons]
              return (
                <Collapsible key={faq.id}>
                  <Card className="overflow-hidden">
                    <CollapsibleTrigger
                      className="w-full"
                      onClick={() => toggleItem(faq.id)}
                    >
                      <CardHeader className="hover:bg-muted/50 transition-colors">
                        <div className="flex items-center justify-between text-left">
                          <div className="flex items-start gap-4 flex-1">
                            <div className="flex items-center gap-2 mt-1">
                              {CategoryIcon && <CategoryIcon className="h-4 w-4 text-primary" />}
                              {openItems.has(faq.id) ? (
                                <ChevronDown className="h-4 w-4 text-muted-foreground" />
                              ) : (
                                <ChevronRight className="h-4 w-4 text-muted-foreground" />
                              )}
                            </div>
                            <div className="flex-1">
                              <CardTitle className="text-left text-lg">{faq.question}</CardTitle>
                              <div className="flex items-center gap-2 mt-2">
                                <Badge variant="outline" className="text-xs">
                                  {faq.category}
                                </Badge>
                                <div className="flex gap-1">
                                  {faq.tags.slice(0, 3).map((tag) => (
                                    <Badge key={tag} variant="secondary" className="text-xs">
                                      {tag}
                                    </Badge>
                                  ))}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </CardHeader>
                    </CollapsibleTrigger>
                    <CollapsibleContent>
                      <CardContent className="pt-0">
                        <div className="ml-10 pb-4">
                          <p className="text-muted-foreground leading-relaxed">
                            {faq.answer}
                          </p>
                        </div>
                      </CardContent>
                    </CollapsibleContent>
                  </Card>
                </Collapsible>
              )
            })}
          </div>
        )}

        {/* Still Need Help */}
        <Card className="mt-12 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950 dark:to-indigo-950 border-blue-200 dark:border-blue-800">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-blue-700 dark:text-blue-300">
              <Mail className="h-5 w-5" />
              Still Need Help?
            </CardTitle>
            <CardDescription className="text-blue-600 dark:text-blue-400">
              Our support team is here to help you with any questions
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold mb-3">Contact Support</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                    <span>support@plushify.com</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span>Response within 24 hours</span>
                  </div>
                </div>
              </div>
              <div>
                <h4 className="font-semibold mb-3">Other Resources</h4>
                <div className="space-y-2">
                  <Link
                    href="/docs"
                    className="block text-sm text-blue-600 dark:text-blue-400 hover:underline"
                  >
                    • Getting Started Guide
                  </Link>
                  <Link
                    href="/docs/upload-guidelines"
                    className="block text-sm text-blue-600 dark:text-blue-400 hover:underline"
                  >
                    • Upload Guidelines
                  </Link>
                  <Link
                    href="/legal/terms"
                    className="block text-sm text-blue-600 dark:text-blue-400 hover:underline"
                  >
                    • Terms of Service
                  </Link>
                  <Link
                    href="/legal/privacy"
                    className="block text-sm text-blue-600 dark:text-blue-400 hover:underline"
                  >
                    • Privacy Policy
                  </Link>
                </div>
              </div>
            </div>
            <div className="mt-6">
              <Button asChild>
                <Link href="mailto:support@plushify.com">
                  <Mail className="h-4 w-4 mr-2" />
                  Contact Support
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
              href="/docs/upload-guidelines"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Upload Guidelines
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