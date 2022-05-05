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

  // Register User
  const register = async ({ firstName, lastName, email, password }) => {
    try {
      setLoading(true)

      const res = await axios.post(`${process.env.API_URL}/api/register/`, {
        first_name: firstName,
        last_name: lastName,
        email,
        password,
      }) // POST method to backend of nextjs

      // console.log(res.data)

      if (res.data.message) {
        setLoading(false)
        router.push('/login')
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

  // Logout user
  const logout = async () => {
    try {
      console.log('logging out')
      const res = await axios.post('/api/auth/logout')

      if (res.data.success) {
        setIsAuthenticated(false)
        setUser(null)
        setLoading(false)
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

  const clearError = () => {
    setError(null)
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
        logout,
        register,
        clearError,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export default AuthContext
