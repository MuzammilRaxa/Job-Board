import { useAuthContext } from '@/contexts/AuthProvider';
import ky from 'ky';

const API_URL = 'http://localhost:5000/api'; 

export const createJobPost = async (jobData: any) => {
  const { user } = useAuthContext()
  console.log('JobDataIn API-->',jobData)
  const headers = {
    Authorization: user?.email,
  }
  try {
    const response = await ky.post(`${API_URL}/jobs`, {
      json: jobData,
      headers,
      credentials: 'include', // Include credentials if needed
    });

    if (response.ok) {
      const data = await response.json();
      return data;
    }

    throw new Error('Failed to create job post');
  } catch (error) {
    throw new Error('Failed to create job post');
  }
};

export const editJobPost = async (jobId: string, jobData: any) => {
  try {
    const response = await ky.put(`${API_URL}/jobs/${jobId}`, {
      json: jobData,
      credentials: 'include', // Include credentials if needed
    });

    if (response.ok) {
      const data = await response.json();
      return data;
    }

    throw new Error('Failed to edit job post');
  } catch (error) {
    throw new Error('Failed to edit job post');
  }
};

export const deleteJobPost = async (jobId: string) => {
  try {
    const response = await ky.delete(`${API_URL}/jobs/${jobId}`, {
      credentials: 'include', // Include credentials if needed
    });

    if (response.ok) {
      return;
    }

    throw new Error('Failed to delete job post');
  } catch (error) {
    throw new Error('Failed to delete job post');
  }
};
