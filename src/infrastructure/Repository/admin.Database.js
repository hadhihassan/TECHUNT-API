import mongoose from "mongoose";
import admin from "../../entites/models/admin.model.js";
import { STATUS_CODES } from "../../constants/httpStatusCode.js";
import Talent from "../../entites/models/talen.model.js";
import Client from "../../entites/models/Client.schema.js";
import Proposal from "../../entites/models/subSchema/proposal.schema.js";

export class AdminRepository {
    async findByUserName(userName) {
        const result = await admin.findOne({ userName })
        if (result) {
            return { status: true, data: result }
        }
        return { status: false, data: result }
    }
    async findById(id) {
        return await admin.findById(id)
    }
    async monthlyTalent() {
        const currentYear = new Date().getFullYear();
        return await Talent.aggregate([
            {
                $match: {
                    createdAt: {
                        $gte: new Date(`${currentYear}-01-01T00:00:00.000Z`),
                        $lt: new Date(`${currentYear + 1}-01-01T00:00:00.000Z`)
                    }
                }
            },
            {
                $group: {
                    _id: { $month: "$createdAt" },
                    count: { $sum: 1 }
                }
            },
            {
                $project: {
                    _id: 0,
                    month: {
                        $switch: {
                            branches: [
                                { case: { $eq: ["$_id", 1] }, then: "January" },
                                { case: { $eq: ["$_id", 2] }, then: "February" },
                                { case: { $eq: ["$_id", 3] }, then: "March" },
                                { case: { $eq: ["$_id", 4] }, then: "April" },
                                { case: { $eq: ["$_id", 5] }, then: "May" },
                                { case: { $eq: ["$_id", 6] }, then: "June" },
                                { case: { $eq: ["$_id", 7] }, then: "July" },
                                { case: { $eq: ["$_id", 8] }, then: "August" },
                                { case: { $eq: ["$_id", 9] }, then: "September" },
                                { case: { $eq: ["$_id", 10] }, then: "October" },
                                { case: { $eq: ["$_id", 11] }, then: "November" },
                                { case: { $eq: ["$_id", 12] }, then: "December" }
                            ],
                            default: "Invalid Month"
                        }
                    },
                    count: 1
                }
            },
            {
                $sort: { month: 1 }
            }
        ]).exec()

    }
    async monthlyClient() {
        const currentYear = new Date().getFullYear();
        return await Client.aggregate([
            {
                $match: {
                    createdAt: {
                        $gte: new Date(`${currentYear}-01-01T00:00:00.000Z`),
                        $lt: new Date(`${currentYear + 1}-01-01T00:00:00.000Z`)
                    }
                }
            },
            {
                $group: {
                    _id: { $month: "$createdAt" },
                    count: { $sum: 1 }
                }
            },
            {
                $project: {
                    _id: 0,
                    month: {
                        $switch: {
                            branches: [
                                { case: { $eq: ["$_id", 1] }, then: "January" },
                                { case: { $eq: ["$_id", 2] }, then: "February" },
                                { case: { $eq: ["$_id", 3] }, then: "March" },
                                { case: { $eq: ["$_id", 4] }, then: "April" },
                                { case: { $eq: ["$_id", 5] }, then: "May" },
                                { case: { $eq: ["$_id", 6] }, then: "June" },
                                { case: { $eq: ["$_id", 7] }, then: "July" },
                                { case: { $eq: ["$_id", 8] }, then: "August" },
                                { case: { $eq: ["$_id", 9] }, then: "September" },
                                { case: { $eq: ["$_id", 10] }, then: "October" },
                                { case: { $eq: ["$_id", 11] }, then: "November" },
                                { case: { $eq: ["$_id", 12] }, then: "December" }
                            ],
                            default: "Invalid Month"
                        }
                    },
                    count: 1
                }
            },
            {
                $sort: { month: 1 }
            }
        ]).exec()
    }
    async getYearlyRevenue() {
        const currentYear = new Date().getFullYear();

        return await Proposal.aggregate([
            {
                $match: {
                    createdAt: {
                        $gte: new Date(`${currentYear}-01-01T00:00:00.000Z`),
                        $lt: new Date(`${currentYear + 1}-01-01T00:00:00.000Z`)
                    },
                    paymentStatus: "Completed"
                }
            },
            {
                $lookup: {
                    from: "jobPost",
                    localField: "jobId",
                    foreignField: "_id",
                    as: "job"
                }
            },
            {
                $unwind: "$job"
            },
            {
                $group: {
                    _id: null,
                    totalRevenue: { $sum: "$job.Amount" }
                }
            },
            {
                $project: {
                    _id: 0,
                    totalRevenue: 1
                }
            }
        ]).exec();
    }

    async mostFreelancer(){
    return await Talent.aggregate([
        {
            $group: {
                _id: "$Profile.Title",
                count: { $sum: 1 }
            }
        }
    ])
}
}