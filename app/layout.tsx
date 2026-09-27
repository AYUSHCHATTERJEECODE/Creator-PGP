import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Creator PGP | AI Creator Studio & YouTube Growth Intelligence",
  description:
    "AI Creator Studio + YouTube Growth Dashboard + Content Generation Suite + Thumbnail Intelligence Tool for YouTube and Instagram creators.",
  icons: {
    icon: "/logo.png",
    shortcut: "/logo.png",
    apple: "/logo.png",
  },
  openGraph: {
    title: "Creator PGP - AI-Powered Creator Toolkit",
    description: "Plan, optimize and analyze YouTube & Instagram content with neural AI tools.",
    images: [{ url: "/logo.png" }],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: "cover",
  themeColor: "#070a14",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark bg-[#070a14]">
      <body className="min-h-screen bg-[#070a14] text-slate-100 antialiased overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}
