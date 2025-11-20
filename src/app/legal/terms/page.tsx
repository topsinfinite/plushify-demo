import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import Link from "next/link"
import { FileText, CreditCard, Shield, AlertTriangle, Scale, UserCheck } from "lucide-react"

export default function TermsOfServicePage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <FileText className="h-8 w-8 text-primary mr-3" />
            <h1 className="text-3xl font-bold">Terms of Service</h1>
          </div>
          <p className="text-muted-foreground">
            Last updated: November 20, 2024
          </p>
        </div>

        {/* Introduction */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Agreement to Terms</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Welcome to Plushify! These Terms of Service (&quot;Terms&quot;) govern your use of our AI plushie generation
              service. By accessing or using Plushify, you agree to be bound by these Terms. If you do not agree
              to these Terms, please do not use our service.
            </p>
          </CardContent>
        </Card>

        <div className="space-y-8">
          {/* Service Description */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <UserCheck className="h-5 w-5" />
                Service Description
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                Plushify is an AI-powered service that transforms photos into plushie designs. Our service includes:
              </p>

              <ul className="list-disc list-inside text-muted-foreground space-y-2">
                <li><strong>AI Generation:</strong> Transform uploaded photos into plushie representations using artificial intelligence</li>
                <li><strong>Multiple Styles:</strong> Choose from various plushie styles including Classic, Kawaii, and Realistic</li>
                <li><strong>Gallery Management:</strong> Store, organize, and manage your generated plushies</li>
                <li><strong>Download Options:</strong> Download high-resolution versions of your generated content</li>
                <li><strong>Credit System:</strong> Purchase credits to generate plushies</li>
              </ul>
            </CardContent>
          </Card>

          {/* User Responsibilities */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                User Responsibilities
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h4 className="font-semibold mb-2">Account Registration</h4>
                <ul className="list-disc list-inside text-muted-foreground space-y-1">
                  <li>Provide accurate and complete information during registration</li>
                  <li>Maintain the security of your account credentials</li>
                  <li>Notify us immediately of any unauthorized access</li>
                  <li>You must be at least 13 years old to use our service</li>
                </ul>
              </div>

              <div>
                <h4 className="font-semibold mb-2">Content Guidelines</h4>
                <p className="text-muted-foreground mb-2">You agree not to upload content that:</p>
                <ul className="list-disc list-inside text-muted-foreground space-y-1">
                  <li>Violates copyright, trademark, or other intellectual property rights</li>
                  <li>Contains nudity, sexually explicit, or inappropriate material</li>
                  <li>Depicts violence, illegal activities, or harmful behavior</li>
                  <li>Includes personal information of others without consent</li>
                  <li>Is defamatory, harassing, or discriminatory</li>
                  <li>Contains malware or malicious code</li>
                </ul>
              </div>

              <div>
                <h4 className="font-semibold mb-2">Acceptable Use</h4>
                <ul className="list-disc list-inside text-muted-foreground space-y-1">
                  <li>Use the service only for lawful purposes</li>
                  <li>Do not attempt to reverse engineer or copy our AI models</li>
                  <li>Do not use automated systems to abuse our service</li>
                  <li>Respect the rights and privacy of other users</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Payment Terms */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CreditCard className="h-5 w-5" />
                Payment Terms
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h4 className="font-semibold mb-2">Credit System</h4>
                <ul className="list-disc list-inside text-muted-foreground space-y-1">
                  <li>Our service operates on a credit-based system</li>
                  <li>Each plushie generation typically costs 1 credit</li>
                  <li>Credits must be purchased in advance through our payment system</li>
                  <li>Credits do not expire but are non-transferable</li>
                </ul>
              </div>

              <div>
                <h4 className="font-semibold mb-2">Pricing and Packages</h4>
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="p-4 border rounded-lg">
                    <h5 className="font-medium">Basic Package</h5>
                    <p className="text-sm text-muted-foreground">$9 for 30 credits</p>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <h5 className="font-medium">Pro Package</h5>
                    <p className="text-sm text-muted-foreground">$19 for 100 credits</p>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <h5 className="font-medium">Elite Package</h5>
                    <p className="text-sm text-muted-foreground">$29 for 200 credits</p>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-semibold mb-2">Payment Processing</h4>
                <ul className="list-disc list-inside text-muted-foreground space-y-1">
                  <li>All payments are processed securely through third-party providers</li>
                  <li>Prices are subject to change with 30 days notice</li>
                  <li>All sales are final unless covered by our refund policy</li>
                  <li>You are responsible for all taxes and fees</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Intellectual Property */}
          <Card>
            <CardHeader>
              <CardTitle>Intellectual Property Rights</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h4 className="font-semibold mb-2">Your Content</h4>
                <ul className="list-disc list-inside text-muted-foreground space-y-1">
                  <li>You retain ownership of photos you upload to our service</li>
                  <li>You grant us license to process your content for service provision</li>
                  <li>You own the generated plushie images created from your content</li>
                  <li>You may use generated content for personal and commercial purposes</li>
                </ul>
              </div>

              <div>
                <h4 className="font-semibold mb-2">Our Service</h4>
                <ul className="list-disc list-inside text-muted-foreground space-y-1">
                  <li>Plushify, our AI models, and technology are our intellectual property</li>
                  <li>You may not reproduce, modify, or distribute our technology</li>
                  <li>Our trademarks and brand elements are protected</li>
                  <li>User feedback may be used to improve our service</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Privacy and Data */}
          <Card>
            <CardHeader>
              <CardTitle>Privacy and Data Handling</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                Your privacy is important to us. Our data practices are governed by our Privacy Policy, which includes:
              </p>

              <ul className="list-disc list-inside text-muted-foreground space-y-1">
                <li>How we collect, use, and protect your personal information</li>
                <li>Your rights regarding your data</li>
                <li>Our security measures and data retention policies</li>
                <li>Cookie usage and tracking technologies</li>
              </ul>

              <p className="text-sm text-muted-foreground mt-4">
                Please review our <Link href="/legal/privacy" className="text-primary hover:underline">Privacy Policy</Link> for complete details.
              </p>
            </CardContent>
          </Card>

          {/* Service Availability */}
          <Card>
            <CardHeader>
              <CardTitle>Service Availability</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">Service Uptime</h4>
                  <p className="text-muted-foreground">
                    We strive to maintain 99.9% uptime but cannot guarantee uninterrupted service.
                    Scheduled maintenance will be communicated in advance when possible.
                  </p>
                </div>

                <div>
                  <h4 className="font-semibold mb-2">Service Modifications</h4>
                  <p className="text-muted-foreground">
                    We reserve the right to modify, suspend, or discontinue any aspect of our service
                    with or without notice. We will provide reasonable notice for significant changes.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Limitation of Liability */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5" />
                Limitation of Liability
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-semibold mb-2">Service Disclaimer</h4>
                <p className="text-muted-foreground">
                  Our service is provided &quot;as is&quot; without warranties of any kind. We do not guarantee
                  the accuracy, completeness, or quality of generated content.
                </p>
              </div>

              <div>
                <h4 className="font-semibold mb-2">Liability Limits</h4>
                <p className="text-muted-foreground">
                  Our total liability for any claims related to our service shall not exceed the amount
                  you paid us in the 12 months preceding the claim.
                </p>
              </div>

              <div>
                <h4 className="font-semibold mb-2">Excluded Damages</h4>
                <p className="text-muted-foreground">
                  We are not liable for indirect, incidental, special, or consequential damages,
                  including loss of profits, data, or business opportunities.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Termination */}
          <Card>
            <CardHeader>
              <CardTitle>Account Termination</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-semibold mb-2">By You</h4>
                <p className="text-muted-foreground">
                  You may terminate your account at any time through your account settings.
                  Unused credits will be forfeited upon termination.
                </p>
              </div>

              <div>
                <h4 className="font-semibold mb-2">By Us</h4>
                <p className="text-muted-foreground">
                  We may terminate or suspend your account for violations of these Terms,
                  illegal activities, or abuse of our service. We will provide notice when possible.
                </p>
              </div>

              <div>
                <h4 className="font-semibold mb-2">Effect of Termination</h4>
                <p className="text-muted-foreground">
                  Upon termination, your access will be disabled and your data may be deleted
                  according to our retention policies.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Dispute Resolution */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Scale className="h-5 w-5" />
                Dispute Resolution
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-semibold mb-2">Informal Resolution</h4>
                <p className="text-muted-foreground">
                  We encourage you to contact us first to resolve any disputes informally.
                  Most concerns can be resolved quickly through direct communication.
                </p>
              </div>

              <div>
                <h4 className="font-semibold mb-2">Governing Law</h4>
                <p className="text-muted-foreground">
                  These Terms are governed by the laws of California, USA, without regard to
                  conflict of law principles.
                </p>
              </div>

              <div>
                <h4 className="font-semibold mb-2">Arbitration</h4>
                <p className="text-muted-foreground">
                  Any disputes that cannot be resolved informally will be subject to binding
                  arbitration in accordance with the rules of the American Arbitration Association.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Changes to Terms */}
          <Card>
            <CardHeader>
              <CardTitle>Changes to These Terms</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                We may update these Terms from time to time to reflect changes in our service
                or applicable law. We will notify you of material changes by posting the updated
                Terms on our website and updating the &quot;Last updated&quot; date. Your continued use
                of our service after any changes constitutes acceptance of the updated Terms.
              </p>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <Card>
            <CardHeader>
              <CardTitle>Contact Information</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                If you have any questions about these Terms of Service, please contact us:
              </p>

              <div className="space-y-2">
                <p className="text-sm">
                  <strong>Email:</strong> legal@plushify.com
                </p>
                <p className="text-sm">
                  <strong>Address:</strong> 123 AI Street, Tech Valley, CA 94000
                </p>
                <p className="text-sm">
                  <strong>Phone:</strong> +1 (555) 123-4567
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Footer Navigation */}
        <div className="mt-12 pt-8 border-t">
          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              href="/legal/privacy"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              href="/legal/refunds"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Refund Policy
            </Link>
            <Link
              href="/docs/faq"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              FAQ
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