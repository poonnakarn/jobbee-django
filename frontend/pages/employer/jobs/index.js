import Layout from '../../../components/layout/Layout'
import MyJobs from '../../../components/job/MyJobs'

import { isAuthenticatedUser } from '../../../utils/isAuthenticated'
import axios from 'axios'

export default function JobsAppliedPage({ accessToken, jobs }) {
  return (
    <Layout title='My Jobs'>
      <MyJobs accessToken={accessToken} jobs={jobs} />
    </Layout>
  )
}

// Protected Route
export async function getServerSideProps({ req }) {
  const accessToken = req.cookies.access // get token from cookies

  const authenticated = await isAuthenticatedUser(accessToken)

  // Return redirect to prevent response from header
  if (!authenticated) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    }
  }

  const res = await axios.get(`${process.env.API_URL}/api/me/jobs/`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  })

  const jobs = res.data

  return {
    props: { accessToken, jobs },
  }
}
