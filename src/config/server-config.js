const dotenv = require('dotenv');

dotenv.config();

module.exports = {
    PORT: process.env.PORT,
    SALT_ROUND: process.env.SALT_ROUND,
    JWT_EXPIRE: process.env.JWT_EXPIRE,
    JWT_SECRET: process.env.JWT_SECRET
}