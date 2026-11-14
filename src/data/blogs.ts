import blogsData from "./blogs.json";

export interface BlogSection {
  id: string;
  heading: string;
  paragraphs: string[];
  points?: string[];
}

export interface BlogPost {
  slug: string;
  title: string;
  menuLabel: string;
  summary: string;
  image: string;
  imageAlt: string;
  width: number;
  height: number;
  date: string;
  sections: BlogSection[];
}

export const blogs = blogsData as BlogPost[];

export function getBlog(slug: string | undefined): BlogPost | undefined {
  if (!slug) return undefined;
  return blogs.find((blog) => blog.slug === slug);
}
