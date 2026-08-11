/**
 * PASSENGER GİRİŞ DOSYASI — YEDEK ÇÖZÜM
 *
 * cPanel "Setup Node.js App" ekranında "Application startup file" alanına
 * doğrudan `.output/server/index.mjs` yazabiliyorsanız BU DOSYAYA GEREK YOK;
 * onu kullanın, bu dosyayı hiç yüklemeyin.
 *
 * Bazı cPanel sürümleri startup file alanında alt klasör yolu kabul etmiyor
 * ya da yalnızca `.js` uzantısı bekliyor. O durumda bu dosyayı uygulama
 * kökine koyup startup file olarak `app.mjs` verin.
 *
 * Uzantı neden `.mjs`: Nuxt çıktısı ESM. Uygulama kökünde `"type": "module"`
 * içeren bir package.json olmayabileceği için `.js` uzantılı bir dosya
 * CommonJS sayılır ve `import` satırı sözdizimi hatası verir. `.mjs` her
 * koşulda ESM olarak çalışır.
 */
import './.output/server/index.mjs'
