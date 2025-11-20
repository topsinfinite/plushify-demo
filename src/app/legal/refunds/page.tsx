import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { RefreshCw, Clock, CreditCard, AlertTriangle, CheckCircle, Mail, Phone } from "lucide-react"

export default function RefundPolicyPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <RefreshCw className="h-8 w-8 text-primary mr-3" />
            <h1 className="text-3xl font-bold">Refund Policy</h1>
          </div>
          <p className="text-muted-foreground">
            Last updated: November 20, 2024
          </p>
        </div>

        {/* Introduction */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Our Commitment to Customer Satisfaction</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              At Plushify, we want you to be completely satisfied with our AI plushie generation service.
              This Refund Policy outlines the conditions under which refunds are available and the process
              to request them.
            </p>
          </CardContent>
        </Card>

        <div className="space-y-8">
          {/* Refund Eligibility */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5" />
                Refund Eligibility
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h4 className="font-semibold mb-3 text-green-600">✓ Eligible for Refund</h4>
                <ul className="list-disc list-inside text-muted-foreground space-y-2">
                  <li><strong>Technical Issues:</strong> Service outages or technical problems that prevent you from using purchased credits</li>
                  <li><strong>Payment Errors:</strong> Accidental duplicate purchases or unauthorized charges</li>
                  <li><strong>Service Defects:</strong> Significant bugs or errors in the AI generation process that produce unusable results</li>
                  <li><strong>Billing Mistakes:</strong> Incorrect charges or pricing errors on our part</li>
                  <li><strong>Unsatisfactory Results:</strong> If you&apos;re not satisfied with your first 3 generations (new users only)</li>
                </ul>
              </div>

              <div>
                <h4 className="font-semibold mb-3 text-red-600">✗ Not Eligible for Refund</h4>
                <ul className="list-disc list-inside text-muted-foreground space-y-2">
                  <li><strong>Subjective Dissatisfaction:</strong> Disliking the style or appearance of generated plushies</li>
                  <li><strong>User Error:</strong> Uploading inappropriate or low-quality source images</li>
                  <li><strong>Change of Mind:</strong> Deciding you no longer want to use the service after successful generations</li>
                  <li><strong>Expired Credits:</strong> Credits that have been used for successful generations</li>
                  <li><strong>Violation of Terms:</strong> Account suspension or termination due to Terms of Service violations</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Refund Timeline */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5" />
                Refund Timeline
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                    <span className="text-2xl font-bold text-primary">7</span>
                  </div>
                  <h4 className="font-semibold mb-2">Request Period</h4>
                  <p className="text-sm text-muted-foreground">
                    Refund requests must be submitted within 7 days of purchase
                  </p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                    <span className="text-2xl font-bold text-primary">3</span>
                  </div>
                  <h4 className="font-semibold mb-2">Review Process</h4>
                  <p className="text-sm text-muted-foreground">
                    We review and respond to refund requests within 3 business days
                  </p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                    <span className="text-2xl font-bold text-primary">5-7</span>
                  </div>
                  <h4 className="font-semibold mb-2">Processing Time</h4>
                  <p className="text-sm text-muted-foreground">
                    Approved refunds are processed within 5-7 business days
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Refund Types */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CreditCard className="h-5 w-5" />
                Types of Refunds
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="p-4 border rounded-lg">
                  <h4 className="font-semibold mb-3 flex items-center gap-2">
                    <Badge variant="secondary">Full Refund</Badge>
                  </h4>
                  <ul className="text-sm text-muted-foreground space-y-2">
                    <li>• Unused credit packages</li>
                    <li>• Technical service failures</li>
                    <li>• Billing errors</li>
                    <li>• Unauthorized charges</li>
                  </ul>
                </div>

                <div className="p-4 border rounded-lg">
                  <h4 className="font-semibold mb-3 flex items-center gap-2">
                    <Badge variant="outline">Partial Refund</Badge>
                  </h4>
                  <ul className="text-sm text-muted-foreground space-y-2">
                    <li>• Packages with some credits used</li>
                    <li>• Service disruptions</li>
                    <li>• Quality issues affecting specific generations</li>
                    <li>• Pro-rated for service downtime</li>
                  </ul>
                </div>

                <div className="p-4 border rounded-lg">
                  <h4 className="font-semibold mb-3 flex items-center gap-2">
                    <Badge variant="default">Credit Refund</Badge>
                  </h4>
                  <ul className="text-sm text-muted-foreground space-y-2">
                    <li>• Failed generations due to technical issues</li>
                    <li>• Service interruptions during processing</li>
                    <li>• Corrupted or incomplete results</li>
                    <li>• Credits returned to your account</li>
                  </ul>
                </div>

                <div className="p-4 border rounded-lg">
                  <h4 className="font-semibold mb-3 flex items-center gap-2">
                    <Badge variant="secondary">Store Credit</Badge>
                  </h4>
                  <ul className="text-sm text-muted-foreground space-y-2">
                    <li>• Goodwill gestures for minor issues</li>
                    <li>• Compensation for service delays</li>
                    <li>• Alternative to monetary refunds</li>
                    <li>• Extended validity period</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* How to Request a Refund */}
          <Card>
            <CardHeader>
              <CardTitle>How to Request a Refund</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold mb-4">Step-by-Step Process</h4>
                  <ol className="list-decimal list-inside text-muted-foreground space-y-2">
                    <li>Contact our support team via email or phone</li>
                    <li>Provide your account email and purchase details</li>
                    <li>Describe the reason for your refund request</li>
                    <li>Include any relevant screenshots or documentation</li>
                    <li>Wait for our response within 3 business days</li>
                    <li>Follow any additional instructions provided</li>
                  </ol>
                </div>

                <div>
                  <h4 className="font-semibold mb-4">Required Information</h4>
                  <ul className="list-disc list-inside text-muted-foreground space-y-2">
                    <li>Account email address</li>
                    <li>Purchase date and transaction ID</li>
                    <li>Package purchased (Basic, Pro, or Elite)</li>
                    <li>Detailed reason for refund request</li>
                    <li>Screenshots of any errors (if applicable)</li>
                    <li>Preferred refund method</li>
                  </ul>
                </div>
              </div>

              <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-950 rounded-lg border border-blue-200 dark:border-blue-800">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="h-5 w-5 text-blue-600 mt-1" />
                  <div>
                    <h5 className="font-semibold text-blue-800 dark:text-blue-200">Quick Tip</h5>
                    <p className="text-sm text-blue-700 dark:text-blue-300">
                      Before requesting a refund, try clearing your browser cache or using a different device.
                      Many technical issues can be resolved with simple troubleshooting steps.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Special Circumstances */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5" />
                Special Circumstances
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h4 className="font-semibold mb-2">New User Protection</h4>
                <p className="text-muted-foreground mb-3">
                  First-time users have additional protection to ensure satisfaction:
                </p>
                <ul className="list-disc list-inside text-muted-foreground space-y-1">
                  <li>Full refund available if unsatisfied with first 3 generations</li>
                  <li>Extended 14-day refund window for new accounts</li>
                  <li>Free credits provided for technical issues during onboarding</li>
                  <li>Personal support for setup and usage questions</li>
                </ul>
              </div>

              <div>
                <h4 className="font-semibold mb-2">Subscription Cancellation</h4>
                <p className="text-muted-foreground mb-3">
                  For future subscription plans:
                </p>
                <ul className="list-disc list-inside text-muted-foreground space-y-1">
                  <li>Cancel anytime without penalty</li>
                  <li>Pro-rated refunds for unused subscription periods</li>
                  <li>Immediate access suspension upon cancellation</li>
                  <li>Export options for your generated content</li>
                </ul>
              </div>

              <div>
                <h4 className="font-semibold mb-2">Force Majeure</h4>
                <p className="text-muted-foreground mb-3">
                  In case of events beyond our control:
                </p>
                <ul className="list-disc list-inside text-muted-foreground space-y-1">
                  <li>Service credit compensation for extended outages</li>
                  <li>Automatic extension of credit expiration dates</li>
                  <li>Alternative service arrangements when possible</li>
                  <li>Clear communication about service impacts</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Refund Processing */}
          <Card>
            <CardHeader>
              <CardTitle>Refund Processing</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-semibold mb-2">Payment Methods</h4>
                <p className="text-muted-foreground mb-3">
                  Refunds are processed to the original payment method:
                </p>
                <ul className="list-disc list-inside text-muted-foreground space-y-1">
                  <li>Credit/Debit Cards: 5-7 business days</li>
                  <li>PayPal: 2-3 business days</li>
                  <li>Bank Transfers: 7-10 business days</li>
                  <li>Digital Wallets: 1-3 business days</li>
                </ul>
              </div>

              <div>
                <h4 className="font-semibold mb-2">International Transactions</h4>
                <p className="text-muted-foreground">
                  International refunds may take longer due to banking processes and currency conversion.
                  Additional fees charged by your bank or payment provider are not refundable.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Dispute Resolution */}
          <Card>
            <CardHeader>
              <CardTitle>Dispute Resolution</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                If you&apos;re not satisfied with our refund decision:
              </p>

              <div className="space-y-3">
                <div className="p-3 border-l-4 border-blue-500 bg-blue-50 dark:bg-blue-950">
                  <h5 className="font-semibold">Step 1: Contact Senior Support</h5>
                  <p className="text-sm text-muted-foreground">
                    Request escalation to our senior support team for additional review
                  </p>
                </div>

                <div className="p-3 border-l-4 border-orange-500 bg-orange-50 dark:bg-orange-950">
                  <h5 className="font-semibold">Step 2: Formal Appeal</h5>
                  <p className="text-sm text-muted-foreground">
                    Submit a formal written appeal with additional documentation
                  </p>
                </div>

                <div className="p-3 border-l-4 border-purple-500 bg-purple-50 dark:bg-purple-950">
                  <h5 className="font-semibold">Step 3: Third-Party Mediation</h5>
                  <p className="text-sm text-muted-foreground">
                    Use independent mediation services for unresolved disputes
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Mail className="h-5 w-5" />
                Contact Our Refund Team
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-6">
                Our dedicated refund team is here to help resolve any issues quickly and fairly.
              </p>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold mb-3">Primary Contact</h4>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Mail className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">refunds@plushify.com</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">+1 (555) 123-4567</span>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Available Monday-Friday, 9 AM - 6 PM PST
                    </p>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold mb-3">Escalation Contact</h4>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Mail className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">support-manager@plushify.com</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">+1 (555) 123-4568</span>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      For unresolved issues or formal appeals
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-6">
                <Button asChild>
                  <Link href="mailto:refunds@plushify.com">
                    <Mail className="h-4 w-4 mr-2" />
                    Request a Refund
                  </Link>
                </Button>
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
              href="/legal/terms"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Terms of Service
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