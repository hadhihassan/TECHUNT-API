import Milestone from "../../entites/models/subSchema/milestone.schema.js"

export class MilestoneRepository{

    async createMilestone(milestone){
        return await Milestone.create(milestone)
    }
}
