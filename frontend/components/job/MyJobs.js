import { useContext, useEffect, useState } from 'react'
import Link from 'next/link'
import DataTable from 'react-data-table-component'
import { useRouter } from 'next/router'

import JobContext from '../../context/JobContext'
import { toast } from 'react-toastify'

const MyJobs = ({ jobs, accessToken }) => {
  const [data, setData] = useState([])
  const { clearError, error, loading, deleted, setDeleted, deleteJob } =
    useContext(JobContext)

  const router = useRouter()

  useEffect(() => {
    if (error) {
      toast.error(error)
      clearError()
    }

    if (deleted) {
      setDeleted(false)
      router.push(router.asPath)
    }
  }, [error, deleted])

  const deleteJobHandler = (id) => {
    deleteJob(id, accessToken)
  }

  const columns = [
    {
      name: 'ID',
      sortable: true,
      selector: (row) => row.id,
    },
    {
      name: 'Title',
      sortable: true,
      selector: (row) => row.title,
    },
    {
      name: 'Salary',
      sortable: true,
      selector: (row) => row.salary,
    },
    {
      name: 'Action',
      sortable: true,
      selector: (row) => row.action,
    },
  ]

  useEffect(() => {
    const tableData = []
    jobs &&
      jobs.forEach((job) => {
        tableData.push({
          id: job.id,
          title: job.title,
          salary: job.salary,
          action: (
            <>
              <Link href={`/job/${job.id}`}>
                <a className='btn btn-primary'>
                  <i aria-hidden className='fa fa-eye'></i>
                </a>
              </Link>
              <Link href={`/employer/jobs/candidates/${job.id}`}>
                <a className='btn btn-success mx-1'>
                  <i aria-hidden className='fa fa-users'></i>
                </a>
              </Link>
              <Link href={`/employer/jobs/${job.id}`}>
                <a className='btn btn-warning'>
                  <i aria-hidden className='fa fa-pencil mx-1'></i>
                </a>
              </Link>
              <button
                className='btn btn-danger mx-1'
                onClick={() => deleteJobHandler(job.id)}
              >
                <i className='fa fa-trash'></i>
              </button>
            </>
          ),
        })
      })

    setData(tableData)
  }, [])

  return (
    <div className='row'>
      <div className='col-2'></div>
      <div className='col-8 mt-5'>
        <h4 className='my-5'>My Jobs</h4>
        <DataTable columns={columns} data={data} pagination responsive />
      </div>
      <div className='col-2'></div>
    </div>
  )
}
export default MyJobs
