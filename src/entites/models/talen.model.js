import mongoose from "mongoose"


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
    lastSeen: { type: Date }

}, {
    timestamps: true
});

const Talent = mongoose.model('Talent', TalentSchema);

export default Talent;;