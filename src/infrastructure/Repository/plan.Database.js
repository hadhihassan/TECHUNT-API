import Subscription from "../../entites/models/base/subscription.Schema.js";
import Plan from "../../entites/models/plan.Schema.js";
    
export class PlanRepository {
    async createNewPlan(data) {
        return await Plan.create(data)
    }
    async getAllPalans() {
        return await Plan.find()
    }
    async disablePlan(id) {
        return await Plan.findByIdAndDelete(id)
    }
    async createSubscription(data) {
        return await Subscription.create(data)
    }
    async getPlan(id) {
        return await Plan.findById(id)
    }
    async getPlanForUser() {
        return await Plan.find({ isActive: true })
    }
    async updatePlan(id, data) {
        return await Plan.findByIdAndUpdate(id,{
            name : data.name,
            amount:data.amount,
            description : data.description
        })
    }
}