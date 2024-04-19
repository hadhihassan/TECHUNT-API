import { STATUS_CODES } from "../constants/httpStatusCode.js";
import { get500Response } from "../infrastructure/helperFunctions/response.js";
import { ContractRepository } from "../infrastructure/repository/contractDatabase.js"
import { StripPayment } from '../providers/paymentService.js'
import { TalentRepository } from '../infrastructure/repository/talentDatabase.js'
import { MilestoneRepository } from '../infrastructure/repository/milestoneDatabase.js'
import { ReasonResitory } from '../infrastructure/repository/reasonDatabase.js'


export class ContractUseCase {
    constructor() {
        this.contractRepository = new ContractRepository()
        this.stripPayment = new StripPayment()
        this.talentRepository = new TalentRepository()
        this.milestoneRepository = new MilestoneRepository()
        this.reasonResitory = new ReasonResitory()
    }

    async storeContract(contractDetails, milestoneId, isMilestone) {
        try {
            const result = await this.contractRepository.createContract(contractDetails, milestoneId, isMilestone)
            if (result) {
                return {
                    status: STATUS_CODES.OK,
                    message: "success",
                    success: true
                }
            }
            return {
                status: STATUS_CODES.BAD_REQUEST,
                message: "failed",
                success: false
            }
        } catch (err) {
            console.log(err)
            get500Response(err)
        }
    }
    async getAllNewContract(id, role) {
        try {
            const result = await this.contractRepository.findAllNewContracts(id, role)
            if (result) {
                return {
                    status: STATUS_CODES.OK,
                    message: "success",
                    success: true,
                    data: result
                }
            } return {
                status: STATUS_CODES.OK,
                message: "failed",
                success: false,
            }
        } catch (err) {
            get500Response(err)
        }
    }
    async updateContractStatus(id, status, actualStatus) {
        try {
            const result = await this.contractRepository.updateContractStatus(id, status, actualStatus)
            if (result) {
                return {
                    message: "success",
                    status: STATUS_CODES.OK,
                    success: true
                }
            }
            return {
                message: "failed",
                status: STATUS_CODES.BAD_REQUEST,
                success: false,
            }
        } catch (err) {
            console.log(err.message)
            get500Response(err)
        }
    }
    async findAllActiveContract(id, role) {
        try {
            const result = await this.contractRepository.findAllActiveContracts(id, role)
            if (result) {
                return {
                    message: "success",
                    status: STATUS_CODES.OK,
                    success: true,
                    data: result
                }
            }
            return {
                message: "failed",
                status: STATUS_CODES.BAD_REQUEST,
                success: false,
            }
        } catch (err) {
            console.log(err.message)
            get500Response(err)
        }
    }
    async makePayment(talentId, amount) {
        try {
            const talent = await this.talentRepository.findById(talentId)
            const payment = await this.stripPayment.makePayment({
                name: talent.First_name,
                address: {
                    line1: '510 Townsend St',
                    postal_code: '98140',
                    city: 'San Francisco',
                    state: 'CA',
                    country: 'DK',
                },
            }, talentId, true, amount)
            if (payment) {
                return {
                    status: STATUS_CODES.OK,
                    success: true,
                    data: payment
                }
            }
            return {
                status: STATUS_CODES.OK,
                success: true,
                data: payment
            }
        } catch (err) {
            console.log(err)
        }
    }
    async payTalentAmount(talentId, amount, milestoneId) {
        try {
            const result = await this.talentRepository.addAmountIntoWallet(talentId, amount, milestoneId)
            console.log(result)
            if (result) {
                const milestoneResult = await this.milestoneRepository.updatePaymentUpdate(milestoneId)
                console.log(milestoneResult)
                if (milestoneResult) {
                    return {
                        status: STATUS_CODES.OK,
                        success: true,
                    }
                }
            }
            return {
                status: STATUS_CODES.BAD_REQUEST,
                success: false,
            }
        } catch (err) {
            console.log(err)
        }
    }
    async updateStatus(contractId, status) {
        try {
            const result = await this.contractRepository.updateContract(contractId, status)
            if (result) {
                return {
                    status: STATUS_CODES.OK,
                    success: true,
                }
            }
            return {
                status: STATUS_CODES.BAD_REQUEST,
                success: false,
            }
        } catch (err) {
            console.log(err)
        }
    }
    async fetchCompletedContracts(id, role) {
        try {
            const result = await this.contractRepository.findCompletedContracts(id, role)
            if (result) {
                return {
                    status: STATUS_CODES.OK,
                    success: true,
                    data: result
                }
            }
            return {
                status: STATUS_CODES.BAD_REQUEST,
                success: false,
            }
        } catch (err) {
            console.log(err)
        }
    }
    async getCancelledContract(id, role) {
        try {
            const result = await this.contractRepository.getCancelledContract(id, role)
            if (result) {
                return {
                    status: STATUS_CODES.OK,
                    success: true,
                    data: result
                }
            }
            return {
                status: STATUS_CODES.BAD_REQUEST,
                success: false,
            }
        } catch (err) {
            console.log(err)
        }
    }
    async getContract(id) {
        try {
            const getData = await this.contractRepository.findContracts(id);
            if (getData) {
                return {
                    status: 200,
                    success: true,
                    data: getData,
                }
            }
            return {
                status: 400,
                success: false,
            }
        } catch (err) {
            console.log(err)
        }
    }
    async saveToContract(workId, reviewId, role) {
        try {
            return await this.contractRepository.saveReview(workId, reviewId, role)
        } catch (err) {
            consnole.log(err)
        }
    }
}