import { SiteConfig } from "@/types/siteConfig"

const baseSiteConfig = {
  name: "AI Image Avatar Generator",
  description:
    "Support uploading any photo to quickly generate cartoon avatars in various styles, meeting all social platforms’ avatar needs.",
  url: "https://ai-magic-ten.vercel.app/",
  ogImage: "https://ai-magic-ten.vercel.app/og.png",
  metadataBase: new URL("https://ai-magic-ten.vercel.app"),
  keywords: ["SmartExcel", "ChatGPT", "Excel formulas", "Excel AI", "文心一言", "智谱"],
  authors: [
    {
      name: "servanter",
      url: "https://ai-magic-ten.vercel.app",
    }
  ],
  creator: '@servanter',
  themeColor: '#fff',
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
  links: {
    twitter: "https://x.com/hongyanzha38268",
    github: "https://github.com/servanter",
  },
}

export const siteConfig: SiteConfig = {
  ...baseSiteConfig,
  openGraph: {
    type: "website",
    locale: "en_US",
    url: baseSiteConfig.url,
    title: baseSiteConfig.name,
    description: baseSiteConfig.description,
    siteName: baseSiteConfig.name,
  },
  twitter: {
    card: "summary_large_image",
    title: baseSiteConfig.name,
    description: baseSiteConfig.description,
    images: [`${baseSiteConfig.url}/og.png`],
    creator: baseSiteConfig.creator,
  },
}
