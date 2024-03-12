import mongoose from 'mongoose'
const { Schema } = mongoose;

const transactionSchema = new Schema({
    amount:{
        type:Number,
        required : true
    },
    from :{
        type:Schema.Types.ObjectId,
        required : true
    },
    to :{
        type:String,
        required : true
    },
    forWhat :{
        type:String,
        required : true
    }
}, { timestamps: true })

const Transaction = mongoose.model("transaction", transactionSchema)
export default Transaction