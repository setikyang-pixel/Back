import "dotenv/config";

export const env = {
  port: process.env.PORT,
  mongoUrl: process.env.MONGOOSE_URL,
  jwtSecret: process.env.JWT_SECRET,
  jwtExpiresInAccess: process.env.JWT_EXPIRESIN_ACCESS,
  jwtExpiresInRefresh: process.env.JWT_EXPIRESIN_REFRESH,
};
