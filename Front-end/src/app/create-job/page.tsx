'use client'
import JobForm from '@/components/Common/JobForm'
import Layout from '@/components/Layout/Layout'
import { useAuthContext } from '@/contexts/AuthProvider'
import { createJobPost } from '@/shared/api/jobApi'
import ky from 'ky'
import { useState } from 'react'
import { toast } from 'react-toastify'

const CreateJobPage: React.FC = () => {
  const [jobData, setJobData] = useState({})
  const [isCreating, setIsCreating] = useState(false)
  const initialValues = {
    contactName: '',
    contactEmail: '',
    contactPhone: '',
    companyName: '',
    industry: '',
    location: '',
    jobTitle: '',
    jobDescription: '',
    employmentType: '',
    skillsQualifications: '',
    compensationBenefits: '',
    applicationProcess: '',
    applicationDeadline: '',
  }
  const API_URL = 'http://localhost:5000/api'

  const handleCreateJob = async (values: any) => {
    console.log('valu-->', values)
    isCreating && toast.loading('Job post creation successfully started')
    try {
      setIsCreating(true)
      const createdJob = await createJobPost(values)

      toast.success('Job post created successfully')
      console.log('createdJob-->', createdJob)
    } catch (error) {
      // Handle error
      toast.error('Job post creation unsuccessful')
      console.log('err-->', error)
    } finally {
      setIsCreating(false)
    }
    console.log('Creating job:', values)
  }
  
  const { user } = useAuthContext()
  const createJobPost = async (jobData: any) => {
    console.log('JobDataIn API-->', jobData)
    const headers = {
      Authorization: user?.email,
    }
    try {
      const response = await ky.post(`${API_URL}/jobs`, {
        json: jobData,
        headers,
        credentials: 'include', // Include credentials if needed
      })

      if (response.ok) {
        const data = await response.json()
        return data
      }

      throw new Error('Failed to create job post')
    } catch (error) {
      throw new Error('Failed to create job post')
    }
  }

  return (
    <Layout>
      <div className="flex flex-col items-center justify-center p-10">
        <h1 className="m-10 w-full max-w-md rounded-full bg-amber-500 text-center text-2xl">
          Create Job
        </h1>
        <JobForm
          mode="create"
          initialValues={initialValues}
          onSubmitCreate={createJobPost}
        />
      </div>
    </Layout>
  )
}
export default CreateJobPage
