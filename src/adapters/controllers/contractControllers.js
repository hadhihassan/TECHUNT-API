import { ContractUseCase } from "../../useCases/contract.UseCase.js";
import { MilestoneUseCase } from "../../useCases/milestone.UseCase.js";
import catchAsync from '../../utils/catchAsync.js'
export class ContractController {
    constructor() {
        this.contractUseCase = new ContractUseCase()
        this.milestoneUseCase = new MilestoneUseCase()
    }
    async saveNewContract(req, res) {
        const { contract, milestone, isMilestone } = req.body;
        let milestoneId;
        if (isMilestone) {
            const saveMilesStones = await this.milestoneUseCase.storeMileStone(milestone);
            if (saveMilesStones.success) {
                milestoneId = saveMilesStones.milestoneId;
            } else {
                return res.status(500).json({ message: "Failed to save milestones" });
            }
        }
        const saveContract = await this.contractUseCase.storeContract(contract, milestoneId, isMilestone);
        return res.status(saveContract.status).json(saveContract);
    }
    async fetchAllNewContracts(req, res) {
        const { clientId: id, role } = req
        console.log(id, role)
        const result = await this.contractUseCase.getAllNewContract(id, role)
        return res.status(result.status).json(result)
    }
    async fetchAllActiveContracts(req, res) {
        const { clientId: id, role } = req
        console.log(id, role)
        const result = await this.contractUseCase.findAllActiveContract(id, role)
        return res.status(result.status).json(result)
    }
    async updateContractStatus(req, res) {
        const { id, status, actualStatus } = req.body;
        const result = await this.contractUseCase.updateContractStatus(id, status, actualStatus)
        return res.status(result.status).json(result)
    }

}