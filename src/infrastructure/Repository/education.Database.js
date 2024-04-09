import Education from '../../entites/models/subSchema/education.schema.js';

export class EducationRepository {
    async deleteEducation(id) {
        return await Education.findByIdAndDelete(id)
    }
    async editEducation(id, data) {
        console.log(id, data)
        try {
            return await Education.findByIdAndUpdate(id, data, { new: true })
        } catch (err) {
            console.log(err)
        }
    }
}