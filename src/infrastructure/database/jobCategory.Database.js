import mongoose from "mongoose"
import jobCategoryShema from '../../entites/models/jobCategory.model.js'


export class JobCategoryRepository {


    async findByName(name) {
        return  await jobCategoryShema.findOne({name});
    }
    async addNewJobCategory(data){
        return new jobCategoryShema(data).save()
    }
    async getAllCategory(){
        return await jobCategoryShema.find()
    }

}