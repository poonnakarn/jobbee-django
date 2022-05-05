import axios from 'axios'
import Router, { useRouter } from 'next/router'
import { useState, useEffect, createContext } from 'react'

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [loading, setLoading] = useState(false)
  const [user, setUser] = useState(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [error, setError] = useState(null)

  const router = useRouter()

  useEffect(() => {
    if (!user) {
      loadUser()
    }
  }, [user])

  // Login User
  const login = async ({ username, password }) => {
    try {
      setLoading(true)

      const res = await axios.post('/api/auth/login', {
        username,
        password,
      }) // POST method to backend of nextjs

      if (res.data.success) {
        setIsAuthenticated(true)
        loadUser()
        setLoading(false)
        router.push('/')
      }
    } catch (error) {
      setLoading(false)
      setError(
        error.response &&
          (error.response.data.detail || error.response.data.error)
      )
    }
  }

  // Load User
  const loadUser = async () => {
    try {
      setLoading(true)

      const res = await axios.get('/api/auth/user')

      if (res.data.user) {
        setIsAuthenticated(true)
        setLoading(false)
        setUser(res.data.user)
      }
    } catch (error) {
      setLoading(false)
      setIsAuthenticated(false)
      setUser(null)
      setError(
        error.response &&
          (error.response.data.detail || error.response.data.error)
      )
    }
  }

  return (
    <AuthContext.Provider
      value={{
        loading,
        user,
        error,
        isAuthenticated,
        login,
        setError,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export default AuthContext
