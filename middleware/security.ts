export default defineEventHandler((event) => {
    setHeader(event, "X-Frame-Options", "DENY");
    setHeader(event, "X-Content-Type-Options", "nosniff");
    // setHeader(event, "Strict-Transport-Security", "max-age=31536000; includeSubDomains");
  });