'use client'
import { JobCardProps } from '@/shared/constants/types'
import { useFormik } from 'formik'
import { useState } from 'react'
import * as Yup from 'yup'

interface JobFormProps {
  mode: 'create' | 'edit'
  initialValues: {
    contactName: string
    contactEmail: string
    contactPhone: string
    companyName: string
    industry: string
    location: string
    jobTitle: string
    jobDescription: string
    employmentType: string
    skillsQualifications: string
    compensationBenefits: string
    applicationProcess: string
    applicationDeadline: string
  }
  onSubmitCreate: (values: any) => void
}

const JobForm: React.FC<JobFormProps> = ({ mode, initialValues, onSubmitCreate }) => {
  const [isFormSubmitted, setIsFormSubmitted] = useState(false)
  // const [formData, setFormData] = useState()
  const validationSchema = Yup.object().shape({
    contactName: Yup.string().required('Contact name is required'),
    contactEmail: Yup.string()
      .email('Invalid email address')
      .required('Contact email is required'),
    companyName: Yup.string().required('Company name is required'),
    jobTitle: Yup.string().required('Job title is required'),
    jobDescription: Yup.string().required('Job description is required'),
    location: Yup.string().required('Location is required'),
    employmentType: Yup.string().required('Employment type is required'),
    skillsQualifications: Yup.string().required(
      'Skills/Qualifications are required'
    ),
    applicationProcess: Yup.string().required(
      'Application process is required'
    ),
    applicationDeadline: Yup.date().required(
      'Application deadline is required'
    ),
  })

  const handleSubmitFun = (values: any) => {
    onSubmitCreate(values)
    setIsFormSubmitted(true)
    console.log('JobValue-->',values)
  }
  const formik = useFormik({
    initialValues,
    // validationSchema,
    onSubmit: handleSubmitFun,
  })
  return (
    <div className="mx-auto w-full max-w-xl rounded-xl border-2 border-amber-400 p-10 md:min-w-max">
      <h1 className="mb-4 text-2xl font-bold">Post a Job</h1>
      {isFormSubmitted ? (
        <div className="mb-4 rounded-md bg-green-200 p-4 text-green-800">
          Form submitted successfully!
        </div>
      ) : null}
      <form onSubmit={formik.handleSubmit}>
        <div className="mb-4">
          <label htmlFor="contactName" className="mb-1 block font-bold">
            Contact Name
          </label>
          <input
            type="text"
            id="contactName"
            placeholder="Type Name of employer"
            name="contactName"
            value={formik.values.contactName}
            onChange={formik.handleChange}
            className={`w-full rounded-md border-2 px-4 py-2 outline-none ${
              formik.errors.contactName && formik.touched.contactName
                ? 'border-red-500'
                : 'border-gray-300'
            }`}
          />
          {formik.errors.contactName && formik.touched.contactName && (
            <div className="mt-1 text-red-500">{formik.errors.contactName}</div>
          )}
        </div>

        <div className="mb-4">
          <label htmlFor="contactEmail" className="mb-1 block font-bold">
            Contact Email
          </label>
          <input
            placeholder="Type Email for contact"
            type="email"
            id="contactEmail"
            name="contactEmail"
            value={formik.values.contactEmail}
            onChange={formik.handleChange}
            className={`w-full rounded-md border-2 px-4 py-2 outline-none ${
              formik.errors.contactEmail && formik.touched.contactEmail
                ? 'border-red-500'
                : 'border-gray-300'
            }`}
          />
          {formik.errors.contactEmail && formik.touched.contactEmail && (
            <div className="mt-1 text-red-500">
              {formik.errors.contactEmail}
            </div>
          )}
        </div>

        <div className="mb-4">
          <label htmlFor="contactPhone" className="mb-1 block font-bold">
            Contact Phone (Optional)
          </label>
          <input
            type="text"
            id="contactPhone"
            placeholder="Type Phone Number for Contact"
            name="contactPhone"
            value={formik.values.contactPhone}
            onChange={formik.handleChange}
            className="w-full rounded-md border-2 border-gray-300 px-4 py-2 outline-none"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="companyName" className="mb-1 block font-bold">
            Company Name
          </label>
          <input
            type="text"
            id="companyName"
            placeholder="Type Comapny Name where you need to hire employee"
            name="companyName"
            value={formik.values.companyName}
            onChange={formik.handleChange}
            className={`w-full rounded-md border-2 px-4 py-2 outline-none ${
              formik.errors.companyName && formik.touched.companyName
                ? 'border-red-500'
                : 'border-gray-300'
            }`}
          />
          {formik.errors.companyName && formik.touched.companyName && (
            <div className="mt-1 text-red-500">{formik.errors.companyName}</div>
          )}
        </div>

        <div className="mb-4">
          <label htmlFor="industry" className="mb-1 block font-bold">
            Industry
          </label>
          <input
            type="text"
            id="industry"
            placeholder="Type Industry ex. IT, Textile etc"
            name="industry"
            value={formik.values.industry}
            onChange={formik.handleChange}
            className="w-full rounded-md border-2 border-gray-300 px-4 py-2 outline-none"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="location" className="mb-1 block font-bold">
            Location
          </label>
          <input
            type="text"
            id="location"
            placeholder="Type Location, city name with area"
            name="location"
            value={formik.values.location}
            onChange={formik.handleChange}
            className={`w-full rounded-md border-2 px-4 py-2 outline-none ${
              formik.errors.location && formik.touched.location
                ? 'border-red-500'
                : 'border-gray-300'
            }`}
          />
          {formik.errors.location && formik.touched.location && (
            <div className="mt-1 text-red-500">{formik.errors.location}</div>
          )}
        </div>

        <div className="mb-4">
          <label htmlFor="jobTitle" className="mb-1 block font-bold">
            Job Title
          </label>
          <input
            type="text"
            id="jobTitle"
            placeholder="Type Job Title"
            name="jobTitle"
            value={formik.values.jobTitle}
            onChange={formik.handleChange}
            className={`w-full rounded-md border-2 px-4 py-2 outline-none ${
              formik.errors.jobTitle && formik.touched.jobTitle
                ? 'border-red-500'
                : 'border-gray-300'
            }`}
          />
          {formik.errors.jobTitle && formik.touched.jobTitle && (
            <div className="mt-1 text-red-500">{formik.errors.jobTitle}</div>
          )}
        </div>

        <div className="mb-4">
          <label htmlFor="jobDescription" className="mb-1 block font-bold">
            Job Description
          </label>
          <textarea
            id="jobDescription"
            name="jobDescription"
            placeholder="Job Description, must be add neccessry details"
            value={formik.values.jobDescription}
            onChange={formik.handleChange}
            className={`w-full resize-none rounded-md border-2 px-4 py-2 outline-none ${
              formik.errors.jobDescription && formik.touched.jobDescription
                ? 'border-red-500'
                : 'border-gray-300'
            }`}
          ></textarea>
          {formik.errors.jobDescription && formik.touched.jobDescription && (
            <div className="mt-1 text-red-500">
              {formik.errors.jobDescription}
            </div>
          )}
        </div>

        <div className="mb-4">
          <label htmlFor="employmentType" className="mb-1 block font-bold">
            Employment Type
          </label>
          <input
            type="text"
            id="employmentType"
            name="employmentType"
            placeholder="Employment Type: Full time, Part time, Contract base, On Production"
            value={formik.values.employmentType}
            onChange={formik.handleChange}
            className={`w-full rounded-md border-2 px-4 py-2 outline-none ${
              formik.errors.employmentType && formik.touched.employmentType
                ? 'border-red-500'
                : 'border-gray-300'
            }`}
          />
          {formik.errors.employmentType && formik.touched.employmentType && (
            <div className="mt-1 text-red-500">
              {formik.errors.employmentType}
            </div>
          )}
        </div>

        <div className="mb-4">
          <label
            htmlFor="skillsQualifications"
            className="mb-1 block font-bold"
          >
            Skills/Qualifications
          </label>
          <textarea
            id="skillsQualifications"
            placeholder="Add required skills"
            name="skillsQualifications"
            value={formik.values.skillsQualifications}
            onChange={formik.handleChange}
            className={`w-full resize-none rounded-md border-2 px-4 py-2 outline-none ${
              formik.errors.skillsQualifications &&
              formik.touched.skillsQualifications
                ? 'border-red-500'
                : 'border-gray-300'
            }`}
          ></textarea>
          {formik.errors.skillsQualifications &&
            formik.touched.skillsQualifications && (
              <div className="mt-1 text-red-500">
                {formik.errors.skillsQualifications}
              </div>
            )}
        </div>

        <div className="mb-4">
          <label
            htmlFor="compensationBenefits"
            className="mb-1 block font-bold"
          >
            Compensation/Benefits
          </label>
          <input
            type="text"
            id="compensationBenefits"
            placeholder="Mentioned Compensation Benefits"
            name="compensationBenefits"
            value={formik.values.compensationBenefits}
            onChange={formik.handleChange}
            className="w-full rounded-md border-2 border-gray-300 px-4 py-2 outline-none"
          />
        </div>

        {/* <div className="mb-4">
          <label htmlFor="applicationProcess" className="mb-1 block font-bold">
            Application Process
          </label>
          <textarea
            id="applicationProcess"
            name="applicationProcess"
            value={formik.values.applicationProcess}
            onChange={formik.handleChange}
            className={`w-full rounded-md px-4 py-2 ${
              formik.errors.applicationProcess &&
              formik.touched.applicationProcess
                ? 'border-red-500'
                : 'border-gray-300'
            }`}
          ></textarea>
          {formik.errors.applicationProcess &&
            formik.touched.applicationProcess && (
              <div className="mt-1 text-red-500">
                {formik.errors.applicationProcess}
              </div>
            )}
        </div> */}

        <div className="mb-4">
          <label htmlFor="applicationDeadline" className="mb-1 block font-bold">
            Application Deadline
          </label>
          <input
            type="date"
            id="applicationDeadline"
            name="applicationDeadline"
            value={formik.values.applicationDeadline}
            onChange={formik.handleChange}
            className={`w-full rounded-md border-2 px-4 py-2 outline-none ${
              formik.errors.applicationDeadline &&
              formik.touched.applicationDeadline
                ? 'border-red-500'
                : 'border-gray-300'
            }`}
          />
          {formik.errors.applicationDeadline &&
            formik.touched.applicationDeadline && (
              <div className="mt-1 text-red-500">
                {formik.errors.applicationDeadline}
              </div>
            )}
        </div>

        <button
          type="submit"
          className="rounded-md bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
        >
          Submit
        </button>
      </form>
    </div>
  )
}

export default JobForm
