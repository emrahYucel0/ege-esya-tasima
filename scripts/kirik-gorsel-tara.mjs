import { existsSync } from 'node:fs'
import { PrismaMariaDb } from '@prisma/adapter-mariadb'
import { PrismaClient } from '../prisma/generated/client/client.ts'
const p = new PrismaClient({ adapter: new PrismaMariaDb(process.env.DATABASE_URL) })
const varMi = (u) => { if (!u || !u.startsWith('/')) return null; return u.startsWith('/yuklemeler/') ? existsSync(decodeURIComponent(u.slice(1))) : existsSync('public' + u) }
const kirik = []
const bak = (tablo, slug, alan, deger) => { const s = varMi(deger); if (s === false) kirik.push(`${tablo}.${alan}  ${slug}  → ${deger}`) }
for (const r of await p.region.findMany({ select: { slug:true, image:true, priceFactorsImage:true } })) { bak('Region', r.slug, 'image', r.image); bak('Region', r.slug, 'priceFactorsImage', r.priceFactorsImage) }
for (const r of await p.post.findMany({ select: { slug:true, image:true } })) bak('Post', r.slug, 'image', r.image)
for (const r of await p.service.findMany({ select: { title:true, imagePath:true } })) bak('Service', r.title, 'imagePath', r.imagePath)
for (const r of await p.heroPage.findMany({ select: { id:true, image:true, backgroundImage:true } })) { bak('HeroPage', r.id, 'image', r.image); bak('HeroPage', r.id, 'backgroundImage', r.backgroundImage) }
for (const r of await p.siteSettings.findMany({ select: { id:true, logo:true, favicon:true, ogImage:true } })) { bak('SiteSettings', r.id, 'logo', r.logo); bak('SiteSettings', r.id, 'favicon', r.favicon); bak('SiteSettings', r.id, 'ogImage', r.ogImage) }
console.log(kirik.length === 0 ? 'Kırık görsel yolu: YOK' : `Kırık görsel yolu: ${kirik.length}\n` + kirik.join('\n'))
await p.$disconnect()
