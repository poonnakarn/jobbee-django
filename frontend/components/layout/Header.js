import { useContext } from 'react'
import Link from 'next/link'
import Image from 'next/image'

import AuthContext from '../../context/AuthContext'

const Header = () => {
  const { loading, user } = useContext(AuthContext)

  return (
    <div className='navWrapper'>
      <div className='navContainer'>
        <Link href='/'>
          <div className='logoWrapper'>
            <div className='logoImgWrapper'>
              <Image width='50' height='50' src='/images/logo.png' alt='' />
            </div>
            <span className='logo1'>Job</span>
            <span className='logo2'>bee</span>
          </div>
        </Link>
        <div className='btnsWrapper'>
          <Link href='/employeer/jobs/new'>
            <button className='postAJobButton'>
              <span>Post A Job</span>
            </button>
          </Link>
          {user ? (
            <div className='btn dropdown ml-3'>
              <a
                className='btn dropdown-toggle mr-4'
                id='dropDownMenuButton'
                data-toggle='dropdown'
                aria-haspopup='true'
                aria-expanded='false'
              >
                <span>Hi, {user.first_name}</span>
              </a>
              <div
                className='dropdown-menu'
                area-aria-labelledby='dropDownMenuButton'
              >
                <Link href='/employer/jobs'>
                  <button className='dropdown-item'>My Jobs</button>
                </Link>
                <Link href='/me/applied'>
                  <button className='dropdown-item'>Jobs Applied</button>
                </Link>
                <Link href='/me'>
                  <button className='dropdown-item'>Profile</button>
                </Link>
                <Link href='/upload/resume'>
                  <button className='dropdown-item'>Upload Resume</button>
                </Link>
                <Link href='/'>
                  <button className='dropdown-item text-danger'>Logout</button>
                </Link>
              </div>
            </div>
          ) : (
            !loading && (
              <Link href='/login'>
                <button className='loginButtonHeader'>
                  <span>Login</span>
                </button>
              </Link>
            )
          )}
        </div>
      </div>
    </div>
  )
}
export default Header
