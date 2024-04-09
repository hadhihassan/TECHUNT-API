import { STATUS_CODES } from '../constants/httpStatusCode.js';
import { ProposalRepository } from '../infrastructure/Repository/proposal.Database.js';
import { get500Response } from "../infrastructure/helperFunctions/response.js";
import { S3Service } from '../providers/S3.js';
import { StripPayment } from '../providers/paymentService.js'
export class ProposalUseCase {
    constructor() {
        this.proposalRepository = new ProposalRepository()
        this.s3 = new S3Service()
        this.stripPayment = new StripPayment()
    }
    async saveProposal(data, id) {
        try {
            data.talentId = id
            const datas = await this.proposalRepository.insertProposal(data)
            if (datas === null) {
                return {
                    status: STATUS_CODES.BAD_REQUEST,
                    message: "Error occurs while saving proposal.",
                    success: false
                }
            }
            return {
                status: STATUS_CODES.OK,
                message: "Successfully propsal saved .",
                success: true,
                data: datas
            }
        } catch (err) {
            get500Response(err)
        }
    }
    async getSignedUrl(key, content_type) {
        try {
            const { signedUrl, fileLink } = await this.s3.createPreSignedPost({
                key: ("public/" + key),
                content_type: content_type
            })
            if (!signedUrl || !fileLink) {
                return {
                    status: STATUS_CODES.BAD_REQUEST,
                    success: false
                }
            }
            return {
                status: STATUS_CODES.OK,
                data: {
                    signedUrl,
                    fileLink
                },
                success: false
            }
        } catch (err) {
            get500Response(err)
        }
    }
    async getAllproposal(id) {
        try {
            const proposals = await this.proposalRepository.findManyProposals(id)
            if (proposals === null) {
                return {
                    message: "No proposal you have.",
                    success: false,
                    status: STATUS_CODES.BAD_REQUEST
                }
            }
            return {
                message: "Succedd",
                success: true,
                status: STATUS_CODES.OK,
                data: proposals
            }
        } catch (err) {
            get500Response(err)
        }
    }
    async updateProposalAsAAccept(id) {
        try {
            const accepedProposal = await this.proposalRepository.upadteAccept(id)
            if (accepedProposal === null) {
                return {
                    message: "could't find Proposal.",
                    success: false,
                    status: STATUS_CODES.BAD_REQUEST
                }
            }
            return {
                message: "Success",
                success: true,
                status: STATUS_CODES.OK,
                data: accepedProposal
            }
        } catch (err) {
            get500Response(err)
        }
    }
    async updateProposalAsDecline(id) {
        try {
            const declienProposal = await this.proposalRepository.upadteDecline(id)
            if (declienProposal === null) {
                return {
                    message: "could't find Proposal.",
                    success: false,
                    status: STATUS_CODES.BAD_REQUEST
                }
            }
            return {
                message: "Success",
                success: true,
                status: STATUS_CODES.OK,
                data: declienProposal
            }
        } catch (err) {
            get500Response(err)
        }
    }
    async callPayment(id, propsalId) {
        try {
            const id = await this.stripPayment.makePayment({
                name: 'Jenny Rosen',
                address: {
                    line1: '510 Townsend St',
                    postal_code: '98140',
                    city: 'San Francisco',
                    state: 'CA',
                    country: 'DK',
                },
            }, propsalId,false,500)
            if (id) {
                return {
                    message: "success",
                    id: id,
                    success: true,
                    status: STATUS_CODES.OK
                }
            }
            return {
                message: "ERROR",
                id: id,
                success: false,
                status: STATUS_CODES.BAD_REQUEST
            }
        } catch (err) {
            get500Response(err)
        }
    }
    async updatePayment(status, id) {
        try {
            const result = await this.proposalRepository.updatePaymentStatus(status, id)
            if (result === null) {
                return {
                    status: STATUS_CODES.BAD_REQUEST
                }
            }
            return {
                status: STATUS_CODES.OK
            }
        } catch (err) {
            get500Response(err)
        }
    }
    async getAllConnectedTalent(id) {
        try {
            const connectedTalents = await this.proposalRepository.getAllConnectedTalents(id)
            if (connectedTalents === null) {
                return {
                    message: "Error occurs While fetching data ..! ",
                    success: false,
                    status: STATUS_CODES.BAD_REQUEST
                }
            }
            return {
                status: STATUS_CODES.OK,
                data: connectedTalents,
                success: true
            }
        } catch (err) {
            get500Response(err)
        }
    }
}
