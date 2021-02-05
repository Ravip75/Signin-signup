import dotenv from 'dotenv';
dotenv.config();
export default{
    PORT: process.env.PORT || 4000,
    MONGODB_URL: process.env.MONGODB_URL || 'mongodb://localhost/signin',
    JWT_SECRET: process.env.JWT_SECRET || 'somethingsecret',
};