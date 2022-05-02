import Head from 'next/head'
import Image from 'next/image'
import Layout from '../components/layout/Layout'
import Home from '../components/Home'

export default function Index() {
  return (
    <Layout>
      <Home />
    </Layout>
  )
}
