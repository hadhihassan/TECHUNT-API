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
    lastSeen: { type: Date },
    isBlock: { type: Boolean, default: false },
    online: { type: Boolean ,default : false},
    isVerify: { type: Boolean ,default : false},    
    isNumberVerify: { type: Boolean ,default : false}


}, {
    timestamps: true
});

const Talent = mongoose.model('Talent', TalentSchema);

export default Talent;