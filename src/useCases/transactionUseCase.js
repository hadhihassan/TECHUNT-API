import { TransactionRepository } from "../infrastructure/repository/transactionDatabase.js";


export class TransactionUseCase {
    constructor(){
        this.transactionUseCase = new TransactionRepository()
    }
    async saveNewTransaction(amount, to ,from ,forWhat){
        try{
            const result = await this.transactionUseCase.saveTransaction(amount, to ,from ,forWhat)
            if(result){
                return true
            }
            return false
        }catch(err){
            console.log(err)
        }
    }
}
