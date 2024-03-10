import { STATUS_CODES } from "../constants/httpStatusCode.js";
import { get500Response } from "../infrastructure/helperFunctions/response.js";
import { MilestoneRepository } from '../infrastructure/repository/milestone.Database.js'

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
                    milestoneId : collectId
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
}