import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Generate AI Plushie",
  description: "Transform your photos into adorable plushies with AI! Upload any photo and choose from Classic, Kawaii, or Realistic styles. Generate your personalized plushie in seconds.",
  openGraph: {
    title: "Generate AI Plushie - Plushify",
    description: "Transform your photos into adorable plushies with AI! Upload any photo and choose from Classic, Kawaii, or Realistic styles.",
  },
};

export default function GenerateLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}