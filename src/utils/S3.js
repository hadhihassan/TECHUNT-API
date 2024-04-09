import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'
import config from '../infrastructure/config/s3Config.js'
import { S3_BUCKET_SIGNED_URL_EXP } from '../constants/constant.js'

const s3Client = new S3Client({
    region: config.AWS.REGION,
    credentials: {
        accessKeyId: config.AWS.ACCESS_KEY_ID,
        secretAccessKey: config.AWS.SECRET_ACCESS_KEY
    }
})

const BUCKET_NAME = config.AWS.BUCKET_NAME;

export async function createPreSignedPost({ key, contentType }) {
    const command = new PutObjectCommand({
        Bucket: BUCKET_NAME,
        Key: key,
        ContentType: contentType
    })
    const fileLink = `https://${BUCKET_NAME}.s3.${config.AWS.REGION}.amazonaws.com/${key}`
    const signedUrl = await getSignedUrl(s3Client, command, {
        expiresIn: S3_BUCKET_SIGNED_URL_EXP
    });
    return { signedUrl, fileLink }
}