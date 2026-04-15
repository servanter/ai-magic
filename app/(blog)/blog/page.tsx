import { allBlogs } from "contentlayer/generated";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog | AImage",
  description:
    "Tutorials, guides, and tips on AI image style transfer, cartoon avatars, pixel art, and more.",
  alternates: {
    canonical: "https://www.aimage.top/blog",
  },
};

export default function BlogPage() {
  const posts = allBlogs.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  return (
    <div className="container max-w-4xl py-6 lg:py-12">
      <div className="space-y-4 mb-10">
        <h1 className="inline-block font-heading text-4xl lg:text-5xl">Blog</h1>
        <p className="text-xl text-muted-foreground">
          Tutorials, guides, and tips on AI image style transfer.
        </p>
      </div>
      <hr className="my-6" />
      <div className="grid gap-8">
        {posts.map((post) => (
          <article
            key={post._id}
            className="group flex flex-col gap-2 border rounded-lg p-6 hover:shadow-md transition-shadow"
          >
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <time dateTime={post.date}>
                {new Date(post.date).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </time>
              {post.tags && post.tags.length > 0 && (
                <>
                  <span>·</span>
                  <div className="flex gap-1">
                    {post.tags.map((tag) => (
                      <span
                        key={tag}
                        className="bg-muted px-2 py-0.5 rounded text-xs"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </>
              )}
            </div>
            <Link href={`/blog/${post.slugAsParams}`}>
              <h2 className="text-2xl font-semibold group-hover:text-pink-500 transition-colors">
                {post.title}
              </h2>
            </Link>
            {post.description && (
              <p className="text-muted-foreground leading-relaxed">
                {post.description}
              </p>
            )}
            <Link
              href={`/blog/${post.slugAsParams}`}
              className="text-pink-500 hover:underline text-sm font-medium mt-1"
            >
              Read more →
            </Link>
          </article>
        ))}
      </div>
    </div>
  );
}
