import mongoose from "mongoose"
import { ResumeSchema } from "./base/resume.Schema.js";

const { Schema, ObjectId } = mongoose;

const TalentSchema = new Schema({
    Last_name: { type: String, },
    First_name: { type: String, },
    Password: { type: String, },
    Email: { type: String, },
    Number: { type: String, },
    Profile: {
        profile_Dp: { type: String },
        Description: { type: String },
        Title: { type: String },
        Skills: { type: [String] },
        Work_Experiance: { type: [String] },
    },
    Address: { type: String, },
    PinCode: { type: String, },
    City: { type: String, },
    Country: { type: String, },
    lastSeen: { type: Date },
    isBlock: { type: Boolean, default: false },
    online: { type: Boolean, default: false },
    isVerify: { type: Boolean, default: false },
    isNumberVerify: { type: Boolean, default: false },
    bankDetails: { type: Schema.Types.ObjectId, ref: "BankAccount" },
    Wallet: { type: Schema.Types.ObjectId, ref: "Wallet" },
    subscription: { type: Schema.Types.ObjectId, ref: "Subscription" },
    educations: { type: [Schema.Types.ObjectId], ref: "Education" }
}, {
    timestamps: true
});

TalentSchema.add(ResumeSchema);

const Talent = mongoose.model('Talent', TalentSchema);
export default Talent;