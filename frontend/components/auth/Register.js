import { useEffect, useState, useContext } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/router'

import { toast } from 'react-toastify'
import AuthContext from '../../context/AuthContext'

const Register = () => {
  const [firstName, setFirstName] = useState('')
  const [lastName, setlastName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const { loading, error, isAuthenticated, register, clearError } =
    useContext(AuthContext)
  const router = useRouter()

  useEffect(() => {
    if (error) {
      toast.error(error)
      clearError()
    }

    if (isAuthenticated && !loading) {
      router.push('/')
    }
  }, [isAuthenticated, error, loading])

  const submitHandler = async (e) => {
    e.preventDefault()
    register({ firstName, lastName, email, password })
  }

  return (
    <div className='modalMask'>
      <div className='modalWrapper'>
        <div className='left'>
          <div style={{ width: '100%', height: '100%', position: 'relative' }}>
            <Image src='/images/signup.svg' alt='register' layout='fill' />
          </div>
        </div>
        <div className='right'>
          <div className='rightContentWrapper'>
            <div className='headerWrapper'>
              <h2> SIGN UP</h2>
            </div>
            <form className='form' onSubmit={submitHandler}>
              <div className='inputWrapper'>
                <div className='inputBox'>
                  <i aria-hidden className='fas fa-user'></i>
                  <input
                    type='text'
                    placeholder='Enter First Name'
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    required
                  />
                </div>

                <div className='inputBox'>
                  <i aria-hidden className='fas fa-user-tie'></i>
                  <input
                    type='text'
                    placeholder='Enter Last name'
                    value={lastName}
                    onChange={(e) => setlastName(e.target.value)}
                    required
                  />
                </div>

                <div className='inputBox'>
                  <i aria-hidden className='fas fa-envelope'></i>
                  <input
                    type='email'
                    placeholder='Enter Your Email'
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    pattern='\S+@\S+\.\S+'
                    title='Your email is invalid'
                  />
                </div>
                <div className='inputBox'>
                  <i aria-hidden className='fas fa-key'></i>
                  <input
                    type='password'
                    placeholder='Enter Your Password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    minLength={6}
                    required
                  />
                </div>
              </div>
              <div className='registerButtonWrapper'>
                <button type='submit' className='registerButton'>
                  {loading ? 'Loading...' : 'Register'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
export default Register
