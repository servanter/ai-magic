🌍 *[English](README.md) ∙ [简体中文](README-zh.md)*

# [AImage](https://www.aimage.top) — 免费 AI 图像与头像生成器

免费生成精美的 AI 头像和图像。上传任意照片，即刻转换为卡通、动漫或艺术风格，完美适配所有社交平台。

[![AImage - 免费 AI 图像与头像生成器](./public/og.png)](https://www.aimage.top)

## 功能特性

- **照片转卡通** — 几秒内将任意照片转为卡通风格
- **AI 头像生成** — 为社交媒体主页创建独特头像
- **动漫风格** — 将人像转换为动漫插画风格
- **艺术风格** — 为图像应用多种 AI 艺术风格
- **免费使用** — 基础功能无需注册
- **多平台适配** — 输出图像针对各大社交平台优化

## 工作原理

1. 上传你的照片
2. 选择 AI 风格（卡通、动漫、艺术等）
3. 立即下载生成的图像

项目通过 [Vercel AI SDK](https://sdk.vercel.ai/docs) 的流式传输能力，调用 AI 图像生成接口处理上传图片，实时生成风格化输出。

## 技术栈

AImage 基于以下技术构建：

- **[Next.js 13](https://nextjs.org/)** — 前端 & 后端（App Router）
- **[TailwindCSS](https://tailwindcss.com/)** — 样式
- **[Prisma](https://www.prisma.io/) + PostgreSQL** — 数据库与存储
- **[NextAuth.js](https://next-auth.js.org/)** — 用户认证
- **[Stripe](https://stripe.com/) + [Lemon Squeezy](https://www.lemonsqueezy.com/)** — 支付
- **[Upstash Redis](https://upstash.com/)** — 限流与缓存
- **[Contentlayer](https://contentlayer.dev/)** — MDX 内容管理
- **[Vercel Analytics](https://vercel.com/analytics)** — 访问分析
- **[Vercel](https://vercel.com/)** — 托管部署

## 本地运行

1. 克隆仓库并复制环境变量文件：

```bash
cp .env.example .env
```

2. 在 `.env` 中填写所需环境变量：

```env
# 数据库
DATABASE_URL=

# NextAuth
NEXTAUTH_SECRET=
NEXTAUTH_URL=http://localhost:3000

# GitHub OAuth（用于登录）
GITHUB_ID=
GITHUB_SECRET=

# Upstash Redis
UPSTASH_REDIS_REST_URL=
UPSTASH_REDIS_REST_TOKEN=

# Stripe（可选）
STRIPE_SECRET_KEY=
STRIPE_WEBHOOK_SECRET=
```

3. 安装依赖并启动开发服务器：

```bash
pnpm install
pnpm dev
```

应用将在 `http://localhost:3000` 上运行。

## 一键部署

使用 [Vercel](https://vercel.com) 一键部署：

[![使用 Vercel 部署](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/servanter/ai-magic&project-name=aimage&repository-name=ai-magic&demo-title=AImage&demo-description=%E5%85%8D%E8%B4%B9%20AI%20%E5%9B%BE%E5%83%8F%E4%B8%8E%E5%A4%B4%E5%83%8F%E7%94%9F%E6%88%90%E5%99%A8&demo-url=https://www.aimage.top&demo-image=https://www.aimage.top/og.png)

## 开源协议

MIT
