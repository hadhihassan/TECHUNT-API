import Subscription from "../../entites/models/base/subscription.Schema.js";
import Plan from "../../entites/models/plan.Schema.js";

export class PlanRepository {
    async createNewPlan(data) {
        return await Plan.create(data)
    }
    async getAllPalans() {
        return await Plan.find()
    }
    async disablePlan(id, status) {
        return await Plan.findByIdAndUpdate(id,
            { isActive: status },
            { new: true });
    }
    async createSubscription(data) {
        return await Subscription.create(data)
    }
}