import axios from 'axios'
import Layout from '../../components/layout/Layout'
import JobsApplied from '../../components/job/JobsApplied'

import { isAuthenticatedUser } from '../../utils/isAuthenticated'

export default function JobsAppliedPage({ jobs }) {
  return (
    <Layout title='My Applied Jobs'>
      <JobsApplied jobs={jobs} />
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

  const res = await axios.get(`${process.env.API_URL}/api/me/jobs/applied/`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  })

  const jobs = res.data

  return {
    props: { jobs },
  }
}
