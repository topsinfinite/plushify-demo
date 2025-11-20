import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="border-t bg-muted/30 py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-foreground">Plushify</h3>
            <p className="text-sm text-muted-foreground">
              Transform your photos into adorable plushie designs with AI. Create lasting memories with our magical plushie generator.
            </p>
          </div>

          {/* Product */}
          <div className="space-y-4">
            <h4 className="text-sm font-medium text-foreground">Product</h4>
            <nav className="flex flex-col space-y-2 text-sm text-muted-foreground">
              <Link href="/generate" className="hover:text-foreground transition-colors">
                Generate Plushies
              </Link>
              <Link href="/gallery" className="hover:text-foreground transition-colors">
                Gallery
              </Link>
              <Link href="/pricing" className="hover:text-foreground transition-colors">
                Pricing
              </Link>
              <Link href="/docs" className="hover:text-foreground transition-colors">
                How It Works
              </Link>
            </nav>
          </div>

          {/* Support */}
          <div className="space-y-4">
            <h4 className="text-sm font-medium text-foreground">Support</h4>
            <nav className="flex flex-col space-y-2 text-sm text-muted-foreground">
              <Link href="/docs/faq" className="hover:text-foreground transition-colors">
                FAQ
              </Link>
              <Link href="/docs/upload-guidelines" className="hover:text-foreground transition-colors">
                Upload Guidelines
              </Link>
              <Link href="/contact" className="hover:text-foreground transition-colors">
                Contact Us
              </Link>
              <Link href="/support" className="hover:text-foreground transition-colors">
                Help Center
              </Link>
            </nav>
          </div>

          {/* Legal */}
          <div className="space-y-4">
            <h4 className="text-sm font-medium text-foreground">Legal</h4>
            <nav className="flex flex-col space-y-2 text-sm text-muted-foreground">
              <Link href="/legal/privacy" className="hover:text-foreground transition-colors">
                Privacy Policy
              </Link>
              <Link href="/legal/terms" className="hover:text-foreground transition-colors">
                Terms of Service
              </Link>
              <Link href="/legal/refunds" className="hover:text-foreground transition-colors">
                Refund Policy
              </Link>
              <Link href="/legal/cookies" className="hover:text-foreground transition-colors">
                Cookie Policy
              </Link>
            </nav>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
          <p>© 2024 Plushify. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <Link href="/status" className="hover:text-foreground transition-colors">
              System Status
            </Link>
            <Link href="/api-docs" className="hover:text-foreground transition-colors">
              API
            </Link>
            <Link href="/blog" className="hover:text-foreground transition-colors">
              Blog
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
