import JobApplication from "../models/Job.js";
import {jobSchema} from "../validations/jobValidation.js"

export const addJob = async (req, res) => {
    try {
      const { error, value } = jobSchema.validate(req.body, { abortEarly: false });
  
      if (error) {
        const errorMessages = error.details.map((err) => err.message);
        return res.status(400).json({ errors: errorMessages });
      }
  
      const job = new JobApplication(value);
      const saved = await job.save();
      res.status(201).json(saved);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  };


export const getJobs = async (req, res) => {
    const { status, date } = req.query;
    let query = {};
  
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
        return res.status(404).json({ message: 'No jobs found' });
      }

      res.json(jobs);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };
  

export const updateStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  try {
    const updated = await JobApplication.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );
    if (!updated) return res.status(404).json({ error: "Job not found" });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const deleteJob = async (req, res) => {
  const { id } = req.params;

  try {
    const deleted = await JobApplication.findByIdAndDelete(id);
    if (!deleted) return res.status(404).json({ error: "Job not found" });
    res.json({ message: "Job deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
