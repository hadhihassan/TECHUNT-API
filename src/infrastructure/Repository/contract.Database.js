import Contract from "../../entites/models/contract.schema.js";

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
        console.log(query)
        return await Contract.find(query).populate(["client", "talent", "work", "milestones"]);
    }
    async getCancelledContract(id, role) {
        console.log("cancelled find here")
        const query = {};
        query[role.toLowerCase()] = id;
        query['status'] = 'cancelled';
        console.log(query)
        return await Contract.find(query).populate(["client", "talent", "work", "milestones"]);
    }
}
