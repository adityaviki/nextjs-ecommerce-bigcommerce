const config = {
  bigCommerceAccessToken: process.env.BIGCOMMERCE_ACCESS_TOKEN || "",
  bigCommerceClientId: process.env.BIGCOMMERCE_CLIENT_ID || "",
  bigCommerceClientSecret: process.env.BIGCOMMERCE_CLIENT_SECRET || "",
  bigCommerceApiPrefix: process.env.BIGCOMMERCE_API_PREFIX || "",
  jwtSecret: process.env.JWT_SECRET || "",
};

export default config;
