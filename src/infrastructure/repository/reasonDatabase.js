import Reason from '../../entites/models/subSchema/reason.Schema.js'

export class ReasonResitory {
    async saveReason(data){
        return await Reason.create(data)
    }
}