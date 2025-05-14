import { defineSitemapEventHandler } from '#imports';

export default defineSitemapEventHandler(async () => {
  try {
    // Fetch posts
    const postsResponse = await $fetch('/api/posts');
    const posts = postsResponse.success
      ? postsResponse.data.map(p => ({ url: `/${p.slug}`, lastmod: p.createdAt }))
      : [];

    // Fetch regions
    const regionsResponse = await $fetch('/api/regions');
    const regions = regionsResponse.success
      ? regionsResponse.data.map(r => ({ url: `/${r.slug}`, lastmod: r.createdAt }))
      : [];

    // Combine and return all URLs
    return [...posts, ...regions];
  } catch (error) {
    console.error('Error fetching sitemap data:', error);
    return []; // Fallback to empty array on error
  }
});