import proposal from '../../entites/models/subSchema/proposal.schema.js'
import mongoose from 'mongoose'
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
    async updatePaymentStatus(status, id) {
        console.log(status, id)
        if (id) {
            const _id = new mongoose.Types.ObjectId(id);
            if (result && result.status) {
                return res.status(result.status).json({ message: 'Result status: ' + result.status });
            } else {
                return res.status(500).json({ error: 'Result is undefined or does not have status property' });
            }
        } else {
            return res.status(400).json({ error: 'ID is required' });
        }
    }
    async getAllConnectedTalents(id) {
        return await proposal.find({ isAccept: true, Client_id : id }).populate(["jobId", "talentId"]).exec()
    }
}