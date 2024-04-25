import Contract from "../../entites/models/contract.schema.js";
import Milestone from "../../entites/models/subSchema/milestone.schema.js";

export class ContractRepository {

    async createContract(contractData, milestoneId, isMilestone) {
        if (isMilestone) {
            contractData.milestones = milestoneId;
            return await Contract.create(contractData)
        }
        return await Contract.create(contractData)
    }
    async findAllNewContracts(id, role) {
        return await Contract.find({ talent: id, status: 'pending' }).populate(["client", "talent", "work"])
    }
    async findAllActiveContracts(id, role) {
        const query = {};
        query[role.toLowerCase()] = id;
        query['status'] = 'active';
        console.log(query)
        return await Contract.find(query).populate(["client", "talent", "work", "milestones"]);
    }
    async findAllCompletedContracts(id, role) {
        return await Contract.find({ talent: id, status: 'completed' }).populate(["client", "talent", "work", "milestones"])
    }
    async findAllCanceledContracts(id, role) {
        return await Contract.find({ talent: id, status: 'cancelled' }).populate(["client", "talent", "work"])
    }
    async updateContractStatus(id, status, actualStatus) {
        return await Contract.findByIdAndUpdate(id, { $set: { isAccepted: status }, status: actualStatus })
    }

    async updateContract(contractId, status) {
        return await Contract.findByIdAndUpdate(contractId, {
            $set: { status: status }
        });
    }
    async findCompletedContracts(id, role) {
        const query = {};
        query[role.toLowerCase()] = id;
        query['status'] = 'completed';
        return await Contract.find(query).populate(["client", "talent", "work", "milestones"]);
    }
    async getCancelledContract(id, role) {
        console.log("cancelled find here")
        const query = {};
        query[role.toLowerCase()] = id;
        query['status'] = 'cancelled';
        return await Contract.find(query).populate(["client", "talent", "work", "milestones"]);
    }
    async findContracts(id) {
        return await Contract.findById(id).populate({
            path: "milestones",
            populate: { path: "resheduleReason" }
        }).populate(["client", "talent", "work"]);
    }
    async reShedule(data, milestoneId, reasonId) {
        try {
            return await Milestone.findByIdAndUpdate(
                milestoneId,
                { $set: { dueDate: data.nextDeadline, isResheduleMilestone: true, resheduleReason: reasonId } },
                { new: true }
            )
        } catch (err) {
            console.log(err.message)
        }
    }
    async saveReview(workId, reviewId, role) {
        try {
            const fieldName = role === 'TALENT' ? 'TALENTreview' : 'CLIENTreview';
            return await Contract.findByIdAndUpdate(
                workId,
                { $set: { [fieldName]: reviewId } }
            );
        } catch (err) {
            console.log(err.message)
        }
    }
}
