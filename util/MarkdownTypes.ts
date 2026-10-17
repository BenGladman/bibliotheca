export interface MarkdownAttributes {
  title: string;
  author: string;
  tags: string[];
}

export interface MarkdownModule {
  attributes: MarkdownAttributes;
  // When "Mode.TOC" is requested
  toc: { level: string; content: string }[];
  // When "Mode.HTML" is requested
  html: string;
}
