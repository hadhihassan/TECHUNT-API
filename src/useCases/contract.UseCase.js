import { STATUS_CODES } from "../constants/httpStatusCode.js";
import { get500Response } from "../infrastructure/helperFunctions/response.js";
import { ContractRepository } from "../infrastructure/repository/contract.Database.js"

export class ContractUseCase {
    constructor() {
        this.contractRepository = new ContractRepository()
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
            if(result){
                return {
                    message:"success",
                    status : STATUS_CODES.OK,
                    success : true
                }
            }
            return {
                message:"failed",
                status : STATUS_CODES.BAD_REQUEST,
                success : false,
            }
        } catch (err) {
            console.log(err.message)
            get500Response(err)
        }
    }
    async findAllActiveContract(id, role) {
        try {
            const result = await this.contractRepository.findAllActiveContracts(id, role)
            if(result){
                return {
                    message:"success",
                    status : STATUS_CODES.OK,
                    success : true,
                    data:result
                }
            }
            return {
                message:"failed",
                status : STATUS_CODES.BAD_REQUEST,
                success : false,
            }
        } catch (err) {
            console.log(err.message)
            get500Response(err)
        }
    }
}