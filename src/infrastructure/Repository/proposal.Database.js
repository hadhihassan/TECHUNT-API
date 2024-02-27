import proposal from '../../entites/models/subSchema/proposal.js'

export class ProposalRepository {
    async insertProposal(data) {
        const newProposal = new proposal(data)
        return await newProposal.save()
    }
    async findManyProposals(id) {
        return await proposal.find({ Client_id: id }).populate(["jobId", "talentId"]).exec();
    }
    async upadteAccept(id) {
        return await proposal.findByIdAndUpdate(id, {
            isAccept: true
        }, { new: true })
    }
    async upadteDecline(id) {
        return await proposal.findByIdAndUpdate(id, {
            isAccept: false
        }, { new: true })
    }
}