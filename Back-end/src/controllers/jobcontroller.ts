import { Request, Response } from "express";
import { Model } from "mongoose";
import notifier from "node-notifier";
import { IJob } from "../models/JobPost";
import { createJob, deleteJob, updateJob } from "../services/jobservice";

export const createJobPost = async (
  req: Request,
  res: Response,
  Job: Model<IJob> | any
): Promise<void> => {
  try {
    const jobData: any = req.body;
    const createdJob = await createJob(jobData, Job);

    res.status(201).json(createdJob);

    notifier.notify({
      title: "Job Post",
      message: "Job post created successfully",
    });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

export const editJobPost = async (
  req: Request,
  res: Response,
  Job: Model<IJob>
): Promise<void> => {
  try {
    const jobId: string = req.params.id;
    const jobData: IJob = req.body;

    const updatedJob = await updateJob(jobId, jobData, Job);
    if (!updatedJob) {
      throw new Error("Job post not found");
    }

    res.json(updatedJob);

    notifier.notify({
      title: "Job Post",
      message: "Job post edited successfully",
    });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

export const deleteJobPost = async (
  req: Request,
  res: Response,
  Job: Model<IJob>
): Promise<void> => {
  try {
    const jobId: string = req.params.id;
    // const deletedJob = await Job.findByIdAndDelete(jobId);
    const deletedJob = await deleteJob(jobId, Job);

    res.json({ message: "Job post deleted successfully" });

    notifier.notify({
      title: "Job Post",
      message: "Job post deleted successfully",
    });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};
