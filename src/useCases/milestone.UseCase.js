import { STATUS_CODES } from "../constants/httpStatusCode.js";
import { get500Response } from "../infrastructure/helperFunctions/response.js";
import { MilestoneRepository } from '../infrastructure/repository/milestoneDatabase.js'

export class MilestoneUseCase {
    constructor() {
        this.milestoneRepository = new MilestoneRepository()
    }
    async storeMileStone(milestone) {
        try {
            let collectId = []
            for (let index = 0; index < milestone.length; index++) {
                const milestoneData = milestone[index];
                const result = await this.milestoneRepository.createMilestone(milestoneData);
                if (result && result._id) {
                    collectId.push(result._id);
                    console.log(collectId)
                } else {
                    throw new Error("Failed to create milestone");
                }
            }
            if (collectId.length) {
                return {
                    status: STATUS_CODES.OK,
                    message: "success",
                    success: true,
                    milestoneId: collectId
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
    async sendMilestoneApproval(id, approval) {
        try {
            const result = await this.milestoneRepository.sendMilesApproval(id, approval)
            if (result) {
                return {
                    status: STATUS_CODES.OK,
                    message: "success",
                    success: true,
                }
            }
            return {
                status: STATUS_CODES.BAD_REQUEST,
                message: "failed",
                success: false,
            }
        } catch (err) {
            get500Response(err)
        }
    }
    async updateMilestoneStatus(id, status) {
        try {
            const result = await this.milestoneRepository.updateMilestoneStatus(id, status)
            if (result) {
                return {
                    status: STATUS_CODES.OK,
                    message: "success",
                    success: true
                }
            } return {
                status: STATUS_CODES.BAD_REQUEST,
                message: "success",
                success: false
            }
        } catch (err) {
            get500Response(err)
        }
    }
    async saveWork(id, data) {
        try {
            const result = await this.milestoneRepository.saveWork(id, data)
            if (result) {
                return {
                    status: STATUS_CODES.OK,
                    message: "success",
                    success: true
                }
            } return {
                status: STATUS_CODES.BAD_REQUEST,
                message: "failed",
                success: false
            }
        } catch (err) {
            get500Response(err)
        }
    }
    async getSubmittedWork(id) {
        try {
            const result = await this.milestoneRepository.getWork(id)
            if(result){
                return{
                    message : "success",
                    status : STATUS_CODES.OK,
                    success : true,
                    data:result
                }
            }return{
                message : "failed",
                status : STATUS_CODES.BAD_REQUEST,
                success : false
            }
        } catch (err) {
            get500Response(err)
        }
    }
    async saveEditWork(id, data, workId) {
        try {
            const result = await this.milestoneRepository.saveEditWork(id, data, workId)
            if(result){
                return{
                    message : "success",
                    status : STATUS_CODES.OK,
                    success : true,
                    data:result
                }
            }return{
                message : "failed",
                status : STATUS_CODES.BAD_REQUEST,
                success : false
            }
        } catch (err) {
            get500Response(err)
        }
    }
    async updateMilestone(id, data) {
        try {
            const result = await this.milestoneRepository.findAndUpdate(id, data)
            if(result){
                return{
                    message : "success",
                    status : STATUS_CODES.OK,
                    success : true,
                    data:result
                }
            }return{
                message : "failed",
                status : STATUS_CODES.BAD_REQUEST,
                success : false
            }
        } catch (err) {
            get500Response(err)
        }
    }
}