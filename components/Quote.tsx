interface QuoteProps {
  html: string;
  citeTitle: string;
  cite: string;
}

export function Quote({ html, citeTitle, cite }: QuoteProps) {
  return (
    <figure className="mt-6 border-l-2 border-gray-90/50 bg-gray-90/5 px-2 py-1 [margin-trim:block]">
      <blockquote className="mb-2" dangerouslySetInnerHTML={{ __html: html }} cite={cite} />
      <figcaption className="text-right">
        <cite className="text-sm">
          <a href={cite}>{citeTitle}</a>
        </cite>
      </figcaption>
    </figure>
  );
}
