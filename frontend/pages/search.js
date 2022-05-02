import Layout from '../components/layout/Layout'
import Search from '../components/layout/Search'
import axios from 'axios'

export default function SearchPage({ data }) {
  return (
    <Layout title='Search your jobs'>
      <Search />
    </Layout>
  )
}
