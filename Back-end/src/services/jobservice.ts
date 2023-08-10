import { Model } from 'mongoose';
import { IJob } from '../models/JobPost'

export const createJob = async (jobData: IJob, Job: Model<IJob>): Promise<IJob> => {
  try {
    const createdJob = await Job.create(jobData);
    return createdJob;
  } catch (error) {
    throw new Error('Failed to create job');
  }
};

export const updateJob = async (jobId: string, jobData: IJob, Job: Model<IJob>): Promise<IJob> => {
  try {
    const updatedJob = await Job.findByIdAndUpdate(jobId, jobData, { new: true });

    if (!updatedJob) {
      throw new Error('Job not found');
    }

    return updatedJob;
  } catch (error) {
    throw new Error('Failed to update job');
  }
};

export const deleteJob = async (jobId: string, Job: Model<IJob>): Promise<void> => {
  try {
    const deletedJob = await Job.findByIdAndDelete(jobId);

    if (!deletedJob) {
      throw new Error('Job not found');
    }
  } catch (error) {
    throw new Error('Failed to delete job');
  }
};







// class JobService {
//   private jobModel: Model<IJob>;

//   constructor(jobModel: Model<IJob>) {
//     this.jobModel = jobModel;
//   }

//   public async createJobPost(jobData: IJob): Promise<IJob> {
//     try {
//       const createdJob = await this.jobModel.create(jobData);
//       return createdJob;
//     } catch (error) {
//       throw new Error('Failed to create job post');
//     }
//   }

//   public async editJobPost(jobId: string, jobData: IJob): Promise<IJob> {
//     try {
//       const updatedJob = await this.jobModel.findByIdAndUpdate(jobId, jobData, { new: true });
//       if (!updatedJob) {
//         throw new Error('Job post not found');
//       }
//       return updatedJob;
//     } catch (error) {
//       throw new Error('Failed to edit job post');
//     }
//   }

//   public async deleteJobPost(jobId: string): Promise<void> {
//     try {
//       const deletedJob = await this.jobModel.findByIdAndDelete(jobId);
//       if (!deletedJob) {
//         throw new Error('Job post not found');
//       }
//     } catch (error) {
//       throw new Error('Failed to delete job post');
//     }
//   }
// }

// export default JobService;
