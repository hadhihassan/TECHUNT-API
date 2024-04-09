import { PROPOSAL_CHARGE, PROPOSAL_CHARGE_TRANSACTION_TO } from "../../constants/constant.js";
import { ProposalUseCase } from "../../useCases/proposal.UseCase.js";
import { TransactionUseCase } from '../../useCases/transactionUseCase.js'

export class ProposalController {
    constructor() {
        this.proposalUseCase = new ProposalUseCase()
        this.transactionUseCase = new TransactionUseCase()
    }
    async saveProposal(req, res) {
        const id = req.clientId
        const result = await this.proposalUseCase.saveProposal(req.body, id);
        return res.status(result.status).json(result)
    }
    async getSignedUrlForS3Store(req, res) {
        const { key, content_type } = req.body;
        const result = await this.proposalUseCase.getSignedUrl(key, content_type)
        return res.status(result.status).json(result.data)
    }
    async getAllproposal(req, res) {
        const id = req.body.id
        const result = await this.proposalUseCase.getAllproposal(id)
        return res.status(result.status).json(result)
    }
    async updateAcceptence(req, res) {
        const id = req.body.id
        const result = await this.proposalUseCase.updateProposalAsAAccept(id)
        return res.status(result.status).json(result)
    }
    async updateDecline(req, res) {
        const id = req.body.id
        const result = await this.proposalUseCase.updateProposalAsDecline(id)
        return res.status(result.status).json(result)
    }
    async makeProposalPayment(req, res) {
        const id = req.body.id
        const talentId = req.clientId
        const result = await this.proposalUseCase.callPayment(talentId, id)
        return res.status(result.status).json(result)
    }
    async updatePaymentStatus(req, res) {
        const { status, proposalId } = req.body;
        const { clientId } = req
        const result = await this.proposalUseCase.updatePayment(status, proposalId)
        if (result){ await this.transactionUseCase.saveNewTransaction(PROPOSAL_CHARGE, PROPOSAL_CHARGE_TRANSACTION_TO, clientId, "Proposal Charge")}
    }
    async fetchAllConnectedTalents(req, res) {
        const id = req.clientId
        const result = await this.proposalUseCase.getAllConnectedTalent(id)
        return res.status(result.status).json(result)
    }
}