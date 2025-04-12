import mongoose from "mongoose";

const jobSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  company: { type: String, required: true },
  role: { type: String, required: true },
  status: { 
    type: String, 
    enum: ['Applied', 'Interview', 'Offer', 'Rejected'], 
    default: 'Applied' 
  },
  applicationDate: { type: Date, required: true },
  link: { type: String }
}, { timestamps: true });

const Job = mongoose.model('Job', jobSchema);
export default Job;