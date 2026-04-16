import { SiteConfig } from "@/types/siteConfig"

const baseSiteConfig = {
  name: "AImage",
  title: "AImage - Free AI Image & Avatar Generator",
  description:
    "Generate stunning AI avatars and images for free. Upload any photo and instantly transform it into cartoon, anime, or artistic styles. Perfect for all social platforms.",
  url: "https://www.aimage.top",
  ogImage: "https://www.aimage.top/og.png",
  metadataBase: new URL("https://www.aimage.top"),
  keywords: ["AI image generator", "AI avatar generator", "photo to cartoon", "cartoon avatar", "anime avatar", "AI art", "image style transfer", "free AI image", "aimage", "AI photo editor"],
  authors: [
    {
      name: "servanter",
      url: "https://www.aimage.top",
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
    title: baseSiteConfig.title,
    description: baseSiteConfig.description,
    siteName: baseSiteConfig.name,
  },
  twitter: {
    card: "summary_large_image",
    title: baseSiteConfig.title,
    description: baseSiteConfig.description,
    images: [`${baseSiteConfig.url}/og.png`],
    creator: baseSiteConfig.creator,
  },
}
