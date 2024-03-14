import { STATUS_CODES } from "http";
import { PlanRepository } from "../infrastructure/repository/plan.Database.js";
import { get200Response, get500Response, get400Response } from "../infrastructure/helperFunctions/response.js";

export class PlanUesCase {
    constructor(){  
        this.planRepository = new PlanRepository()
    }
    async createNewPlan(data){
        try{
            const result = await this.planRepository.createNewPlan(data)
            if(result){
                return get200Response(result)
            }
            return get400Response()
        }catch(err){
            get500Response
        }
    }
    async getAllPlan(){
        try{
            const result = await this.planRepository.getAllPalans()
            console.log(result)
            if(result){
                return get200Response(result)
            }
            return get400Response()
        }catch(err){
            get500Response
        }
    }
    async disablePlan(id,status){
        try{
            const result = await this.planRepository.disablePlan(id, status)
            if(result){
                return get200Response(result)
            }
            return get400Response()
        }catch(err){
            get500Response
        }
    }
}