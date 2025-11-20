import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import Link from "next/link"
import { Shield, Mail, Eye, Cookie, Users, Database } from "lucide-react"

export default function PrivacyPolicyPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <Shield className="h-8 w-8 text-primary mr-3" />
            <h1 className="text-3xl font-bold">Privacy Policy</h1>
          </div>
          <p className="text-muted-foreground">
            Last updated: November 20, 2024
          </p>
        </div>

        {/* Introduction */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Our Commitment to Your Privacy</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              At Plushify, we are committed to protecting your privacy and ensuring the security of your personal information.
              This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our
              AI plushie generation service.
            </p>
          </CardContent>
        </Card>

        <div className="space-y-8">
          {/* Information We Collect */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Database className="h-5 w-5" />
                Information We Collect
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h4 className="font-semibold mb-2">Personal Information</h4>
                <ul className="list-disc list-inside text-muted-foreground space-y-1">
                  <li>Name and email address (when you create an account)</li>
                  <li>Profile picture (optional)</li>
                  <li>Payment information (processed securely through third-party providers)</li>
                  <li>Account preferences and settings</li>
                </ul>
              </div>

              <div>
                <h4 className="font-semibold mb-2">Content You Provide</h4>
                <ul className="list-disc list-inside text-muted-foreground space-y-1">
                  <li>Photos you upload for plushie generation</li>
                  <li>Generated plushie images</li>
                  <li>User feedback and communications</li>
                </ul>
              </div>

              <div>
                <h4 className="font-semibold mb-2">Automatically Collected Information</h4>
                <ul className="list-disc list-inside text-muted-foreground space-y-1">
                  <li>Usage statistics and analytics</li>
                  <li>Device information and browser type</li>
                  <li>IP address and location data</li>
                  <li>Cookies and similar tracking technologies</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* How We Use Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Eye className="h-5 w-5" />
                How We Use Your Information
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="list-disc list-inside text-muted-foreground space-y-2">
                <li><strong>Service Provision:</strong> To generate plushies, manage your account, and provide customer support</li>
                <li><strong>Payment Processing:</strong> To handle billing, process payments, and manage subscriptions</li>
                <li><strong>Service Improvement:</strong> To analyze usage patterns and improve our AI models and user experience</li>
                <li><strong>Communication:</strong> To send important updates, notifications, and promotional materials (with your consent)</li>
                <li><strong>Legal Compliance:</strong> To comply with legal obligations and protect our rights</li>
              </ul>
            </CardContent>
          </Card>

          {/* Data Sharing */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                Information Sharing and Disclosure
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                We do not sell, trade, or rent your personal information to third parties. We may share your information only in the following circumstances:
              </p>

              <div className="space-y-3">
                <div>
                  <h4 className="font-semibold">Service Providers</h4>
                  <p className="text-sm text-muted-foreground">
                    We may share information with trusted third-party service providers who help us operate our service,
                    such as cloud hosting, payment processing, and analytics providers.
                  </p>
                </div>

                <div>
                  <h4 className="font-semibold">Legal Requirements</h4>
                  <p className="text-sm text-muted-foreground">
                    We may disclose information if required by law, court order, or to protect our rights, property,
                    or safety of our users.
                  </p>
                </div>

                <div>
                  <h4 className="font-semibold">Business Transfers</h4>
                  <p className="text-sm text-muted-foreground">
                    In the event of a merger, acquisition, or sale of assets, your information may be transferred
                    as part of that transaction.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Cookie Policy */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Cookie className="h-5 w-5" />
                Cookie Usage
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                We use cookies and similar tracking technologies to enhance your experience:
              </p>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-semibold mb-2">Essential Cookies</h4>
                  <p className="text-sm text-muted-foreground">
                    Required for basic functionality, authentication, and security.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Analytics Cookies</h4>
                  <p className="text-sm text-muted-foreground">
                    Help us understand how you use our service to improve performance.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Preference Cookies</h4>
                  <p className="text-sm text-muted-foreground">
                    Remember your settings and preferences for a better experience.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Marketing Cookies</h4>
                  <p className="text-sm text-muted-foreground">
                    Used to deliver relevant advertisements (with your consent).
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Data Security */}
          <Card>
            <CardHeader>
              <CardTitle>Data Security</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                We implement appropriate technical and organizational security measures to protect your information:
              </p>

              <ul className="list-disc list-inside text-muted-foreground space-y-1">
                <li>Encryption of data in transit and at rest</li>
                <li>Regular security audits and vulnerability assessments</li>
                <li>Access controls and authentication requirements</li>
                <li>Secure data centers and infrastructure</li>
                <li>Regular employee training on data protection</li>
              </ul>
            </CardContent>
          </Card>

          {/* Your Rights */}
          <Card>
            <CardHeader>
              <CardTitle>Your Privacy Rights</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                Depending on your location, you may have the following rights regarding your personal information:
              </p>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <h4 className="font-semibold">Access</h4>
                  <p className="text-sm text-muted-foreground">
                    Request access to your personal information
                  </p>
                </div>
                <div className="space-y-2">
                  <h4 className="font-semibold">Correction</h4>
                  <p className="text-sm text-muted-foreground">
                    Request correction of inaccurate information
                  </p>
                </div>
                <div className="space-y-2">
                  <h4 className="font-semibold">Deletion</h4>
                  <p className="text-sm text-muted-foreground">
                    Request deletion of your personal information
                  </p>
                </div>
                <div className="space-y-2">
                  <h4 className="font-semibold">Portability</h4>
                  <p className="text-sm text-muted-foreground">
                    Request transfer of your data to another service
                  </p>
                </div>
                <div className="space-y-2">
                  <h4 className="font-semibold">Restriction</h4>
                  <p className="text-sm text-muted-foreground">
                    Request restriction of processing activities
                  </p>
                </div>
                <div className="space-y-2">
                  <h4 className="font-semibold">Objection</h4>
                  <p className="text-sm text-muted-foreground">
                    Object to certain processing activities
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Data Retention */}
          <Card>
            <CardHeader>
              <CardTitle>Data Retention</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                We retain your information only as long as necessary to provide our services and comply with legal obligations:
              </p>

              <ul className="list-disc list-inside text-muted-foreground space-y-1">
                <li>Account information: Retained while your account is active</li>
                <li>Generated content: Retained as long as you choose to keep it</li>
                <li>Usage analytics: Aggregated data retained for 2 years</li>
                <li>Payment records: Retained for 7 years for legal compliance</li>
                <li>Support communications: Retained for 3 years</li>
              </ul>
            </CardContent>
          </Card>

          {/* Children's Privacy */}
          <Card>
            <CardHeader>
              <CardTitle>Children&apos;s Privacy</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Our service is not intended for children under 13 years of age. We do not knowingly collect
                personal information from children under 13. If we become aware that we have collected
                personal information from a child under 13, we will take steps to delete such information.
              </p>
            </CardContent>
          </Card>

          {/* Updates */}
          <Card>
            <CardHeader>
              <CardTitle>Changes to This Policy</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                We may update this Privacy Policy from time to time. We will notify you of any material
                changes by posting the updated policy on our website and updating the &quot;Last updated&quot; date.
                Your continued use of our service after any changes constitutes acceptance of the updated policy.
              </p>
            </CardContent>
          </Card>

          {/* Contact */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Mail className="h-5 w-5" />
                Contact Us
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                If you have any questions about this Privacy Policy or our data practices, please contact us:
              </p>

              <div className="space-y-2">
                <p className="text-sm">
                  <strong>Email:</strong> privacy@plushify.com
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
              href="/legal/terms"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Terms of Service
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