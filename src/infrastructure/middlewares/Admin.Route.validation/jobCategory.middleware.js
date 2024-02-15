import { STATUS_CODES,ERR_MESSAGE } from "../../../constants/httpStatusCode.js";
import { JobCategoryRepository } from "../../database/jobCategory.Database.js";
import { get500Response } from "../../helperFunctions/response.js";

export class CheckJobExisiting {
    constructor() {
        this.jobCategoryRepository = new JobCategoryRepository()
    }
    async checkJobCategoryIsExsiting(req, res, next) {
        try {
            console.log("ahi here")
            const { data } = req.body;
            const isExisting = await this.jobCategoryRepository.findByName(data.name)
            if (isExisting) {
                return res.status(STATUS_CODES.BAD_REQUEST).json({ message: "The job category name already existing", success: false })
            }
            next(); // Call next to pass control to the next middleware or route handler
        } catch (error) {
            return get500Response(error)
        }
    }
}