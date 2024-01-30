const mongoose = require('mongoose');

const { Schema, ObjectId } = mongoose;

const TalentSchema = new Schema({
    Name: { type: String },
    Password: { type: String },
    Email: { type: String },
    Number: { type: Number },
    isVerified: { type: Boolean, default: false },
    // Profile: {
    //     CompletedContract: { type: Number },
    //     Description: { type: String, required: true },
    //     Experience: [{ type: String, }],
    //     HaveExperience: { type: Boolean },
    //     Job_titel: { type: String, required: true },
    //     Name: { type: String, required: true },
    //     Pendin_contract: { type: Number },
    //     PendingContract: { type: Number },
    //     Skills: [{ type: String, }],
    //     Total_contract: { type: Number },
    // },
    // Address_id: { type: Schema.Types.ObjectId },
    // Saved_job: [{ type: Schema.Types.ObjectId, }],
});

const Talent = mongoose.model('Talent', TalentSchema);

module.exports = Talent;;