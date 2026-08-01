const rootSiteUrl =
  process.env.NODE_ENV === 'development' ? 'http://localhost:5173' : 'https://rczajka.me';

export const externalLinks = {
  rootSite: {
    url: rootSiteUrl,
    label: 'rczajka.me'
  }
} as const;
