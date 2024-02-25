import { ProposalUesCase } from "../../useCases/proposal.intaractor.js";

export class ProposalController {
    constructor() {
        this.proposalUesCase = new ProposalUesCase()
    }
    async saveProposal(req, res) {
        const id = req.clientId
        console.log(req.body)
        const result = await this.proposalUesCase.saveProposal(req.body, id);
        return res.status(result.status).json(result)
    }
    async getSignedUrlForS3Store(req, res) {
        const { key, content_type } = req.body;
        const result = await this.proposalUesCase.getSignedUrl(key, content_type)
        console.log(result)
        return res.status(result.status).json(result.data)
    }
}