import mongoose from "mongoose";
import client from "../../entites/models/Client.schema.js";
import Token from "../../entites/models/token.js";
import { STATUS_CODES } from "../../constants/httpStatusCode.js";
import BankAccount from "../../entites/models/subSchema/bankDetails.js";

export class ClientRepository {

    async findByEmail(email) {
        const user = await client.findOne({ Email: email });
        if (user === null) {
            return { status: false, data: user }
        }
        return { status: true, data: user }
    }
    async findById(id) {
        return await client.findById(id).populate(["JobPost_id", "subscription", "bankDetails"])
    }
    async findByToken(token) {
        const findToken = await Token.findOne({ token });
        if (findToken) {
            return { isExist: true, data: findToken }
        }
        return { isExist: false, data: findToken }
    }
    async UpdateEmailVerifyTrue(id) {
        const setAsVerify = await client.findByIdAndUpdate(id, { $set: { isNumberVerify: true } });
        return setAsVerify
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
            throw new Error("Saving email got an error");
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
                'Profile.Description': formData.description
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
    async updateprofile(data, id) {
        try {
            const result = await client.findByIdAndUpdate(id, {
                "Profile.Description": data.description,
                "Profile.Title": data.title,
                "Last_name": data.last_name,
                "First_name": data.first_name,
            })
            if (result) {
                return {
                    status: STATUS_CODES.BAD_REQUEST,
                    data: "Error occurs when updaing profile data"
                }
            } else {
                return {
                    status: STATUS_CODES.OK,
                    data: result
                }
            }
        } catch (error) {
            return {
                status: STATUS_CODES.INTERNAL_SERVER_ERROR,
                data: "Error"
            }
        }
    }
    async editConatct(data, id) {
        try {
            const result = await client.findByIdAndUpdate(id, {
                $set: data // Use $set to specify the fields to update
            });
            if (result) {
                return {
                    status: STATUS_CODES.OK,
                    data: "updating contact data is success"
                }
            }
            return {
                status: STATUS_CODES.NO_CONTENT,
                data: "Error occurs when updating contact data "
            }
        } catch (error) {
            console.log(error.message)
            return {
                status: STATUS_CODES.INTERNAL_SERVER_ERROR,
                data: "Error"
            }
        }
    }
    async getAllClientData() {
        return await client.find()
    }
    async block(email, block) {
        try {
            let isBlocked
            if (block) {
                isBlocked = await client.findOneAndUpdate(
                    { Email: email },
                    { $set: { isBlock: false } }
                );
            } else {
                isBlocked = await client.findOneAndUpdate(
                    { Email: email },
                    { $set: { isBlock: true } }
                );
            }
            console.log("client ====", isBlocked);
            if (isBlocked) {
                return true;
            } else {
                return false;
            }
        } catch (error) {
            console.error('Error occurred while updating user block status:', error);
            return false;
        }
    }
    async checkIsValidNumber(id, number) {
        const clientData = await client.findById(id);
        console.log(clientData)
        return number === clientData.Number;
    }
    async updateNumberVerified(id) {
        return await client.findByIdAndUpdate(
            id,
            { $set: { isNumberVerify: true } }
        );
    }
    async addBankDetail(id, data) {
        const bankDetails = await BankAccount.create(data);
        const client = await this.findById(id);
        if (client) {
            client.bankDetails = bankDetails._id;
            await client.save();
            return true;
        }
        return false
    }
    async saveSuscription(userId, subscriptionId) {
        return await client.findByIdAndUpdate(
            userId,
            { $set: { subscription: subscriptionId } }
        );
    }
    async updateUserState(id, state) {
        return await client.findByIdAndUpdate(id, {
            $set: { online: state }
        })
    }
    async updateBankDetail(id, data) {
        const getClient = await this.findById(id)
        return await BankAccount.findByIdAndUpdate(getClient.bankDetails._id, {
            data
        });
    }
    async findWalletAmount(id) {
        try {
            const clientWithWallet = await client.findById(id).populate({
                path: "Wallet",
                select: "balance"
            });
            console.log(clientWithWallet)
            return clientWithWallet.Wallet.balance;
        } catch (error) {
            throw error;
        }
    }
    async checkForgetEmail(email) {
        const getEmail = await client.findOne({ Email: email, isVerify: true })
        return getEmail ? true : false
    }
    async updatedNewPassword(email, password) {
        return await client.findOneAndUpdate(
            { Email: email }, 
            { $set: { Password: password } },
            { new: true } 
        );
    }
}

