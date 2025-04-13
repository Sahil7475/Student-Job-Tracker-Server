import JobApplication from "../models/Job.js";
import {jobSchema} from "../validations/jobValidation.js"

export const addJob = async (req, res) => {
    try {

      const { error, value } = jobSchema.validate(req.body, { abortEarly: false });
  
      if (error) {
        const errorMessages = error.details.map((err) => err.message);
        return res.status(400).json({ error: error.details[0].message });
      }
  
      const job = new JobApplication({
        ...value,
        user: req.user._id,
      });

      const saved = await job.save();
      res.status(201).json(saved);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  };


export const getJobs = async (req, res) => {

    const { status, date } = req.query;

    const validStatuses = JobApplication.schema.path("status").enumValues;

    if (status && !validStatuses.includes(status)) {
      return res.status(400).json({ error: `Invalid status: ${status}` });
    }

    let query = {user: req.user._id};
  
    if (status) query.status = status;
  
    if (date) {
      const start = new Date(date);
      start.setUTCHours(0, 0, 0, 0);
      
      const end = new Date(date);
      end.setUTCHours(23, 59, 59, 999);
  
      query.applicationDate = { $gte: start, $lte: end };
    }
  
    try {
      const jobs = await JobApplication.find(query).sort({ applicationDate: -1 });

      if (jobs.length === 0) {
        return res.status(200).json({ jobs: [] });
      }      

      res.status(200).json({ jobs });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };
  

export const updateStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  const validStatuses = JobApplication.schema.path("status").enumValues;

  if (!validStatuses.includes(status)) {
    return res.status(400).json({ error: "Invalid status value" });
  }

  try {
    const updated = await JobApplication.findOneAndUpdate(
      { _id: id, user: req.user._id },
      { status },
      { new: true }
    );
    if (!updated) return res.status(404).json({ error: "Job not found" });
    res.status(200).json(updated); 
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const deleteJob = async (req, res) => {
  const { id } = req.params;

  try {
    
    const deleted = await JobApplication.findOneAndDelete({
      _id: id,
      user: req.user._id 
    });

    if (!deleted) return res.status(404).json({ error: "Job not found" });
    res.status(200).json({ message: "Job deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
