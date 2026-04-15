import { AboutLayout } from "@/components/layout/AboutLayout";
import { HomeLayoutChildren } from "@/types/layout";

export default async function BlogPageLayout({
  children,
}: HomeLayoutChildren) {
  return (
    <>
      <AboutLayout children={children} />
    </>
  );
}
