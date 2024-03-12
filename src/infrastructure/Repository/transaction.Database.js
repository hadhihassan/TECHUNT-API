import Transaction from "../../entites/models/transations.Schema.js";

export class TransactionRepository {

    async saveTransaction(amount, to, from, forWhat) {
        return await Transaction.create({ amount, to, from, forWhat })
    }
    async findById(id) {
        return await Transaction.findById(id)
    }
    async getFromTransaction(id) {
        return await Transaction.find({ from: id })
    }
    async getToTransaction(id) {
        return await Transaction.find({ to: id })
    }
}
