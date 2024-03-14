export class PlanController {
    constructor(planUesCase) {
        this.planUesCase = planUesCase;
    }
    createNewPlan = async (req, res) => {
        const data = req.body;
        const result = await this.planUesCase.createNewPlan(data);
        return res.status(result.status).json(result);
    }
    async getAllPlans(req, res) {
        const result = await this.planUesCase.getAllPlan();
        console.log(result)
        return res.status(result.status).json(result);
    }
    async createNewPlan(req, res) {
        const { planId: id, status } = req.body;
        const result = await this.planUesCase.disablePlan(id, status);
        return res.status(result.status).json(result);
    }
}