import { ProposalUseCase } from "../../useCases/proposal.intaractor.js";

export class ProposalController {
    constructor() {
        this.proposalUseCase = new ProposalUseCase()
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
        console.log(id, req.body, "this is sjfk")
        const result = await this.proposalUseCase.getAllproposal(id)
        console.log(result)
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
        const talentId = req.clientId
        const result = await this.proposalUseCase.callPayment(talentId)
        return res.status(result.status).json(result)
    }
}