import Layout from '../../components/layout/Layout'

import axios from 'axios'

export default function JobDetailsPage({ job, candidates }) {
  return (
    <Layout>
      <h1>Job Details</h1>
    </Layout>
  )
}

export async function getServerSideProps({ params }) {
  const res = await axios.get(`${process.env.API_URL}/api/jobs/${params.id}`)
  const job = res.data.job
  const candidates = res.data.candidates

  return {
    props: {
      job,
      candidates,
    },
  }
}
