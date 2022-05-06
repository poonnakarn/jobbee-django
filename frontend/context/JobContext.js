import axios from 'axios'
import { useRouter } from 'next/router'
import { useState, createContext } from 'react'

const JobContext = createContext()

export const JobProvider = ({ children }) => {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [updated, setUpdated] = useState(null)
  const [applied, setApplied] = useState(false)

  const router = useRouter()

  // Apply to job
  const applyToJob = async (id, accessToken) => {
    setLoading(true)
    try {
      const res = await axios.post(
        `${process.env.API_URL}/api/jobs/${id}/apply/`,
        {},
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )

      if (res.data.applied === true) {
        setLoading(false)
        setApplied(true)
      }
    } catch (error) {
      setLoading(false)
      setError(
        error.response &&
          (error.response.data.detail || error.response.data.error)
      )
    }
  }

  // Check job applied
  const checkJobApplied = async (id, accessToken) => {
    setLoading(true)
    try {
      const res = await axios.get(
        `${process.env.API_URL}/api/jobs/${id}/check/`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )

      setApplied(res.data)
      setLoading(false)
    } catch (error) {
      setLoading(false)
      setError(
        error.response &&
          (error.response.data.detail || error.response.data.error)
      )
    }
  }

  const clearError = () => {
    setError(null)
  }

  return (
    <JobContext.Provider
      value={{
        applied,
        applyToJob,
        checkJobApplied,
        clearError,
        error,
        loading,
        setUpdated,
        updated,
      }}
    >
      {children}
    </JobContext.Provider>
  )
}

export default JobContext
