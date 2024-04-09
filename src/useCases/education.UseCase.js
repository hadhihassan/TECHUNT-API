import { STATUS_CODES } from '../constants/httpStatusCode';
import { EducationRepository } from '../infrastructure/repository/education.Database';

export class EducationUseCase {
    constructor() {
        this.educationRepository = new EducationRepository()
    }
    async deleteEducation(id) {
        try {
            const result = await this.educationRepository.deleteEducation(id)
            if (result) {
                return {
                    status: STATUS_CODES.OK,
                    success: true,
                }
            }
            return {
                status: STATUS_CODES.BAD_REQUEST,
                success: false,
            }
        } catch (err) {
            console.log(err)
        }
    }
    async editEducation(id, data) {
        try {
            const result = await this.educationRepository.editEducation(id, data)
            if (result) {
                return {
                    status: STATUS_CODES.OK,
                    success: true,
                }
            }
            return {
                status: STATUS_CODES.BAD_REQUEST,
                success: false,
            }
        } catch (err) {
            console.log(err)
        }
    }
}