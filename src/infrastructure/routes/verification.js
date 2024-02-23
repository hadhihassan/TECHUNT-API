// Import necessary modules
import { Router } from 'express';
import 'dotenv/config';
import { Vcontoller } from '../../providers/controller.js';
import { createPreSignedPost } from '../../utils/S3.js';

// Create an instance of Router
const verification = Router();


verification.post('/login/', (req, res) => Vcontoller.TalentLogin(req, res))
// Export the verification router
verification.post("/checkValidNumber/", (req, res) => Vcontoller.checkNumberisValid(req, res))
verification.patch("/update-number-verified/", (req, res) => Vcontoller.setNumberVerified(req, res))
verification.post("/signed_url", async (req, res) => {
    try {
        
        const { key, content_type } = req.body;
        console.log(key, content_type)
        const { signedUrl, fileLink } = await createPreSignedPost({
            key: ("public/" + key),
            content_type: content_type
        })
        console.log( signedUrl, fileLink)
        return res.send({
            data: {
                signedUrl,
                fileLink
            }
        })
    } catch (error) {
        console.log(error.message)
        return res.status(500).send({
            error: error.message
        })
    }
})
export default verification;
