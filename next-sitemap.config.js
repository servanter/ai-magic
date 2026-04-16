/**
 * @type {import('next-sitemap').IConfig}
 * @see https://github.com/iamvishnusankar/next-sitemap#readme
 * @see https://weijunext.com/article/979b9033-188c-4d88-bfff-6cf74d28420d
 */
const fs = require("fs");
const path = require("path");

// Dynamically read tool links from imageConfig
function getToolLinks() {
  try {
    const raw = fs.readFileSync(
      path.join(__dirname, "config/imageConfig.ts"),
      "utf-8"
    );
    // Extract all link: "xxx" values
    const matches = [...raw.matchAll(/link:\s*["']([^"']+)["']/g)];
    return matches.map((m) => m[1]);
  } catch (e) {
    console.warn("[next-sitemap] Failed to read imageConfig.ts:", e.message);
    return [];
  }
}

// Dynamically read blog slugs from content/blog directory
function getBlogSlugs() {
  try {
    const blogDir = path.join(__dirname, "content/blog");
    return fs
      .readdirSync(blogDir)
      .filter((f) => f.endsWith(".mdx"))
      .map((f) => f.replace(/\.mdx$/, ""));
  } catch (e) {
    console.warn("[next-sitemap] Failed to read content/blog:", e.message);
    return [];
  }
}

module.exports = {
  siteUrl: "https://www.aimage.top",
  changefreq: "daily",
  priority: 0.7,
  exclude: ["/server-sitemap.xml", "/404"],
  generateRobotsTxt: true,
  sitemapSize: 5000, // 站点超过5000个，拆分到多个文件
  transform: async (config, path) => {
    return {
      loc: path, // => this will be exported as http(s)://<config.siteUrl>/<path>
      changefreq: config.changefreq,
      priority: config.priority,
      lastmod: config.autoLastmod ? new Date().toISOString() : undefined,
      alternateRefs: config.alternateRefs ?? [],
    };
  },
  additionalPaths: async (config) => {
    const toolLinks = getToolLinks();
    const blogSlugs = getBlogSlugs();

    const toolPaths = await Promise.all(
      toolLinks.map((link) => config.transform(config, `/tools/${link}`))
    );
    const blogPostPaths = await Promise.all(
      blogSlugs.map((slug) => config.transform(config, `/blog/${slug}`))
    );

    return [
      // Homepage
      await config.transform(config, "/"),
      // Tools sub-pages (dynamic)
      ...toolPaths,
      // Blog list page
      await config.transform(config, "/blog"),
      // Blog post pages (dynamic)
      ...blogPostPaths,
    ];
  },
  robotsTxtOptions: {
    // additionalSitemaps: [
    //   'https://www.aimage.top/sitemap.xml',
    // ],
    policies: [
      {
        userAgent: "*",
        allow: "/",
      },
      {
        userAgent: "AhrefsBot",
        disallow: ["/"],
      },
      {
        userAgent: "SemrushBot",
        disallow: ["/"],
      },
      {
        userAgent: "MJ12bot",
        disallow: ["/"],
      },
      {
        userAgent: "DotBot",
        disallow: ["/"],
      },
    ],
  },
};
