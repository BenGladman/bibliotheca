export interface MarkdownAttributes {
  title: string;
  author: string;
  series?: string;
  published: number;
  tags?: string | string[];
  read?: number | number[];
}

export interface MarkdownModule {
  attributes: MarkdownAttributes;
  // When "Mode.TOC" is requested
  toc: { level: string; content: string }[];
  // When "Mode.HTML" is requested
  html: string;
}
