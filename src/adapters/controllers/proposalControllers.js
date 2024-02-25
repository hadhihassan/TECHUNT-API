import { ProposalUesCase } from "../../useCases/proposal.intaractor.js";

export class ProposalController {
    constructor() {
        this.proposalUesCase = new ProposalUesCase()
    }
    async saveProposal(req, res) {
        const id = req.clientId
        const result = await this.proposalUesCase.saveProposal(req.body, id);
        return res.status(result.status).json(result)
    }
    async getSignedUrlForS3Store(req, res) {
        const { key, content_type } = req.body;
        const result = await this.proposalUesCase.getSignedUrl(key, content_type)
        return res.status(result.status).json(result.data)
    }
    async getAllproposal(req,res){
        const id = req.body
        const result = await this.proposalUesCase.getAllproposal(id)
        return res.status(result.status).json(result)
    }
    async updateAcceptence(req,res){
        const id = req.body
        const result = await this.proposalUesCase.updateProposalAsAAccept(id)
        return res.status(result.status).json(result)
    }
    async updateDecline(req,res){
        const id = req.body
        const result = await this.proposalUesCase.updateProposalAsDecline(id)
        return res.status(result.status).json(result)
    }
}