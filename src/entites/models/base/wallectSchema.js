import mongoose from 'mongoose'
const { Schema } = mongoose

const walletSchema =new  Schema({
    balance: {
        type: Number,
        default: 0
    },
    history: [{
        date: {
            type: Date,
            default: Date.now
        },
        type:{
            type:String,
        },
        amount:{
            type:Number,
        }
    }]
})

const Wallet = mongoose.model("Wallet", walletSchema)
export default Wallet;