export interface MarkdownAttributes {
  title: string;
  author: string;
  series?: string;
  tags?: string | string[];
  location?: string | string[];
  published: number;
  read?: number | number[];
  wikiPageId?: number;
  googleBookId?: string;
}

export interface MarkdownModule {
  attributes: MarkdownAttributes;
  // When "Mode.TOC" is requested
  toc: { level: string; content: string }[];
  // When "Mode.HTML" is requested
  html: string;
}
