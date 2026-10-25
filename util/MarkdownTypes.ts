export interface MarkdownAttributes {
  title: string;
  author: string;
  series?: string;
  year: number;
  tags: string[];
  read?: number[];
}

export interface MarkdownModule {
  attributes: MarkdownAttributes;
  // When "Mode.TOC" is requested
  toc: { level: string; content: string }[];
  // When "Mode.HTML" is requested
  html: string;
}
