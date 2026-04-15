import { allBlogs } from "contentlayer/generated";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

import { Mdx } from "@/components/mdx/mdx-components";
import "@/styles/mdx.css";

interface PageProps {
  params: {
    slug: string[];
  };
}

async function getBlogFromParams(params: { slug: string[] }) {
  const slug = params?.slug?.join("/");
  const post = allBlogs.find((post) => post.slugAsParams === slug);
  return post ?? null;
}

export async function generateStaticParams(): Promise<PageProps["params"][]> {
  return allBlogs.map((post) => ({
    slug: post.slugAsParams?.split("/"),
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const post = await getBlogFromParams(params);
  if (!post) {
    return {};
  }
  const slug = params.slug?.join("/") || "";
  return {
    title: `${post.title} | AImage Blog`,
    description: post.description,
    alternates: {
      canonical: `https://www.aimage.top/blog/${slug}`,
    },
  };
}

export default async function BlogPostPage({ params }: PageProps) {
  const post = await getBlogFromParams(params);

  if (!post) {
    notFound();
  }

  return (
    <article className="container max-w-3xl py-6 lg:py-12">
      <div className="space-y-4">
        <div className="text-sm text-muted-foreground">
          <time dateTime={post.date}>
            {new Date(post.date).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </time>
          {post.tags && post.tags.length > 0 && (
            <span className="ml-3 flex gap-1 inline-flex">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="bg-muted px-2 py-0.5 rounded text-xs"
                >
                  {tag}
                </span>
              ))}
            </span>
          )}
        </div>
        <h1 className="inline-block font-heading text-4xl lg:text-5xl">
          {post.title}
        </h1>
        {post.description && (
          <p className="text-xl text-muted-foreground">{post.description}</p>
        )}
      </div>
      <hr className="my-4" />
      <Mdx code={post.body.code} />
      <hr className="my-8" />
      <div className="text-center">
        <p className="text-muted-foreground mb-4">
          Ready to try it yourself?
        </p>
        <a
          href="/"
          className="inline-block bg-pink-500 hover:bg-pink-600 text-white font-semibold px-6 py-3 rounded-lg transition-colors"
        >
          Try AImage for Free →
        </a>
      </div>
    </article>
  );
}
