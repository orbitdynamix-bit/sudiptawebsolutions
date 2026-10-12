type JsonLdNode = Record<string, unknown>;

export type SeoMeta = {
  title: string;
  description: string;
  pathname: string;
  keywords?: string[];
  ogType?: 'website' | 'article';
  noIndex?: boolean;
  structuredData?: JsonLdNode | JsonLdNode[];
};

const SITE_NAME = 'sudiptawebsolutions';
const LEGAL_NAME = 'SUDIPTA WEB SOLUTIONS PVT LTD';
const SITE_URL = 'https://sudiptawebsolutions.com';
const DEFAULT_OG_IMAGE = '/og-image.svg';

function upsertMeta(attr: 'name' | 'property', key: string, content: string) {
  let tag = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`);
  if (!tag) {
    tag = document.createElement('meta');
    tag.setAttribute(attr, key);
    document.head.appendChild(tag);
  }
  tag.setAttribute('content', content);
}

function upsertLink(rel: string, href: string) {
  let tag = document.head.querySelector<HTMLLinkElement>(`link[rel="${rel}"]`);
  if (!tag) {
    tag = document.createElement('link');
    tag.setAttribute('rel', rel);
    document.head.appendChild(tag);
  }
  tag.setAttribute('href', href);
}

function upsertJsonLd(schema: JsonLdNode | JsonLdNode[]) {
  const id = 'seo-json-ld';
  let script = document.head.querySelector<HTMLScriptElement>(`script#${id}`);
  if (!script) {
    script = document.createElement('script');
    script.type = 'application/ld+json';
    script.id = id;
    document.head.appendChild(script);
  }
  script.textContent = JSON.stringify(schema);
}

function toAbsoluteUrl(pathname: string) {
  const base = typeof window !== 'undefined' ? window.location.origin : SITE_URL;
  return new URL(pathname, base).toString();
}

export function applySeo(meta: SeoMeta) {
  const canonical = toAbsoluteUrl(meta.pathname);
  const ogImage = toAbsoluteUrl(DEFAULT_OG_IMAGE);
  const title = `${meta.title} | ${SITE_NAME}`;
  const robots = meta.noIndex ? 'noindex, nofollow' : 'index, follow, max-image-preview:large';

  document.title = title;
  document.documentElement.lang = 'en';

  upsertLink('canonical', canonical);

  upsertMeta('name', 'description', meta.description);
  upsertMeta('name', 'keywords', (meta.keywords ?? []).join(', '));
  upsertMeta('name', 'robots', robots);
  upsertMeta('name', 'googlebot', robots);
  upsertMeta('name', 'author', LEGAL_NAME);
  upsertMeta('name', 'application-name', LEGAL_NAME);
  upsertMeta('name', 'theme-color', '#05080d');

  upsertMeta('property', 'og:title', title);
  upsertMeta('property', 'og:description', meta.description);
  upsertMeta('property', 'og:type', meta.ogType ?? 'website');
  upsertMeta('property', 'og:url', canonical);
  upsertMeta('property', 'og:site_name', SITE_NAME);
  upsertMeta('property', 'og:locale', 'en_IN');
  upsertMeta('property', 'og:image', ogImage);

  upsertMeta('name', 'twitter:card', 'summary_large_image');
  upsertMeta('name', 'twitter:title', title);
  upsertMeta('name', 'twitter:description', meta.description);
  upsertMeta('name', 'twitter:image', ogImage);

  const baseSchema: JsonLdNode[] = [
    {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: SITE_NAME,
      legalName: LEGAL_NAME,
      url: SITE_URL,
      email: 'hello@sudiptainfotech.com',
      telephone: '+91 90000 12345',
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Kolkata',
        postalCode: '700075',
        addressCountry: 'IN',
      },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: SITE_NAME,
      url: SITE_URL,
      inLanguage: 'en-IN',
    },
    {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      name: title,
      description: meta.description,
      url: canonical,
    },
  ];

  const extraSchema = meta.structuredData
    ? Array.isArray(meta.structuredData)
      ? meta.structuredData
      : [meta.structuredData]
    : [];

  upsertJsonLd([...baseSchema, ...extraSchema]);
}
