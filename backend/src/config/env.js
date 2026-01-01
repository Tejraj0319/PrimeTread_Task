export const env = {
  PORT: process.env.PORT || 5000,
  MONGO_URI: process.env.MONGO_URI,
  JWT_SECRET: process.env.JWT_SECRET || "ewrewhreytyjbthevhww123x2c3r",
  JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN || "1d",
};
