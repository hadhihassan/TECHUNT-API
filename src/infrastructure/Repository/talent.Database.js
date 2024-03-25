import mongoose from "mongoose";
import talent from "../../entites/models/talen.model.js";
import Token from "../../entites/models/token.js";
import { STATUS_CODES } from "../../constants/httpStatusCode.js";
import BankAccount from "../../entites/models/subSchema/bankDetails.js";
import Wallet from "../../entites/models/base/wallectSchema.js";

export class TalentRepository {
    async findByEmail(email) {
        const user = await talent.findOne({ Email: email });
        if (user === null) {
            return { status: false, data: user }
        }
        return { status: true, data: user }
    }
    async findById(id) {
        return await talent.findById(id).populate(["subscription", "bankDetails", "Wallet"])
    }
    async findByToken(token) {
        const findToken = await Token.findOne({ token });
        if (findToken) {
            return { isExist: true, data: findToken }
        }
        return { isExist: false, data: findToken }
    }
    async UpdateEmailVerifyTrue(id) {
        const setAsVerify = await talent.findByIdAndUpdate(id, { $set: { isVerify: true } });
        return setAsVerify
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
            throw new Error("Saving email got an error");
        }
    }
    async addConatctDeatils(formData, id) {
        try {
            const wallet = await this.Wallet.create()
            const objectId = new mongoose.Types.ObjectId(id);
            return await talent.findByIdAndUpdate(objectId, {
                Last_name: formData.lName,
                First_name: formData.fName,
                Address: formData.address,
                PinCode: formData.pinCode,
                City: formData.city,
                Number: formData.number,
                Country: formData.country,
                'Profile.Description': formData.description,
                Wallet: wallet._id
            },
                { new: true }
            )
        } catch (error) {
            console.error(error.message);
            return {
                status: STATUS_CODES.INTERNAL_SERVER_ERROR,
                data: "Error"
            }
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
            return {
                status: STATUS_CODES.INTERNAL_SERVER_ERROR,
                data: "Error"
            }
        }
    }
    async addJobData(data, id) {
        try {
            const objectId = new mongoose.Types.ObjectId(id);
            return await talent.findByIdAndUpdate(objectId, {
                "Profile.Title": data.title,
                "Profile.Skills": data.skills,
                "Profile.Work_Experiance": data.experience
            })
        } catch (error) {
            consoel.lo(error.message)
            return {
                status: STATUS_CODES.INTERNAL_SERVER_ERROR,
                data: "Error"
            }
        }
    }
    async updateprofile(data, id) {
        try {
            const result = await talent.findByIdAndUpdate(id, {
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
            console.log(error.message);
            return {
                status: STATUS_CODES.INTERNAL_SERVER_ERROR,
                data: "Error"
            }
        }
    }
    async updateSkills(data, id) {
        try {
            const result = await talent.findByIdAndUpdate(id, {
                "Profile.Skills": data
            })
            if (result) {
                return {
                    status: STATUS_CODES.OK,
                    data: "updating profile data success "
                }
            }
            return {
                status: STATUS_CODES.NO_CONTENT,
                data: "Error occurs when updating profile data "
            }
        } catch (error) {
            console.log(error.message)
            return {
                status: STATUS_CODES.INTERNAL_SERVER_ERROR,
                data: "Error"
            }
        }
    }
    async updateExperiance(data, id) {
        try {
            const result = await talent.findByIdAndUpdate(id, {
                "Profile.Work_Experiance": data
            });
            if (result) {
                return {
                    status: STATUS_CODES.OK,
                    data: "updating profile data is success"
                }
            }
            return {
                status: STATUS_CODES.NO_CONTENT,
                data: "Error occurs when updating profile data "
            }
        } catch (error) {
            console.log(error.message)
            return {
                status: STATUS_CODES.INTERNAL_SERVER_ERROR,
                data: "Error"
            }
        }
    }
    async editConatct(data, id) {
        try {
            const result = await talent.findByIdAndUpdate(id, {
                $set: data
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
    async getAllTalentData() {
        return await talent.find()
    }
    async block(email, block) {
        try {
            let isBlocked
            if (block) {
                isBlocked = await talent.findOneAndUpdate(
                    { Email: email },
                    { $set: { isBlock: false } }
                );
            } else {
                isBlocked = await talent.findOneAndUpdate(
                    { Email: email },
                    { $set: { isBlock: true } }
                );
            }
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
        const talentData = await talent.findById(id)
        console.log(talentData)
        return number === talentData.Number
    }
    async updateNumberVerified(id) {
        return await talent.findByIdAndUpdate(
            id,
            { $set: { isNumberVerify: true } }
        );
    }
    async addBankDetail(id, data) {
        const bankDetails = await BankAccount.create(data);
        const talent = await this.findById(id);
        if (talent) {
            talent.bankDetails = bankDetails._id;
            await talent.save();
            return true;
        }
        return false
    }
    async createWallet(history) {
        try {
            return await Wallet.create(history);
        } catch (error) {
            console.error('Error creating wallet:', error);
            throw error;
        }
    }
    async getWallet(id) {
        return await Wallet.findById(id)
    }
    async addAmountIntoWallet(talentId, amount, milestoneId) {
        try {
            let talentData = await this.findById(talentId);
            let history = {
                type: "Milestone",
                amount: amount
            };
            let talentWallet = await this.getWallet(talentData.Wallet);
            if (!talentWallet) {
                let newWallet = await this.createWallet({ history: [history], balance: amount });
                talentData.Wallet = newWallet._id;
            } else {
                talentWallet.balance += amount;
                talentWallet.history.push(history);
            }
            return await Promise.all([talentData.save(), talentWallet.save()]);
        } catch (err) {
            console.error(err.message);
        }
    }
    async saveSuscription(userId, subscriptionId) {
        return await talent.findByIdAndUpdate(
            userId,
            { $set: { subscription: subscriptionId } }
        );
    }
    async updateUserState(id, state) {
        return await talent.findByIdAndUpdate(id, {
            $set: { online: state }
        })
    }
    async saveResume(id, s3Link) {
        return await talent.findByIdAndUpdate(id, {
            $set: { resume: s3Link }
        }, { new: true })
    }
    async findWalletAmount(id) {
        try {
            const talentWithWallet = await talent.findById(id).populate({
                path: "Wallet",
                select: "balance"
            });
            return talentWithWallet.Wallet.balance;
        } catch (error) {
            throw error;
        }
    }
    async updateBankDetail(id, data) {
        try {
            const updatedBankAccount = await BankAccount.findByIdAndUpdate(data._id, {
                $set: data
            }, { new: true });
            return updatedBankAccount;
        } catch (error) {
            console.error('Error updating bank detail:', error);
            throw error;
        }
    }
    async checkForgetEmail(email) {
        const getEmail = await talent.findOne({ Email: email, isVerify: true })
        return getEmail ? true : false
    }
}
