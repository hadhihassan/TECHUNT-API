import { config as loadConfig } from 'dotenv';

loadConfig({
    path: ".env.local"
})
const config = {
    PORT: parseInt(process.env.PORT) || 3001,
    AWS: {
        ACCESS_KEY_ID: process.env.S3_AWS_ACCESS_KEY_ID,
        SECRET_ACCESS_KEY: process.env.S3_AWS_SECRET_KEY,
        BUCKET_NAME: process.env.AWS_S3_BUCKET_NAME,
        REGION: 'ap-south-1'
    }
}
export default config;