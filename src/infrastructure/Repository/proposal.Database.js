import proposal from '../../entites/models/subSchema/proposal.js'


export class ProposalRepository {
    async insertProposal(data){
        const newProposal = new proposal(data)
        return await newProposal.save()
    } 
}