import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getBlogPosts, getArticleBySlug, getRelatedArticles } from "@/lib/data/resources";
import ArticleDetail from "@/components/resources/ArticleDetail";

export const revalidate = 60;

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return (await getBlogPosts()).map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);
  if (!article) return {};
  return {
    title: `${article.title} | Chapter Real Estate`,
    description: article.excerpt,
    openGraph: {
      title: `${article.title} | Chapter`,
      description: article.excerpt,
      url: `https://chapterrealestate.ca/resources/${article.slug}`,
      images: [{ url: article.image }],
    },
  };
}

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);
  if (!article) notFound();

  const related = await getRelatedArticles(slug);

  return <ArticleDetail article={article} related={related} />;
}
