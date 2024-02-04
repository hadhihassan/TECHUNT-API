import mongoose from "mongoose";
import talent from "../../entites/models/talen.model.js";
import Token from "../../entites/models/token.js";


export class TalentRepository {
    async findByEmail(email) {
        console.log("*****this is Talent ******")
        const user = await talent.findOne({ Email: email });
        if (user === null) {
            return { status: false, data: user }
        }
        return { status: true, data: user }
    }
    async findById(id){
        return await talent.findById(id)
    }

    async findByToken(token) {
        const findToken = await Token.findOne({ token });
        if (findToken) {
            return { isExist: true, data: findToken }
        }
        return { isExist: false, data: findToken }
    }

    async addTalentSingupData(email, password) {
        try {
            const data = new talent({
                Email: email,
                Password: password
            });
            await data.save();
            return data;
        } catch (error) {
            throw new Error("Saving email got an error");  // Corrected error handling
            console.log(error);
        }
    }
    async addConatctDeatils(formData, id) {
        try {
            const objectId = new mongoose.Types.ObjectId(id);
            return await talent.findByIdAndUpdate(objectId, {
                Last_name: formData.lName,
                First_name: formData.fName,
                Address: formData.address,
                PinCode: formData.PinCode,
                City: formData.city,
                number: formData.Number,
                Country: formData.country,
            },
                { new: true }
            )
        } catch (error) {

            console.error(error.message);
            throw new Error('Failed to save add contact deatils');
        }
    }
    async saveProfilePic(fileName, id) {
        try {
            const objectId = new mongoose.Types.ObjectId(id);
            return await talent.findByIdAndUpdate(objectId, {
                "Profile.profile_Dp": fileName,

            })
        } catch (error) {
            console.error(error.message);
            throw new Error('Failed to save profile picture');
        }
    }
}

