export interface SEO {
  title?: string;
  opengraphImage?: OpengraphImage;
  opengraphTitle?: string;
  opengraphDescription?: string;
  opengraphUrl?: string;
}

export interface OpengraphImage {
  altText: string;
  sourceUrl: string;
}
