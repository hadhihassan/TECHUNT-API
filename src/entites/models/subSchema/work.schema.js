import mongoose from "mongoose";
const { Schema } = mongoose;

const workSchema = new Schema({
    description : {
        type:String,
        required : true
    },
    url:{
        type:String,
        required : true
    }
}, { timestamps: true });

const Work = mongoose.model('work', workSchema);

export default Work;
