import Layout from '../../../components/layout/Layout'
import { isAuthenticatedUser } from '../../../utils/isAuthenticated'
import UpdateJob from '../../../components/job/UpdateJob'

import axios from 'axios'

export default function JobUpdatePage({ job, accessToken }) {
  return (
    <Layout title='Job Candidates'>
      <UpdateJob accessToken={accessToken} job={job} />
    </Layout>
  )
}

export async function getServerSideProps({ req, params }) {
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

  try {
    const res = await axios.get(`${process.env.API_URL}/api/jobs/${params.id}`)
    const job = res.data.job

    return {
      props: {
        job,
        accessToken,
      },
    }
  } catch (error) {
    console.log(error.response.data)
    return {
      notFound: true,
    }
  }
}
