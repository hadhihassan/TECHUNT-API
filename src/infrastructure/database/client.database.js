import mongoose from "mongoose";
import client from "../../entites/models/Client.model.js";
import Token from "../../entites/models/token.js";


export class ClientRepository {
    async findByEmail(email) {
        console.log("*****this is Clint ******")
        const user = await client.findOne({ Email: email });
        console.log("*****DATA=>\N", user)
        if (user === null) {
            return { status: false, data: user }
        }
        return { status: true, data: user }
    }

    async findById(id) {
        return await client.findById(id)
    }
    async findByToken(token) {
        const findToken = await Token.findOne({ token });
        if (findToken) {
            return { isExist: true, data: findToken }
        }
        return { isExist: false, data: findToken }
    }

    async addClientSingupData(email, password) {
        try {
            const emailClient = new client({
                Email: email,
                Password: password
            });
            await emailClient.save();
            return emailClient;
        } catch (error) {
            console.log(error);
            throw new Error("Saving email got an error");  // Corrected error handling
        }
    }

    async addConatctDeatils(formData, id) {
        try {
            const objectId = new mongoose.Types.ObjectId(id);
            return await client.findByIdAndUpdate(objectId, {
                Last_name: formData.lName,
                First_name: formData.fName,
                Address: formData.address,
                PinCode: formData.pinCode,
                City: formData.city,
                Number: formData.number,
                Country: formData.country,
                'Profile.Description':formData.description
            },
                { new: true }
            )
        } catch (error) {
            console.log(error.message);
            // throw new error.message
        }
    }
    async saveProfilePic(fileName, id) {
        try {
            const objectId = new mongoose.Types.ObjectId(id);
            return await client.findByIdAndUpdate(objectId, {
                "Profile.profile_Dp": fileName,
            });
        } catch (error) {
            console.error(error.message);
            throw new Error('Failed to save profile picture');
        }
    }

}

