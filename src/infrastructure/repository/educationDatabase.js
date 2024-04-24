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
    async findEducations(ids) {
        try {
            const educations = [];
            for (const id of ids) {
                const education = await Education.findById(id);
                if (education) {
                    educations.push(education);
                }
            }
            console.log(educations)
            return educations;
        } catch (err) {
            console.log(err)
        }
    }
}