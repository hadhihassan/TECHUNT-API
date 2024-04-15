import Subscription from "../../entites/models/base/subscription.Schema.js";

export class SubscriptionRepository {

    async createSubscription(planId, userId) {
        return await Subscription.create({ planId, userId });
    }
    async getSubscriptin(subscriptionId) {
        return await Subscription.findById(subscriptionId)
    }
}