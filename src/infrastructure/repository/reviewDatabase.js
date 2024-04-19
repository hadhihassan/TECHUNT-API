import Review from '../../entites/models/subSchema/review.schema.js'
import Talent from '../../entites/models/talen.model.js '
import Client from '../../entites/models/Client.schema.js'
export class ReviewRepository {
    async saveReview(data) {
        try {
            return await Review.create(data)
        } catch (err) {
            console.log(err)
        }
    }
    async getReview(to) {
        try {
            let data = await Review.find({ to: to }).populate('from').exec();
            const fromId = data.map((value) => value.from)
            let userDatas = []
            for (let index = 0; index < fromId.length; index++) {
                let user = await Talent.findById(fromId[index])
                if (!user) {
                    user = await Client.findById(fromId[index])
                }
                userDatas.push(user)
            }
            return { data, userDatas }
        } catch (err) {
            console.log(err.message)
        }
    }
}