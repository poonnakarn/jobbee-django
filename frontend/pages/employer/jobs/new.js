import Layout from '../../../components/layout/Layout'
import NewJob from '../../../components/job/NewJob'

import { isAuthenticatedUser } from '../../../utils/isAuthenticated'

export default function JobsAppliedPage({ accessToken }) {
  return (
    <Layout title='Post a new Job'>
      <NewJob accessToken={accessToken} />
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

  return {
    props: { accessToken },
  }
}
