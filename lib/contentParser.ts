import parseMDX from "@lib/utils/mdxParser";
import fs from "fs";
import matter from "gray-matter";
import path from "path";
import { MDXRemoteSerializeResult } from "next-mdx-remote";

// ✅ Generic return type
export type ListPageResult<T> = {
  frontmatter: T;
  content: string;
  mdxContent: MDXRemoteSerializeResult;
};

// get list page data, ex: _index.md
export const getListPage = async <T>(
  filePath: string
): Promise<ListPageResult<T>> => {
  const pageData = fs.readFileSync(filePath, "utf-8");
  const pageDataParsed = matter(pageData);

  const notFoundPage = fs.readFileSync("content/404.md", "utf-8");
  const notFoundDataParsed = matter(notFoundPage);

  let frontmatter: T;
  let content: string;

  if (pageDataParsed) {
    content = pageDataParsed.content;
    frontmatter = pageDataParsed.data as T; // 👈 important
  } else {
    content = notFoundDataParsed.content;
    frontmatter = notFoundDataParsed.data as T;
  }

  const mdxContent = await parseMDX(content);

  return {
    frontmatter,
    content,
    mdxContent,
  };
};

type SinglePage<T> = {
  frontmatter: T;
  slug: string;
  content: string;
};

// get all single pages, ex: blog/post.md
export const getSinglePage = <T>(folder: string): SinglePage<T>[] => {
  const filesPath = fs.readdirSync(folder);
  const sanitizeFiles = filesPath.filter((file) => file.includes(".md"));
  const filterSingleFiles = sanitizeFiles.filter((file) =>
    file.match(/^(?!_)/)
  );
  const singlePages = filterSingleFiles.map((filename) => {
    const slug = filename.replace(".md", "");
    const pageData = fs.readFileSync(path.join(folder, filename), "utf-8");
    const pageDataParsed = matter(pageData);
    const frontmatterString = JSON.stringify(pageDataParsed.data);
    const frontmatter = JSON.parse(frontmatterString);
    const content = pageDataParsed.content;
    const url = frontmatter.url ? frontmatter.url.replace("/", "") : slug;
    return { frontmatter: frontmatter, slug: url, content: content };
  });

  const publishedPages = singlePages.filter(
    (page) =>
      !page.frontmatter.draft && page.frontmatter.layout !== "404" && page
  );
  const filterByDate = publishedPages.filter(
    (page) => new Date(page.frontmatter.date || new Date()) <= new Date()
  );

  return filterByDate;
};

// get a regular page data from many pages, ex: about.md
export const getRegularPage = async (slug: string) => {
  const publishedPages = getSinglePage("content");
  const pageData = publishedPages.filter((data) => data.slug === slug);
  const notFoundPage = fs.readFileSync("content/404.md", "utf-8");
  const notFoundDataParsed = matter(notFoundPage);

  let frontmatter, content;
  if (pageData[0]) {
    content = pageData[0].content;
    frontmatter = pageData[0].frontmatter;
  } else {
    content = notFoundDataParsed.content;
    frontmatter = notFoundDataParsed.data;
  }
  const mdxContent = await parseMDX(content);

  return {
    frontmatter,
    content,
    mdxContent,
  };
};
