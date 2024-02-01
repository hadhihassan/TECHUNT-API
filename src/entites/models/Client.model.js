import mongoose from "mongoose"


const { Schema, ObjectId } = mongoose;

const ClientSchema = new Schema({
  Username: { type: String,  },
  Password: { type: String,  },
  Email: { type: String,  },
  Number: { type: String,  },
  JobPost_id: { type: Schema.Types.ObjectId},
  Profile: {
     Completed_contract: { type: Number },
     Description: { type: String },
     Name: { type: String },
     NumberOfHired: { type: Number },
     Pending_contract: { type: Number },
     Total_contract: { type: Number },
  },
  Address_id: { type: Schema.Types.ObjectId },
});

const Client = mongoose.model('Client', ClientSchema);

export default Client;

