import React,{ useEffect ,useState} from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import FileForm from '../components/FileForm'
import FileItem from '../components/FileItem'
import Spinner from '../components/Spinner'
import { getFiles, reset } from '../features/files/fileSlice'

function Dashboard() {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const [thisId, setThisId] = useState(null)

  const { user } = useSelector((state) => state.auth)
  const { files, isLoading, isError, message } = useSelector(
    (state) => state.files
  )

  useEffect(() => {
    if (isError) {
      console.log(message)
    }

    if (!user) {
      navigate('/login')
    }

    dispatch(getFiles()) 
    if(!isError){ dispatch(reset()) }
  }, [user, navigate, isError, message, dispatch])

  if (isLoading) {
    return <Spinner />
  }
  return (
    <>
      <section className='heading'>
        <h1 className='t1'>Welcome {user && user.name}</h1>
        <p>Files Dashboard</p>
      </section>

      <FileForm update={thisId} setUpdate={setThisId}/>

      <section className='content'>
        {files.length > 0 ? (
          <div className='files'>
            {files.map((file) => (
              <div key={file._id} className='file'>
                <FileItem file={file} />
                <button onClick={() => setThisId(file) } className='update'>M</button>
              </div>
            ))}
          </div>
        ) : (
          <h3 className='t3'>You have not publish any files</h3>
        )}
      </section>
    </>
  )
}

export default Dashboard
