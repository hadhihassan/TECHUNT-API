import proposal from '../../entites/models/subSchema/proposal.schema.js'
import mongoose from 'mongoose'
export class ProposalRepository {
    async insertProposal(data) {
        const newProposal = new proposal(data)
        return await newProposal.save()
    }
    async findManyProposals(id) {
        try {
            return await proposal.find({ Client_id: id }).populate([
                { path: "jobId" },
                { path: "talentId", populate: { path: "educations" } }
            ]).exec();
        } catch (err) {
            console.log(err)
        }
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
        const idString = id.path.replace(/"/g, '');
        const _id = new mongoose.Types.ObjectId(idString);
        return await proposal.findByIdAndUpdate(_id, {
            paymentStatus: status
        });
    }
    async getAllConnectedTalents(id) {
        return await proposal.find({ isAccept: true, Client_id: id }).populate([
            { path: "jobId" },
            { path: "talentId", populate: { path: "educations" } }
        ]).exec()
    }
}