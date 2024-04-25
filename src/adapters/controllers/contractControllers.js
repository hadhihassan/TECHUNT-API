import mongoose from "mongoose";
import { ContractUseCase } from "../../useCases/contract.UseCase.js";
import { MilestoneUseCase } from "../../useCases/milestone.UseCase.js";
import { TransactionUseCase } from "../../useCases/transactionUseCase.js";
import Reason from "../../entites/models/subSchema/reason.Schema.js";
import { ContractRepository } from "../../infrastructure/repository/contractDatabase.js";
import { ReasonResitory } from "../../infrastructure/repository/reasonDatabase.js";

export class ContractController {
    constructor() {
        this.contractUseCase = new ContractUseCase()
        this.contractRepository = new ContractRepository()
        this.milestoneUseCase = new MilestoneUseCase()
        this.transactionUseCase = new TransactionUseCase()
        this.reasonResitory = new ReasonResitory()
    }
    async saveNewContract(req, res) {
        const { contract, milestone, isMilestone } = req.body;
        let milestoneId;
        if (isMilestone) {
            const saveMilesStones = await this.milestoneUseCase.storeMileStone(milestone);
            if (saveMilesStones.success) {
                milestoneId = saveMilesStones.milestoneId;
            } else {
                return res.status(500).json({ message: "Failed to save milestones" });
            }
        }
        const saveContract = await this.contractUseCase.storeContract(contract, milestoneId, isMilestone);
        return res.status(saveContract.status).json(saveContract);
    }
    async fetchAllNewContracts(req, res) {
        const { clientId: id, role } = req
        const result = await this.contractUseCase.getAllNewContract(id, role)
        return res.status(result.status).json(result)
    }
    async fetchAllActiveContracts(req, res) {
        const { clientId: id, role } = req
        const result = await this.contractUseCase.findAllActiveContract(id, role)
        return res.status(result.status).json(result)
    }
    async updateContractStatus(req, res) {
        const { id, status, actualStatus } = req.body;
        const result = await this.contractUseCase.updateContractStatus(id, status, actualStatus)
        return res.status(result.status).json(result)
    }
    async cancelContract(req, res) {
        const { id } = req.params;
        const result = await this.contractUseCase.cancelContract(id)
        return res.status(result.status).json(result)
    }
    async updateMilestoneStatus(req, res) {
        const { id, status } = req.body
        const result = await this.milestoneUseCase.updateMilestoneStatus(id, status)
        return res.status(result.status).json(result)
    }
    async sendMilestoneApproval(req, res) {
        const { id, approval } = req.body
        const result = await this.milestoneUseCase.sendMilestoneApproval(id, approval)
        return res.status(result.status).json(result)
    }
    async saveWork(req, res) {
        const { id, data } = req.body
        console.log(req.body, " this is the data")
        const result = await this.milestoneUseCase.saveWork(id, data)
        return res.status(result.status).json(result)
    }
    async saveEditWork(req, res) {
        const { id, data, workId } = req.body
        const result = await this.milestoneUseCase.saveEditWork(id, data, workId)
        return res.status(result.status).json(result)
    }
    async getWork(req, res) {
        const { id } = req.params
        const result = await this.milestoneUseCase.getSubmittedWork(id)
        return res.status(result.status).json(result)
    }
    async makePaymentToTalent(req, res) {
        const { talentId, amount } = req.body
        const result = await this.contractUseCase.makePayment(talentId, amount)
        const addTransactionHistory = await this.transactionUseCase.saveNewTransaction(amount, talentId, req.clientId, "Contract Payment")
        return res.status(200).json(result)
    }
    async updateTalentWalletAmount(req, res) {
        const { talentId, amount, milestoneId } = req.body;
        const result = await this.contractUseCase.payTalentAmount(talentId, amount, milestoneId)
        if (result) await this.transactionUseCase.saveNewTransaction(amount, talentId, req.clientId, "Contract");
        return res.status(result.status).json(result)
    }
    async updateStatus(req, res) {
        const { contractId, status } = req.body;
        const result = await this.contractUseCase.updateStatus(contractId, status)
        return res.status(result.status).json(result)
    }
    async getCompletedContract(req, res) {
        const result = await this.contractUseCase.fetchCompletedContracts(req.clientId, req.role)
        return res.status(result.status).json(result)
    }
    async getCancelledContract(req, res) {
        const result = await this.contractUseCase.getCancelledContract(req.clientId, req.role)
        return res.status(result.status).json(result)
    }
    async getContract(req, res) {
        const { id } = req.params;
        const objectId = new mongoose.Types.ObjectId(id);
        const result = await this.contractUseCase.getContract(objectId);
        return res.status(result.status).json(result);
    }
    async reSheduleWork(req, res) {
        try {
            const { reasonData, workId, isMilestone, milestoneId } = req.body;
            console.log(req.body)
            const reason = await this.reasonResitory.saveReason(reasonData)
            const result = await this.contractRepository.reShedule(reasonData, milestoneId, reason._id)
            console.log(result)
            return res.status(200).json(result);
        } catch (err) {
            console.log(err)
        }
    }
    async updateReasonUpdate(req, res) {
        const { id, status } = req.body;
        const data = await Reason.findByIdAndUpdate(id, {
            $set: {
                accept: status
            }
        })
        return res.status(200).json(data)
    }
    async updateMilestone(req, res) {
        const { id, data } = req.body;
        const result = await this.milestoneUseCase.updateMilestone(id, data)
        return res.status(result.status).json(result);
    }
}