import { PlanUesCase } from '../../useCases/plan.UseCase'

export class PlanController{
    constructor(){
        this.planUesCase = new PlanUesCase()
    }
    async createNewPlan(req,res){
        const { planData:data } = req.body;
        const result = await this.planUesCase.createNewPlan(data);
        return res.status(result.status).json(result); 
    }
    async getAllPlans(req,res){
        const result = await this.planUesCase.getAllPlan();
        return res.status(result.status).json(result); 
    }
    async createNewPlan(req,res){
        const { planId:id, status } = req.body;
        const result = await this.planUesCase.disablePlan(id, status);
        return res.status(result.status).json(result); 
    }
}