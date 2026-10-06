import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import remarkGfm from "remark-gfm";
import remarkHtml from "remark-html";

const CONTENT_DIR = path.join(process.cwd(), "src/content/insights");

export interface ArticleFrontmatter {
  title: string;
  description: string;
  date: string;
  category: string;
  author: string;
  tags?: string[];
  readTime?: string;
  featured?: boolean;
}

export interface ArticleContent {
  frontmatter: ArticleFrontmatter;
  htmlContent: string;
}

export async function getArticleContent(slug: string): Promise<ArticleContent | null> {
  const filePath = path.join(CONTENT_DIR, `${slug}.mdx`);

  if (!fs.existsSync(filePath)) {
    return null;
  }

  const raw = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(raw);

  const processed = await remark()
    .use(remarkGfm)
    .use(remarkHtml, { sanitize: false })
    .process(content);

  return {
    frontmatter: data as ArticleFrontmatter,
    htmlContent: processed.toString(),
  };
}

export function getAllArticleSlugs(): string[] {
  if (!fs.existsSync(CONTENT_DIR)) return [];
  return fs
    .readdirSync(CONTENT_DIR)
    .filter((f) => f.endsWith(".mdx"))
    .map((f) => f.replace(/\.mdx$/, ""));
}
