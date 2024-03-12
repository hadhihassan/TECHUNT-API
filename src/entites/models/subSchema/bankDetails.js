import  mongoose  from 'mongoose'
const { Schema } = mongoose;

const BankAccountSchema = new Schema({
    bank_name: {
        type: String,
        required: true
    },
    account_holder_name: {
        type: String,
        required: true
    },
    account_number: {
        type: String,
        required: true
    },
    ifsc_code: {
        type: String,
        required: true
    },
    account_type: {
        type: String
    },
});

const BankAccount = mongoose.model('BankAccount', BankAccountSchema);
export default  BankAccount;
