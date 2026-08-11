import { defineSitemapEventHandler } from '#imports';

// posts ve regions fetch'leri birbirinden bağımsız try/catch'lere sahip:
// önceden tek bir try/catch ikisini de sarıyordu, yani regions çekimi
// başarısız olduğunda (geçici bir hata bile olsa) başarıyla çekilmiş
// posts verisi de sessizce sitemap'ten düşüyordu. Artık bir kaynağın
// hatası diğerini etkilemiyor.
async function fetchPostUrls() {
  try {
    const postsResponse = await $fetch('/api/posts');
    return postsResponse.success
      ? postsResponse.data.map((p: any) => ({ url: `/${p.slug}`, lastmod: p.createdAt }))
      : [];
  } catch (error) {
    console.error('Sitemap: posts verisi çekilirken hata oluştu:', error);
    return [];
  }
}

async function fetchRegionUrls() {
  try {
    const regionsResponse = await $fetch('/api/regions');
    return regionsResponse.success
      ? regionsResponse.data.map((r: any) => ({ url: `/${r.slug}`, lastmod: r.createdAt }))
      : [];
  } catch (error) {
    console.error('Sitemap: regions verisi çekilirken hata oluştu:', error);
    return [];
  }
}

// Hizmetler tek bir bölüm kaydında toplu geliyor. Yalnızca `slug` verilmiş
// olanların kendi sayfası var; slug'sız hizmetler yalnızca kart olarak
// görünüyor ve sitemap'e girmemeli (var olmayan adres bildirmek Search
// Console'da hataya yol açar).
async function fetchServiceUrls() {
  try {
    const response = await $fetch('/api/services');
    const services = response?.data?.services || [];
    return services
      .filter((s: any) => s.slug)
      .map((s: any) => ({ url: `/${s.slug}` }));
  } catch (error) {
    console.error('Sitemap: hizmet verisi çekilirken hata oluştu:', error);
    return [];
  }
}

export default defineSitemapEventHandler(async () => {
  const [posts, regions, services] = await Promise.all([
    fetchPostUrls(),
    fetchRegionUrls(),
    fetchServiceUrls(),
  ]);
  return [...posts, ...regions, ...services];
});