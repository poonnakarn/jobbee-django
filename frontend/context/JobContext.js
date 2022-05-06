import axios from 'axios'
import { useState, createContext } from 'react'

const JobContext = createContext()

export const JobProvider = ({ children }) => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [updated, setUpdated] = useState(null)
  const [applied, setApplied] = useState(false)
  const [stats, setStats] = useState(null)
  const [created, setCreated] = useState(null)

  // Create a new job
  const newJob = async (data, accessToken) => {
    setLoading(true)
    try {
      const res = await axios.post(
        `${process.env.API_URL}/api/jobs/new/`,
        data,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )

      if (res.data) {
        setLoading(false)
        setCreated(true)
      }
    } catch (error) {
      setLoading(false)
      setError(
        error.response &&
          (error.response.data.detail || error.response.data.error)
      )
    }
  }

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

  // Get topic stats
  const getTopicStats = async (topic) => {
    setLoading(true)
    try {
      const res = await axios.get(`${process.env.API_URL}/api/stats/${topic}/`)

      setStats(res.data)
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
        getTopicStats,
        setUpdated,
        stats,
        updated,
        newJob,
        created,
        setCreated,
      }}
    >
      {children}
    </JobContext.Provider>
  )
}

export default JobContext
