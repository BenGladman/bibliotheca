import styles from "./Quote.module.css";

interface QuoteProps {
  html: string;
  citeTitle: string;
  cite: string;
}

export function Quote({ html, citeTitle, cite }: QuoteProps) {
  return (
    <figure className={styles.figure}>
      <blockquote dangerouslySetInnerHTML={{ __html: html }} cite={cite} />
      <figcaption>
        <cite>
          <a href={cite}>{citeTitle}</a>
        </cite>
      </figcaption>
    </figure>
  );
}
