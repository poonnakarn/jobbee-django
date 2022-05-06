import Layout from '../../../../components/layout/Layout'
import JobCandidates from '../../../../components/job/JobCandidates'
import { isAuthenticatedUser } from '../../../../utils/isAuthenticated'

import axios from 'axios'

export default function JobCandidatesPage({ candidatesApplied, error }) {
  return (
    <Layout title='Job Candidates'>
      <JobCandidates candidatesApplied={candidatesApplied} />
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
    const res = await axios.get(
      `${process.env.API_URL}/api/job/${params.id}/candidates/`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    )
    const candidatesApplied = res.data

    return {
      props: {
        candidatesApplied,
      },
    }
  } catch (error) {
    console.log(error.response.data)
    return {
      notFound: true,
    }
  }
}
