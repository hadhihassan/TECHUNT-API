import Education from '../../entites/models/subSchema/education.schema.js';

export class EducationRepository {
    async deleteEducation(id) {
        return await Education.findByIdAndDelete(id)
    }
    async editEducation(id, data) {
        return await Education.findByIdAndUpdate(id,
            { $set: { data } }
        )
    }
}