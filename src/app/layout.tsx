import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { StructuredData } from "@/components/structured-data";
import { Analytics } from "@/components/analytics";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Gowtham Sree Charan Reddy - Machine Learning Developer & AI Enthusiast",
    template: "%s | Gowtham Sree Charan Reddy"
  },
  description: "Passionate Full Stack Developer specializing in AI/ML, Web Development, and Data Structures. Building innovative solutions with React, Next.js, Python, and modern technologies.",
  keywords: [
    "Gowtham Sree Charan Reddy",
    "Gowtham Sree",
    "gowthamrdyy",
    "Machine Learning Developer",
    "AI Developer",
    "Full Stack Developer",
    "Machine Learning",
    "Artificial Intelligence",
    "Web Development",
    "React Developer",
    "Next.js Developer",
    "Python Developer",
    "Data Structures",
    "Algorithms",
    "DSA",
    "Portfolio",
    "Software Engineer",
    "Frontend Developer",
    "Backend Developer",
    "SRM Institute"
  ],
  authors: [{ name: "Gowtham Sree Charan Reddy", url: "https://github.com/gowthamrdyy" }],
  creator: "Gowtham Sree Charan Reddy",
  publisher: "Gowtham Sree Charan Reddy",
  metadataBase: new URL("https://gowthamrdyy.vercel.app"), // Update with your actual domain
  alternates: {
    canonical: "/"
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://gowthamrdyy.vercel.app",
    title: "Gowtham Sree Charan Reddy - Machine Learning Developer & AI Enthusiast",
    description: "Passionate Machine Learning Developer specializing in AI/ML, Web Development, and Data Structures. Building innovative solutions with React, Next.js, Python, and modern technologies.",
    siteName: "Gowtham Sree Charan Reddy Portfolio",
    images: [
      {
        url: "/hero-image.png",
        width: 1200,
        height: 630,
        alt: "Gowtham Sree Charan Reddy - Machine Learning Developer"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Gowtham Sree Charan Reddy - Machine Learning Developer & AI Enthusiast",
    description: "Passionate Machine Learning Developer specializing in AI/ML, Web Development, and Data Structures.",
    images: ["/hero-image.png"],
    creator: "@gowthamrdyy"
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1
    }
  },
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon.ico" }
    ],
    shortcut: "/favicon.svg",
    apple: "/favicon.svg"
  },
  manifest: "/manifest.json",
  verification: {
    google: "YOUR_GOOGLE_VERIFICATION_CODE", // Add your Google Search Console verification
    // yandex: "YOUR_YANDEX_VERIFICATION_CODE",
    // bing: "YOUR_BING_VERIFICATION_CODE"
  },
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 5,
    userScalable: true,
  },
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0a" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <StructuredData />
        <Analytics />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          forcedTheme="dark"
          enableSystem={false}
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
