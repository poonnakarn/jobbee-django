import Layout from '../../components/layout/Layout'
import JobDetails from '../../components/job/JobDetails'
import NotFound from '../../components/layout/NotFound'

import axios from 'axios'

export default function JobDetailsPage({
  job,
  candidates,
  error,
  accessToken,
}) {
  // if (error?.includes('Not found')) return <NotFound />
  return (
    <Layout title={job.title}>
      <JobDetails job={job} candidates={candidates} accessToken={accessToken} />
    </Layout>
  )
}

export async function getServerSideProps({ req, params }) {
  try {
    const res = await axios.get(`${process.env.API_URL}/api/jobs/${params.id}`)
    const job = res.data.job
    const candidates = res.data.candidates
    const accessToken = req.cookies.access || ''

    return {
      props: {
        job,
        candidates,
        accessToken,
      },
    }
  } catch (error) {
    // console.log(error.response.data)
    return {
      notFound: true,
    }
  }
}
