import type { Metadata, Viewport } from "next";
import { Caveat, Geist, Geist_Mono } from "next/font/google";
import { Navbar } from "@/components/Navbar";
import { site } from "@/lib/site";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

/* used for one thing only: the signature under the portrait */
const signature = Caveat({
  variable: "--font-caveat",
  subsets: ["latin"],
  weight: ["600"],
  display: "swap",
});

const title = `${site.name} — ${site.role}`;
const description =
  "Monisha S.S. is a Generative AI Engineer in Chennai building LLM applications, voice agents, and AI automation — from speech pipelines and tool-calling agents to the backend, data model, and interface around them.";

export const metadata: Metadata = {
  // metadataBase only when the production domain is actually known
  ...(site.url ? { metadataBase: new URL(site.url) } : {}),
  title: {
    default: title,
    template: `%s — ${site.name}`,
  },
  description,
  applicationName: `${site.name} Portfolio`,
  authors: [{ name: site.name, url: site.github }],
  creator: site.name,
  keywords: [
    "AI Engineer",
    "Generative AI Engineer",
    "LLM Application Engineer",
    "AI Automation Engineer",
    "Voice AI",
    "RAG",
    "LLM agents",
    "Next.js",
    "TypeScript",
    "Chennai",
    "Monisha S.S.",
  ],
  // canonical is only emitted once a production domain is configured
  ...(site.url ? { alternates: { canonical: "/" } } : {}),
  openGraph: {
    type: "profile",
    title,
    description,
    siteName: `${site.name} — Portfolio`,
    locale: "en_IN",
    ...(site.url ? { url: site.url } : {}),
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
};

export const viewport: Viewport = {
  themeColor: "#000000",
  colorScheme: "dark",
};

/** Structured data — only facts verified by the resume and profile document. */
const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: site.name,
  jobTitle: "Generative AI Engineer",
  description,
  email: `mailto:${site.email}`,
  telephone: site.phone,
  address: {
    "@type": "PostalAddress",
    addressLocality: "Chennai",
    addressRegion: "Tamil Nadu",
    addressCountry: "IN",
  },
  alumniOf: {
    "@type": "CollegeOrUniversity",
    name: "Peri Institute of Technology",
  },
  worksFor: { "@type": "Organization", name: "Sirah Digital" },
  knowsAbout: [
    "Generative AI",
    "Large Language Models",
    "Retrieval-Augmented Generation",
    "Conversational Voice AI",
    "Speech-to-Text",
    "AI Automation",
    "Full-Stack Engineering",
  ],
  sameAs: [site.github, site.linkedin],
  ...(site.url ? { url: site.url } : {}),
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    /* the font variables belong on <html>: `@theme` emits --font-sans and
       friends on :root, and a custom property that references them resolves
       where it is declared — on <body> they were never in scope, so every
       one of those stacks fell through to the generic fallback */
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${signature.variable}`}
    >
      <body className="antialiased">
        <script
          type="application/ld+json"
          // JSON.stringify output of a local literal — no user input involved
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        <Navbar />
        {children}
      </body>
    </html>
  );
}
