/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    API_URL: 'http://localhost:8000',
    MAPBOX_ACCESS_TOKEN:
      'pk.eyJ1IjoicG9vbm5ha2FybiIsImEiOiJjbDJvZm11bDgxMTlsM2lydWxxenloaHJmIn0.__OVxGxLMvPUn1kDdB5UEQ',
  },
}

module.exports = nextConfig
