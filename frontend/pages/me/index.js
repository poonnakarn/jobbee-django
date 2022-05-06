import Layout from '../../components/layout/Layout'
import UpdateProfile from '../../components/user/UpdateProfile'

import { isAuthenticatedUser } from '../../utils/isAuthenticated'

export default function UpdateProfilePage({ accessToken }) {
  return (
    <Layout title='Update Your Profile'>
      <UpdateProfile accessToken={accessToken} />
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
