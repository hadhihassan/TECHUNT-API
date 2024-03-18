import { STATUS_CODES } from "http";
import { get200Response, get500Response, get400Response } from "../infrastructure/helperFunctions/response.js";
import { StripPayment } from '../providers/paymentService.js'
import { SubscriptionRepository } from "../infrastructure/repository/subscription.js";

export class PlanUesCase {
    constructor(planRepository) {
        this.planRepository = planRepository
        this.subscriptionRepository = new SubscriptionRepository()
        this.stripPayment = new StripPayment()
    }
    async createNewPlan(data) {
        try {
            const result = await this.planRepository.createNewPlan(data)
            if (result) {
                return get200Response(result)
            }
            return get400Response()
        } catch (err) {
            get500Response
        }
    }
    async getAllPlan() {
        try {
            const result = await this.planRepository.getAllPalans()
            console.log(result)
            if (result) {
                return get200Response(result)
            }
            return get400Response()
        } catch (err) {
            get500Response
        }
    }
    async disablePlan(id) {
        try {
            const result = await this.planRepository.disablePlan(id)
            if (result) {
                return get200Response(result)
            }
            return get400Response()
        } catch (err) {
            get500Response
        }
    }
    async getPlan(id) {
        try {
            const result = await this.planRepository.getPlan(id)
            if (result) {
                return get200Response(result)
            }
            return get400Response()
        } catch (err) {
            get500Response
        }
    }
    async makePlanPayment(userId, amount) {
        try {
            const result = await this.stripPayment.makeSubsciptionPayment("For subscription",{
                name: 'Jenny Rosen',
                address: {
                    line1: '510 Townsend St',
                    postal_code: '98140',
                    city: 'San Francisco',
                    state: 'CA',
                    country: 'DK',
                },
            }, userId, amount);
            if (result) {
                return get200Response(result)
            }
            return get400Response()
        } catch (error) {
            get500Response(error)
        }
    }
    async getPlansForUser() {
        try {
            const result = await this.planRepository.getPlanForUser();
            if (result) {
                return get200Response(result)
            }
            return get400Response()
        } catch (error) {
            get500Response(error)
        }
    }
    async purchasePlan(planId, userId, role) {
        try {
            const result = await this.subscriptionRepository.createSubscription(planId, userId);
            
            if (result) {
                return get200Response(result)
            }
            return get400Response()
        } catch (error) {
            get500Response(error)
        }
    }
    async updatePlan(id, data) {
        try {
            const result = await this.planRepository.updatePlan(id, data);
            console.log(result)
            if (result) {
                return get200Response(result)
            }
            return get400Response()
        } catch (error) {
            get500Response(error)
        }
    }
}